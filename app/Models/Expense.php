<?php

namespace App\Models;

use App\Casts\JalaliDateCast;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Expense extends Model
{
    use HasFactory;
    protected $fillable = ['category', 'amount', 'payment_method', 'expense_date', 'description', 'user_id'];

    public function casts(): array
    {
        return [
            'expense_date' => JalaliDateCast::class
        ];
    }
}
