<?php

use App\Models\{Appointment, CashShift, Income, Patient, PatientDocument, Staff, SystemNotification, TriageEntry, User};
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

it('checks an appointment into the triage queue', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $patient = Patient::factory()->create();
    $doctor = Staff::factory()->create(['role' => 'doctor']);
    $appointment = Appointment::create(['patient_id' => $patient->id, 'doctor_id' => $doctor->id, 'scheduled_at' => now()->addHour(), 'reason' => 'checkup']);
    $this->actingAs($user)->patch(route('appointments.status', $appointment), ['status' => 'checked_in'])->assertSessionHasNoErrors();
    expect(TriageEntry::where('appointment_id', $appointment->id)->first())->not->toBeNull();
});

it('stores a patient document securely', function () {
    Storage::fake('public');
    $user = User::factory()->create(['role' => 'admin']);
    $patient = Patient::factory()->create();
    $this->actingAs($user)->post(route('patients.documents.store', $patient), ['title' => 'Lab result', 'category' => 'lab', 'file' => UploadedFile::fake()->create('result.pdf', 20, 'application/pdf')])->assertSessionHasNoErrors();
    $document = PatientDocument::firstOrFail();
    Storage::disk('public')->assertExists($document->path);
});

it('attaches cash transactions to an open shift and calculates discrepancy', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $this->actingAs($user)->post(route('finance.shifts.open'), ['opening_amount' => 1000])->assertSessionHasNoErrors();
    Income::create(['category' => 'other', 'amount' => 500, 'payment_method' => 'cash', 'income_date' => '1405/01/01', 'description' => 'shift income', 'user_id' => $user->id]);
    $shift = CashShift::firstOrFail();
    expect($shift->transactions)->toHaveCount(1);
    $this->patch(route('finance.shifts.close', $shift), ['counted_amount' => 1450])->assertSessionHasNoErrors();
    expect($shift->fresh()->expected_amount)->toBe(1500)->and($shift->fresh()->discrepancy)->toBe(-50);
});
