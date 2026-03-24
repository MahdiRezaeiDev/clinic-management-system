<?php

namespace App\Models;

use App\Casts\JalaliDateCast;
use Illuminate\Database\Eloquent\Model;

class Visit extends Model
{
    protected $table = 'doctor_visits';
    protected $fillable = [
        'doctor_id',
        'patient_id',
        'visit_date',
        'fee',
        'description',
        'user_id'
    ];


    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function doctor()
    {
        return $this->belongsTo(Staff::class);
    }

    public function casts(): array
    {
        return ['visit_date' => JalaliDateCast::class];
    }
}
