<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Expense;
use App\Models\Staff;
use App\Models\Supplier;
use App\Models\User;

class ExpensesSeeder extends Seeder
{
    public function run(): void
    {
        $categories = ['building', 'kitchen', 'pharmacy_purchase', 'salary', 'overtime', 'installment', 'other'];

        $users = User::all();
        $staff = Staff::all();
        $suppliers = Supplier::all();

        foreach (range(1, 30) as $i) {
            $category = $categories[array_rand($categories)];
            Expense::create([
                'category' => $category,
                'staff_id' => in_array($category, ['salary', 'overtime']) ? $staff->random()->id : null,
                'supplier_id' => in_array($category, ['pharmacy_purchase', 'installment']) ? $suppliers->random()->id : null,
                'user_id' => $users->random()->id,
                'amount' => rand(500, 5000),
                'expense_date' => now(),
                'description' => 'Fake expense record #' . $i,
            ]);
        }
    }
}
