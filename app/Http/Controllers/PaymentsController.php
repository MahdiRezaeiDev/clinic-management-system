<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PurchasedMedicine;
use App\Models\PurchasedMedicinePayment;
use Illuminate\Support\Facades\Auth;

class PaymentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(PurchasedMedicine $medicine)
    {
        $payments = PurchasedMedicinePayment::where('purchased_medicine_id', $medicine->id)
            ->with('user')
            ->latest()
            ->get();

        return inertia('Medicine/Payments/Index', [
            'medicine' => $medicine->load('supplier'),
            'payments' => $payments,
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        dd('Here we are');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, PurchasedMedicine $medicine)
    {
        $validated = $request->validate(
            [
                'payment_date' => 'required|date',
                'amount'       => 'required|numeric|min:1',
                'description'  => 'nullable|string|max:1000',
            ],
            [
                'payment_date.required' => 'تاریخ پرداخت الزامی است.',
                'payment_date.date'     => 'فرمت تاریخ پرداخت نامعتبر است.',
                'amount.required'       => 'مبلغ پرداخت الزامی است.',
                'amount.numeric'        => 'مبلغ پرداخت باید عددی باشد.',
                'amount.min'            => 'مبلغ پرداخت نمی‌تواند کمتر از ۱ باشد.',
                'description.string'    => 'توضیحات باید به صورت متن وارد شود.',
                'description.max'       => 'توضیحات نمی‌تواند بیش از ۱۰۰۰ کاراکتر باشد.',
            ]
        );

        // مجموع پرداخت‌های قبلی
        $totalPaid = $medicine->payments()->sum('amount');

        // بررسی مجموع جدید
        $newTotal = $totalPaid + $validated['amount'];

        $remaining_amount = abs($medicine->total_amount - $totalPaid);

        if ($newTotal > $medicine->total_amount) {
            return back()
                ->withErrors([
                    'amount' => 'مجموع پرداخت‌ها نمی‌تواند بیشتر از مبلغ باقی مانده (' . number_format($remaining_amount) . ') باشد.',
                ])
                ->withInput();
        }

        // ثبت پرداخت
        $payment = new PurchasedMedicinePayment($validated);
        $payment->user_id = Auth::id();
        $payment->purchased_medicine_id = $medicine->id;
        $payment->save();

        // به‌روزرسانی وضعیت پرداخت دارو
        if ($newTotal >= $medicine->total_amount) {
            $medicine->status = 'paid';
        } else {
            $medicine->status = 'unpaid';
        }
        $medicine->paid_amount = $newTotal;
        $medicine->remaining_amount = $medicine->total_amount - $newTotal;
        $medicine->save();

        return redirect()
            ->route('medicine.payments.index', $medicine->id)
            ->with('success', 'پرداخت جدید با موفقیت ثبت شد.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PurchasedMedicine $medicine, PurchasedMedicinePayment $payment)
    {
        $validated = $request->validate(
            [
                'payment_date'    => 'required|date',
                'amount'          => 'required|numeric|min:1',
                'payment_method'  => 'required|string|max:255',
                'description'     => 'nullable|string|max:1000',
                'user_id'         => 'required|integer|exists:users,id',
            ],
            [
                'payment_date.required'   => 'تاریخ پرداخت الزامی است.',
                'payment_date.date'       => 'فرمت تاریخ پرداخت نامعتبر است.',
                'amount.required'         => 'مبلغ پرداخت الزامی است.',
                'amount.numeric'          => 'مبلغ پرداخت باید عددی باشد.',
                'amount.min'              => 'مبلغ پرداخت نمی‌تواند کمتر از ۱ باشد.',
                'payment_method.required' => 'روش پرداخت الزامی است.',
                'payment_method.string'   => 'روش پرداخت باید رشته‌ای از حروف باشد.',
                'payment_method.max'      => 'روش پرداخت نباید بیش از ۲۵۵ کاراکتر باشد.',
                'description.string'      => 'توضیحات باید به صورت متن وارد شود.',
                'description.max'         => 'توضیحات نمی‌تواند بیش از ۱۰۰۰ کاراکتر باشد.',
                'user_id.required'        => 'کاربر الزامی است.',
                'user_id.exists'          => 'کاربر انتخاب شده معتبر نیست.',
            ]
        );

        $payment->update($validated);

        return redirect()
            ->route('medicine.payments.index', $medicine->id)
            ->with('success', 'اطلاعات پرداخت با موفقیت ویرایش شد.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        dd('Show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
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
