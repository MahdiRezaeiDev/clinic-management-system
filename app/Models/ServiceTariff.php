<?php
namespace App\Models; use Illuminate\Database\Eloquent\Model;
class ServiceTariff extends Model {protected $guarded=[];protected $casts=['effective_from'=>'date','active'=>'boolean'];public function insurer(){return $this->belongsTo(Insurer::class);}}
