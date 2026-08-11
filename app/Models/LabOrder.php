<?php
namespace App\Models;
use App\Casts\JalaliDateCast;
use Illuminate\Database\Eloquent\Model;
class LabOrder extends Model { protected $guarded=[]; protected function casts():array{return ['ordered_at'=>JalaliDateCast::class];} public function items(){return $this->hasMany(LabOrderItem::class);} public function doctor(){return $this->belongsTo(Staff::class);} }
