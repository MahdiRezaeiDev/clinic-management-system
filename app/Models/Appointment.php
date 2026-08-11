<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Appointment extends Model { protected $guarded=[]; protected $casts=['scheduled_at'=>'datetime']; public function doctor(){return $this->belongsTo(Staff::class);} public function patient(){return $this->belongsTo(Patient::class);} public function triageEntry(){return $this->hasOne(TriageEntry::class);} }
