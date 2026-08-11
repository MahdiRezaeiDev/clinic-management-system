<?php
namespace App\Models;
use App\Casts\JalaliDateCast;
use Illuminate\Database\Eloquent\Model;
class PatientInvoice extends Model { protected $guarded=[]; protected function casts():array{return ['invoice_date'=>JalaliDateCast::class];} public function items(){return $this->hasMany(PatientInvoiceItem::class);} public function payments(){return $this->hasMany(PatientInvoicePayment::class)->whereNull('voided_at');} }
