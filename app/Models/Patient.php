<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Patient extends Model
{
    use HasFactory; // <-- this is required!
    protected $fillable = [
        "full_name",
        "phone",
        "address",
        "gender",
        "age"
        ,"medical_record_number","date_of_birth","blood_group","emergency_contact","allergies","chronic_conditions"
    ];

    public function appointments(){return $this->hasMany(Appointment::class);}
    public function visits(){return $this->hasMany(Visit::class);}
    public function clinicalNotes(){return $this->hasMany(ClinicalNote::class);}
    public function labOrders(){return $this->hasMany(LabOrder::class);}
    public function prescriptions(){return $this->hasMany(Prescription::class);}
    public function admissions(){return $this->hasMany(Admission::class);}
    public function invoices(){return $this->hasMany(PatientInvoice::class);}
}
