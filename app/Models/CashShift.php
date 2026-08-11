<?php
namespace App\Models;use Illuminate\Database\Eloquent\Model;
class CashShift extends Model{protected $guarded=[];protected $casts=['opened_at'=>'datetime','closed_at'=>'datetime'];public function user(){return $this->belongsTo(User::class);}public function transactions(){return $this->hasMany(CashTransaction::class);}}
