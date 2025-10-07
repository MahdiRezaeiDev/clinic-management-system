<?php

namespace App\Http\Controllers;

use App\Models\PharmacySale;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PharmacyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Pharmacy/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'sale_type' => 'required|in:prescription,without_prescription',
            'total_amount' => 'required|numeric|min:0',
            'sale_date_gregorian' => 'required|date',
            'description' => 'nullable|string|max:1000',
        ], [
            'sale_type.required' => 'نوع فروش الزامی است.',
            'sale_type.in' => 'نوع فروش انتخاب‌شده معتبر نیست.',

            'total_amount.required' => 'مبلغ کل الزامی است.',
            'total_amount.numeric' => 'مبلغ کل باید عددی باشد.',
            'total_amount.min' => 'مبلغ کل نمی‌تواند کمتر از صفر باشد.',

            'sale_date_gregorian.required' => 'تاریخ فروش الزامی است.',
            'sale_date_gregorian.date' => 'فرمت تاریخ فروش معتبر نیست.',

            'description.string' => 'توضیحات باید متنی باشد.',
            'description.max' => 'توضیحات نمی‌تواند بیش از ۱۰۰۰ کاراکتر باشد.',
        ]);

        $pharmacy = new PharmacySale();
        $pharmacy->sale_type = $request->sale_type;
        $pharmacy->total_amount = $request->total_amount;
        $pharmacy->sale_date = $request->sale_date_gregorian;
        $pharmacy->user_id  = Auth::id();
        $pharmacy->description = $request->description;

        $pharmacy->save();

        return redirect()
            ->back()
            ->with('success', ' فروش بیمار با موفقیت ثبت شد.');
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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
