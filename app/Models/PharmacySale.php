<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PharmacySale extends Model
{
    use HasFactory; // <-- this is required!
    protected $fillable = [
        "sale_type",
        "patient_id",
        "doctor_id",
        "pharmacist_id",
        "user_id",
        "total_amount",
        "payment_method",
        "description"
    ];
}
