<?php
namespace App\Services;
use App\Models\{Admission,PatientInvoice};
use Illuminate\Support\Facades\DB;

class PatientBillingService
{
 public function syncAdmission(Admission $admission):PatientInvoice
 {
  return DB::transaction(function()use($admission){
   $admission->load(['patient.visits','patient.labOrders.items.test','patient.prescriptions.items.drug','transfers.toBed']);
   $invoice=PatientInvoice::firstOrCreate(['admission_id'=>$admission->id],['invoice_number'=>'INV-'.now()->format('YmdHis').'-'.$admission->patient_id,'patient_id'=>$admission->patient_id,'invoice_date'=>gregorianToJalali(now()),'status'=>'unpaid']);
   foreach($admission->transfers as $segment){$end=$segment->ended_at??$admission->discharged_at??now();$days=max(1,(int)ceil($segment->started_at->diffInHours($end)/24));$this->item($invoice,'bed',$segment->id,'اقامت تخت '.$segment->toBed?->number,$days,(int)$segment->toBed?->daily_rate);}
   $start=$admission->admitted_at;$end=$admission->discharged_at??now();
   foreach($admission->patient->visits->filter(fn($v)=>$v->getRawOriginal('visit_date')>=$start->toDateString()&&$v->getRawOriginal('visit_date')<=$end->toDateString()) as $v)$this->item($invoice,'visit',$v->id,'ویزیت داکتر',1,(int)$v->fee);
   foreach($admission->patient->labOrders->filter(fn($o)=>$o->getRawOriginal('ordered_at')>=$start->toDateString()&&$o->getRawOriginal('ordered_at')<=$end->toDateString()) as $o)foreach($o->items as $i)$this->item($invoice,'lab',$i->id,'آزمایش '.$i->test?->name,1,(int)$i->test?->price);
   foreach($admission->patient->prescriptions->filter(fn($p)=>$p->getRawOriginal('prescribed_at')>=$start->toDateString()&&$p->getRawOriginal('prescribed_at')<=$end->toDateString()) as $p)foreach($p->items as $i){$price=(int)(\App\Models\DrugBatch::where('drug_id',$i->drug_id)->where('quantity_available','>',0)->orderBy('expires_at')->value('sale_price')??0);$this->item($invoice,'medicine',$i->id,'دوا '.$i->drug_name,(int)$i->quantity,$price);}
   $subtotal=(int)$invoice->items()->sum('subtotal');$total=max(0,$subtotal-(int)$invoice->discount);$paid=(int)$invoice->payments()->sum('amount');$remaining=max(0,$total-$paid);$invoice->update(['subtotal'=>$subtotal,'total_amount'=>$total,'paid_amount'=>$paid,'remaining_amount'=>$remaining,'status'=>$remaining===0?'paid':($paid>0?'partial':'unpaid')]);return $invoice->fresh(['items','payments']);
  });
 }
 private function item(PatientInvoice $invoice,string $type,int $id,string $description,int $quantity,int $price):void{$invoice->items()->updateOrCreate(['service_type'=>$type,'service_id'=>$id],['description'=>$description,'quantity'=>$quantity,'unit_price'=>$price,'subtotal'=>$quantity*$price]);}
}
