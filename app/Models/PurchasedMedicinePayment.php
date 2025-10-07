<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchasedMedicinePayment extends Model
{
    use HasFactory;

    protected $table = 'purchased_medicine_payments';

    public function purchase()
    {
        return $this->belongsTo(PurchasedMedicine::class, 'purchase_id');
    }
}
