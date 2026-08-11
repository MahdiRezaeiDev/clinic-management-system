<?php

namespace App\Models;

use App\Casts\JalaliDateCast;
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
        "user_id",
        "receipt_number",
        "voided_at",
        "voided_by",
        "void_reason"
    ];

    public function purchase()
    {
        return $this->belongsTo(PurchasedMedicine::class, 'purchased_medicine_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function casts(): array
    {
        return [
            'payment_date' => JalaliDateCast::class,
            'voided_at' => 'datetime',
        ];
    }
}
