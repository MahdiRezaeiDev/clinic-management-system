<?php

use App\Models\{Appointment, LabOrder, LabTest, Patient, Staff, User};

it('creates a patient appointment and laboratory order', function () {
    $user=User::factory()->create(['role'=>'admin']); $doctor=Staff::factory()->create(['role'=>'doctor']); $patient=Patient::factory()->create();
    $test=LabTest::create(['code'=>'CBC','name'=>'CBC','price'=>500]); $this->actingAs($user);

    $this->post(route('patients.appointments.store',$patient),['doctor_id'=>$doctor->id,'date'=>'1405/01/01','time'=>'09:00','reason'=>'معاینه'])->assertSessionHasNoErrors();
    expect(Appointment::where('patient_id',$patient->id)->count())->toBe(1);

    $this->post(route('patients.lab-orders.store',$patient),['doctor_id'=>$doctor->id,'ordered_at'=>'1405/01/01','test_ids'=>[$test->id]])->assertSessionHasNoErrors();
    expect(LabOrder::where('patient_id',$patient->id)->first()->items)->toHaveCount(1);
});
