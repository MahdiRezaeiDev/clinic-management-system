<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Patient extends Model
{
    use HasFactory; // <-- this is required!
    protected $fillable = [
        "full_name",
        "phone",
        "address",
        "gender",
        "age"
    ];
}
