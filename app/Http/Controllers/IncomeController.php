<?php

namespace App\Http\Controllers;

use App\Models\Income;
use App\Models\PatientIncome;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class IncomeController extends Controller
{
    public function index(Request $request)
    {
        $query = Income::where('user_id', Auth::id());

        if ($request->filled('search')) {
            $query->where('description', 'like', "%{$request->search}%");
        }

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        if ($request->filled('start_date')) {
            $query->whereDate('created_at', '>=', $request->start_date);
        }

        if ($request->filled('end_date')) {
            $query->whereDate('created_at', '<=', $request->end_date);
        }

        $incomes = $query->latest()->paginate(10)->withQueryString();

        $categories = [
            'visit' => 'ویزیت',
            'lab' => 'لابراتوار',
            'dental' => 'دندان‌پزشکی',
            'emergency' => 'ایمرجنسی',
            'gynecology' => 'نسایی',
            'inpatient' => 'بستری',
        ];

        $paymentMethods = [
            'cash' => 'نقدی',
            'bank' => 'بانکی',
            'check' => 'چک',
            'other' => 'سایر',
        ];

        return Inertia::render('Incomes/Index', [
            'incomes' => $incomes,
            'categories' => $categories,
            'paymentMethods' => $paymentMethods,
            'filters' => [
                'search' => $request->search ?? '',
                'category' => $request->category ?? '',
                'start_date' => $request->start_date ?? '',
                'end_date' => $request->end_date ?? '',
            ],
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'category' => 'required|in:visit,lab,dental,emergency,gynecology,inpatient',
            'amount' => 'required|numeric|min:1',
            'payment_method' => 'required|in:cash,bank,check,other',
            'income_date' => 'required|date',
            'description' => 'nullable|string|max:500',
        ]);

        Income::create([
            'category' => $request->category,
            'amount' => $request->amount,
            'payment_method' => $request->payment_method,
            'income_date' => $request->income_date,
            'description' => $request->description,
            'user_id' => Auth::id(),
        ]);

        return redirect()->back()->with('success', 'عاید مریض با موفقیت ثبت شد.');
    }

    public function update(Request $request, Income $patientIncome)
    {
        dd($request->all());
        $request->validate([
            'category' => 'required|in:visit,lab,dental,emergency,gynecology,inpatient',
            'amount' => 'required|numeric|min:1',
            'payment_method' => 'required|in:cash,bank,check,other',
            'income_date' => 'required|date',
            'description' => 'nullable|string|max:500',
        ]);

        $patientIncome->update($request->only('category', 'amount', 'payment_method', 'income_date', 'description'));

        return redirect()->back()->with('success', 'عاید ویرایش شد.');
    }


    public function destroy(Income $patientIncome)
    {
        if ($patientIncome->user_id !== Auth::id()) abort(403);
        $patientIncome->delete();
        return redirect()->back()->with('success', 'عاید حذف شد.');
    }
}
