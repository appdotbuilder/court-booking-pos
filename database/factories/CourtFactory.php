<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Court>
 */
class CourtFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement([
                'Padel Court 1', 'Padel Court 2', 'Padel Court 3',
                'Badminton Court A', 'Badminton Court B', 'Badminton Court C'
            ]),
            'type' => fake()->randomElement(['padel', 'badminton']),
            'description' => fake()->paragraph(),
            'price_per_hour' => fake()->randomFloat(2, 50, 200),
            'is_active' => fake()->boolean(90), // 90% chance of being active
        ];
    }

    /**
     * Indicate that the court is a padel court.
     */
    public function padel(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'padel',
            'name' => 'Padel Court ' . fake()->numberBetween(1, 10),
            'price_per_hour' => fake()->randomFloat(2, 100, 200),
        ]);
    }

    /**
     * Indicate that the court is a badminton court.
     */
    public function badminton(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'badminton',
            'name' => 'Badminton Court ' . fake()->randomElement(['A', 'B', 'C', 'D']),
            'price_per_hour' => fake()->randomFloat(2, 50, 100),
        ]);
    }
}