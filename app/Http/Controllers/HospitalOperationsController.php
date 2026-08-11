<?php
namespace App\Http\Controllers;

use App\Models\{Admission,AdmissionTransfer,Bed,PatientInvoice,PatientInvoicePayment,Room,Ward};
use App\Services\PatientBillingService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\{Auth,DB};
use Inertia\Inertia;

class HospitalOperationsController extends Controller
{
 public function index(){ $wards=Ward::with(['rooms.beds'])->orderBy('name')->get();$admissions=Admission::with(['patient','doctor','bed.room.ward','transfers.fromBed','transfers.toBed'])->whereIn('status',['admitted','transferred'])->latest('admitted_at')->get();$beds=$wards->flatMap(fn($w)=>$w->rooms->flatMap->beds);$discharged=Admission::where('status','discharged')->whereNotNull('discharged_at')->get();return Inertia::render('Hospital/BedBoard',['wards'=>$wards,'admissions'=>$admissions,'stats'=>['total'=>$beds->count(),'occupied'=>$beds->where('status','occupied')->count(),'available'=>$beds->where('status','available')->count(),'cleaning'=>$beds->where('status','cleaning')->count(),'maintenance'=>$beds->where('status','maintenance')->count(),'occupancy_rate'=>$beds->count()?round($beds->where('status','occupied')->count()*100/$beds->count(),1):0,'average_stay_days'=>$discharged->count()?round($discharged->avg(fn($a)=>max(1,$a->admitted_at->diffInHours($a->discharged_at)/24)),1):0]]);}
 public function ward(Request $r){$d=$r->validate(['name'=>'required|string|max:100|unique:wards,name','type'=>'nullable|string|max:100']);Ward::create($d);return back()->with('success','بخش ایجاد شد.');}
 public function room(Request $r,Ward $ward){$d=$r->validate(['number'=>'required|string|max:30','type'=>'nullable|string|max:100']);$ward->rooms()->create($d);return back()->with('success','اتاق ایجاد شد.');}
 public function bed(Request $r,Room $room){$d=$r->validate(['number'=>'required|string|max:30','daily_rate'=>'required|integer|min:0']);$room->beds()->create($d);return back()->with('success','تخت ایجاد شد.');}
 public function bedStatus(Request $r,Bed $bed){$d=$r->validate(['status'=>'required|in:available,cleaning,maintenance']);abort_if($bed->status==='occupied',422,'تخت اشغال را نمی‌توان مستقیم تغییر داد.');$bed->update($d);return back();}
 public function transfer(Request $r,Admission $admission){$d=$r->validate(['bed_id'=>'required|exists:beds,id','reason'=>'required|string|max:255']);DB::transaction(function()use($admission,$d){$new=Bed::lockForUpdate()->findOrFail($d['bed_id']);abort_if($new->status!=='available',422,'تخت مقصد آزاد نیست.');$old=Bed::lockForUpdate()->find($admission->bed_id);$admission->transfers()->whereNull('ended_at')->update(['ended_at'=>now()]);$admission->transfers()->create(['from_bed_id'=>$old?->id,'to_bed_id'=>$new->id,'started_at'=>now(),'reason'=>$d['reason'],'transferred_by'=>Auth::id()]);$old?->update(['status'=>'cleaning']);$new->update(['status'=>'occupied']);$admission->update(['bed_id'=>$new->id,'status'=>'transferred']);});return back()->with('success','مریض انتقال یافت.');}
 public function syncInvoice(Admission $admission,PatientBillingService $billing){$invoice=$billing->syncAdmission($admission);return redirect()->route('patients.show',$admission->patient_id)->with('success','صورتحساب '.$invoice->invoice_number.' به‌روزرسانی شد.');}
 public function voidPayment(Request $r,PatientInvoicePayment $payment){$d=$r->validate(['reason'=>'required|string|max:255']);DB::transaction(function()use($payment,$d){$payment->update(['voided_at'=>now(),'voided_by'=>Auth::id(),'void_reason'=>$d['reason']]);$invoice=PatientInvoice::findOrFail($payment->patient_invoice_id);$paid=(int)$invoice->payments()->sum('amount');$remaining=max(0,$invoice->total_amount-$paid);$invoice->update(['paid_amount'=>$paid,'remaining_amount'=>$remaining,'status'=>$remaining===0?'paid':($paid>0?'partial':'unpaid')]);});return back()->with('success','پرداخت ابطال شد.');}
}
