<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
 public function up():void{Schema::create('admission_transfers',function(Blueprint $t){$t->id();$t->foreignId('admission_id')->constrained()->cascadeOnDelete();$t->foreignId('from_bed_id')->nullable()->constrained('beds')->nullOnDelete();$t->foreignId('to_bed_id')->constrained('beds')->restrictOnDelete();$t->dateTime('started_at');$t->dateTime('ended_at')->nullable();$t->string('reason')->nullable();$t->foreignId('transferred_by')->nullable()->constrained('users')->nullOnDelete();$t->timestamps();$t->index(['admission_id','started_at']);});}
 public function down():void{Schema::dropIfExists('admission_transfers');}
};
