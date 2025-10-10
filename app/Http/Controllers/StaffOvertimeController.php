<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Staff;
use App\Models\Overtime;

class StaffOvertimeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Staff $staff)
    {
        // Get all overtimes for this staff (whether assigned or not)
        $overtimes = Overtime::with('salary')
            ->where('staff_id', $staff->id)
            ->orderBy('created_at', 'desc')
            ->get();

        dd($overtimes);

        return Inertia::render('Staff/OverTime/Index', [
            'staff' => $staff,
            'overtimes' => $overtimes,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
