<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Court;
use App\Models\PosTransaction;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index(Request $request)
    {
        $today = Carbon::today();
        $thisMonth = Carbon::now()->startOfMonth();

        // Today's statistics
        $todayStats = [
            'bookings' => Booking::whereDate('booking_date', $today)->count(),
            'booking_revenue' => Booking::whereDate('booking_date', $today)
                ->where('status', '!=', 'cancelled')
                ->sum('total_price'),
            'pos_transactions' => PosTransaction::whereDate('created_at', $today)
                ->where('status', 'completed')
                ->count(),
            'pos_revenue' => PosTransaction::whereDate('created_at', $today)
                ->where('status', 'completed')
                ->sum('total_amount'),
        ];

        // Monthly statistics
        $monthlyStats = [
            'bookings' => Booking::where('booking_date', '>=', $thisMonth)->count(),
            'booking_revenue' => Booking::where('booking_date', '>=', $thisMonth)
                ->where('status', '!=', 'cancelled')
                ->sum('total_price'),
            'pos_transactions' => PosTransaction::where('created_at', '>=', $thisMonth)
                ->where('status', 'completed')
                ->count(),
            'pos_revenue' => PosTransaction::where('created_at', '>=', $thisMonth)
                ->where('status', 'completed')
                ->sum('total_amount'),
        ];

        // Recent bookings
        $recentBookings = Booking::with(['user', 'court'])
            ->latest()
            ->take(5)
            ->get();

        // Recent POS transactions
        $recentPosTransactions = PosTransaction::with(['user'])
            ->latest()
            ->take(5)
            ->get();

        // Court statistics
        $courtStats = Court::withCount(['bookings' => function ($query) use ($thisMonth) {
            $query->where('booking_date', '>=', $thisMonth)
                  ->where('status', '!=', 'cancelled');
        }])->get();

        // Top members by points
        $topMembers = User::where('is_admin', false)
            ->orderBy('points', 'desc')
            ->take(10)
            ->get(['id', 'name', 'email', 'points']);

        // Monthly revenue trend (last 6 months)
        $monthlyRevenue = [];
        for ($i = 5; $i >= 0; $i--) {
            $month = Carbon::now()->subMonths($i);
            $monthStart = $month->copy()->startOfMonth();
            $monthEnd = $month->copy()->endOfMonth();

            $bookingRevenue = Booking::whereBetween('booking_date', [$monthStart, $monthEnd])
                ->where('status', '!=', 'cancelled')
                ->sum('total_price');

            $posRevenue = PosTransaction::whereBetween('created_at', [$monthStart, $monthEnd])
                ->where('status', 'completed')
                ->sum('total_amount');

            $monthlyRevenue[] = [
                'month' => $month->format('M Y'),
                'booking_revenue' => $bookingRevenue,
                'pos_revenue' => $posRevenue,
                'total_revenue' => $bookingRevenue + $posRevenue,
            ];
        }

        return Inertia::render('dashboard', [
            'todayStats' => $todayStats,
            'monthlyStats' => $monthlyStats,
            'recentBookings' => $recentBookings,
            'recentPosTransactions' => $recentPosTransactions,
            'courtStats' => $courtStats,
            'topMembers' => $topMembers,
            'monthlyRevenue' => $monthlyRevenue,
            'totalMembers' => User::where('is_admin', false)->count(),
            'activeCourts' => Court::where('is_active', true)->count(),
        ]);
    }
}