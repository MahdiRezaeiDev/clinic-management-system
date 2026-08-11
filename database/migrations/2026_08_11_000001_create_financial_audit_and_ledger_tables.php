<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (!Schema::hasTable('financial_audit_logs')) Schema::create('financial_audit_logs', function (Blueprint $table) {
            $table->id();
            $table->string('auditable_type');
            $table->unsignedBigInteger('auditable_id');
            $table->string('event', 20);
            $table->json('old_values')->nullable();
            $table->json('new_values')->nullable();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('ip_address', 45)->nullable();
            $table->timestamps();
            $table->index(['auditable_type', 'auditable_id']);
        });
        if (!Schema::hasTable('cash_transactions')) Schema::create('cash_transactions', function (Blueprint $table) {
            $table->id();
            $table->string('reference_number')->unique();
            $table->string('source_type');
            $table->unsignedBigInteger('source_id');
            $table->enum('direction', ['credit', 'debit']);
            $table->unsignedBigInteger('amount');
            $table->string('payment_method')->default('cash');
            $table->date('transaction_date');
            $table->string('description')->nullable();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->timestamp('voided_at')->nullable();
            $table->foreignId('voided_by')->nullable()->constrained('users')->nullOnDelete();
            $table->string('void_reason')->nullable();
            $table->timestamps();
            $table->unique(['source_type', 'source_id']);
            $table->index(['transaction_date', 'direction', 'payment_method'], 'cash_tx_date_dir_method_idx');
        });
        if (!Schema::hasColumn('purchased_medicine_payments', 'receipt_number')) Schema::table('purchased_medicine_payments', function (Blueprint $table) {
            $table->string('receipt_number')->nullable()->unique()->after('id');
            $table->timestamp('voided_at')->nullable();
            $table->foreignId('voided_by')->nullable()->constrained('users')->nullOnDelete();
            $table->string('void_reason')->nullable();
        });
        if (!Schema::hasColumn('pharmacy_sales', 'receipt_number')) Schema::table('pharmacy_sales', function (Blueprint $table) {
            $table->string('receipt_number')->nullable()->unique()->after('id');
            $table->unsignedBigInteger('paid_amount')->default(0)->after('total_amount');
            $table->unsignedBigInteger('remaining_amount')->default(0)->after('paid_amount');
            $table->enum('payment_status', ['paid', 'partial', 'unpaid'])->default('paid');
        });
        if (Schema::hasTable('drugs') && !Schema::hasColumn('drugs', 'stock_quantity')) {
            Schema::table('drugs', function (Blueprint $table) {
                $table->integer('stock_quantity')->default(0);
                $table->integer('reorder_level')->default(10);
                $table->date('expiry_date')->nullable();
            });
        }
    }
    public function down(): void
    {
        if (Schema::hasTable('drugs')) Schema::table('drugs', fn (Blueprint $table) => $table->dropColumn(['stock_quantity', 'reorder_level', 'expiry_date']));
        Schema::table('pharmacy_sales', fn (Blueprint $table) => $table->dropColumn(['receipt_number', 'paid_amount', 'remaining_amount', 'payment_status']));
        Schema::table('purchased_medicine_payments', fn (Blueprint $table) => $table->dropColumn(['receipt_number', 'voided_at', 'voided_by', 'void_reason']));
        Schema::dropIfExists('cash_transactions');
        Schema::dropIfExists('financial_audit_logs');
    }
};
