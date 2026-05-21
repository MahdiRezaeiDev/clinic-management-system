<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ExpenseController extends Controller
{
    public function index(Request $request)
    {
        // Query with optional filters
        $query = Expense::where('user_id', Auth::id());

        if ($request->filled('search')) {
            $query->where('description', 'like', "%{$request->search}%");
        }

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        if ($request->filled('start_date')) {
            $query->whereDate('expense_date', '>=', jalaliToGregorian($request->start_date));
        }

        if ($request->filled('end_date')) {
            $query->whereDate('expense_date', '<=', jalaliToGregorian($request->end_date));
        }

        $totalExpense = (clone $query)->sum('amount');

        $expenses = $query->latest('created_at')->paginate(31)->withQueryString();

        $categories = [
            'building' => 'ساختمان',
            'kitchen' => 'آشپزخانه',
            'repair' => 'تعمیرات',
            'furniture' => 'فرنیچر',
            'ads' => 'نشرات',
            'other' => 'سایر',
        ];

        $paymentMethods = [
            'cash' => 'نقدی',
            'bank' => 'بانکی',
            'check' => 'چک',
            'other' => 'سایر',
        ];

        return Inertia::render('Expenses/Index', [
            'expenses' => $expenses,
            'categories' => $categories,
            'paymentMethods' => $paymentMethods,
            'totalExpense' => $totalExpense,
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
            'category' => 'required|in:building,kitchen,repair,furniture,other,ads',
            'amount' => 'required|numeric|min:1',
            'payment_method' => 'required|in:cash,bank,check,other',
            'expense_date' => 'required|date',
            'description' => 'nullable|string|max:500',
        ], [
            'category.required' => 'لطفاً دسته‌بندی هزینه را انتخاب کنید.',
            'category.in' => 'دسته‌بندی انتخاب شده معتبر نیست.',
            'amount.required' => 'لطفاً مبلغ را وارد کنید.',
            'amount.numeric' => 'مبلغ باید عددی باشد.',
            'amount.min' => 'مبلغ باید حداقل ۱ باشد.',
            'payment_method.required' => 'لطفاً روش پرداخت را انتخاب کنید.',
            'payment_method.in' => 'روش پرداخت انتخاب شده معتبر نیست.',
            'expense_date.required' => 'لطفاً تاریخ هزینه را وارد کنید.',
            'expense_date.date' => 'تاریخ وارد شده معتبر نیست.',
            'description.max' => 'توضیحات نباید بیش از ۵۰۰ کاراکتر باشد.',
        ]);

        dd($request->validated());


        Expense::create([
            'category' => $request->category,
            'amount' => $request->amount,
            'payment_method' => $request->payment_method,
            'expense_date' => $request->expense_date,
            'description' => $request->description,
            'user_id' => Auth::id(),
        ]);

        return redirect()->back()->with('success', 'هزینه با موفقیت ثبت شد.');
    }

    public function update(Request $request, Expense $expense)
    {
        if ($expense->user_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }

        $request->validate([
            'category' => 'required|in:building,kitchen,repair,furniture,other,ads',
            'amount' => 'required|numeric|min:1',
            'payment_method' => 'required|in:cash,bank,check,other',
            'expense_date' => 'required|date',
            'description' => 'nullable|string|max:500',
        ], [
            'category.required' => 'لطفاً دسته‌بندی هزینه را انتخاب کنید.',
            'category.in' => 'دسته‌بندی انتخاب شده معتبر نیست.',
            'amount.required' => 'لطفاً مبلغ را وارد کنید.',
            'amount.numeric' => 'مبلغ باید عددی باشد.',
            'amount.min' => 'مبلغ باید حداقل ۱ باشد.',
            'payment_method.required' => 'لطفاً روش پرداخت را انتخاب کنید.',
            'payment_method.in' => 'روش پرداخت انتخاب شده معتبر نیست.',
            'expense_date.required' => 'لطفاً تاریخ هزینه را وارد کنید.',
            'expense_date.date' => 'تاریخ وارد شده معتبر نیست.',
            'description.max' => 'توضیحات نباید بیش از ۵۰۰ کاراکتر باشد.',
        ]);

        $expense->update([
            'category' => $request->category,
            'amount' => $request->amount,
            'payment_method' => $request->payment_method,
            'expense_date' => jalaliToGregorian($request->expense_date),
            'description' => $request->description,
        ]);

        return redirect()->back()->with('success', 'هزینه با موفقیت ویرایش شد.');
    }

    public function destroy(Expense $expense)
    {
        // Only allow the owner to delete
        if ($expense->user_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }

        $expense->delete();

        return redirect()->back()->with('success', 'هزینه حذف شد.');
    }
}
