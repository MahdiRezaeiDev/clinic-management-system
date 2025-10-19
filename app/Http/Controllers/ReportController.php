<?php

namespace App\Http\Controllers;

use App\Models\Visit;
use App\Models\Income;
use App\Models\Expense;
use App\Models\PurchasedMedicine;
use App\Models\PharmacySale;
use App\Models\Salary;
use Morilog\Jalali\Jalalian;

class ReportController extends Controller
{
    public function __invoke()
    {
        $jalaliYear = Jalalian::now()->format('Y');
        $jalaliMonthDays = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

        $firstDayOfYear = Jalalian::fromFormat('Y-m-d', "$jalaliYear-01-01");
        if ($firstDayOfYear->isLeapYear()) {
            $jalaliMonthDays[11] = 30;
        }

        // نام ماه‌های افغانی
        $afghanMonths = [
            'حمل',
            'ثور',
            'جوزا',
            'سرطان',
            'اسد',
            'سنبله',
            'میزان',
            'عقرب',
            'قوس',
            'جدی',
            'دلو',
            'حوت'
        ];

        $monthlyData = [];
        $totals = [
            'pharmacySales' => 0,
            'purchasedMedicine' => 0,
            'staffSalaries' => 0,
            'visits' => 0,
            'income' => 0,
            'visitsIncome' => 0,
            'expenses' => 0,
        ];

        for ($m = 1; $m <= 12; $m++) {
            $startJalali = Jalalian::fromFormat('Y-m-d', sprintf('%s-%02d-01', $jalaliYear, $m));
            $endJalali = Jalalian::fromFormat('Y-m-d', sprintf('%s-%02d-%02d', $jalaliYear, $m, $jalaliMonthDays[$m - 1]));

            $startGregorian = $startJalali->toCarbon();
            $endGregorian = $endJalali->toCarbon()->endOfDay();

            $pharmacySales = PharmacySale::whereBetween('sale_date', [$startGregorian, $endGregorian])->sum('total_amount');
            $purchasedMedicine = PurchasedMedicine::whereBetween('purchase_date', [$startGregorian, $endGregorian])->sum('paid_amount');
            $staffSalaries = Salary::whereBetween('payment_date', [$startGregorian, $endGregorian])->sum('total_paid');
            $visits = Visit::whereBetween('visit_date', [$startGregorian, $endGregorian])->count();
            $visitIncome = Visit::whereBetween('visit_date', [$startGregorian, $endGregorian])->sum('fee');
            $income = $pharmacySales + $visitIncome + Income::whereBetween('income_date', [$startGregorian, $endGregorian])->sum('amount');
            $expenses = $purchasedMedicine + $staffSalaries + Expense::whereBetween('expense_date', [$startGregorian, $endGregorian])->sum('amount');

            $monthlyData[] = [
                'month' => $afghanMonths[$m - 1],
                'pharmacySales' => $pharmacySales,
                'purchasedMedicine' => $purchasedMedicine,
                'staffSalaries' => $staffSalaries,
                'visits' => $visits,
                'visitsIncome' => $visitIncome,  // ✅ add this
                'income' => $income,
                'expenses' => $expenses,
                'profit' => $income - $expenses,
            ];


            $totals['pharmacySales'] += $pharmacySales;
            $totals['purchasedMedicine'] += $purchasedMedicine;
            $totals['staffSalaries'] += $staffSalaries;
            $totals['visits'] += $visits;
            $totals['visitsIncome'] += $visitIncome;
            $totals['income'] += $income;
            $totals['expenses'] += $expenses;
        }

        $totals['profit'] = $totals['income'] - $totals['expenses'];

        return inertia('Reports/Index', [
            'monthlyData' => $monthlyData,
            'totals' => $totals,
        ]);
    }
}
