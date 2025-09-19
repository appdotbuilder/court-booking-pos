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
        Schema::create('menu_items', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Item name');
            $table->text('description')->nullable()->comment('Item description');
            $table->decimal('price', 10, 2)->comment('Item price');
            $table->enum('category', ['drinks', 'snacks', 'meals'])->comment('Item category');
            $table->boolean('is_available')->default(true)->comment('Item availability');
            $table->timestamps();
            
            $table->index('category');
            $table->index('is_available');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menu_items');
    }
};