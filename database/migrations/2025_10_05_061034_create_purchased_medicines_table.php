<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('purchased_medicines', function (Blueprint $table) {
            $table->id();
            $table->foreignId('supplier_id')->constrained('suppliers')->cascadeOnDelete();
            $table->integer('total_amount');
            $table->integer('paid_amount')->default(0);
            $table->integer('remaining_amount')->default(0);
            $table->date('purchase_date');
            $table->text('description')->nullable();
            $table->enum('status', ['paid', 'partial', 'unpaid'])->default('unpaid');
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchased_medicines');
    }
};
