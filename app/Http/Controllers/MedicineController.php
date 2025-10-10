<?php

namespace App\Http\Controllers;

use App\Models\PurchasedMedicine;
use App\Models\PurchasedMedicinePayment;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class MedicineController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $purchases = PurchasedMedicine::with('supplier')
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
                    'description' => $purchase->description
                ];
            });

        return Inertia::render('Medicine/Index', [
            'purchases' => $purchases,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $suppliers = Supplier::all();
        return Inertia::render('Medicine/Purchase', [
            'suppliers' => $suppliers,
            ''
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate(
            [
                'supplier_id'      => 'required|exists:suppliers,id',
                'total_amount'     => 'required|numeric|min:0',
                'paid_amount'      => 'nullable|numeric|min:0',
                'remaining_amount' => 'nullable|numeric|min:0',
                'purchase_date'    => 'required|date',
                'description'      => 'nullable|string|max:1000',
                'user_id'          => 'required|exists:users,id',
            ],
            [
                'supplier_id.required'     => 'انتخاب شرکت همکار الزامی است.',
                'supplier_id.exists'       => 'شرکت انتخاب‌شده معتبر نیست.',
                'total_amount.required'    => 'لطفاً مبلغ کل را وارد کنید.',
                'total_amount.numeric'     => 'مبلغ کل باید عددی باشد.',
                'paid_amount.numeric'      => 'مبلغ پرداخت‌شده باید عددی باشد.',
                'remaining_amount.numeric' => 'مبلغ باقی‌مانده باید عددی باشد.',
                'purchase_date.required'   => 'تاریخ خرید الزامی است.',
                'purchase_date.date'       => 'تاریخ خرید معتبر نیست.',
                'description.max'          => 'توضیحات نباید بیشتر از ۱۰۰۰ کاراکتر باشد.',
                'user_id.required'         => 'شناسه کاربر الزامی است.',
                'user_id.exists'           => 'کاربر انتخاب‌شده معتبر نیست.',
            ]
        );

        // محاسبه خودکار مبلغ باقی‌مانده
        $validated['remaining_amount'] = $validated['total_amount'] - ($validated['paid_amount'] ?? 0);
        $validated['status'] = $validated['remaining_amount'] == 0 ? 'paid' : 'unpaid';

        // ذخیره خرید
        $purchase = PurchasedMedicine::create($validated);

        // اگر مبلغی پرداخت شده، پرداخت جدید ایجاد شود
        if (!empty($validated['paid_amount']) && $validated['paid_amount'] > 0) {
            PurchasedMedicinePayment::create([
                'purchased_medicine_id' => $purchase->id,
                'payment_date'          => $validated['purchase_date'],
                'amount'                => $validated['paid_amount'],
                'description'           => 'پرداخت اولیه هنگام ثبت خرید',
                'user_id'               => Auth::id(),
            ]);
        }

        return redirect()
            ->route('medicine.index')
            ->with('success', 'خرید با موفقیت ثبت شد.');
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $purchase = PurchasedMedicine::with('supplier')->with('items')->where('id', $id)
            ->first();

        return Inertia::render(
            'Medicine/Bill',
            [
                'purchase' => $purchase
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $id)
    {
        $suppliers = Supplier::all();
        $purchase = PurchasedMedicine::find($id);

        return Inertia::render(
            'Medicine/Edit',
            [
                'suppliers' => $suppliers,
                'purchase' => $purchase
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'supplier_id'       => 'required|exists:suppliers,id',
            'total_amount'      => 'required|numeric|min:0',
            'paid_amount'       => 'nullable|numeric|min:0',
            'remaining_amount'  => 'nullable|numeric|min:0',
            'purchase_date'     => 'required|date',
            'description'       => 'nullable|string|max:1000',
            'user_id'           => 'required|exists:users,id',
        ], [
            'supplier_id.required'      => 'انتخاب شرکت همکار الزامی است.',
            'supplier_id.exists'        => 'شرکت انتخاب‌شده معتبر نیست.',
            'total_amount.required'     => 'لطفاً مبلغ کل را وارد کنید.',
            'total_amount.numeric'      => 'مبلغ کل باید عددی باشد.',
            'paid_amount.numeric'       => 'مبلغ پرداخت‌شده باید عددی باشد.',
            'remaining_amount.numeric'  => 'مبلغ باقی‌مانده باید عددی باشد.',
            'purchase_date.required'    => 'تاریخ خرید الزامی است.',
            'purchase_date.date'        => 'تاریخ خرید معتبر نیست.',
            'description.max'           => 'توضیحات نباید بیشتر از ۱۰۰۰ کاراکتر باشد.',
            'user_id.required'          => 'شناسه کاربر الزامی است.',
            'user_id.exists'            => 'کاربر انتخاب‌شده معتبر نیست.',
        ]);

        // Auto-calculate remaining to prevent tampering
        $validated['remaining_amount'] = $validated['total_amount'] - ($validated['paid_amount'] ?? 0);
        $validated['status'] = $validated['remaining_amount'] == 0 ? "paid" : "unpaid";

        // Find the specific purchase and update it
        $purchase = PurchasedMedicine::findOrFail($id);
        $purchase->update($validated);

        return redirect()->route('medicine.index')->with('success', 'خرید با موفقیت بروزرسانی شد.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $purchase = PurchasedMedicine::find($id);

        $purchase->delete();

        return redirect()->back()->with('success', 'خرید مدنظر با موفقیت حذف گردید.');
    }
}
