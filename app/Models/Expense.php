<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    protected $fillable = [
        "category",
        "staff_id",
        "supplier_id",
        "user_id",
        "amount",
        "expense_date",
        "description"
    ];
}
