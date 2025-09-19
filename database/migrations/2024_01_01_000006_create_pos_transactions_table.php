<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pos_transactions', function (Blueprint $table) {
            $table->id();
            $table->string('transaction_code')->unique()->comment('Unique transaction code');
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->decimal('subtotal', 10, 2)->comment('Subtotal amount');
            $table->decimal('tax', 10, 2)->default(0)->comment('Tax amount');
            $table->decimal('total_amount', 10, 2)->comment('Total amount');
            $table->enum('payment_method', ['cash', 'qris'])->comment('Payment method');
            $table->enum('status', ['pending', 'completed', 'cancelled'])->default('completed');
            $table->integer('points_earned')->default(0)->comment('Points earned from transaction');
            $table->text('notes')->nullable()->comment('Transaction notes');
            $table->timestamps();
            
            $table->index('transaction_code');
            $table->index(['created_at', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pos_transactions');
    }
};