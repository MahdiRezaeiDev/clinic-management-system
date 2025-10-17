<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\Income;
use App\Models\PharmacySale;
use App\Models\PurchasedMedicine;
use App\Models\Staff;
use App\Models\User;
use App\Models\Visit;
use Illuminate\Support\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $usersCount = User::count();

        // calculate todays income through sells and visits
        $todayVisitCount = Visit::whereDate('created_at', Carbon::today())->count();

        $visitsTotalIncome = Visit::whereDate('created_at', Carbon::today())->sum('fee');
        $incomesTotal = Income::whereDate('created_at', Carbon::today())->sum('amount');
        $todaySell = PharmacySale::whereDate('created_at', Carbon::today())->sum('total_amount');
        $totalIncome = $visitsTotalIncome + $incomesTotal + $todaySell;

        // calculate the total expenses for today
        $todayExpenses = Expense::whereDate('created_at', Carbon::today())->sum('amount');
        $totalPurchase = PurchasedMedicine::whereDate('created_at', Carbon::today())->sum('paid_amount');
        $totalExpense = $todayExpenses + $totalPurchase;

        // Fetch doctors
        $disRoles = ['lab', 'dentist', 'emergency']; // roles you want to fetch
        $staff = Staff::whereIn('role', $disRoles)->get();
        return inertia('Dashboard', [
            'doctors' => $staff,
            'userCount' => $usersCount,
            'todayVisitCount' => $todayVisitCount,
            'totalIncomeToday' => $totalIncome,
            'totalExpenseToday' => $totalExpense
        ]);
    }
}
