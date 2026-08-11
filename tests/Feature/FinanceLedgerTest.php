<?php

use App\Models\CashTransaction;
use App\Models\FinancialAuditLog;
use App\Models\Income;
use App\Models\User;

it('creates and updates a cash ledger entry for an income', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $this->actingAs($user);

    $income = Income::create([
        'category' => 'other', 'amount' => 2500, 'payment_method' => 'cash',
        'income_date' => '1405/01/01', 'description' => 'test', 'user_id' => $user->id,
    ]);

    $transaction = CashTransaction::where('source_type', Income::class)->where('source_id', $income->id)->firstOrFail();
    expect($transaction->direction)->toBe('credit')->and($transaction->amount)->toBe(2500);

    $income->update(['amount' => 3000]);
    expect($transaction->fresh()->amount)->toBe(3000)
        ->and(FinancialAuditLog::where('auditable_type', Income::class)->count())->toBe(2);
});

it('renders grouped finance summaries without inherited transaction ordering', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $this->actingAs($user);

    Income::create([
        'category' => 'other', 'amount' => 1500, 'payment_method' => 'cash',
        'income_date' => '1405/01/02', 'description' => 'summary test', 'user_id' => $user->id,
    ]);

    $this->get(route('finance.control'))->assertOk();
});
