<?php

namespace App\Http\Controllers;

use App\Models\PurchasedMedicine;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $suppliers = Supplier::all();
        return Inertia::render('Suppliers/Index', [
            'suppliers' =>
            $suppliers
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Suppliers/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'company_name'   => 'required|string|max:255',
            'contact_person' => 'nullable|string|max:255',
            'phone'          => 'nullable|string|max:30',
            'address'        => 'nullable|string|max:255',
            'description'    => 'nullable|string|max:1000',
        ], [
            'company_name.required' => 'نام شرکت الزامی است.',
            'company_name.string'   => 'نام شرکت باید رشته باشد.',
            'company_name.max'      => 'نام شرکت نمی‌تواند بیش از ۲۵۵ کاراکتر باشد.',

            'contact_person.string' => 'نام شخص تماس باید رشته باشد.',
            'contact_person.max'    => 'نام شخص تماس نمی‌تواند بیش از ۲۵۵ کاراکتر باشد.',

            'phone.string'          => 'شماره تماس باید رشته باشد.',
            'phone.max'             => 'شماره تماس نمی‌تواند بیش از ۳۰ کاراکتر باشد.',

            'address.string'        => 'آدرس باید رشته باشد.',
            'address.max'           => 'آدرس نمی‌تواند بیش از ۲۵۵ کاراکتر باشد.',

            'description.string'    => 'توضیحات باید رشته باشد.',
            'description.max'       => 'توضیحات نمی‌تواند بیش از ۱۰۰۰ کاراکتر باشد.',
        ]);

        $supplier =  new Supplier();
        $supplier->company_name = $request->company_name;
        $supplier->contact_person = $request->contact_person;
        $supplier->phone = $request->phone;
        $supplier->address = $request->address;

        $supplier->save();
        return redirect()
            ->back()
            ->with('success', 'شرکت همکار مدنظر شما موفقانه ثبت گردید.');
    }

    public function show(Supplier $supplier)
    {
        $purchases = PurchasedMedicine::with('supplier')
            ->where('supplier_id', $supplier->id) // only this supplier's purchases
            ->orderBy('purchase_date', 'desc')
            ->get()
            ->map(function ($purchase) {
                return [
                    'id' => $purchase->id,
                    'supplier_name' => $purchase->supplier->company_name ?? 'نامشخص',
                    'purchase_date' => $purchase->purchase_date,
                    'total_amount' => $purchase->total_amount,
                    'paid_amount' => $purchase->paid_amount,
                    'remaining_amount' => $purchase->remaining_amount,
                    'status' => $purchase->status,
                    'description' => $purchase->description,
                ];
            });

        // Separate fully paid and remaining
        $fullyPaid = $purchases->filter(fn($purchase) => $purchase['remaining_amount'] <= 0)->values();
        $remaining = $purchases->filter(fn($purchase) => $purchase['remaining_amount'] > 0)->values();

        // Totals
        $totalPurchased = $purchases->sum('total_amount');
        $totalPaid = $purchases->sum('paid_amount');
        $totalRemaining = $purchases->sum('remaining_amount');

        return Inertia::render('Suppliers/Profile', [
            'supplier' => $supplier,
            'purchases' => $purchases,
            'fullyPaidRecords' => $fullyPaid,
            'remainingRecords' => $remaining,
            'TotalPurchased' => $totalPurchased,
            'TotalPaid' => $totalPaid,
            'TotalRemaining' => $totalRemaining,
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Supplier $supplier)
    {
        return Inertia::render('Suppliers/Edit', [
            'supplier' => $supplier
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Supplier $supplier)
    {
        $request->validate([
            'company_name'   => 'required|string|max:255',
            'contact_person' => 'nullable|string|max:255',
            'phone'          => 'nullable|string|max:30',
            'address'        => 'nullable|string|max:255',
            'description'    => 'nullable|string|max:1000',
        ], [
            'company_name.required' => 'نام شرکت الزامی است.',
            'company_name.string'   => 'نام شرکت باید رشته باشد.',
            'company_name.max'      => 'نام شرکت نمی‌تواند بیش از ۲۵۵ کاراکتر باشد.',

            'contact_person.string' => 'نام شخص تماس باید رشته باشد.',
            'contact_person.max'    => 'نام شخص تماس نمی‌تواند بیش از ۲۵۵ کاراکتر باشد.',

            'phone.string'          => 'شماره تماس باید رشته باشد.',
            'phone.max'             => 'شماره تماس نمی‌تواند بیش از ۳۰ کاراکتر باشد.',

            'address.string'        => 'آدرس باید رشته باشد.',
            'address.max'           => 'آدرس نمی‌تواند بیش از ۲۵۵ کاراکتر باشد.',

            'description.string'    => 'توضیحات باید رشته باشد.',
            'description.max'       => 'توضیحات نمی‌تواند بیش از ۱۰۰۰ کاراکتر باشد.',
        ]);

        // Update the supplier
        $supplier->update([
            'company_name'   => $request->company_name,
            'contact_person' => $request->contact_person,
            'phone'          => $request->phone,
            'address'        => $request->address,
            'description'    => $request->description,
        ]);

        return redirect()
            ->back()
            ->with('success', 'شرکت همکار مدنظر شما موفقانه ویرایش شد.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Supplier $supplier)
    {
        $supplier->delete();
        return redirect()
            ->back()
            ->with('success', 'حقوق با موفقیت حذف شد.');
    }
}
