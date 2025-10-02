<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Overtime extends Model
{
    protected $fillable = [
        "staff_id",
        "hours",
        "rate_per_hour",
        "total_amount",
        "date_paid"
    ];
}
