<?php

namespace App\Models;

use App\Casts\JalaliDateCast;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Drug extends Model
{
    use HasFactory;

    protected $fillable = [
        'brand_name',
        'composition',
        'dosage_form',
        'market_auth_holder',
        'manufacturer',
        'reg_date',
        'brand_name_fa',
        'composition_fa',
        'dosage_form_fa',
        'stock_quantity',
        'reorder_level',
        'expiry_date',
    ];

    protected $casts = ['expiry_date' => JalaliDateCast::class];
}
