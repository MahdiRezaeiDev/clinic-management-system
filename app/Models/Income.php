<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Income extends Model
{
    protected $fillable = [
        "category",
        "patient_id",
        "doctor_id",
        "user_id",
        "amount",
        "payment_method",
        "description"
    ];
}
