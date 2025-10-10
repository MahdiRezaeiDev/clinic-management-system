<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use App\Models\Staff;
use Illuminate\Http\Request;
use App\Models\Visit;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DoctorVisitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Start query builder
        $query = Visit::query()->with(['patient', 'doctor']);

        // Filter by doctor
        if ($request->filled('doctor')) {
            $query->where('doctor_id', $request->input('doctor'));
        }

        // Fetch doctors
        $doctors = Staff::where('role', 'doctor')->get();

        // Get visits (you can add orderBy or paginate if needed)
        $visits = $query->latest()->paginate(25)->withQueryString();

        // Return Inertia view
        return Inertia::render('Visits/Index', [
            'doctors' => $doctors,
            'visits' => $visits,
            'filters' => $request->only(['doctor']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Fetch doctors
        $doctors = Staff::where('role', 'doctor')->get();
        return Inertia::render('Visits/Create', [
            'doctors' => $doctors,
        ]);
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
            'patient_age' => 'nullable|integer|min:0|max:120',

            // Visit info
            'doctor_id' => 'required|exists:staff,id',
            'visit_date_gregorian' => 'required|date_format:Y-m-d',
            'fee' => 'required|numeric|min:0',
            'description' => 'nullable|string|max:1000',
        ]);

        // ✅ Create the patient first
        $patient = Patient::create([
            'full_name' => $request->patient_name,
            'phone' => $request->patient_phone,
            'address' => $request->patient_address,
            'gender' => $request->patient_gender,
            'age' => $request->patient_age,
        ]);

        // ✅ Then create the visit linked to that patient
        Visit::create([
            'patient_id' => $patient->id, // 👈 REQUIRED
            'doctor_id' => $request->doctor_id,
            'user_id' => Auth::id(),
            'visit_date' => $request->visit_date_gregorian,
            'fee' => $request->fee,
            'description' => $request->description,
        ]);

        return redirect()
            ->route('visits.index')
            ->with('success', 'ویزیت جدید با موفقیت ثبت شد.');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            // Patient info
            'patient_name' => 'required|string|max:255',
            'patient_phone' => 'nullable|string|max:20',
            'patient_address' => 'nullable|string|max:255',
            'patient_gender' => 'nullable|in:male,female,other',
            'patient_age' => 'nullable|integer|min:0|max:120',

            // Visit info
            'doctor_id' => 'required|exists:staff,id',
            'visit_date_gregorian' => 'required|date_format:Y-m-d',
            'fee' => 'required|numeric|min:0',
            'description' => 'nullable|string|max:1000',
        ], [
            // Patient messages
            'patient_name.required' => 'نام بیمار الزامی است.',
            'patient_name.string' => 'نام بیمار باید رشته باشد.',
            'patient_name.max' => 'نام بیمار نمی‌تواند بیش از ۲۵۵ کاراکتر باشد.',

            'patient_phone.string' => 'شماره تماس باید رشته باشد.',
            'patient_phone.max' => 'شماره تماس نمی‌تواند بیش از ۲۰ کاراکتر باشد.',

            'patient_address.string' => 'آدرس باید رشته باشد.',
            'patient_address.max' => 'آدرس نمی‌تواند بیش از ۲۵۵ کاراکتر باشد.',

            'patient_gender.in' => 'جنسیت معتبر نیست.',

            'patient_age.integer' => 'سن باید عدد باشد.',
            'patient_age.min' => 'سن نمی‌تواند کمتر از ۰ باشد.',
            'patient_age.max' => 'سن نمی‌تواند بیش از ۱۲۰ سال باشد.',

            // Visit messages
            'doctor_id.required' => 'انتخاب پزشک الزامی است.',
            'doctor_id.exists' => 'پزشک انتخاب‌شده معتبر نیست.',

            'visit_date_gregorian.required' => 'تاریخ ویزیت الزامی است.',
            'visit_date_gregorian.date_format' => 'فرمت تاریخ ویزیت معتبر نیست. (YYYY-MM-DD)',

            'fee.required' => 'مبلغ ویزیت الزامی است.',
            'fee.numeric' => 'مبلغ ویزیت باید عدد باشد.',
            'fee.min' => 'مبلغ ویزیت نمی‌تواند منفی باشد.',

            'description.string' => 'توضیحات باید رشته باشد.',
            'description.max' => 'توضیحات نمی‌تواند بیش از ۱۰۰۰ کاراکتر باشد.',
        ]);

        // Find the visit and related patient
        $visit = Visit::with('patient')->findOrFail($id);
        $patient = $visit->patient;

        // Update patient info
        $patient->update([
            'full_name' => $request->patient_name,
            'phone' => $request->patient_phone,
            'address' => $request->patient_address,
            'gender' => $request->patient_gender,
            'age' => $request->patient_age,
        ]);

        // Update visit info
        $visit->update([
            'doctor_id' => $request->doctor_id,
            'visit_date' => $request->visit_date_gregorian,
            'fee' => $request->fee,
            'description' => $request->description,
        ]);

        return redirect()
            ->route('visits.index')
            ->with('success', 'ویزیت با موفقیت بروزرسانی شد.');
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
        $doctors = Staff::where('role', 'doctor')->get();
        $visit = Visit::with('patient')->where('id', $id)->first();
        return Inertia::render('Visits/Edit', [
            'doctors' => $doctors,
            'visit' => $visit
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Visit $visit)
    {
        $visit->delete();

        return redirect()
            ->back()->with('success', 'ویزیت مدنظر شما موفقانه حذف گردید.');
    }
}
