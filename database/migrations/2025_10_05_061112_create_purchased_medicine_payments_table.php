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
        Schema::create('purchased_medicine_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('purchased_medicine_id')->constrained('purchased_medicines')->cascadeOnDelete();
            $table->date('payment_date');
            $table->integer('amount');
            $table->enum('payment_method', ['cash', 'card'])->default('cash');
            $table->text('description')->nullable();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchased_medicine_payments');
    }
};
