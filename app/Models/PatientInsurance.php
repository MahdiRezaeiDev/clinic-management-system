<?php
namespace App\Models; use Illuminate\Database\Eloquent\Model;
class PatientInsurance extends Model {protected $guarded=[];protected $casts=['expires_at'=>'date','active'=>'boolean'];public function insurer(){return $this->belongsTo(Insurer::class);}}
