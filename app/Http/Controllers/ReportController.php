<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\PosTransaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    /**
     * Display reports dashboard and handle all report types.
     */
    public function index(Request $request)
    {
        $type = $request->get('type', 'dashboard');
        
        switch ($type) {
            case 'bookings':
                return $this->handleBookingReport($request);
            case 'pos':
                return $this->handlePosReport($request);
            case 'points':
                return $this->handlePointsReport($request);
            case 'export':
                return $this->handleExport($request);
            default:
                return Inertia::render('reports/index');
        }
    }

    /**
     * Handle booking reports.
     */
    protected function handleBookingReport(Request $request)
    {
        $request->validate([
            'period' => 'required|in:daily,monthly',
            'date_from' => 'required|date',
            'date_to' => 'required|date|after_or_equal:date_from',
        ]);

        $period = $request->period;
        $dateFrom = Carbon::parse($request->date_from);
        $dateTo = Carbon::parse($request->date_to);

        $query = Booking::with(['user', 'court'])
            ->whereBetween('booking_date', [$dateFrom, $dateTo])
            ->where('status', '!=', 'cancelled');

        $bookings = $query->get();

        if ($period === 'daily') {
            $groupedData = $bookings->groupBy(function ($booking) {
                return Carbon::parse($booking->booking_date)->format('Y-m-d');
            })->map(function ($dayBookings) {
                return [
                    'date' => $dayBookings->first()->booking_date,
                    'total_bookings' => $dayBookings->count(),
                    'total_revenue' => $dayBookings->sum('total_price'),
                    'bookings' => $dayBookings,
                ];
            })->values();
        } else {
            $groupedData = $bookings->groupBy(function ($booking) {
                return Carbon::parse($booking->booking_date)->format('Y-m');
            })->map(function ($monthBookings, $monthKey) {
                return [
                    'month' => Carbon::parse($monthKey . '-01')->format('F Y'),
                    'total_bookings' => $monthBookings->count(),
                    'total_revenue' => $monthBookings->sum('total_price'),
                    'bookings' => $monthBookings,
                ];
            })->values();
        }

        $summary = [
            'total_bookings' => $bookings->count(),
            'total_revenue' => $bookings->sum('total_price'),
            'avg_booking_value' => $bookings->count() > 0 ? $bookings->avg('total_price') : 0,
            'popular_court' => $bookings->groupBy('court.name')->map->count()->sortDesc()->keys()->first() ?? 'N/A',
        ];

        return Inertia::render('reports/bookings', [
            'reportData' => $groupedData,
            'summary' => $summary,
            'filters' => $request->only(['period', 'date_from', 'date_to']),
        ]);
    }

    /**
     * Handle POS reports.
     */
    protected function handlePosReport(Request $request)
    {
        $request->validate([
            'period' => 'required|in:daily,monthly',
            'date_from' => 'required|date',
            'date_to' => 'required|date|after_or_equal:date_from',
        ]);

        $dateFrom = Carbon::parse($request->date_from);
        $dateTo = Carbon::parse($request->date_to);

        $transactions = PosTransaction::with(['user', 'items.menuItem'])
            ->whereBetween('created_at', [$dateFrom, $dateTo])
            ->where('status', 'completed')
            ->get();

        $summary = [
            'total_transactions' => $transactions->count(),
            'total_revenue' => $transactions->sum('total_amount'),
            'avg_transaction_value' => $transactions->count() > 0 ? $transactions->avg('total_amount') : 0,
        ];

        return Inertia::render('reports/pos', [
            'transactions' => $transactions,
            'summary' => $summary,
            'filters' => $request->only(['period', 'date_from', 'date_to']),
        ]);
    }

    /**
     * Handle points report.
     */
    protected function handlePointsReport(Request $request)
    {
        $request->validate([
            'date_from' => 'required|date',
            'date_to' => 'required|date|after_or_equal:date_from',
        ]);

        $dateFrom = Carbon::parse($request->date_from);
        $dateTo = Carbon::parse($request->date_to);

        $bookingPoints = Booking::whereBetween('created_at', [$dateFrom, $dateTo])
            ->where('status', '!=', 'cancelled')
            ->with('user')
            ->get()
            ->sum(function () { return 10; });

        $posPoints = PosTransaction::whereBetween('created_at', [$dateFrom, $dateTo])
            ->where('status', 'completed')
            ->whereNotNull('user_id')
            ->count() * 5;

        $summary = [
            'total_points_distributed' => $bookingPoints + $posPoints,
            'booking_points' => $bookingPoints,
            'pos_points' => $posPoints,
        ];

        return Inertia::render('reports/points', [
            'summary' => $summary,
            'filters' => $request->only(['date_from', 'date_to']),
        ]);
    }

    /**
     * Handle CSV export.
     */
    protected function handleExport(Request $request)
    {
        $request->validate([
            'export_type' => 'required|in:bookings,pos,points',
            'date_from' => 'required|date',
            'date_to' => 'required|date|after_or_equal:date_from',
        ]);

        $dateFrom = Carbon::parse($request->date_from);
        $dateTo = Carbon::parse($request->date_to);
        $type = $request->export_type;

        $filename = $type . '_report_' . $dateFrom->format('Y-m-d') . '_to_' . $dateTo->format('Y-m-d') . '.csv';

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ];

        $callback = function () use ($type, $dateFrom, $dateTo) {
            $file = fopen('php://output', 'w');

            if ($type === 'bookings') {
                fputcsv($file, ['Tanggal', 'Member', 'Lapangan', 'Waktu Mulai', 'Waktu Selesai', 'Total Harga', 'Status']);
                
                $bookings = Booking::with(['user', 'court'])
                    ->whereBetween('booking_date', [$dateFrom, $dateTo])
                    ->get();

                foreach ($bookings as $booking) {
                    fputcsv($file, [
                        $booking->booking_date,
                        $booking->user->name,
                        $booking->court->name,
                        $booking->start_time,
                        $booking->end_time,
                        $booking->total_price,
                        $booking->status,
                    ]);
                }
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}