<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void { Schema::create('backup_runs', function (Blueprint $table) { $table->id(); $table->string('status'); $table->string('filename')->nullable(); $table->unsignedBigInteger('size')->nullable(); $table->unsignedInteger('tables_count')->nullable(); $table->text('message')->nullable(); $table->timestamp('started_at'); $table->timestamp('finished_at')->nullable(); $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete(); $table->timestamps(); }); }
    public function down(): void { Schema::dropIfExists('backup_runs'); }
};
