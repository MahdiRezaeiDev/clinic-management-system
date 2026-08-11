<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('patients', function (Blueprint $table) {
            $table->string('medical_record_number')->nullable()->unique();
            $table->date('date_of_birth')->nullable();
            $table->string('blood_group', 5)->nullable();
            $table->string('emergency_contact')->nullable();
            $table->text('allergies')->nullable();
            $table->text('chronic_conditions')->nullable();
        });
        Schema::create('appointments', function (Blueprint $table) {
            $table->id(); $table->foreignId('patient_id')->constrained()->cascadeOnDelete();
            $table->foreignId('doctor_id')->constrained('staff')->cascadeOnDelete();
            $table->dateTime('scheduled_at'); $table->unsignedSmallInteger('duration_minutes')->default(20);
            $table->enum('status',['scheduled','checked_in','in_progress','completed','cancelled','no_show'])->default('scheduled');
            $table->string('reason')->nullable(); $table->text('notes')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete(); $table->timestamps();
            $table->index(['doctor_id','scheduled_at']);
        });
        Schema::create('clinical_notes', function (Blueprint $table) {
            $table->id(); $table->foreignId('patient_id')->constrained()->cascadeOnDelete();
            $table->foreignId('visit_id')->nullable()->constrained('doctor_visits')->nullOnDelete();
            $table->foreignId('doctor_id')->nullable()->constrained('staff')->nullOnDelete();
            $table->string('diagnosis')->nullable(); $table->text('subjective')->nullable(); $table->text('objective')->nullable();
            $table->text('assessment')->nullable(); $table->text('plan')->nullable(); $table->json('vitals')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete(); $table->timestamps();
        });
        Schema::create('lab_tests', function (Blueprint $table) {
            $table->id(); $table->string('code')->unique(); $table->string('name'); $table->string('category')->nullable();
            $table->string('unit')->nullable(); $table->string('normal_range')->nullable(); $table->unsignedBigInteger('price')->default(0);
            $table->boolean('active')->default(true); $table->timestamps();
        });
        Schema::create('lab_orders', function (Blueprint $table) {
            $table->id(); $table->string('order_number')->unique(); $table->foreignId('patient_id')->constrained()->cascadeOnDelete();
            $table->foreignId('doctor_id')->nullable()->constrained('staff')->nullOnDelete(); $table->foreignId('visit_id')->nullable()->constrained('doctor_visits')->nullOnDelete();
            $table->date('ordered_at'); $table->enum('status',['ordered','sample_collected','processing','completed','cancelled'])->default('ordered');
            $table->text('clinical_notes')->nullable(); $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete(); $table->timestamps();
        });
        Schema::create('lab_order_items', function (Blueprint $table) {
            $table->id(); $table->foreignId('lab_order_id')->constrained()->cascadeOnDelete(); $table->foreignId('lab_test_id')->constrained()->restrictOnDelete();
            $table->string('result')->nullable(); $table->string('result_flag')->nullable(); $table->text('remarks')->nullable();
            $table->foreignId('verified_by')->nullable()->constrained('users')->nullOnDelete(); $table->timestamp('verified_at')->nullable(); $table->timestamps();
        });
        Schema::create('prescriptions', function (Blueprint $table) {
            $table->id(); $table->string('prescription_number')->unique(); $table->foreignId('patient_id')->constrained()->cascadeOnDelete();
            $table->foreignId('doctor_id')->nullable()->constrained('staff')->nullOnDelete(); $table->foreignId('visit_id')->nullable()->constrained('doctor_visits')->nullOnDelete();
            $table->date('prescribed_at'); $table->enum('status',['issued','partially_dispensed','dispensed','cancelled'])->default('issued');
            $table->text('notes')->nullable(); $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete(); $table->timestamps();
        });
        Schema::create('prescription_items', function (Blueprint $table) {
            $table->id(); $table->foreignId('prescription_id')->constrained()->cascadeOnDelete(); $table->foreignId('drug_id')->nullable()->constrained('drugs')->nullOnDelete();
            $table->string('drug_name'); $table->string('dose')->nullable(); $table->string('frequency')->nullable(); $table->string('duration')->nullable();
            $table->unsignedInteger('quantity')->default(1); $table->unsignedInteger('dispensed_quantity')->default(0); $table->text('instructions')->nullable(); $table->timestamps();
        });
        Schema::create('drug_batches', function (Blueprint $table) {
            $table->id(); $table->foreignId('drug_id')->constrained('drugs')->cascadeOnDelete(); $table->string('batch_number');
            $table->date('manufactured_at')->nullable(); $table->date('expires_at'); $table->integer('quantity_received'); $table->integer('quantity_available');
            $table->unsignedBigInteger('purchase_price')->default(0); $table->unsignedBigInteger('sale_price')->default(0);
            $table->foreignId('supplier_id')->nullable()->constrained()->nullOnDelete(); $table->timestamps(); $table->unique(['drug_id','batch_number']);
            $table->index(['expires_at','quantity_available']);
        });
        Schema::create('wards', function (Blueprint $table) { $table->id(); $table->string('name')->unique(); $table->string('type')->nullable(); $table->boolean('active')->default(true); $table->timestamps(); });
        Schema::create('rooms', function (Blueprint $table) { $table->id(); $table->foreignId('ward_id')->constrained()->cascadeOnDelete(); $table->string('number'); $table->string('type')->nullable(); $table->timestamps(); $table->unique(['ward_id','number']); });
        Schema::create('beds', function (Blueprint $table) { $table->id(); $table->foreignId('room_id')->constrained()->cascadeOnDelete(); $table->string('number'); $table->enum('status',['available','occupied','cleaning','maintenance'])->default('available'); $table->unsignedBigInteger('daily_rate')->default(0); $table->timestamps(); $table->unique(['room_id','number']); });
        Schema::create('admissions', function (Blueprint $table) {
            $table->id(); $table->string('admission_number')->unique(); $table->foreignId('patient_id')->constrained()->cascadeOnDelete();
            $table->foreignId('doctor_id')->nullable()->constrained('staff')->nullOnDelete(); $table->foreignId('bed_id')->nullable()->constrained()->nullOnDelete();
            $table->dateTime('admitted_at'); $table->dateTime('discharged_at')->nullable(); $table->enum('status',['admitted','transferred','discharged','cancelled'])->default('admitted');
            $table->string('reason')->nullable(); $table->text('discharge_summary')->nullable(); $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete(); $table->timestamps();
        });
        Schema::create('patient_invoices', function (Blueprint $table) {
            $table->id(); $table->string('invoice_number')->unique(); $table->foreignId('patient_id')->constrained()->cascadeOnDelete(); $table->foreignId('admission_id')->nullable()->constrained()->nullOnDelete();
            $table->date('invoice_date'); $table->unsignedBigInteger('subtotal')->default(0); $table->unsignedBigInteger('discount')->default(0); $table->unsignedBigInteger('total_amount')->default(0);
            $table->unsignedBigInteger('paid_amount')->default(0); $table->unsignedBigInteger('remaining_amount')->default(0); $table->enum('status',['draft','unpaid','partial','paid','cancelled'])->default('draft');
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete(); $table->timestamps();
        });
        Schema::create('patient_invoice_items', function (Blueprint $table) {
            $table->id(); $table->foreignId('patient_invoice_id')->constrained()->cascadeOnDelete(); $table->string('service_type'); $table->unsignedBigInteger('service_id')->nullable();
            $table->string('description'); $table->unsignedInteger('quantity')->default(1); $table->unsignedBigInteger('unit_price'); $table->unsignedBigInteger('subtotal'); $table->timestamps();
        });
        Schema::create('patient_invoice_payments', function (Blueprint $table) {
            $table->id(); $table->string('receipt_number')->unique(); $table->foreignId('patient_invoice_id')->constrained()->cascadeOnDelete();
            $table->date('payment_date'); $table->unsignedBigInteger('amount'); $table->string('payment_method')->default('cash'); $table->string('reference')->nullable();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete(); $table->timestamp('voided_at')->nullable(); $table->foreignId('voided_by')->nullable()->constrained('users')->nullOnDelete(); $table->string('void_reason')->nullable(); $table->timestamps();
        });
    }

    public function down(): void
    {
        foreach (['patient_invoice_payments','patient_invoice_items','patient_invoices','admissions','beds','rooms','wards','drug_batches','prescription_items','prescriptions','lab_order_items','lab_orders','lab_tests','clinical_notes','appointments'] as $table) Schema::dropIfExists($table);
        Schema::table('patients', fn(Blueprint $table) => $table->dropColumn(['medical_record_number','date_of_birth','blood_group','emergency_contact','allergies','chronic_conditions']));
    }
};
