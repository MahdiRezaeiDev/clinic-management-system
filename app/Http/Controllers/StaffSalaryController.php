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
        $salaries = Staff::with(['salaries' => function ($q) {
            $q->orderBy('salary_month', 'desc');
        }, 'overtimes'])
            ->find($staff->id);

        return Inertia::render('Staff/Salary/Index', [
            'staff' => $staff,
            'salaries' => $salaries,
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
        $staff->salaries()->create([
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
                ->update(['status' => 1]);
        }

        return redirect()->route('staffs.salary.index', $staff->id)
            ->with('success', 'حقوق با موفقیت ثبت شد.');
    }


    public function edit(Staff $staff, Salary $salary)
    {
        return Inertia::render('Staff/Salary/Edit', [
            'staff' => $staff,
            'salary' => $salary,
        ]);
    }

    public function update(Request $request, Staff $staff, Salary $salary)
    {
        $request->validate([
            'salary_month' => 'required|date',
            'amount_paid' => 'required|numeric|min:0',
            'description' => 'nullable|string|max:255',
        ], [
            'salary_month.required' => 'وارد کردن تاریخ الزامی است.',
            'amount_paid.required' => 'وارد کردن مبلغ الزامی است.',
            'amount_paid.numeric' => 'مبلغ باید عدد باشد.',
        ]);

        $salary->update($request->all());

        return redirect()->route('staffs.salary.index', $staff->id)
            ->with('success', 'حقوق با موفقیت بروزرسانی شد.');
    }

    public function destroy(Staff $staff, Salary $salary)
    {
        $salary->delete();

        return redirect()->route('staffs.salary.index', $staff->id)
            ->with('success', 'حقوق با موفقیت حذف شد.');
    }
}
