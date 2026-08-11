<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class LabOrderItem extends Model { protected $guarded=[]; protected $casts=['verified_at'=>'datetime']; public function test(){return $this->belongsTo(LabTest::class,'lab_test_id');} public function labOrder(){return $this->belongsTo(LabOrder::class);} }
