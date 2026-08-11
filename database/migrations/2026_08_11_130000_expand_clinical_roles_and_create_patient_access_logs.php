<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\{DB, Schema};
return new class extends Migration {
    public function up(): void {
        if (DB::getDriverName() === 'mysql') DB::statement("ALTER TABLE users MODIFY role ENUM('admin','manager','accountant','cashier','pharmacy','doctor','nurse','receptionist','laboratory','inventory','regular') NOT NULL DEFAULT 'regular'");
        Schema::create('patient_access_logs', function(Blueprint $table){$table->id();$table->foreignId('patient_id')->constrained()->cascadeOnDelete();$table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();$table->string('action')->default('view');$table->string('ip_address',45)->nullable();$table->text('user_agent')->nullable();$table->timestamps();$table->index(['patient_id','created_at']);});
    }
    public function down(): void { Schema::dropIfExists('patient_access_logs'); }
};
