<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use App\Models\PharmacySale;
use App\Models\PharmacySaleItem;
use App\Models\Staff;
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
        $sales = PharmacySale::with('items')->get();

        $salesGrouped = [
            'with' => $sales->filter(fn($s) => $s->sale_type === 'with_prescription')->values(),
            'without' => $sales->filter(fn($s) => $s->sale_type === 'without_prescription')->values(),
        ];

        return Inertia::render('Pharmacy/Index', [
            'sales' => $salesGrouped,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $staff = Staff::whereIn('role', ['doctor', 'lab', 'dentist', 'emergency'])->get();
        return Inertia::render('Pharmacy/Create', [
            'staff' => $staff
        ]);
    }

    public function store(Request $request)
    {
        // 🧩 1. اعتبارسنجی فیلدهای اصلی
        $request->validate([
            // اطلاعات بیمار
            'check' => 'nullable|string',
            'patient_name' => 'required_with:check|string|max:255',
            'patient_gender' => 'nullable|in:male,female,other',
            'patient_age' => 'nullable|string|min:0|max:120',
            'doctor' => 'required_with:check|exists:staff,id',

            // اطلاعات فروش داروخانه
            'total_amount' => 'required|numeric|min:1',
            'sale_date' => 'required|date|before_or_equal:today',
            'description' => 'nullable|string|max:1000',
            'discount' => 'nullable|numeric|min:0|lte:total_amount',
        ], [
            // پیام‌های فارسی برای اطلاعات بیمار
            'patient_name.required_with' => 'نام بیمار الزامی است.',
            'patient_name.string' => 'نام بیمار باید متنی باشد.',
            'patient_name.max' => 'نام بیمار نمی‌تواند بیش از ۲۵۵ کاراکتر باشد.',
            'doctor.required_with' => 'انتخاب داکتر معالج الزامی است.',

            'patient_gender.in' => 'جنسیت انتخاب شده معتبر نیست. مقادیر معتبر: مرد، زن یا دیگر.',

            'patient_age.integer' => 'سن باید عددی باشد.',
            'patient_age.min' => 'سن نمی‌تواند منفی باشد.',
            'patient_age.max' => 'سن نمی‌تواند بیش از ۱۲۰ باشد.',

            // پیام‌های فارسی برای فروش داروخانه
            'total_amount.required' => 'مبلغ کل الزامی است.',
            'total_amount.numeric' => 'مبلغ کل باید عددی باشد.',
            'total_amount.min' => 'مبلغ کل باید بیشتر از صفر باشد.',

            'sale_date.required' => 'تاریخ فروش الزامی است.',
            'sale_date.date' => 'فرمت تاریخ فروش معتبر نیست.',
            'sale_date.before_or_equal' => 'تاریخ فروش نمی‌تواند بعد از امروز باشد.',

            'description.string' => 'توضیحات باید متنی باشد.',
            'description.max' => 'توضیحات نمی‌تواند بیش از ۱۰۰۰ کاراکتر باشد.',

            'discount.numeric' => 'تخفیف باید عددی باشد.',
            'discount.min' => 'تخفیف نمی‌تواند منفی باشد.',
            'discount.lte' => 'تخفیف نمی‌تواند بیشتر از مبلغ کل باشد.',
        ]);

        // 🧩 2. Filter valid items (non-empty name & subtotal > 0)
        $validItems = collect($request->items ?? [])->filter(function ($item) {
            return !empty($item['drug_name'])
                && isset($item['quantity'], $item['unit_price'])
                && $item['quantity'] > 0
                && $item['unit_price'] > 0;
        })->values();

        // 🧩 3. Set sale_type based on items
        $saleType = $validItems->isNotEmpty() ? 'with_prescription' : 'without_prescription';

        $patient_id = null;
        if ($request->patient_name) {
            // ✅ Create the patient first
            $patient = Patient::create([
                'full_name' => $request->patient_name,
                'gender' => $request->patient_gender,
                'age' => $request->patient_age,
            ]);
            $patient_id = $patient->id;
        }

        // 🧩 4. Create main sale record
        $pharmacy = new PharmacySale();
        $pharmacy->patient_id  = $patient_id; // 👈 Link to patient
        $pharmacy->doctor_id  = $request->doctor; // 👈 Link to Doctor
        $pharmacy->sale_type = $saleType;
        $pharmacy->total_amount = $request->total_amount;
        $pharmacy->discount = $request->discount ?? 0;
        $pharmacy->sale_date = jalaliToGregorian($request->sale_date);
        $pharmacy->user_id = Auth::id();
        $pharmacy->description = $request->description;
        $pharmacy->save();

        // 🧩 5. Insert only valid items
        foreach ($validItems as $item) {
            PharmacySaleItem::create([
                'pharmacy_sale_id' => $pharmacy->id,
                'drug_name' => $item['drug_name'],
                'quantity' => $item['quantity'],
                'unit_price' => $item['unit_price'],
                'subtotal' => $item['subtotal'] ?? ($item['quantity'] * $item['unit_price']),
            ]);
        }

        if ($request->check) {
            return redirect()->route('pharmacy.show', $pharmacy);
        }
        return redirect()->back()->with('success', 'فروش دارو با موفقیت ثبت شد.');
    }

    /**
     * Display the specified resource.
     */
    public function show(PharmacySale $pharmacy)
    {
        $sale = PharmacySale::with('items')->with('doctor')->with('patient')->findOrFail($pharmacy->id);
        return Inertia::render('Pharmacy/Prescription', [
            'sale' => $sale
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $sale = PharmacySale::with('items')->findOrFail($id);

        return Inertia::render('Pharmacy/Edit', [
            'sale' => $sale
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PharmacySale $pharmacy)
    {
        // 1. Validate main fields
        $request->validate([
            'total_amount' => 'required|numeric|min:1',
            'sale_date' => 'required|date',
            'description' => 'nullable|string|max:1000',
            'discount' => 'nullable|numeric|min:0',
        ], [
            'total_amount.required' => 'مبلغ کل الزامی است.',
            'total_amount.numeric' => 'مبلغ کل باید عددی باشد.',
            'total_amount.min' => 'مبلغ کل باید بیشتر از صفر باشد.',
            'sale_date.required' => 'تاریخ فروش الزامی است.',
            'sale_date.date' => 'فرمت تاریخ فروش معتبر نیست.',
            'description.string' => 'توضیحات باید متنی باشد.',
            'description.max' => 'توضیحات نمی‌تواند بیش از ۱۰۰۰ کاراکتر باشد.',
            'discount.numeric' => 'تخفیف باید عددی باشد.',
            'discount.min' => 'تخفیف نمی‌تواند مقدار منفی داشته باشد.',
        ]);

        // 2. Filter valid items
        $validItems = collect($request->items ?? [])->filter(function ($item) {
            return !empty($item['drug_name'])
                && isset($item['quantity'], $item['unit_price'])
                && floatval($item['quantity']) > 0
                && floatval($item['unit_price']) > 0;
        })->values();

        // 3. Determine sale type
        $saleType = $validItems->isNotEmpty() ? 'with_prescription' : 'without_prescription';

        // 4. Update main sale record
        $pharmacy->update([
            'sale_type' => $saleType,
            'total_amount' => floatval($request->total_amount),
            'discount' => floatval($request->discount ?? 0),
            'sale_date' => jalaliToGregorian($request->sale_date),
            'description' => $request->description,
        ]);

        // 5. Sync items
        $existingItemIds = collect($request->items ?? [])->pluck('id')->filter()->toArray();

        // Delete removed items
        $pharmacy->items()->whereNotIn('id', $existingItemIds)->delete();

        // Update existing and create new
        foreach ($validItems as $item) {
            $quantity = floatval($item['quantity']);
            $unit_price = floatval($item['unit_price']);
            $subtotal = $quantity * $unit_price;

            if (!empty($item['id'])) {
                // Update existing
                $pharmacy->items()->where('id', $item['id'])->update([
                    'drug_name' => $item['drug_name'],
                    'quantity' => $quantity,
                    'unit_price' => $unit_price,
                    'subtotal' => $subtotal,
                ]);
            } else {
                // Create new
                $pharmacy->items()->create([
                    'pharmacy_sale_id' => $pharmacy,
                    'drug_name' => $item['drug_name'],
                    'quantity' => $quantity,
                    'unit_price' => $unit_price,
                    'subtotal' => $subtotal,
                ]);
            }
        }

        return redirect()->route('pharmacy.show', $pharmacy);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PharmacySale $pharmacy)
    {
        $pharmacy->delete();
        return redirect()->back()
            ->with('success', 'فروش مدنظر شما موفقانه حذف گردید.');
    }
}
