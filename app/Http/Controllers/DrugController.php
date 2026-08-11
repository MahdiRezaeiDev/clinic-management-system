<?php

namespace App\Http\Controllers;

use App\Models\Drug;
use Illuminate\Http\Request;

class DrugController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $query = Drug::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('brand_name', 'LIKE', "%{$search}%")
                    ->orWhere('brand_name_fa', 'LIKE', "%{$search}%");
            });
        }

        $drugs = $query->paginate(100)->withQueryString();

        return inertia('Drug/Index', [
            'drugs' => $drugs,
            'search' => $search,
        ]);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'brand_name' => 'required|string|max:255',
            'composition' => 'nullable|string',
            'dosage_form' => 'nullable|string',
            'market_auth_holder' => 'nullable|string',
            'manufacturer' => 'nullable|string',
            'reg_date' => 'nullable|string',
            'brand_name_fa' => 'nullable|string',
            'composition_fa' => 'nullable|string',
            'dosage_form_fa' => 'nullable|string',
            'stock_quantity' => 'required|integer|min:0',
            'reorder_level' => 'required|integer|min:0',
            'expiry_date' => 'nullable|date_format:Y/m/d',
        ]);

        Drug::create($validated);

        return redirect()->back()->with('success', 'دارو با موفقیت اضافه شد');
    }

    public function update(Request $request, Drug $drug)
    {
        $validated = $request->validate([
            'brand_name' => 'required|string|max:255',
            'composition' => 'nullable|string',
            'dosage_form' => 'nullable|string',
            'market_auth_holder' => 'nullable|string',
            'manufacturer' => 'nullable|string',
            'reg_date' => 'nullable|string',
            'brand_name_fa' => 'nullable|string',
            'composition_fa' => 'nullable|string',
            'dosage_form_fa' => 'nullable|string',
            'stock_quantity' => 'required|integer|min:0',
            'reorder_level' => 'required|integer|min:0',
            'expiry_date' => 'nullable|date_format:Y/m/d',
        ]);

        $drug->update($validated);

        return redirect()->back()->with('success', 'دارو با موفقیت ویرایش شد');
    }

    public function destroy(Drug $drug)
    {
        $drug->delete();

        return redirect()->back()->with('success', 'دارو حذف شد');
    }
}
