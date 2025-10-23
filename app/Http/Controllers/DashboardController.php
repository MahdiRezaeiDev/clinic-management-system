<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Visit;
use App\Models\Income;
use App\Models\Expense;
use App\Models\PurchasedMedicine;
use App\Models\PharmacySale;
use App\Models\Salary;
use App\Models\Staff;
use Morilog\Jalali\Jalalian;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $usersCount = User::count();

        // ---------- آمار امروز ----------
        $todayVisitCount = Visit::whereDate('created_at', Carbon::today())->count();
        $visitsTotalIncome = Visit::whereDate('created_at', Carbon::today())->sum('fee');
        $incomesTotal = Income::whereDate('created_at', Carbon::today())->sum('amount');
        $todaySell = PharmacySale::whereDate('created_at', Carbon::today())->sum('total_amount');
        $totalIncome = $visitsTotalIncome + $incomesTotal + $todaySell;

        $todayExpenses = Expense::whereDate('created_at', Carbon::today())->sum('amount');
        $totalPurchase = PurchasedMedicine::whereDate('created_at', Carbon::today())->sum('paid_amount');
        $totalExpense = $todayExpenses + $totalPurchase;

        // ---------- طول ماه‌های سال جاری جلالی ----------
        $jalaliYear = Jalalian::now()->format('Y');
        $jalaliMonthDays = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

        // بررسی سال کبیسه جلالی
        $firstDayOfYear = Jalalian::fromFormat('Y-m-d', sprintf('%s-%02d-%02d', $jalaliYear, 1, 1));
        if ($firstDayOfYear->isLeapYear()) {
            $jalaliMonthDays[11] = 30; // ماه آخر = ۳۰ روز در سال کبیسه
        }

        $monthlyStats = [];
        $visitMonthlyStats = [];

        for ($m = 1; $m <= 12; $m++) {
            // تاریخ شروع و پایان ماه در جلالی با فرمت صحیح
            $startJalali = Jalalian::fromFormat('Y-m-d', sprintf('%s-%02d-01', $jalaliYear, $m));
            $endJalali = Jalalian::fromFormat('Y-m-d', sprintf('%s-%02d-%02d', $jalaliYear, $m, $jalaliMonthDays[$m - 1]));

            // تبدیل به میلادی
            $startGregorian = $startJalali->toCarbon();
            $endGregorian = $endJalali->toCarbon()->endOfDay();

            // محاسبه آمار مالی
            $income = Visit::whereBetween('visit_date', [$startGregorian, $endGregorian])->sum('fee')
                + Income::whereBetween('income_date', [$startGregorian, $endGregorian])->sum('amount')
                + PharmacySale::whereBetween('sale_date', [$startGregorian, $endGregorian])->sum('total_amount');

            $expense = Expense::whereBetween('expense_date', [$startGregorian, $endGregorian])->sum('amount')
                + PurchasedMedicine::whereBetween('purchase_date', [$startGregorian, $endGregorian])->sum('paid_amount')
                + Salary::whereBetween('payment_date', [$startGregorian, $endGregorian])->sum('total_paid');

            $monthlyStats[] = [
                'month' => $startGregorian->translatedFormat('F'), // اسم ماه به فارسی
                'income' => $income,
                'expense' => $expense,
            ];

            // آمار بازدیدها
            $visitCount = Visit::whereBetween('created_at', [$startGregorian, $endGregorian])->count();
            $visitMonthlyStats[] = [
                'visits' => $visitCount
            ];
        }

        $staff = Staff::whereIn('role', ['doctor', 'lab', 'dentist', 'emergency'])->get();

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
