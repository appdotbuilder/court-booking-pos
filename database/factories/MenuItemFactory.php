<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MenuItem>
 */
class MenuItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $category = fake()->randomElement(['drinks', 'snacks', 'meals']);
        
        $names = [
            'drinks' => ['Kopi Espresso', 'Teh Tarik', 'Jus Jeruk', 'Air Mineral', 'Smoothie Berry'],
            'snacks' => ['Keripik Kentang', 'Roti Bakar', 'Pisang Goreng', 'Kue Donat', 'Es Krim'],
            'meals' => ['Nasi Goreng', 'Mie Ayam', 'Gado-gado', 'Sate Ayam', 'Bakso']
        ];
        
        $priceRanges = [
            'drinks' => [10, 50],
            'snacks' => [15, 35],
            'meals' => [25, 75]
        ];
        
        return [
            'name' => fake()->randomElement($names[$category]),
            'description' => fake()->sentence(),
            'price' => fake()->randomFloat(2, $priceRanges[$category][0], $priceRanges[$category][1]),
            'category' => $category,
            'is_available' => fake()->boolean(85), // 85% chance of being available
        ];
    }

    /**
     * Indicate that the menu item is a drink.
     */
    public function drink(): static
    {
        return $this->state(fn (array $attributes) => [
            'category' => 'drinks',
            'name' => fake()->randomElement(['Kopi Espresso', 'Teh Tarik', 'Jus Jeruk', 'Air Mineral']),
            'price' => fake()->randomFloat(2, 10, 50),
        ]);
    }

    /**
     * Indicate that the menu item is a snack.
     */
    public function snack(): static
    {
        return $this->state(fn (array $attributes) => [
            'category' => 'snacks',
            'name' => fake()->randomElement(['Keripik Kentang', 'Roti Bakar', 'Pisang Goreng']),
            'price' => fake()->randomFloat(2, 15, 35),
        ]);
    }
}