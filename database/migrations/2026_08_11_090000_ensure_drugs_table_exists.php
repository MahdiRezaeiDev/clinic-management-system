<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        if (!Schema::hasTable('drugs')) Schema::create('drugs', function (Blueprint $table) {
            $table->id(); $table->string('brand_name'); $table->string('composition')->nullable(); $table->string('dosage_form')->nullable();
            $table->string('market_auth_holder')->nullable(); $table->string('manufacturer')->nullable(); $table->string('reg_date')->nullable();
            $table->string('brand_name_fa')->nullable(); $table->string('composition_fa')->nullable(); $table->string('dosage_form_fa')->nullable();
            $table->integer('stock_quantity')->default(0); $table->integer('reorder_level')->default(10); $table->date('expiry_date')->nullable(); $table->timestamps();
        });
    }
    public function down(): void {}
};
