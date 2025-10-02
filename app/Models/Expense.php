<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Expense extends Model
{
    use HasFactory; // <-- this is required!
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
