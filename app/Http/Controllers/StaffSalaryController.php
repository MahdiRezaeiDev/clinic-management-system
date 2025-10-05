<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use App\Models\Salary;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StaffSalaryController extends Controller
{
    public function index(Staff $staff)
    {
        $salaries = $staff->salaries()->orderBy('salary_month', 'desc')->get();

        return Inertia::render('Staff/Salary/Index', [
            'staff' => $staff,
            'salaries' => $salaries,
        ]);
    }

    public function create(Staff $staff)
    {
        return Inertia::render('Staff/Salary/Create', [
            'staff' => $staff,
        ]);
    }

    public function store(Request $request, Staff $staff)
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

        $staff->salaries()->create($request->all());

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
