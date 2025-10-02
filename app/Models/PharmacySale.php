<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PharmacySale extends Model
{
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
