<?php
namespace App\Models;
use App\Casts\JalaliDateCast;
use Illuminate\Database\Eloquent\Model;
class Prescription extends Model { protected $guarded=[]; protected function casts():array{return ['prescribed_at'=>JalaliDateCast::class];} public function items(){return $this->hasMany(PrescriptionItem::class);} public function doctor(){return $this->belongsTo(Staff::class);} }
