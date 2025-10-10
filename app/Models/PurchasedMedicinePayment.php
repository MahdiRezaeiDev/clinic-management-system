<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchasedMedicinePayment extends Model
{
    use HasFactory;

    protected $table = 'purchased_medicine_payments';

    protected $fillable = [
        "purchased_medicine_id",
        "payment_date",
        "amount",
        "payment_method",
        "description",
        "user_id"
    ];

    public function purchase()
    {
        return $this->belongsTo(PurchasedMedicine::class, 'purchased_medicine_id');
    }
}
