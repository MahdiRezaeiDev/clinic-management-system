<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $patients = Patient::query()->when($request->search, fn($q,$search)=>$q->where(fn($x)=>$x->where('full_name','like',"%{$search}%")->orWhere('phone','like',"%{$search}%")->orWhere('medical_record_number','like',"%{$search}%")))->latest()->paginate(30)->withQueryString();
        return Inertia::render('Patients/Index',['patients'=>$patients,'search'=>$request->search]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data=$request->validate(['full_name'=>'required|string|max:255','phone'=>'nullable|string|max:30','address'=>'nullable|string|max:500','gender'=>'nullable|in:male,female','age'=>'nullable|integer|min:0|max:130','blood_group'=>'nullable|string|max:5','emergency_contact'=>'nullable|string|max:255','allergies'=>'nullable|string','chronic_conditions'=>'nullable|string']);
        $patient=Patient::create($data+['medical_record_number'=>'MRN-'.now()->format('ymd').'-'.strtoupper(bin2hex(random_bytes(3)))]);
        return redirect()->route('patients.show',$patient);
    }

    /**
     * Display the specified resource.
     */
    public function show(Patient $patient)
    {
        \App\Models\PatientAccessLog::create(['patient_id'=>$patient->id,'user_id'=>Auth::id(),'action'=>'view','ip_address'=>request()->ip(),'user_agent'=>substr((string)request()->userAgent(),0,1000)]);
        $patient->load(['appointments'=>fn($q)=>$q->with('doctor')->latest('scheduled_at'),'visits'=>fn($q)=>$q->with('doctor')->latest('visit_date'),'clinicalNotes'=>fn($q)=>$q->with('doctor')->latest(),'labOrders'=>fn($q)=>$q->with(['doctor','items.test'])->latest(),'prescriptions'=>fn($q)=>$q->with(['doctor','items'])->latest(),'admissions'=>fn($q)=>$q->with(['doctor','bed.room.ward','transfers.fromBed.room','transfers.toBed.room'])->latest(),'invoices'=>fn($q)=>$q->with(['items','payments'])->latest(),'documents'=>fn($q)=>$q->latest(),'insurances.insurer']);
        return Inertia::render('Patients/Chart',['patient'=>$patient,'doctors'=>\App\Models\Staff::whereIn('role',['doctor','dentist','emergency'])->get(),'labTests'=>\App\Models\LabTest::where('active',true)->get(),'drugs'=>\App\Models\Drug::orderBy('brand_name')->limit(500)->get(),'beds'=>\App\Models\Bed::with('room.ward')->where('status','available')->get(),'accessLogs'=>Auth::user()?->role==='admin'?\App\Models\PatientAccessLog::with('user:id,name')->where('patient_id',$patient->id)->latest()->limit(30)->get():[]]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Patient $patient)
    {
        $data=$request->validate(['full_name'=>'required|string|max:255','phone'=>'nullable|string|max:30','address'=>'nullable|string|max:500','gender'=>'nullable|in:male,female','age'=>'nullable|integer|min:0|max:130','blood_group'=>'nullable|string|max:5','emergency_contact'=>'nullable|string|max:255','allergies'=>'nullable|string','chronic_conditions'=>'nullable|string']);
        $patient->update($data); return back()->with('success','پرونده مریض به‌روزرسانی شد.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Patient $patient)
    {
        abort_unless(Auth::user()?->role==='admin',403); $patient->delete(); return redirect()->route('patients.index');
    }
}
