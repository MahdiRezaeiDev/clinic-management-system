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

        // ✅ Use 'expense_date' instead of 'created_at'
        if ($request->filled('start_date')) {
            $query->whereDate('created_at', '>=', $request->start_date);
        }

        if ($request->filled('end_date')) {
            $query->whereDate('created_at', '<=', $request->end_date);
        }

        $expenses = $query->latest('created_at')->paginate(10)->withQueryString();

        $categories = [
            'building' => 'ساختمان',
            'kitchen' => 'آشپزخانه',
            'repair' => 'تعمیرات',
            'furniture' => 'فرنیچر',
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
            'category' => 'required|in:building,kitchen,repair,furniture,other',
            'amount' => 'required|numeric|min:1',
            'payment_method' => 'required|in:cash,bank,check,other',
            'expense_date' => 'required|date',
            'description' => 'nullable|string|max:500',
        ]);

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
        // Only allow the owner to update
        if ($expense->user_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }

        $request->validate([
            'category' => 'required|in:building,kitchen,repair,furniture,other',
            'amount' => 'required|numeric|min:1',
            'payment_method' => 'required|in:cash,bank,check,other',
            'expense_date' => 'required|date',
            'description' => 'nullable|string|max:500',
        ]);

        $expense->update([
            'category' => $request->category,
            'amount' => $request->amount,
            'payment_method' => $request->payment_method,
            'expense_date' => $request->expense_date,
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
