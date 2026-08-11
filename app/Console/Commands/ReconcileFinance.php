<?php

namespace App\Console\Commands;

use App\Models\{Expense, Income, PharmacySale, PurchasedMedicine, PurchasedMedicinePayment, Salary, Visit};
use App\Observers\FinancialRecordObserver;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ReconcileFinance extends Command
{
    protected $signature = 'finance:reconcile {--dry-run}';
    protected $description = 'Recalculate purchase balances and backfill the cash ledger';

    public function handle(FinancialRecordObserver $observer): int
    {
        $dryRun = $this->option('dry-run');
        $changes = 0;
        DB::transaction(function () use ($observer, $dryRun, &$changes) {
            PurchasedMedicine::with('payments')->chunkById(100, function ($purchases) use ($dryRun, &$changes) {
                foreach ($purchases as $purchase) {
                    $paid = (int) $purchase->payments->sum('amount');
                    $remaining = max(0, (int) $purchase->total_amount - $paid);
                    $status = $remaining === 0 ? 'paid' : ($paid > 0 ? 'partial' : 'unpaid');
                    if ($paid !== (int) $purchase->paid_amount || $remaining !== (int) $purchase->remaining_amount || $status !== $purchase->status) {
                        $changes++;
                        if (!$dryRun) $purchase->updateQuietly(['paid_amount'=>$paid, 'remaining_amount'=>$remaining, 'status'=>$status]);
                    }
                }
            });

            PharmacySale::where('payment_status', 'paid')->where('paid_amount', 0)->each(function ($sale) use ($dryRun) {
                if (!$dryRun) $sale->updateQuietly(['paid_amount'=>$sale->total_amount,'remaining_amount'=>0]);
            });
            PharmacySale::whereNull('receipt_number')->each(function ($sale) use ($dryRun) {
                if (!$dryRun) $sale->updateQuietly(['receipt_number' => 'SALE-LEGACY-' . str_pad($sale->id, 8, '0', STR_PAD_LEFT)]);
            });
            PurchasedMedicinePayment::whereNull('receipt_number')->each(function ($payment) use ($dryRun) {
                if (!$dryRun) $payment->updateQuietly(['receipt_number' => 'PAY-LEGACY-' . str_pad($payment->id, 8, '0', STR_PAD_LEFT)]);
            });

            foreach ([Visit::class, Income::class, PharmacySale::class, Expense::class, PurchasedMedicinePayment::class, Salary::class] as $class) {
                $class::chunkById(100, function ($models) use ($observer, $dryRun) {
                    if (!$dryRun) foreach ($models as $model) $observer->updated($model);
                });
            }
        });
        $this->info($dryRun ? "{$changes} inconsistent purchases found." : "Finance reconciled; {$changes} purchases corrected.");
        return self::SUCCESS;
    }
}
