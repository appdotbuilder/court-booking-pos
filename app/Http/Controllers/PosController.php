<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePosTransactionRequest;
use App\Models\MenuItem;
use App\Models\PosTransaction;
use App\Models\PosTransactionItem;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PosController extends Controller
{
    /**
     * Display the POS interface.
     */
    public function index()
    {
        $menuItems = MenuItem::available()
            ->orderBy('category')
            ->orderBy('name')
            ->get()
            ->groupBy('category');

        $users = User::select('id', 'name', 'email', 'phone')->get();

        return Inertia::render('pos/index', [
            'menuItems' => $menuItems,
            'users' => $users,
        ]);
    }

    /**
     * Store a new POS transaction.
     */
    public function store(StorePosTransactionRequest $request)
    {
        $data = $request->validated();

        // Generate unique transaction code
        $transactionCode = 'POS' . date('Ymd') . str_pad((string)(PosTransaction::whereDate('created_at', today())->count() + 1), 4, '0', STR_PAD_LEFT);

        // Calculate totals
        $subtotal = 0;
        foreach ($data['items'] as $item) {
            $menuItem = MenuItem::findOrFail($item['menu_item_id']);
            $subtotal += $menuItem->price * $item['quantity'];
        }

        $tax = $subtotal * 0.1; // 10% tax
        $totalAmount = $subtotal + $tax;

        // Create transaction
        $transaction = PosTransaction::create([
            'transaction_code' => $transactionCode,
            'user_id' => $data['user_id'] ?? null,
            'subtotal' => $subtotal,
            'tax' => $tax,
            'total_amount' => $totalAmount,
            'payment_method' => $data['payment_method'],
            'status' => 'completed',
            'points_earned' => 5, // 5 points for POS transactions
            'notes' => $data['notes'] ?? null,
        ]);

        // Create transaction items
        foreach ($data['items'] as $item) {
            $menuItem = MenuItem::findOrFail($item['menu_item_id']);
            PosTransactionItem::create([
                'pos_transaction_id' => $transaction->id,
                'menu_item_id' => $item['menu_item_id'],
                'quantity' => $item['quantity'],
                'unit_price' => $menuItem->price,
                'total_price' => $menuItem->price * $item['quantity'],
            ]);
        }

        // Award points to user if specified
        if ($data['user_id']) {
            $user = User::find($data['user_id']);
            if ($user) {
                $user->increment('points', 5);
            }
        }

        return Inertia::render('pos/receipt', [
            'transaction' => $transaction->load(['items.menuItem', 'user']),
        ]);
    }


}