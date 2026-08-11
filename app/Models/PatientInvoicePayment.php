<?php
namespace App\Models;
use App\Casts\JalaliDateCast;
use Illuminate\Database\Eloquent\Model;
class PatientInvoicePayment extends Model { protected $guarded=[]; protected function casts():array{return ['payment_date'=>JalaliDateCast::class,'voided_at'=>'datetime'];} }
