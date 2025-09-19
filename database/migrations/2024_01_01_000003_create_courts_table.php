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
        Schema::create('courts', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Court name');
            $table->enum('type', ['padel', 'badminton'])->comment('Court type');
            $table->text('description')->nullable()->comment('Court description');
            $table->decimal('price_per_hour', 10, 2)->comment('Price per hour');
            $table->boolean('is_active')->default(true)->comment('Court availability status');
            $table->timestamps();
            
            $table->index('type');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courts');
    }
};