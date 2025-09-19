<?php

namespace Database\Seeders;

use App\Models\MenuItem;
use Illuminate\Database\Seeder;

class MenuItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $menuItems = [
            // Drinks
            [
                'name' => 'Es Teh Manis',
                'description' => 'Teh manis segar dengan es batu',
                'price' => 8.00,
                'category' => 'drinks',
                'is_available' => true,
            ],
            [
                'name' => 'Kopi Hitam',
                'description' => 'Kopi hitam premium tanpa gula',
                'price' => 12.00,
                'category' => 'drinks',
                'is_available' => true,
            ],
            [
                'name' => 'Jus Jeruk',
                'description' => 'Jus jeruk segar tanpa pemanis buatan',
                'price' => 15.00,
                'category' => 'drinks',
                'is_available' => true,
            ],
            [
                'name' => 'Air Mineral',
                'description' => 'Air mineral dalam kemasan botol 600ml',
                'price' => 5.00,
                'category' => 'drinks',
                'is_available' => true,
            ],
            [
                'name' => 'Smoothie Strawberry',
                'description' => 'Smoothie strawberry dengan yogurt',
                'price' => 25.00,
                'category' => 'drinks',
                'is_available' => true,
            ],
            // Snacks
            [
                'name' => 'Keripik Kentang',
                'description' => 'Keripik kentang renyah dengan berbagai rasa',
                'price' => 12.00,
                'category' => 'snacks',
                'is_available' => true,
            ],
            [
                'name' => 'Roti Bakar',
                'description' => 'Roti bakar dengan selai cokelat atau keju',
                'price' => 18.00,
                'category' => 'snacks',
                'is_available' => true,
            ],
            [
                'name' => 'Pisang Goreng',
                'description' => 'Pisang goreng krispy dengan madu',
                'price' => 15.00,
                'category' => 'snacks',
                'is_available' => true,
            ],
            [
                'name' => 'Es Krim',
                'description' => 'Es krim vanilla, cokelat, atau strawberry',
                'price' => 20.00,
                'category' => 'snacks',
                'is_available' => true,
            ],
            // Meals
            [
                'name' => 'Nasi Goreng Special',
                'description' => 'Nasi goreng dengan telur, ayam, dan sayuran',
                'price' => 35.00,
                'category' => 'meals',
                'is_available' => true,
            ],
            [
                'name' => 'Mie Ayam',
                'description' => 'Mie ayam dengan bakso dan pangsit goreng',
                'price' => 25.00,
                'category' => 'meals',
                'is_available' => true,
            ],
            [
                'name' => 'Gado-gado',
                'description' => 'Gado-gado dengan bumbu kacang dan kerupuk',
                'price' => 28.00,
                'category' => 'meals',
                'is_available' => true,
            ],
            [
                'name' => 'Club Sandwich',
                'description' => 'Sandwich dengan ayam, keju, dan sayuran segar',
                'price' => 32.00,
                'category' => 'meals',
                'is_available' => true,
            ],
        ];

        foreach ($menuItems as $item) {
            MenuItem::create($item);
        }
    }
}