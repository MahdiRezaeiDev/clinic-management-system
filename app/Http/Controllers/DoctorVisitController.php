<?php

namespace App\Http\Controllers;

use App\Models\Vistie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DoctorVisitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
            'doctor_id' => 'required|exists:staff,id',
            'date' => 'required|date',
            'fee' => 'required|numeric|min:0',
            'description' => 'nullable|string',
        ], [
            'doctor_id.required' => 'لطفاً یک داکتر را انتخاب کنید.',
            'doctor_id.exists' => 'داکتر انتخاب شده معتبر نیست.',
            'date.required' => 'لطفاً تاریخ ویزیت را وارد کنید.',
            'date.date' => 'فرمت تاریخ وارد شده معتبر نیست.',
            'fee.required' => 'لطفاً هزینه ویزیت را وارد کنید.',
            'fee.numeric' => 'هزینه ویزیت باید یک عدد باشد.',
            'fee.min' => 'هزینه ویزیت نمی‌تواند منفی باشد.',
            'description.string' => 'توضیحات باید به صورت متن باشد.',
        ]);

        // Store the visit in the database (implementation depends on your models)
        // For example:
        $visit = new Visite();
        $visit->doctor_id = $request->doctor_id;
        $visit->visit_date = $request->date;
        $visit->fee = $request->fee;
        $visit->description = $request->description;
        $visit->user_id = Auth::id();
        $visit->save();
        return redirect()->back()->with('success', 'ویزیت با موفقیت ثبت شد.');
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
