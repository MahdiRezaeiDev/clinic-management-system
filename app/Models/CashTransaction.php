<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class CashTransaction extends Model
{
    protected $guarded = [];
    protected $casts = ['transaction_date' => 'date', 'voided_at' => 'datetime'];
    public function scopeActive($query) { return $query->whereNull('voided_at'); }
}
