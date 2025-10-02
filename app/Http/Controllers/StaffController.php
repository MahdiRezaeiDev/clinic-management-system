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
            'full_name'   => 'required|string|max:255',
            'role'        => 'required|string',
            'phone'       => 'nullable|string',
            'base_salary' => 'nullable|numeric',
        ], [
            'full_name.required'   => 'لطفاً نام مکمل پرسنل را وارد کنید.',
            'full_name.string'     => 'نام باید به صورت متن باشد.',
            'full_name.max'        => 'نام نباید بیشتر از ۲۵۵ کاراکتر باشد.',

            'role.required'        => 'لطفاً نقش پرسنل را انتخاب کنید.',
            'role.string'          => 'نقش باید به صورت متن معتبر باشد.',

            'phone.string'         => 'شماره تماس باید به صورت متن باشد.',

            'base_salary.numeric'  => 'معاش باید به صورت عدد وارد شود.',
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
            'full_name'   => 'required|string|max:255',
            'role'        => 'required|string',
            'phone'       => 'nullable|string',
            'base_salary' => 'nullable|numeric',
        ], [
            'full_name.required'   => 'لطفاً نام مکمل پرسنل را وارد کنید.',
            'full_name.string'     => 'نام باید به صورت متن باشد.',
            'full_name.max'        => 'نام نباید بیشتر از ۲۵۵ کاراکتر باشد.',

            'role.required'        => 'لطفاً نقش پرسنل را انتخاب کنید.',
            'role.string'          => 'نقش باید به صورت متن معتبر باشد.',

            'phone.string'         => 'شماره تماس باید به صورت متن باشد.',

            'base_salary.numeric'  => 'معاش باید به صورت عدد وارد شود.',
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
