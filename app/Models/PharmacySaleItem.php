<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PharmacySaleItem extends Model
{
    use HasFactory; // <-- this is required!
    protected $fillable = [
        "pharmacy_sale_id",
        "drug_name",
        "quantity",
        "unit_price",
        "subtotal",

    ];
}
