<?php

namespace App\Http\Controllers;

use App\Models\Overtime;
use App\Models\Staff;
use App\Models\Salary;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StaffSalaryController extends Controller
{
    public function index(Staff $staff)
    {
        $staffWithSalaries = $staff->load(['salaries' => function ($q) {
            $q->orderBy('salary_month', 'asc')
                ->with('overtimes'); // load overtimes for each salary
        }]);

        return Inertia::render('Staff/Salary/Index', [
            'staff' => $staffWithSalaries,
            'salaries' => $staffWithSalaries->salaries,
        ]);
    }


    public function create(Staff $staff)
    {
        $unpaidOvertimes = Overtime::where('staff_id', $staff->id)
            ->where('status', 0)
            ->get();

        return Inertia::render('Staff/Salary/Create', [
            'staff' => $staff,
            'unpaidOvertimes' => $unpaidOvertimes,
        ]);
    }

    public function store(Request $request, Staff $staff)
    {
        $request->validate([
            'salary_month' => 'required|numeric|min:1|max:12',
            'base_salary' => 'required|numeric|min:0',
            'overtime_amount' => 'nullable|numeric|min:0',
            'deductions' => 'nullable|numeric|min:0',
            'total_paid' => 'required|numeric|min:0',
            'payment_date' => 'required|date',
            'payment_date_gregorian' => 'required|date',
            'description' => 'nullable|string|max:255',
            'selectedOvertimes' => 'nullable|array',
            'selectedOvertimes.*' => 'numeric|exists:overtimes,id',
        ], [
            'salary_month.required' => 'وارد کردن ماه حقوق الزامی است.',
            'salary_month.numeric' => 'ماه حقوق باید عدد باشد.',
            'total_paid.required' => 'وارد کردن مبلغ الزامی است.',
            'total_paid.numeric' => 'مبلغ باید عدد باشد.',
            'payment_date.required' => 'تاریخ پرداخت الزامی است.',
            'payment_date.date' => 'تاریخ پرداخت معتبر نیست.',
        ]);

        // Create salary record
        $salary = $staff->salaries()->create([
            'base_salary' => $request->base_salary,
            'overtime_amount' => $request->overtime_amount,
            'deductions' => $request->deductions,
            'total_paid' => $request->total_paid,
            'salary_month' => $request->salary_month,
            'payment_date' => $request->payment_date,
            'payment_date_gregorian' => $request->payment_date_gregorian,
            'description' => $request->description,
        ]);

        // Mark selected overtimes as paid
        if (!empty($request->selectedOvertimes)) {
            Overtime::whereIn('id', $request->selectedOvertimes)
                ->update([
                    'status' => 1,
                    'salary_id' => $salary->id
                ]);
        }

        return redirect()->route('staffs.salary.index', $staff->id)
            ->with('success', 'حقوق با موفقیت ثبت شد.');
    }


    public function edit(Staff $staff, Salary $salary)
    {
        $overtimes = Overtime::where('staff_id', $staff->id)
            ->where(function ($query) use ($salary) {
                $query->whereNull('salary_id') // unpaid ones
                    ->orWhere('salary_id', $salary->id); // already linked to this salary
            })
            ->get();

        return Inertia::render('Staff/Salary/Edit', [
            'staff' => $staff,
            'salary' => $salary,
            'overTimes' => $overtimes
        ]);
    }

    public function update(Request $request, Staff $staff, Salary $salary)
    {
        $request->validate([
            'salary_month' => 'required|numeric|min:1|max:12',
            'base_salary' => 'required|numeric|min:0',
            'deductions' => 'nullable|numeric|min:0',
            'total_paid' => 'required|numeric|min:0',
            'payment_date' => 'required|string',
            'payment_date_gregorian' => 'required|string',
            'description' => 'nullable|string|max:255',
            'selectedOvertimes' => 'array',
        ]);

        // 1️⃣ بروزرسانی اطلاعات حقوق
        $salary->update([
            'base_salary' => $request->base_salary,
            'overtime_amount' => $request->overtime_amount ?? 0,
            'deductions' => $request->deductions ?? 0,
            'total_paid' => $request->total_paid,
            'salary_month' => $request->salary_month,
            'payment_date' => $request->payment_date,
            'payment_date_gregorian' => $request->payment_date_gregorian,
            'description' => $request->description,
        ]);

        // 2️⃣ جدا کردن اضافه‌کاری‌هایی که دیگر انتخاب نشده‌اند
        Overtime::where('salary_id', $salary->id)
            ->whereNotIn('id', $request->selectedOvertimes ?? [])
            ->update(['salary_id' => null, 'status' => 0]);

        // 3️⃣ لینک کردن اضافه‌کاری‌های جدید به این حقوق
        if ($request->selectedOvertimes && count($request->selectedOvertimes) > 0) {
            Overtime::whereIn('id', $request->selectedOvertimes)
                ->update(['salary_id' => $salary->id, 'status' => 1]);
        }

        return redirect()
            ->route('staffs.salary.index', $staff->id)
            ->with('success', 'حقوق با موفقیت ویرایش شد.');
    }
}
