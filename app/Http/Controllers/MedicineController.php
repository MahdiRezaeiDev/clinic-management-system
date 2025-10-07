<?php

namespace App\Http\Controllers;

use App\Models\PurchasedMedicine;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

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

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
