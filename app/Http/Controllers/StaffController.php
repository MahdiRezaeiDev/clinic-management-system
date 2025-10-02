<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StaffController extends Controller
{
    public function index()
    {
        $staff = Staff::all();
        return Inertia::render('Staff/Index', ['staffs' => $staff]);
    }

    public function create()
    {
        return Inertia::render('Staff/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'full_name' => 'required|string|max:255',
            'role' => 'required|string',
            'phone' => 'nullable|string',
            'base_salary' => 'nullable|numeric',
        ]);

        Staff::create($request->all());
        return redirect()->route('staffs.index')->with('success', 'Staff added successfully.');
    }

    public function edit(Staff $staff)
    {
        $roles = ['doctor', 'nurse', 'pharmacist', 'admin', 'lab', 'dentist', 'emergency', 'gynecology', 'inpatient', 'service'];
        return Inertia::render('Staff/Edit', ['staff' => $staff, 'roles' => $roles]);
    }

    public function update(Request $request, Staff $staff)
    {
        $request->validate([
            'full_name' => 'required|string|max:255',
            'role' => 'required|string',
            'phone' => 'nullable|string',
            'base_salary' => 'nullable|numeric',
        ]);

        $staff->update($request->all());
        return redirect()->route('staff.index')->with('success', 'Staff updated successfully.');
    }

    public function destroy(Staff $staff)
    {
        $staff->delete();
        return redirect()->route('staff.index')->with('success', 'Staff deleted successfully.');
    }
}
