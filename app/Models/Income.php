<?php

namespace App\Models;

use App\Casts\JalaliDateCast;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Income extends Model
{
    use HasFactory; // <-- this is required!

    protected $fillable = [
        "category",
        "patient_id",
        "doctor_id",
        "user_id",
        "amount",
        "payment_method",
        "description",
        "income_date"
    ];

    public function casts(): array
    {
        return [
            'income_date' => JalaliDateCast::class
        ];
    }
}
