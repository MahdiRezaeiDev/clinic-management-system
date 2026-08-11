<?php

namespace App\Models;

use App\Casts\JalaliDateCast;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PharmacySale extends Model
{
    use HasFactory; // <-- this is required!
    protected $fillable = [
        "sale_type",
        "sale_date",
        "patient_id",
        "doctor_id",
        "pharmacist_id",
        "user_id",
        "total_amount",
        "paid_amount",
        "remaining_amount",
        "payment_status",
        "receipt_number",
        "payment_method",
        "description"
    ];

    public function items()
    {
        return $this->hasMany(PharmacySaleItem::class);
    }

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function doctor()
    {
        return $this->belongsTo(Staff::class, 'doctor_id');
    }

    public function casts(): array
    {
        return [
            'sale_date' => JalaliDateCast::class
        ];
    }
}
