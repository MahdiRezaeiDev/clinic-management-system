<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Supplier;

class SuppliersSeeder extends Seeder
{
    public function run(): void
    {
        Supplier::factory(5)->create();
    }
}
