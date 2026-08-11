<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
 public function up():void{
  Schema::create('patient_documents',function(Blueprint $t){$t->id();$t->foreignId('patient_id')->constrained()->cascadeOnDelete();$t->string('category');$t->string('title');$t->string('path');$t->string('mime_type')->nullable();$t->unsignedBigInteger('size')->default(0);$t->foreignId('uploaded_by')->nullable()->constrained('users')->nullOnDelete();$t->timestamps();});
  Schema::create('insurers',function(Blueprint $t){$t->id();$t->string('name');$t->string('code')->unique();$t->string('phone')->nullable();$t->boolean('active')->default(true);$t->timestamps();});
  Schema::create('patient_insurances',function(Blueprint $t){$t->id();$t->foreignId('patient_id')->constrained()->cascadeOnDelete();$t->foreignId('insurer_id')->constrained()->restrictOnDelete();$t->string('policy_number');$t->unsignedTinyInteger('coverage_percent')->default(0);$t->date('expires_at')->nullable();$t->boolean('active')->default(true);$t->timestamps();$t->unique(['insurer_id','policy_number']);});
  Schema::create('service_tariffs',function(Blueprint $t){$t->id();$t->string('code')->unique();$t->string('name');$t->string('category');$t->unsignedBigInteger('price');$t->foreignId('insurer_id')->nullable()->constrained()->cascadeOnDelete();$t->unsignedBigInteger('insurance_price')->nullable();$t->date('effective_from');$t->boolean('active')->default(true);$t->timestamps();});
 }
 public function down():void{foreach(['service_tariffs','patient_insurances','insurers','patient_documents'] as $table)Schema::dropIfExists($table);}
};
