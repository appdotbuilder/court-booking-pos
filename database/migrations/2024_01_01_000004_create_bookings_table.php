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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('court_id')->constrained()->onDelete('cascade');
            $table->date('booking_date')->comment('Booking date');
            $table->time('start_time')->comment('Start time');
            $table->time('end_time')->comment('End time');
            $table->decimal('total_price', 10, 2)->comment('Total booking price');
            $table->enum('status', ['confirmed', 'cancelled', 'completed'])->default('confirmed');
            $table->text('notes')->nullable()->comment('Booking notes');
            $table->timestamps();
            
            $table->index(['booking_date', 'start_time']);
            $table->index('status');
            $table->unique(['court_id', 'booking_date', 'start_time', 'end_time']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};