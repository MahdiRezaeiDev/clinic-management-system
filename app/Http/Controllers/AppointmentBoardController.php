<?php

namespace App\Http\Controllers;

use App\Models\{Appointment, Staff};
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppointmentBoardController extends Controller
{
    public function __invoke(Request $request)
    {
        $date = $request->filled('date') ? jalaliToGregorian($request->date) : today()->toDateString();
        $appointments = Appointment::with(['patient', 'doctor'])->whereDate('scheduled_at', $date)
            ->when($request->doctor_id, fn ($query, $doctor) => $query->where('doctor_id', $doctor))
            ->orderBy('scheduled_at')->get();

        return Inertia::render('Hospital/Appointments', [
            'appointments' => $appointments,
            'doctors' => Staff::whereIn('role', ['doctor', 'dentist', 'emergency'])->orderBy('full_name')->get(['id', 'full_name', 'role']),
            'filters' => ['date' => $request->date ?: gregorianToJalali(today()), 'doctor_id' => $request->doctor_id],
            'stats' => collect(['scheduled', 'checked_in', 'in_progress', 'completed', 'cancelled', 'no_show'])->mapWithKeys(fn ($status) => [$status => $appointments->where('status', $status)->count()]),
        ]);
    }
}
