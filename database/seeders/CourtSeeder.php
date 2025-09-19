<?php

namespace Database\Seeders;

use App\Models\Court;
use Illuminate\Database\Seeder;

class CourtSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $courts = [
            // Padel Courts
            [
                'name' => 'Padel Court 1',
                'type' => 'padel',
                'description' => 'Premium padel court dengan kaca berkualitas tinggi dan pencahayaan LED.',
                'price_per_hour' => 150.00,
                'is_active' => true,
            ],
            [
                'name' => 'Padel Court 2',
                'type' => 'padel',
                'description' => 'Lapangan padel standar internasional dengan fasilitas AC.',
                'price_per_hour' => 150.00,
                'is_active' => true,
            ],
            [
                'name' => 'Padel Court 3',
                'type' => 'padel',
                'description' => 'Lapangan padel outdoor dengan pemandangan taman.',
                'price_per_hour' => 120.00,
                'is_active' => true,
            ],
            // Badminton Courts
            [
                'name' => 'Badminton Court A',
                'type' => 'badminton',
                'description' => 'Lapangan badminton indoor dengan matras kualitas tournament.',
                'price_per_hour' => 80.00,
                'is_active' => true,
            ],
            [
                'name' => 'Badminton Court B',
                'type' => 'badminton',
                'description' => 'Lapangan badminton dengan sistem ventilasi terbaik.',
                'price_per_hour' => 80.00,
                'is_active' => true,
            ],
            [
                'name' => 'Badminton Court C',
                'type' => 'badminton',
                'description' => 'Lapangan badminton VIP dengan fasilitas shower pribadi.',
                'price_per_hour' => 100.00,
                'is_active' => true,
            ],
        ];

        foreach ($courts as $court) {
            Court::create($court);
        }
    }
}