<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchasedMedicineItem extends Model
{
    use HasFactory;

    protected $table = 'purchased_medicine_items';

    public function purchase()
    {
        return $this->belongsTo(PurchasedMedicine::class, 'purchased_medicine_id');
    }

    // optional: you can have a calculated total price if quantity * price
    public function getTotalPriceAttribute()
    {
        return $this->quantity * $this->price;
    }
}
