<?php

namespace App\Http\Controllers;

use App\Models\{CashTransaction, Drug, FinancialAuditLog, PharmacySale, PurchasedMedicine};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

class FinanceControlController extends Controller
{
    public function __invoke(Request $request)
    {
        $query = CashTransaction::active()->orderByDesc('transaction_date')->orderByDesc('id');
        if ($request->filled('start_date')) $query->whereDate('transaction_date', '>=', jalaliToGregorian($request->start_date));
        if ($request->filled('end_date')) $query->whereDate('transaction_date', '<=', jalaliToGregorian($request->end_date));
        if ($request->filled('payment_method')) $query->where('payment_method', $request->payment_method);

        $summaryQuery = clone $query;
        $byMethod = (clone $query)->reorder()->selectRaw('payment_method, direction, SUM(amount) total')
            ->groupBy('payment_method', 'direction')->get();

        $supplierDebts = PurchasedMedicine::with('supplier')->where('remaining_amount', '>', 0)
            ->orderByDesc('remaining_amount')->get()->map(fn ($purchase) => [
                'id' => $purchase->id,
                'name' => $purchase->supplier?->company_name ?? 'نامشخص',
                'date' => $purchase->purchase_date,
                'total' => $purchase->total_amount,
                'remaining' => $purchase->remaining_amount,
            ]);
        $patientDebts = PharmacySale::with('patient')->where('remaining_amount', '>', 0)
            ->orderByDesc('remaining_amount')->get()->map(fn ($sale) => [
                'id' => $sale->id,
                'name' => $sale->patient?->full_name ?? 'مشتری آزاد',
                'date' => $sale->sale_date,
                'total' => $sale->total_amount,
                'remaining' => $sale->remaining_amount,
            ]);

        $inventoryAlerts = collect();
        if (Schema::hasTable('drugs') && Schema::hasColumn('drugs', 'stock_quantity')) {
            $inventoryAlerts = Drug::whereColumn('stock_quantity', '<=', 'reorder_level')
                ->orWhereDate('expiry_date', '<=', now()->addDays(90))->orderBy('expiry_date')->limit(100)->get();
        }

        return Inertia::render('Finance/Control', [
            'transactions' => $query->paginate(30)->withQueryString(),
            'summary' => [
                'credits' => (clone $summaryQuery)->where('direction', 'credit')->sum('amount'),
                'debits' => (clone $summaryQuery)->where('direction', 'debit')->sum('amount'),
                'byMethod' => $byMethod,
            ],
            'supplierDebts' => $supplierDebts,
            'patientDebts' => $patientDebts,
            'inventoryAlerts' => $inventoryAlerts,
            'auditLogs' => FinancialAuditLog::latest()->limit(30)->get(),
            'filters' => $request->only('start_date', 'end_date', 'payment_method'),
        ]);
    }
}
