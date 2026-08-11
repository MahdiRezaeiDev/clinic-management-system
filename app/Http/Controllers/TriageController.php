<?php

namespace App\Http\Controllers;

use App\Models\{Patient, TriageEntry};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\{Auth, DB};
use Inertia\Inertia;

class TriageController extends Controller
{
    public function index()
    {
        $entries = TriageEntry::with('patient')->whereDate('checked_in_at', today())
            ->orderByRaw("CASE priority WHEN 'resuscitation' THEN 1 WHEN 'very_urgent' THEN 2 WHEN 'urgent' THEN 3 WHEN 'standard' THEN 4 ELSE 5 END")
            ->orderBy('queue_number')->get();

        return Inertia::render('Hospital/Triage', [
            'entries' => $entries,
            'patients' => Patient::latest()->limit(500)->get(['id', 'full_name', 'medical_record_number', 'phone']),
            'stats' => ['waiting' => $entries->where('status', 'waiting')->count(), 'in_progress' => $entries->where('status', 'in_progress')->count(), 'completed' => $entries->where('status', 'completed')->count(), 'urgent' => $entries->whereIn('priority', ['resuscitation', 'very_urgent', 'urgent'])->whereIn('status', ['waiting', 'in_progress'])->count()],
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'patient_id' => 'required|exists:patients,id', 'priority' => 'required|in:resuscitation,very_urgent,urgent,standard,non_urgent',
            'temperature' => 'nullable|numeric|min:25|max:45', 'blood_pressure' => ['nullable', 'regex:/^\d{2,3}\/\d{2,3}$/'],
            'pulse' => 'nullable|integer|min:20|max:250', 'respiratory_rate' => 'nullable|integer|min:5|max:80',
            'oxygen_saturation' => 'nullable|integer|min:40|max:100', 'weight' => 'nullable|numeric|min:0|max:500',
            'height' => 'nullable|numeric|min:20|max:250', 'pain_score' => 'nullable|integer|min:0|max:10',
            'chief_complaint' => 'required|string|max:1000', 'notes' => 'nullable|string|max:2000',
        ]);
        DB::transaction(function () use ($data) {
            $last = TriageEntry::whereDate('checked_in_at', today())->lockForUpdate()->max('queue_number');
            TriageEntry::create($data + ['queue_number' => ($last ?? 0) + 1, 'checked_in_at' => now(), 'created_by' => Auth::id()]);
        });
        return back()->with('success', 'بیمار وارد صف تریاژ شد.');
    }

    public function status(Request $request, TriageEntry $triage)
    {
        $data = $request->validate(['status' => 'required|in:waiting,in_progress,completed,cancelled']);
        $timestamps = $data['status'] === 'in_progress' ? ['started_at' => now()] : ($data['status'] === 'completed' ? ['completed_at' => now()] : []);
        $triage->update($data + $timestamps);
        return back();
    }
}
