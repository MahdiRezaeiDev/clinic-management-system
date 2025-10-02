<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StaffController extends Controller
{
    public function index()
    {
        $staff = Staff::all();
        return Inertia::render('Staff/Index', ['staffs' => $staff]);
    }

    public function create()
    {
        return Inertia::render('Staff/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'full_name' => 'required|string|max:255',
            'role' => 'required|string',
            'phone' => 'nullable|string',
            'base_salary' => 'nullable|numeric',
        ]);

        Staff::create($request->all());
        return redirect()->route('staffs.index')->with('success', 'پرسنل با موفقیت ایجاد شد.');
    }

    public function edit(Staff $staff)
    {
        return Inertia::render('Staff/Edit', ['staff' => $staff]);
    }

    public function update(Request $request, Staff $staff)
    {
        $request->validate([
            'full_name' => 'required|string|max:255',
            'role' => 'required|string',
            'phone' => 'nullable|string',
            'base_salary' => 'nullable|numeric',
        ]);

        $staff->update($request->all());

        return redirect()->route('staffs.index')->with('success', 'پرسنل با موفقیت به‌روزرسانی شد.');
    }

    public function destroy(Staff $staff)
    {
        $staff->delete();
        return redirect()->route('staffs.index')->with('success', 'پرسنل با موفقیت حذف شد.');
    }
}
