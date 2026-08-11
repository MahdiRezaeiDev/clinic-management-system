<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class AdmissionTransfer extends Model {protected $guarded=[];protected $casts=['started_at'=>'datetime','ended_at'=>'datetime'];public function fromBed(){return $this->belongsTo(Bed::class,'from_bed_id');}public function toBed(){return $this->belongsTo(Bed::class,'to_bed_id');}}
