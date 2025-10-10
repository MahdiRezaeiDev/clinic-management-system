<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DoctorVisitController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\StaffSalaryController;
use App\Http\Controllers\StaffOvertimeController;
use App\Http\Controllers\StaffPaymentController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\PharmacyController;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\MedicineController;
use App\Http\Controllers\PaymentsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => false,
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

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
    Route::resource('user', UserController::class)->except('show');

    // ----------------------
    // Staff
    // ----------------------
    Route::resource('staffs', StaffController::class);

    // Nested Staff Routes: Salary, Overtime,
    Route::prefix('staffs/{staff}')->name('staffs.')->group(function () {
        Route::resource('salary', StaffSalaryController::class);
        Route::resource('overtime', StaffOvertimeController::class);
    });

    // ----------------------
    // Patients
    // ----------------------
    Route::resource('patients', PatientController::class);

    // ----------------------
    // Pharmacy
    // ----------------------
    Route::resource('pharmacy', PharmacyController::class);

    // ----------------------
    // Suppliers
    // ----------------------
    Route::resource('suppliers', SupplierController::class);

    // ----------------------
    // medicine
    // ----------------------
    Route::resource('medicine', MedicineController::class);

    // Nested medicine Routes: payment,
    Route::prefix('medicine/{medicine}')->name('medicine.')->group(function () {
        Route::resource('payments', PaymentsController::class);
    });


    // ----------------------
    // Finance: Incomes & Expenses
    // ----------------------
    Route::resource('incomes', IncomeController::class);
    Route::resource('expenses', ExpenseController::class);

    // ----------------------
    // doctor visits
    // ----------------------
    Route::resource('visits', DoctorVisitController::class);
});
require __DIR__ . '/auth.php';
