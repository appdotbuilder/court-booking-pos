<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\PosController;
use App\Http\Controllers\PosTransactionController;
use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Main sports booking homepage
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Booking management
    Route::resource('bookings', BookingController::class);
    
    // POS System
    Route::get('/pos', [PosController::class, 'index'])->name('pos.index');
    Route::post('/pos', [PosController::class, 'store'])->name('pos.store');
    
    // POS Transactions
    Route::resource('pos-transactions', PosTransactionController::class, [
        'only' => ['index', 'show']
    ]);
    
    // Member management
    Route::get('/members', [MemberController::class, 'index'])->name('members.index');
    Route::get('/members/{member}', [MemberController::class, 'show'])->name('members.show');
    
    // Reports - all handled through single index method with type parameter
    Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
