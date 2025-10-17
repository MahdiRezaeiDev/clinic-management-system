<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Visit;
use App\Models\Income;
use App\Models\Expense;
use App\Models\PurchasedMedicine;
use App\Models\PharmacySale;
use App\Models\Staff;
use Morilog\Jalali\Jalalian;
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

        // 📅 ماه‌های جلالی از ۱ تا ۱۲
        $monthlyStats = collect(range(1, 12))->map(function ($jalaliMonth) {
            // امسال را به صورت جلالی بگیر
            $jalaliYear = Jalalian::now()->getYear();

            // شروع و پایان ماه به صورت جلالی
            $startOfMonthJalali = Jalalian::fromFormat('Y/n/d', "$jalaliYear/$jalaliMonth/1")->toCarbon();
            $endOfMonthJalali = Jalalian::fromFormat('Y/n/d', "$jalaliYear/$jalaliMonth/1")
                ->addMonths(1)
                ->subDays(1)
                ->toCarbon();

            // محاسبه درآمد و مصارف برای بازه زمانی هر ماه
            $income = Visit::whereBetween('created_at', [$startOfMonthJalali, $endOfMonthJalali])->sum('fee')
                + Income::whereBetween('created_at', [$startOfMonthJalali, $endOfMonthJalali])->sum('amount')
                + PharmacySale::whereBetween('created_at', [$startOfMonthJalali, $endOfMonthJalali])->sum('total_amount');

            $expense = Expense::whereBetween('created_at', [$startOfMonthJalali, $endOfMonthJalali])->sum('amount')
                + PurchasedMedicine::whereBetween('created_at', [$startOfMonthJalali, $endOfMonthJalali])->sum('paid_amount');

            // نمایش نام ماه به فارسی
            $monthName = Jalalian::fromFormat('Y/n/d', "$jalaliYear/$jalaliMonth/1")->format('%B');

            return [
                'month' => $monthName,
                'income' => $income,
                'expense' => $expense,
            ];
        });

        // 📊 آمار ماهانه ویزیت‌ها
        $visitMonthlyStats = collect(range(1, 12))->map(function ($jalaliMonth) {
            $jalaliYear = Jalalian::now()->getYear();

            $startOfMonthJalali = Jalalian::fromFormat('Y/n/d', "$jalaliYear/$jalaliMonth/1")->toCarbon();
            $endOfMonthJalali = Jalalian::fromFormat('Y/n/d', "$jalaliYear/$jalaliMonth/1")
                ->addMonths(1)
                ->subDays(1)
                ->toCarbon();

            $visitCount = Visit::whereBetween('created_at', [$startOfMonthJalali, $endOfMonthJalali])->count();

            return [
                'month' => Jalalian::fromFormat('Y/n/d', "$jalaliYear/$jalaliMonth/1")->format('%B'),
                'visits' => $visitCount,
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
            'visitMonthlyStats' => $visitMonthlyStats,
        ]);
    }
}
