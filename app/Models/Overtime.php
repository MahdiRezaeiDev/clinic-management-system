<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Overtime extends Model
{
    use HasFactory; // <-- this is required!
    protected $fillable = [
        "staff_id",
        "salary_id",
        "date",
        "hours",
        "rate",
        "total",
        "approved_by",
        "description",
    ];

    public function salary()
    {
        return $this->belongsTo(Salary::class);
    }
}
