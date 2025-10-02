<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PharmacySale;
use App\Models\PharmacySaleItem;
use App\Models\Patient;
use App\Models\Staff;
use App\Models\User;

class PharmacySalesSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();
        $patients = Patient::all();
        $doctors = Staff::where('role', 'doctor')->get();
        $pharmacists = Staff::where('role', 'pharmacist')->get();

        foreach (range(1, 20) as $i) {
            $sale_type = ['prescription', 'otc'][rand(0, 1)];

            $sale = PharmacySale::create([
                'sale_type' => $sale_type,
                'patient_id' => $sale_type === 'prescription' ? $patients->random()->id : null,
                'doctor_id' => $sale_type === 'prescription' ? $doctors->random()->id : null,
                'pharmacist_id' => $pharmacists->random()->id,
                'user_id' => $users->random()->id,
                'total_amount' => 0,
                'payment_method' => ['cash', 'card', 'insurance'][rand(0, 2)],
                'description' => 'Fake pharmacy sale #' . $i,
            ]);

            $total = 0;
            $itemsCount = rand(0, 3); // OTC can have 0-3 items
            for ($j = 1; $j <= $itemsCount; $j++) {
                $quantity = rand(1, 5);
                $unit_price = rand(100, 500);
                PharmacySaleItem::create([
                    'sale_id' => $sale->id,
                    'drug_name' => 'Drug ' . $j,
                    'quantity' => $quantity,
                    'unit_price' => $unit_price,
                    'subtotal' => $quantity * $unit_price,
                ]);
                $total += $quantity * $unit_price;
            }

            $sale->total_amount = $total > 0 ? $total : rand(200, 1000);
            $sale->save();
        }
    }
}
