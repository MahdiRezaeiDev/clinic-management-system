<?php
namespace App\Http\Controllers;
use App\Models\{Insurer,Patient,ServiceTariff};use Illuminate\Http\Request;use Inertia\Inertia;
class HospitalCatalogController extends Controller{
 public function index(){return Inertia::render('Hospital/Catalog',['insurers'=>Insurer::latest()->get(),'tariffs'=>ServiceTariff::with('insurer')->latest()->get()]);}
 public function insurer(Request $r){Insurer::create($r->validate(['name'=>'required|string|max:255','code'=>'required|string|max:50|unique:insurers','phone'=>'nullable|string|max:30']));return back();}
 public function tariff(Request $r){$d=$r->validate(['code'=>'required|string|max:50|unique:service_tariffs','name'=>'required|string|max:255','category'=>'required|string|max:100','price'=>'required|integer|min:0','insurer_id'=>'nullable|exists:insurers,id','insurance_price'=>'nullable|integer|min:0','effective_from'=>'required|date_format:Y/m/d']);$d['effective_from']=jalaliToGregorian($d['effective_from']);ServiceTariff::create($d);return back();}
 public function patientInsurance(Request $r,Patient $patient){$d=$r->validate(['insurer_id'=>'required|exists:insurers,id','policy_number'=>'required|string|max:100','coverage_percent'=>'required|integer|min:0|max:100','expires_at'=>'nullable|date_format:Y/m/d']);if(!empty($d['expires_at']))$d['expires_at']=jalaliToGregorian($d['expires_at']);$patient->insurances()->create($d);return back();}
}
