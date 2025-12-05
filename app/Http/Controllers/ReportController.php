<?php

namespace App\Http\Controllers;

use App\Models\Visit;
use App\Models\Income;
use App\Models\Expense;
use App\Models\PurchasedMedicine;
use App\Models\PharmacySale;
use App\Models\Salary;
use Morilog\Jalali\Jalalian;
use Illuminate\Support\Collection;

class ReportController extends Controller
{
    public function __invoke()
    {
        $jalaliYear = Jalalian::now()->format('Y');

        // Get year from request if provided
        if (request()->has('year')) {
            $jalaliYear = request('year');
        }

        $firstDayOfYear = Jalalian::fromFormat('Y-m-d', "$jalaliYear-01-01");
        $isLeapYear = $firstDayOfYear->isLeapYear();

        // Afghan months with correct days
        $afghanMonths = [
            ['name' => 'حمل', 'days' => 31, 'jalali_month' => 1],
            ['name' => 'ثور', 'days' => 31, 'jalali_month' => 2],
            ['name' => 'جوزا', 'days' => 31, 'jalali_month' => 3],
            ['name' => 'سرطان', 'days' => 31, 'jalali_month' => 4],
            ['name' => 'اسد', 'days' => 31, 'jalali_month' => 5],
            ['name' => 'سنبله', 'days' => 31, 'jalali_month' => 6],
            ['name' => 'میزان', 'days' => 30, 'jalali_month' => 7],
            ['name' => 'عقرب', 'days' => 30, 'jalali_month' => 8],
            ['name' => 'قوس', 'days' => 30, 'jalali_month' => 9],
            ['name' => 'جدی', 'days' => 30, 'jalali_month' => 10],
            ['name' => 'دلو', 'days' => 30, 'jalali_month' => 11],
            ['name' => 'حوت', 'days' => $isLeapYear ? 30 : 29, 'jalali_month' => 12],
        ];

        $monthlyData = [];
        $totals = [
            'pharmacySales' => 0,
            'purchasedMedicine' => 0,
            'staffSalaries' => 0,
            'visits' => 0,
            'visitsIncome' => 0,
            'otherIncome' => 0,
            'income' => 0,
            'expenses' => 0,
            'profit' => 0,
        ];

        // Get all data first (select only needed columns)
        $allPharmacySales = PharmacySale::select('sale_date', 'total_amount')->get();
        $allPurchasedMedicine = PurchasedMedicine::select('purchase_date', 'paid_amount')->get();
        $allSalaries = Salary::select('payment_date', 'total_paid')->get();
        $allVisits = Visit::select('visit_date', 'fee')->get();
        $allIncomes = Income::select('income_date', 'amount')->get();
        $allExpenses = Expense::select('expense_date', 'amount')->get();

        for ($m = 0; $m < 12; $m++) {
            $monthName = $afghanMonths[$m]['name'];
            $jalaliMonth = $afghanMonths[$m]['jalali_month'];

            // Filter pharmacy sales for this Jalali month/year
            $pharmacySales = $allPharmacySales->filter(function ($sale) use ($jalaliYear, $jalaliMonth) {
                try {
                    if (!$sale->sale_date) return false;
                    $jalaliDate = Jalalian::fromDateTime($sale->sale_date);
                    return $jalaliDate->getYear() == $jalaliYear &&
                        $jalaliDate->getMonth() == $jalaliMonth;
                } catch (\Exception $e) {
                    return false;
                }
            })->sum('total_amount');

            // Filter purchased medicine
            $purchasedMedicine = $allPurchasedMedicine->filter(function ($purchase) use ($jalaliYear, $jalaliMonth) {
                try {
                    if (!$purchase->purchase_date) return false;
                    $jalaliDate = Jalalian::fromDateTime($purchase->purchase_date);
                    return $jalaliDate->getYear() == $jalaliYear &&
                        $jalaliDate->getMonth() == $jalaliMonth;
                } catch (\Exception $e) {
                    return false;
                }
            })->sum('paid_amount');

            // Filter salaries
            $staffSalaries = $allSalaries->filter(function ($salary) use ($jalaliYear, $jalaliMonth) {
                try {
                    if (!$salary->payment_date) return false;
                    $jalaliDate = Jalalian::fromDateTime($salary->payment_date);
                    return $jalaliDate->getYear() == $jalaliYear &&
                        $jalaliDate->getMonth() == $jalaliMonth;
                } catch (\Exception $e) {
                    return false;
                }
            })->sum('total_paid');

            // Filter visits
            $visits = $allVisits->filter(function ($visit) use ($jalaliYear, $jalaliMonth) {
                try {
                    if (!$visit->visit_date) return false;
                    $jalaliDate = Jalalian::fromDateTime($visit->visit_date);
                    return $jalaliDate->getYear() == $jalaliYear &&
                        $jalaliDate->getMonth() == $jalaliMonth;
                } catch (\Exception $e) {
                    return false;
                }
            });

            $visitCount = $visits->count();
            $visitIncome = $visits->sum('fee');

            // Filter other incomes
            $otherIncome = $allIncomes->filter(function ($income) use ($jalaliYear, $jalaliMonth) {
                try {
                    if (!$income->income_date) return false;
                    $jalaliDate = Jalalian::fromDateTime($income->income_date);
                    return $jalaliDate->getYear() == $jalaliYear &&
                        $jalaliDate->getMonth() == $jalaliMonth;
                } catch (\Exception $e) {
                    return false;
                }
            })->sum('amount');

            // Filter other expenses
            $otherExpenses = $allExpenses->filter(function ($expense) use ($jalaliYear, $jalaliMonth) {
                try {
                    if (!$expense->expense_date) return false;
                    $jalaliDate = Jalalian::fromDateTime($expense->expense_date);
                    return $jalaliDate->getYear() == $jalaliYear &&
                        $jalaliDate->getMonth() == $jalaliMonth;
                } catch (\Exception $e) {
                    return false;
                }
            })->sum('amount');

            // Calculate totals
            $totalIncome = $pharmacySales + $visitIncome + $otherIncome;
            $totalExpenses = $purchasedMedicine + $staffSalaries + $otherExpenses;
            $profit = $totalIncome - $totalExpenses;

            $monthData = [
                'month' => $monthName,
                'jalaliMonth' => $jalaliMonth,
                'pharmacySales' => (float) $pharmacySales,
                'purchasedMedicine' => (float) $purchasedMedicine,
                'staffSalaries' => (float) $staffSalaries,
                'visits' => (int) $visitCount,
                'visitsIncome' => (float) $visitIncome,
                'otherIncome' => (float) $otherIncome,
                'income' => (float) $totalIncome,
                'expenses' => (float) $totalExpenses,
                'profit' => (float) $profit,
            ];

            $monthlyData[] = $monthData;

            // Update totals
            $totals['pharmacySales'] += $pharmacySales;
            $totals['purchasedMedicine'] += $purchasedMedicine;
            $totals['staffSalaries'] += $staffSalaries;
            $totals['visits'] += $visitCount;
            $totals['visitsIncome'] += $visitIncome;
            $totals['otherIncome'] += $otherIncome;
            $totals['income'] += $totalIncome;
            $totals['expenses'] += $totalExpenses;
            $totals['profit'] += $profit;
        }

        return inertia('Reports/Index', [
            'monthlyData' => $monthlyData,
            'totals' => $totals,
            'selectedYear' => $jalaliYear,
        ]);
    }
}
