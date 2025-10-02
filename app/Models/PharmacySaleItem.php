<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PharmacySaleItem extends Model
{
    protected $fillable = [
        "sale_id",
        "drug_name",
        "quantity",
        "unit_price",
        "subtotal"
    ];
}
