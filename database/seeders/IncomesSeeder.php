<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Income;
use App\Models\Patient;
use App\Models\Staff;
use App\Models\User;

class IncomesSeeder extends Seeder
{
    public function run(): void
    {
        $categories = ['visit', 'lab', 'dental', 'emergency', 'gynecology', 'inpatient', 'pharmacy'];

        $users = User::all();
        $patients = Patient::all();
        $doctors = Staff::where('role', 'doctor')->get();

        foreach (range(1, 50) as $i) {
            Income::create([
                'category' => $categories[array_rand($categories)],
                'patient_id' => $patients->random()->id,
                'doctor_id' => $doctors->random()->id,
                'user_id' => $users->random()->id,
                'amount' => rand(1000, 5000),
                'payment_method' => ['cash', 'card', 'insurance'][rand(0, 2)],
                'description' => 'Fake income record #' . $i,
            ]);
        }
    }
}
