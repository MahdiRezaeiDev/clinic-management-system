<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('triage_entries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->constrained()->cascadeOnDelete();
            $table->foreignId('appointment_id')->nullable()->constrained()->nullOnDelete();
            $table->unsignedInteger('queue_number');
            $table->enum('priority', ['resuscitation', 'very_urgent', 'urgent', 'standard', 'non_urgent'])->default('standard');
            $table->enum('status', ['waiting', 'in_progress', 'completed', 'cancelled'])->default('waiting');
            $table->decimal('temperature', 4, 1)->nullable();
            $table->string('blood_pressure', 15)->nullable();
            $table->unsignedSmallInteger('pulse')->nullable();
            $table->unsignedSmallInteger('respiratory_rate')->nullable();
            $table->unsignedTinyInteger('oxygen_saturation')->nullable();
            $table->decimal('weight', 5, 2)->nullable();
            $table->decimal('height', 5, 2)->nullable();
            $table->unsignedTinyInteger('pain_score')->nullable();
            $table->text('chief_complaint')->nullable();
            $table->text('notes')->nullable();
            $table->timestamp('checked_in_at');
            $table->timestamp('started_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->index(['status', 'priority', 'checked_in_at']);
            $table->unique(['queue_number', 'checked_in_at']);
        });
    }

    public function down(): void { Schema::dropIfExists('triage_entries'); }
};
