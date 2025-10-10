<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Staff;
use App\Models\Overtime;
use Illuminate\Support\Facades\Auth;

class StaffOvertimeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Staff $staff)
    {
        // Get all overtimes for this staff (whether assigned or not)
        $overtimes = Overtime::with('salary')
            ->where('staff_id', $staff->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Staff/OverTime/Index', [
            'staff' => $staff,
            'overtimes' => $overtimes,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create(Staff $staff)
    {
        return Inertia::render('Staff/OverTime/Create', [
            'staff' => $staff
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Staff $staff)
    {
        $request->validate([
            'date_gregorian' => 'required|date',
            'hours' => 'required|numeric|min:0',
            'rate' => 'required|numeric|min:0',
            'total' => 'required|numeric|min:0',
            'description' => 'nullable|string|max:255',
        ], [
            'date_gregorian.required' => 'وارد کردن تاریخ الزامی است.',
            'date_gregorian.date' => 'تاریخ وارد شده معتبر نیست.',

            'hours.required' => 'لطفاً تعداد ساعت‌ها را وارد کنید.',
            'hours.numeric' => 'تعداد ساعت باید عددی باشد.',
            'hours.min' => 'تعداد ساعت نمی‌تواند منفی باشد.',

            'rate.required' => 'لطفاً نرخ اضافه‌کاری را وارد کنید.',
            'rate.numeric' => 'نرخ اضافه‌کاری باید عددی باشد.',
            'rate.min' => 'نرخ اضافه‌کاری نمی‌تواند منفی باشد.',

            'total.required' => 'مبلغ کل الزامی است.',
            'total.numeric' => 'مبلغ کل باید عددی باشد.',
            'total.min' => 'مبلغ کل نمی‌تواند منفی باشد.',

            'description.string' => 'توضیحات باید به صورت متن باشد.',
            'description.max' => 'توضیحات نمی‌تواند بیش از ۲۵۵ کاراکتر باشد.',
        ]);

        $staff->overtimes()->create([
            'date' => $request->date_gregorian,
            'hours' => $request->hours,
            'rate' => $request->rate,
            'total' => $request->total,
            'description' => $request->description,
            'status' => 0,
            'approved_by' => Auth::id(),
        ]);

        return redirect()
            ->route('staffs.overtime.index', $staff->id)
            ->with('success', 'اضافه‌کاری با موفقیت ثبت شد.');
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Staff $staff, Overtime $overtime)
    {
        return Inertia::render('Staff/OverTime/Edit', [
            'staff' => $staff,
            'overtime' => $overtime,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Staff $staff, Overtime $overtime)
    {
        // اعتبارسنجی داده‌ها
        $validated = $request->validate([
            'date_gregorian' => 'required|date',
            'hours' => 'required|numeric|min:0',
            'rate' => 'required|numeric|min:0',
            'total' => 'required|numeric|min:0',
            'description' => 'nullable|string|max:255',
        ], [
            'date_gregorian.required' => 'تاریخ الزامی است.',
            'date_gregorian.date' => 'فرمت تاریخ معتبر نیست.',
            'hours.required' => 'تعداد ساعت الزامی است.',
            'hours.numeric' => 'تعداد ساعت باید عددی باشد.',
            'rate.required' => 'نرخ الزامی است.',
            'rate.numeric' => 'نرخ باید عددی باشد.',
            'total.required' => 'مجموع الزامی است.',
            'total.numeric' => 'مجموع باید عددی باشد.',
            'description.max' => 'توضیحات نباید بیش از ۲۵۵ حرف باشد.',
        ]);

        $validated['date'] = $validated['date_gregorian'];

        // بروزرسانی رکورد
        $overtime->update($validated);

        // بازگشت به صفحه‌ی لیست اضافه‌کاری‌ها با پیام موفقیت
        return redirect()
            ->route('staffs.overtime.index', $staff->id)
            ->with('success', 'اطلاعات اضافه‌کاری با موفقیت بروزرسانی شد.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Staff $staff, Overtime $overtime)
    {
        $overtime->delete();

        return redirect()->back()->with('success', 'اضافه کاری مدنظر موفقانه حذف گردید.');
    }
}
