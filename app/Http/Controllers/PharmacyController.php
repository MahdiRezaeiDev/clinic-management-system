<?php

namespace App\Http\Controllers;

use App\Models\PharmacySale;
use App\Models\PharmacySaleItem;
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

    public function store(Request $request)
    {
        // 🧩 1. اعتبارسنجی فیلدهای اصلی
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


        // 🧩 2. Filter valid items (non-empty name & subtotal > 0)
        $validItems = collect($request->items ?? [])->filter(function ($item) {
            return !empty($item['drug_name'])
                && isset($item['quantity'], $item['unit_price'])
                && $item['quantity'] > 0
                && $item['unit_price'] > 0;
        })->values();

        // 🧩 3. Set sale_type based on items
        $saleType = $validItems->isNotEmpty() ? 'with_prescription' : 'without_prescription';

        // 🧩 4. Create main sale record
        $pharmacy = new PharmacySale();
        $pharmacy->sale_type = $saleType;
        $pharmacy->total_amount = $request->total_amount;
        $pharmacy->discount = $request->discount ?? 0;
        $pharmacy->sale_date = $request->sale_date;
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

        // 🧩 6. Redirect back
        return redirect()
            ->route('pharmacy.index')
            ->with('success', 'فروش با موفقیت ثبت شد.');
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
