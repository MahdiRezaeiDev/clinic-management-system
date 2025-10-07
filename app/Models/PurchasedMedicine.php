<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\PurchasedMedicineItem;

class PurchasedMedicine extends Model
{
    use HasFactory;

    protected $table = 'purchased_medicines';

    // One purchase has many items
    public function items()
    {
        return $this->hasMany(PurchasedMedicineItem::class, 'purchase_id');
    }

    // One purchase has many payments
    public function payments()
    {
        return $this->hasMany(PurchasedMedicinePayment::class, 'purchase_id');
    }

    // Total amount for this purchase
    public function getTotalAmountAttribute()
    {
        return $this->items()->sum('total_price'); // assuming each item has total_price
    }

    // Total paid for this purchase
    public function getTotalPaidAttribute()
    {
        return $this->payments()->sum('amount');
    }

    // Remaining amount
    public function getRemainingAttribute()
    {
        return $this->total_amount - $this->total_paid;
    }
}
