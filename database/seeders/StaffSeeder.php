<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Staff;

class StaffSeeder extends Seeder
{
    public function run(): void
    {
        $roles = ['doctor', 'nurse', 'pharmacist', 'admin', 'lab', 'dentist', 'emergency', 'gynecology', 'inpatient', 'service'];

        foreach ($roles as $role) {
            Staff::factory()->count(3)->create([
                'role' => $role,
            ]);
        }
    }
}
