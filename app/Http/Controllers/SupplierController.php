<?php

namespace App\Http\Controllers;

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
    public function destroy(Supplier $supplier)
    {
        $supplier->delete();
        return redirect()
            ->back()
            ->with('success', 'حقوق با موفقیت حذف شد.');
    }
}
