<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\PurchasedMedicineItem;

class PurchasedMedicine extends Model
{
    use HasFactory;

    protected $table = 'purchased_medicines';

    protected $fillable = [
        "supplier_id",
        "total_amount",
        "paid_amount",
        "remaining_amount",
        "purchase_date",
        "description",
        "status",
        "user_id"
    ];

    // One purchase has many items
    public function items()
    {
        return $this->hasMany(PurchasedMedicineItem::class, 'purchased_medicine_id');
    }

    /**
     * Get the supplier (partner company) for this purchase.
     */
    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    // One purchase has many payments
    public function payments()
    {
        return $this->hasMany(PurchasedMedicinePayment::class, 'purchased_medicine_id');
    }

    // Total amount for this purchase
    public function getTotalAmountAttribute()
    {
        return $this->items()->sum('subtotal'); // assuming each item has total_price
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
