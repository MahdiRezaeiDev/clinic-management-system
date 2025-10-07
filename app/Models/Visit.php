<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Visit extends Model
{
    protected $table = 'doctor_visits';
    protected $fillable = [
        'doctor_id',
        'date',
        'fee',
        'description',
    ];
}
