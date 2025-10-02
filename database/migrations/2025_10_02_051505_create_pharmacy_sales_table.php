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
        Schema::create('pharmacy_sales', function (Blueprint $table) {
            $table->id();
            $table->enum('sale_type', ['prescription', 'otc']);
            $table->foreignId('patient_id')->nullable()->constrained('patients')->nullOnDelete();
            $table->foreignId('doctor_id')->nullable()->constrained('staff')->nullOnDelete();
            $table->foreignId('pharmacist_id')->constrained('staff')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->dateTime('sale_date')->useCurrent();
            $table->decimal('total_amount', 12, 2);
            $table->enum('payment_method', ['cash', 'card', 'insurance'])->default('cash');
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pharmacy_sales');
    }
};
