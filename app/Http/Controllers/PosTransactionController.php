<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\PosTransaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PosTransactionController extends Controller
{
    /**
     * Display a listing of POS transactions.
     */
    public function index(Request $request)
    {
        $query = PosTransaction::with(['user', 'items.menuItem'])
            ->latest();

        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        if ($request->filled('payment_method')) {
            $query->where('payment_method', $request->payment_method);
        }

        $transactions = $query->paginate(15);

        return Inertia::render('pos/transactions', [
            'transactions' => $transactions,
            'filters' => $request->only(['date_from', 'date_to', 'payment_method']),
            'totalToday' => PosTransaction::whereDate('created_at', today())
                ->where('status', 'completed')
                ->sum('total_amount'),
        ]);
    }

    /**
     * Display the specified transaction.
     */
    public function show(PosTransaction $posTransaction)
    {
        $posTransaction->load(['user', 'items.menuItem']);

        return Inertia::render('pos/show', [
            'transaction' => $posTransaction,
        ]);
    }
}