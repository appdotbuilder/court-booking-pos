<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PosTransaction>
 */
class PosTransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subtotal = fake()->randomFloat(2, 20, 150);
        $tax = $subtotal * 0.1; // 10% tax
        $totalAmount = $subtotal + $tax;
        
        return [
            'transaction_code' => 'POS' . fake()->unique()->numerify('######'),
            'user_id' => fake()->optional()->randomElement(User::pluck('id')->toArray()),
            'subtotal' => $subtotal,
            'tax' => $tax,
            'total_amount' => $totalAmount,
            'payment_method' => fake()->randomElement(['cash', 'qris']),
            'status' => fake()->randomElement(['completed', 'pending', 'cancelled']),
            'points_earned' => 5, // Standard 5 points for POS transactions
            'notes' => fake()->optional()->sentence(),
        ];
    }

    /**
     * Indicate that the transaction is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
        ]);
    }

    /**
     * Indicate that the payment method is cash.
     */
    public function cash(): static
    {
        return $this->state(fn (array $attributes) => [
            'payment_method' => 'cash',
        ]);
    }

    /**
     * Indicate that the payment method is QRIS.
     */
    public function qris(): static
    {
        return $this->state(fn (array $attributes) => [
            'payment_method' => 'qris',
        ]);
    }
}