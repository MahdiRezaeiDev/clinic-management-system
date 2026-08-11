<?php
namespace App\Models;use Illuminate\Database\Eloquent\Model;class InventoryMovement extends Model{protected $guarded=[];public function drug(){return $this->belongsTo(Drug::class);}public function batch(){return $this->belongsTo(DrugBatch::class,'drug_batch_id');}}
