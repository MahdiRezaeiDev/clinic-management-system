<?php

namespace App\Http\Controllers;

use App\Models\Income;
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
            $query->whereDate('income_date', '>=', jalaliToGregorian($request->start_date));
        }

        if ($request->filled('end_date')) {
            $query->whereDate('income_date', '<=', jalaliToGregorian($request->end_date));
        }

        $incomes = $query->latest()->paginate(31)->withQueryString();

        $categories = [
            'lab' => 'لابراتوار',
            'emergency' => 'ایمرجنسی',
            'gynecology' => 'نسایی',
            'inpatient' => 'بستری',
            'other' => 'سایر'
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
            'category' => 'required|in:lab,dental,emergency,gynecology,inpatient,other',
            'amount' => 'required|numeric|min:1',
            'payment_method' => 'required|in:cash,bank,check,other',
            'income_date' => 'required|date',
            'description' => 'nullable|string|max:500',
        ], [
            'category.required' => 'لطفاً نوع درآمد را انتخاب کنید.',
            'category.in' => 'نوع درآمد انتخاب‌شده معتبر نیست.',
            'amount.required' => 'لطفاً مبلغ را وارد کنید.',
            'amount.numeric' => 'مبلغ باید عددی باشد.',
            'amount.min' => 'مبلغ باید حداقل ۱ باشد.',
            'payment_method.required' => 'لطفاً روش پرداخت را انتخاب کنید.',
            'payment_method.in' => 'روش پرداخت انتخاب‌شده معتبر نیست.',
            'income_date.required' => 'تاریخ را وارد کنید.',
            'income_date.date' => 'تاریخ وارد شده معتبر نیست.',
            'description.max' => 'توضیحات نباید بیش از ۵۰۰ کاراکتر باشد.',
        ]);


        Income::create([
            'category' => $request->category,
            'amount' => $request->amount,
            'payment_method' => $request->payment_method,
            'income_date' => jalaliToGregorian($request->income_date),
            'description' => $request->description,
            'user_id' => Auth::id(),
        ]);

        return redirect()->back()->with('success', 'عاید مریض با موفقیت ثبت شد.');
    }

    public function update(Request $request, Income $income)
    {
        $request->validate([
            'category' => 'required|in:lab,dental,emergency,gynecology,inpatient,other',
            'amount' => 'required|numeric|min:1',
            'payment_method' => 'required|in:cash,bank,check,other',
            'income_date' => 'required|date',
            'description' => 'nullable|string|max:500',
        ], [
            'category.required' => 'لطفاً نوع درآمد را انتخاب کنید.',
            'category.in' => 'نوع درآمد انتخاب‌شده معتبر نیست.',
            'amount.required' => 'لطفاً مبلغ را وارد کنید.',
            'amount.numeric' => 'مبلغ باید عددی باشد.',
            'amount.min' => 'مبلغ باید حداقل ۱ باشد.',
            'payment_method.required' => 'لطفاً روش پرداخت را انتخاب کنید.',
            'payment_method.in' => 'روش پرداخت انتخاب‌شده معتبر نیست.',
            'income_date.required' => 'تاریخ را وارد کنید.',
            'income_date.date' => 'تاریخ وارد شده معتبر نیست.',
            'description.max' => 'توضیحات نباید بیش از ۵۰۰ کاراکتر باشد.',
        ]);

        $incomeDateGregorian = jalaliToGregorian($request->income_date);
        $request->merge(['income_date' => $incomeDateGregorian]);

        $income->update($request->only('category', 'amount', 'payment_method', 'income_date', 'description'));

        return redirect()->back()->with('success', 'عاید ویرایش شد.');
    }


    public function destroy(Income $income)
    {
        if ($income->user_id !== Auth::id()) abort(403);
        $income->delete();
        return redirect()->back()->with('success', 'عاید حذف شد.');
    }
}
