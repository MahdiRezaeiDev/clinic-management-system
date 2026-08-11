<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class PrescriptionItem extends Model { protected $guarded=[]; public function drug(){return $this->belongsTo(Drug::class);} }
