<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Admission extends Model { protected $guarded=[]; protected $casts=['admitted_at'=>'datetime','discharged_at'=>'datetime']; public function bed(){return $this->belongsTo(Bed::class);} public function doctor(){return $this->belongsTo(Staff::class);} }
