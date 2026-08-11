<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TriageEntry extends Model
{
    protected $guarded = [];
    protected $casts = ['checked_in_at' => 'datetime', 'started_at' => 'datetime', 'completed_at' => 'datetime'];
    public function patient() { return $this->belongsTo(Patient::class); }
    public function appointment() { return $this->belongsTo(Appointment::class); }
}
