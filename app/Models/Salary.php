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
        "amount_paid",
        "status"
    ];
}
