<?php

namespace App\Http\Controllers;

use App\Models\Staff;

class DashboardController extends Controller
{
    public function index()
    {
        $doctors = Staff::where('role', 'doctor')->get();
        return inertia('Dashboard', [
            'doctors' => $doctors,
        ]);
    }
}
