<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Visit;
use App\Models\Income;
use App\Models\Expense;
use App\Models\PurchasedMedicine;
use App\Models\PharmacySale;
use App\Models\Staff;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $usersCount = User::count();

        // آمار امروز
        $todayVisitCount = Visit::whereDate('created_at', Carbon::today())->count();
        $visitsTotalIncome = Visit::whereDate('created_at', Carbon::today())->sum('fee');
        $incomesTotal = Income::whereDate('created_at', Carbon::today())->sum('amount');
        $todaySell = PharmacySale::whereDate('created_at', Carbon::today())->sum('total_amount');
        $totalIncome = $visitsTotalIncome + $incomesTotal + $todaySell;

        $todayExpenses = Expense::whereDate('created_at', Carbon::today())->sum('amount');
        $totalPurchase = PurchasedMedicine::whereDate('created_at', Carbon::today())->sum('paid_amount');
        $totalExpense = $todayExpenses + $totalPurchase;

        // 📊 آمار ماهانه (برای 12 ماه گذشته)
        $monthlyStats = collect(range(1, 12))->map(function ($month) {
            $startOfMonth = Carbon::now()->month($month)->startOfMonth();
            $endOfMonth = Carbon::now()->month($month)->endOfMonth();

            $income = Visit::whereBetween('created_at', [$startOfMonth, $endOfMonth])->sum('fee')
                + Income::whereBetween('created_at', [$startOfMonth, $endOfMonth])->sum('amount')
                + PharmacySale::whereBetween('created_at', [$startOfMonth, $endOfMonth])->sum('total_amount');

            $expense = Expense::whereBetween('created_at', [$startOfMonth, $endOfMonth])->sum('amount')
                + PurchasedMedicine::whereBetween('created_at', [$startOfMonth, $endOfMonth])->sum('paid_amount');

            return [
                'month' => $startOfMonth->translatedFormat('F'), // مثل: "حمل", "ثور" با locale فارسی
                'income' => $income,
                'expense' => $expense,
            ];
        });

        $staff = Staff::whereIn('role', ['lab', 'dentist', 'emergency'])->get();

        return inertia('Dashboard', [
            'doctors' => $staff,
            'userCount' => $usersCount,
            'todayVisitCount' => $todayVisitCount,
            'totalIncomeToday' => $totalIncome,
            'totalExpenseToday' => $totalExpense,
            'monthlyStats' => $monthlyStats,
        ]);
    }
}
