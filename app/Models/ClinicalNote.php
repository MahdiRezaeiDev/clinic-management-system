<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class ClinicalNote extends Model { protected $guarded=[]; protected $casts=['vitals'=>'array']; public function doctor(){return $this->belongsTo(Staff::class);} }
