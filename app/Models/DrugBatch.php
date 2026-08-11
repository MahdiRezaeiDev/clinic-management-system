<?php
namespace App\Models;
use App\Casts\JalaliDateCast;
use Illuminate\Database\Eloquent\Model;
class DrugBatch extends Model { protected $guarded=[]; protected function casts():array{return ['manufactured_at'=>JalaliDateCast::class,'expires_at'=>JalaliDateCast::class];} public function drug(){return $this->belongsTo(Drug::class);} }
