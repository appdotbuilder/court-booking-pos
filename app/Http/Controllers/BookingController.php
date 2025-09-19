<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBookingRequest;
use App\Models\Booking;
use App\Models\Court;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    /**
     * Display a listing of the bookings.
     */
    public function index(Request $request)
    {
        $query = Booking::with(['user', 'court'])
            ->latest();

        if ($request->filled('date')) {
            $query->whereDate('booking_date', $request->date);
        }

        if ($request->filled('court_type')) {
            $query->whereHas('court', function ($q) use ($request) {
                $q->where('type', $request->court_type);
            });
        }

        $bookings = $query->paginate(15);

        return Inertia::render('bookings/index', [
            'bookings' => $bookings,
            'filters' => $request->only(['date', 'court_type']),
            'courtTypes' => Court::distinct()->pluck('type'),
        ]);
    }

    /**
     * Show the form for creating a new booking.
     */
    public function create()
    {
        $courts = Court::active()->get();
        $users = User::select('id', 'name', 'email')->get();

        return Inertia::render('bookings/create', [
            'courts' => $courts,
            'users' => $users,
        ]);
    }

    /**
     * Store a newly created booking.
     */
    public function store(StoreBookingRequest $request)
    {
        $data = $request->validated();
        
        // Check for conflicting bookings
        $conflictingBooking = Booking::where('court_id', $data['court_id'])
            ->where('booking_date', $data['booking_date'])
            ->where('status', '!=', 'cancelled')
            ->where(function ($query) use ($data) {
                $query->whereBetween('start_time', [$data['start_time'], $data['end_time']])
                      ->orWhereBetween('end_time', [$data['start_time'], $data['end_time']])
                      ->orWhere(function ($q) use ($data) {
                          $q->where('start_time', '<=', $data['start_time'])
                            ->where('end_time', '>=', $data['end_time']);
                      });
            })
            ->exists();

        if ($conflictingBooking) {
            return back()->withErrors(['time' => 'Lapangan sudah dibooking pada waktu tersebut.']);
        }

        // Calculate total price
        $court = Court::findOrFail($data['court_id']);
        $startTime = Carbon::parse($data['start_time']);
        $endTime = Carbon::parse($data['end_time']);
        $duration = $endTime->diffInHours($startTime);
        $totalPrice = $duration * $court->price_per_hour;

        $data['total_price'] = $totalPrice;

        $booking = Booking::create($data);

        // Award points to user (10 points per booking)
        $user = User::find($data['user_id']);
        if ($user) {
            $user->increment('points', 10);
        }

        return redirect()->route('bookings.show', $booking)
            ->with('success', 'Booking berhasil dibuat!');
    }

    /**
     * Display the specified booking.
     */
    public function show(Booking $booking)
    {
        $booking->load(['user', 'court']);

        return Inertia::render('bookings/show', [
            'booking' => $booking,
        ]);
    }

    /**
     * Show the form for editing the booking.
     */
    public function edit(Booking $booking)
    {
        $courts = Court::active()->get();
        $users = User::select('id', 'name', 'email')->get();

        return Inertia::render('bookings/edit', [
            'booking' => $booking,
            'courts' => $courts,
            'users' => $users,
        ]);
    }

    /**
     * Update the specified booking.
     */
    public function update(StoreBookingRequest $request, Booking $booking)
    {
        $data = $request->validated();
        
        // Check for conflicting bookings (exclude current booking)
        $conflictingBooking = Booking::where('court_id', $data['court_id'])
            ->where('booking_date', $data['booking_date'])
            ->where('status', '!=', 'cancelled')
            ->where('id', '!=', $booking->id)
            ->where(function ($query) use ($data) {
                $query->whereBetween('start_time', [$data['start_time'], $data['end_time']])
                      ->orWhereBetween('end_time', [$data['start_time'], $data['end_time']])
                      ->orWhere(function ($q) use ($data) {
                          $q->where('start_time', '<=', $data['start_time'])
                            ->where('end_time', '>=', $data['end_time']);
                      });
            })
            ->exists();

        if ($conflictingBooking) {
            return back()->withErrors(['time' => 'Lapangan sudah dibooking pada waktu tersebut.']);
        }

        // Calculate total price
        $court = Court::findOrFail($data['court_id']);
        $startTime = Carbon::parse($data['start_time']);
        $endTime = Carbon::parse($data['end_time']);
        $duration = $endTime->diffInHours($startTime);
        $totalPrice = $duration * $court->price_per_hour;

        $data['total_price'] = $totalPrice;

        $booking->update($data);

        return redirect()->route('bookings.show', $booking)
            ->with('success', 'Booking berhasil diupdate!');
    }

    /**
     * Remove the specified booking.
     */
    public function destroy(Booking $booking)
    {
        $booking->update(['status' => 'cancelled']);

        return redirect()->route('bookings.index')
            ->with('success', 'Booking berhasil dibatalkan.');
    }
}