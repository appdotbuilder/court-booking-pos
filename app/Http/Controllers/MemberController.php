<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MemberController extends Controller
{
    /**
     * Display a listing of members.
     */
    public function index(Request $request)
    {
        $query = User::where('is_admin', false);

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        if ($request->filled('sort')) {
            $sort = $request->sort;
            if ($sort === 'points_desc') {
                $query->orderBy('points', 'desc');
            } elseif ($sort === 'points_asc') {
                $query->orderBy('points', 'asc');
            } elseif ($sort === 'name') {
                $query->orderBy('name', 'asc');
            } else {
                $query->latest();
            }
        } else {
            $query->latest();
        }

        $members = $query->withCount(['bookings', 'posTransactions'])
            ->paginate(15);

        return Inertia::render('members/index', [
            'members' => $members,
            'filters' => $request->only(['search', 'sort']),
        ]);
    }

    /**
     * Display the specified member.
     */
    public function show(User $member)
    {
        if ($member->is_admin) {
            abort(404);
        }

        $member->load([
            'bookings.court',
            'posTransactions.items.menuItem'
        ]);

        // Recent activities
        $recentBookings = $member->bookings()
            ->with('court')
            ->latest()
            ->take(5)
            ->get();

        $recentPosTransactions = $member->posTransactions()
            ->latest()
            ->take(5)
            ->get();

        // Statistics
        $stats = [
            'total_bookings' => $member->bookings()->count(),
            'total_spending_bookings' => $member->bookings()->where('status', '!=', 'cancelled')->sum('total_price'),
            'total_pos_transactions' => $member->posTransactions()->where('status', 'completed')->count(),
            'total_spending_pos' => $member->posTransactions()->where('status', 'completed')->sum('total_amount'),
        ];

        $stats['total_spending'] = $stats['total_spending_bookings'] + $stats['total_spending_pos'];

        return Inertia::render('members/show', [
            'member' => $member,
            'recentBookings' => $recentBookings,
            'recentPosTransactions' => $recentPosTransactions,
            'stats' => $stats,
        ]);
    }
}