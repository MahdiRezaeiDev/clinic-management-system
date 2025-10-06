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
            // Patient info
            'patient_name' => 'required|string|max:255',
            'patient_phone' => 'nullable|string|max:20',
            'patient_address' => 'nullable|string|max:255',
            'patient_gender' => 'nullable|in:male,female,other',
            'patient_birthdate' => 'nullable|integer|min:0|max:120',

            // Visit info
            'doctor_id' => 'required|exists:staff,id',
            'visit_date' => 'required|date_format:Y-m-d',
            'fee' => 'required|numeric|min:0',
            'description' => 'nullable|string|max:1000',
        ], [
            // Patient info messages
            'patient_name.required' => 'نام بیمار الزامی است.',
            'patient_name.string' => 'نام بیمار باید رشته باشد.',
            'patient_name.max' => 'نام بیمار نمی‌تواند بیش از ۲۵۵ کاراکتر باشد.',

            'patient_phone.string' => 'شماره تماس باید رشته باشد.',
            'patient_phone.max' => 'شماره تماس نمی‌تواند بیش از ۲۰ کاراکتر باشد.',

            'patient_address.string' => 'آدرس باید رشته باشد.',
            'patient_address.max' => 'آدرس نمی‌تواند بیش از ۲۵۵ کاراکتر باشد.',

            'patient_gender.in' => 'جنسیت معتبر نیست.',

            'patient_birthdate.integer' => 'سن باید عدد باشد.',
            'patient_birthdate.min' => 'سن نمی‌تواند کمتر از ۰ باشد.',
            'patient_birthdate.max' => 'سن نمی‌تواند بیش از ۱۲۰ باشد.',

            // Visit info messages
            'doctor_id.required' => 'انتخاب پزشک الزامی است.',
            'doctor_id.exists' => 'پزشک انتخاب شده معتبر نیست.',

            'visit_date.required' => 'تاریخ ویزیت الزامی است.',
            'visit_date.date_format' => 'فرمت تاریخ ویزیت معتبر نیست.',

            'fee.required' => 'هزینه الزامی است.',
            'fee.numeric' => 'هزینه باید عدد باشد.',
            'fee.min' => 'هزینه نمی‌تواند منفی باشد.',

            'description.string' => 'توضیحات باید رشته باشد.',
            'description.max' => 'توضیحات نمی‌تواند بیش از ۱۰۰۰ کاراکتر باشد.',
        ]);
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
