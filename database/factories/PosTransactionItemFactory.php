<?php

namespace Database\Factories;

use App\Models\MenuItem;
use App\Models\PosTransaction;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PosTransactionItem>
 */
class PosTransactionItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $quantity = fake()->numberBetween(1, 5);
        $unitPrice = fake()->randomFloat(2, 10, 50);
        $totalPrice = $quantity * $unitPrice;
        
        return [
            'pos_transaction_id' => PosTransaction::factory(),
            'menu_item_id' => MenuItem::factory(),
            'quantity' => $quantity,
            'unit_price' => $unitPrice,
            'total_price' => $totalPrice,
        ];
    }
}