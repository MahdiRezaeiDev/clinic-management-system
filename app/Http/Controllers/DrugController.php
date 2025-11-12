<?php

namespace App\Http\Controllers;

use App\Models\Drug;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DrugController extends Controller
{
    public function index()
    {
        $drugs = Drug::orderBy('id')->paginate(100);

        return Inertia::render('Drug/Index', [
            'drugs' => $drugs,
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
