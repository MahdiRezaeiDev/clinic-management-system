<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class FinancialAuditLog extends Model
{
    protected $guarded = [];
    protected $casts = ['old_values' => 'array', 'new_values' => 'array'];
}
