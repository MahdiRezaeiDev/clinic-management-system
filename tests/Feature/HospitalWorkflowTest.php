<?php

use App\Models\{Appointment, LabOrder, LabTest, Patient, Staff, User};
use App\Models\{Admission, Bed, PatientInvoice, Room, Ward};
use App\Models\TriageEntry;

it('creates a patient appointment and laboratory order', function () {
    $user=User::factory()->create(['role'=>'admin']); $doctor=Staff::factory()->create(['role'=>'doctor']); $patient=Patient::factory()->create();
    $test=LabTest::create(['code'=>'CBC','name'=>'CBC','price'=>500]); $this->actingAs($user);

    $this->post(route('patients.appointments.store',$patient),['doctor_id'=>$doctor->id,'date'=>'1405/01/01','time'=>'09:00','reason'=>'معاینه'])->assertSessionHasNoErrors();
    expect(Appointment::where('patient_id',$patient->id)->count())->toBe(1);

    $this->post(route('patients.lab-orders.store',$patient),['doctor_id'=>$doctor->id,'ordered_at'=>'1405/01/01','test_ids'=>[$test->id]])->assertSessionHasNoErrors();
    expect(LabOrder::where('patient_id',$patient->id)->first()->items)->toHaveCount(1);
});

it('handles admission transfer billing payment and discharge', function () {
    $user=User::factory()->create(['role'=>'admin']);$doctor=Staff::factory()->create(['role'=>'doctor']);$patient=Patient::factory()->create();$this->actingAs($user);
    $ward=Ward::create(['name'=>'Test Ward']);$room=Room::create(['ward_id'=>$ward->id,'number'=>'1']);$first=Bed::create(['room_id'=>$room->id,'number'=>'1','daily_rate'=>1000]);$second=Bed::create(['room_id'=>$room->id,'number'=>'2','daily_rate'=>1500]);
    $this->post(route('patients.admissions.store',$patient),['doctor_id'=>$doctor->id,'bed_id'=>$first->id,'reason'=>'treatment'])->assertSessionHasNoErrors();
    $admission=Admission::first();expect($first->fresh()->status)->toBe('occupied')->and($admission->transfers)->toHaveCount(1);
    $this->post(route('hospital.admissions.transfer',$admission),['bed_id'=>$second->id,'reason'=>'clinical need'])->assertSessionHasNoErrors();
    expect($first->fresh()->status)->toBe('cleaning')->and($second->fresh()->status)->toBe('occupied');
    $this->post(route('hospital.admissions.sync-invoice',$admission))->assertRedirect();$invoice=PatientInvoice::first();expect($invoice->items()->where('service_type','bed')->count())->toBe(2)->and($invoice->total_amount)->toBeGreaterThan(0);
    $this->post(route('patient-invoices.payments.store',$invoice),['payment_date'=>'1405/01/01','amount'=>$invoice->remaining_amount,'payment_method'=>'cash'])->assertSessionHasNoErrors();expect($invoice->fresh()->status)->toBe('paid');
    $this->patch(route('admissions.discharge',$admission),['discharge_summary'=>'stable'])->assertSessionHasNoErrors();expect($admission->fresh()->status)->toBe('discharged')->and($second->fresh()->status)->toBe('cleaning');
});

it('registers vital signs and moves a patient through the triage queue', function () {
    $user = User::factory()->create(['role' => 'admin']);
    $patient = Patient::factory()->create();
    $this->actingAs($user);

    $this->post(route('hospital.triage.store'), [
        'patient_id' => $patient->id, 'priority' => 'urgent', 'temperature' => 38.2,
        'blood_pressure' => '120/80', 'pulse' => 105, 'respiratory_rate' => 22,
        'oxygen_saturation' => 94, 'pain_score' => 7, 'chief_complaint' => 'Severe pain',
    ])->assertSessionHasNoErrors();

    $entry = TriageEntry::firstOrFail();
    expect($entry->queue_number)->toBe(1)->and($entry->status)->toBe('waiting')->and($entry->priority)->toBe('urgent');
    $this->patch(route('hospital.triage.status', $entry), ['status' => 'in_progress'])->assertSessionHasNoErrors();
    expect($entry->fresh()->status)->toBe('in_progress')->and($entry->fresh()->started_at)->not->toBeNull();
});
