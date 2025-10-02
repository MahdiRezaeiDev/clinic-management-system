<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Staff extends Model
{
    use HasFactory; // <-- this is required!
    protected $fillable = ['full_name', 'phone', 'role', 'base_salary'];

    public function salaries()
    {
        return $this->hasMany(Salary::class);
    }
}
