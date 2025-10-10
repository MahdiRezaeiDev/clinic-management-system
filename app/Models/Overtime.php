<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Overtime extends Model
{
    use HasFactory; // <-- this is required!
    protected $fillable = [
        "staff_id",
        "hours",
        "rate_per_hour",
        "total_amount",
        "date_paid"
    ];

    public function salary()
    {
        return $this->belongsTo(Salary::class);
    }
}
