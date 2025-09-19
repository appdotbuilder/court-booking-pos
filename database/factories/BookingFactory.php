<?php

namespace Database\Factories;

use App\Models\Court;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startHour = fake()->numberBetween(8, 20);
        $duration = fake()->randomElement([1, 2, 3]);
        
        return [
            'user_id' => User::factory(),
            'court_id' => Court::factory(),
            'booking_date' => fake()->dateTimeBetween('-1 month', '+2 months')->format('Y-m-d'),
            'start_time' => sprintf('%02d:00:00', $startHour),
            'end_time' => sprintf('%02d:00:00', $startHour + $duration),
            'total_price' => fake()->randomFloat(2, 50, 300),
            'status' => fake()->randomElement(['confirmed', 'completed', 'cancelled']),
            'notes' => fake()->optional()->sentence(),
        ];
    }

    /**
     * Indicate that the booking is confirmed.
     */
    public function confirmed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'confirmed',
        ]);
    }

    /**
     * Indicate that the booking is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
            'booking_date' => fake()->dateTimeBetween('-1 month', 'yesterday')->format('Y-m-d'),
        ]);
    }
}