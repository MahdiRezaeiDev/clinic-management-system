<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UsersSeeder::class,
            StaffSeeder::class,
            PatientsSeeder::class,
            SuppliersSeeder::class,
            IncomesSeeder::class,
            ExpensesSeeder::class,
            PharmacySalesSeeder::class,
            SalariesSeeder::class,
            // OvertimesSeeder::class
        ]);
    }
}
