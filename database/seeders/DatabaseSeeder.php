<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@sportbooking.com',
            'phone' => '081234567890',
            'is_admin' => true,
            'points' => 100,
        ]);

        // Create regular test user
        User::factory()->create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '081987654321',
            'is_admin' => false,
            'points' => 50,
        ]);

        // Create additional users
        User::factory(8)->create();

        // Seed courts and menu items
        $this->call([
            CourtSeeder::class,
            MenuItemSeeder::class,
        ]);

        // Create sample bookings and POS transactions
        \App\Models\Booking::factory(20)->create();
        \App\Models\PosTransaction::factory(15)->create()->each(function ($transaction) {
            \App\Models\PosTransactionItem::factory(random_int(1, 4))->create([
                'pos_transaction_id' => $transaction->id,
            ]);
        });
    }
}
