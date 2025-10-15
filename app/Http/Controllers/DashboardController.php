<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\PharmacySale;
use App\Models\Staff;
use App\Models\User;
use App\Models\Visit;
use Illuminate\Support\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $usersCount = User::count();
        $todayVisitCount = Visit::whereDate('created_at', Carbon::today())->count();
        $todaySell = PharmacySale::whereDate('created_at', Carbon::today())->sum('total_amount');
        $todayExpenses = Expense::whereDate('created_at', Carbon::today())->sum('amount');
        // Fetch doctors
        $disRoles = ['lab', 'dentist', 'emergency']; // roles you want to fetch
        $staff = Staff::whereIn('role', $disRoles)->get();
        return inertia('Dashboard', [
            'doctors' => $staff,
            'userCount' => $usersCount,
            'todayVisitCount' => $todayVisitCount,
            'todaySell' => $todaySell,
            'todayExpenses' => $todayExpenses
        ]);
    }
}
