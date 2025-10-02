<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Supplier extends Model
{
    use HasFactory; // <-- this is required!
    protected $fillable = [
        "company_name",
        "contact_person",
        "phone",
        "address"
    ];
}
