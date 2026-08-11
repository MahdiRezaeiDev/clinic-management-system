<?php
namespace App\Observers;

use App\Models\{CashTransaction, Expense, FinancialAuditLog, Income, PatientInvoicePayment, PharmacySale, PurchasedMedicinePayment, Salary, Visit};
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class FinancialRecordObserver
{
    public function created(Model $model): void { $this->audit($model, 'created'); $this->syncLedger($model); }
    public function updated(Model $model): void { $this->audit($model, 'updated'); $this->syncLedger($model); }
    public function deleted(Model $model): void { $this->audit($model, 'deleted'); $this->voidLedger($model, 'رکورد اصلی حذف شد'); }

    private function audit(Model $model, string $event): void
    {
        FinancialAuditLog::create([
            'auditable_type' => $model::class, 'auditable_id' => $model->getKey(), 'event' => $event,
            'old_values' => $event === 'created' ? null : $model->getOriginal(),
            'new_values' => $event === 'deleted' ? null : $model->getAttributes(),
            'user_id' => Auth::id(), 'ip_address' => request()?->ip(),
        ]);
    }

    private function syncLedger(Model $model): void
    {
        $map = match (true) {
            $model instanceof Visit => ['credit', 'fee', 'visit_date', 'cash'],
            $model instanceof Income => ['credit', 'amount', 'income_date', $model->payment_method],
            $model instanceof PharmacySale => ['credit', 'paid_amount', 'sale_date', $model->payment_method],
            $model instanceof Expense => ['debit', 'amount', 'expense_date', $model->payment_method],
            $model instanceof PurchasedMedicinePayment => ['debit', 'amount', 'payment_date', $model->payment_method ?? 'cash'],
            $model instanceof PatientInvoicePayment => ['credit', 'amount', 'payment_date', $model->payment_method],
            $model instanceof Salary => ['debit', 'total_paid', 'payment_date', 'cash'],
            default => null,
        };
        if (!$map) return;
        [$direction, $amountField, $dateField, $method] = $map;
        CashTransaction::updateOrCreate(
            ['source_type' => $model::class, 'source_id' => $model->getKey()],
            [
                'reference_number' => $model->receipt_number ?: sprintf('TX-%s-%s-%08d', now()->format('Ymd'), strtoupper(substr(md5($model::class), 0, 6)), $model->getKey()),
                'direction' => $direction, 'amount' => max(0, (int) $model->{$amountField}),
                'payment_method' => $method ?: 'cash',
                'transaction_date' => $model->getRawOriginal($dateField) ?: now()->toDateString(),
                'description' => class_basename($model), 'user_id' => $model->user_id ?? Auth::id(),
                'voided_at' => $model->voided_at ?? null, 'voided_by' => $model->voided_by ?? null,
                'void_reason' => $model->void_reason ?? null,
            ]
        );
    }
    private function voidLedger(Model $model, string $reason): void
    {
        CashTransaction::where(['source_type' => $model::class, 'source_id' => $model->getKey()])
            ->update(['voided_at' => now(), 'voided_by' => Auth::id(), 'void_reason' => $reason]);
    }
}
