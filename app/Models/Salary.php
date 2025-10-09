<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Salary extends Model
{
    use HasFactory; // <-- this is required!
    protected $fillable = [
        "staff_id",
        "salary_month",
        "base_salary",
        "overtime_amount",
        "deductions",
        "total_paid",
        "payment_date",
        "description"
    ];

    public function overtimes()
    {
        return $this->hasMany(Overtime::class);
    }
}
