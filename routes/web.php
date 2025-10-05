<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\StaffSalaryController;
use App\Http\Controllers\StaffOvertimeController;
use App\Http\Controllers\StaffPaymentController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\DoctorVisitController;
use App\Http\Controllers\PharmacyController;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\AssetController;
use App\Http\Controllers\AssetMaintenanceController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => false,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    // ----------------------
    // Profile
    // ----------------------
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // ----------------------
    // Users
    // ----------------------
    Route::resource('users', UserController::class)->except('show');

    // ----------------------
    // Staff
    // ----------------------
    Route::resource('staffs', StaffController::class);

    Route::prefix('staffs')->name('staffs.')->group(function () {
        Route::resource('overtime', StaffOvertimeController::class);
        Route::resource('salary', StaffSalaryController::class);
        Route::resource('payments', StaffPaymentController::class);
    });

    // ----------------------
    // Patients
    // ----------------------
    Route::resource('patients', PatientController::class);
    Route::resource('doctorvisits', DoctorVisitController::class);

    // ----------------------
    // Pharmacy
    // ----------------------
    Route::prefix('pharmacy')->name('pharmacy.')->group(function () {
        Route::get('sales', [PharmacyController::class, 'sales'])->name('sales');
        Route::get('purchases', [PharmacyController::class, 'purchases'])->name('purchases');
        Route::get('inventory', [PharmacyController::class, 'inventory'])->name('inventory');
    });

    // ----------------------
    // Finance: Incomes & Expenses
    // ----------------------
    Route::resource('incomes', IncomeController::class);
    Route::resource('expenses', ExpenseController::class);
    Route::get('reports', [ReportController::class, 'index'])->name('reports.index');

    // ----------------------
    // Assets & Maintenance
    // ----------------------
    Route::resource('assets', AssetController::class);
    Route::resource('assets.maintenance', AssetMaintenanceController::class);
});

require __DIR__ . '/auth.php';
