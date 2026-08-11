<?php

use App\Http\Controllers\BackupController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DoctorVisitController;
use App\Http\Controllers\DrugController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\StaffSalaryController;
use App\Http\Controllers\StaffOvertimeController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\PharmacyController;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\MedicineController;
use App\Http\Controllers\PaymentsController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\FinanceControlController;
use App\Http\Controllers\HospitalWorkflowController;
use App\Http\Controllers\HospitalOperationsController;
use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return redirect()->route('dashboard');
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
    Route::resource('user', UserController::class)->except('show')->middleware(['role:admin,manager', HandlePrecognitiveRequests::class]);

    // ----------------------
    // Staff
    // ----------------------
    Route::resource('staffs', StaffController::class);

    // Nested Staff Routes: Salary, Overtime,
    Route::prefix('staffs/{staff}')->name('staffs.')->group(function () {
        Route::resource('salary', StaffSalaryController::class)->except(['show']);
        Route::resource('overtime', StaffOvertimeController::class)->except(['show']);
    });

    // ----------------------
    // Patients
    // ----------------------
    Route::resource('patients', PatientController::class);
    Route::post('patients/{patient}/appointments', [HospitalWorkflowController::class,'appointment'])->name('patients.appointments.store');
    Route::patch('appointments/{appointment}/status', [HospitalWorkflowController::class,'appointmentStatus'])->name('appointments.status');
    Route::post('patients/{patient}/clinical-notes', [HospitalWorkflowController::class,'note'])->name('patients.notes.store');
    Route::post('patients/{patient}/lab-orders', [HospitalWorkflowController::class,'labOrder'])->name('patients.lab-orders.store');
    Route::patch('lab-order-items/{item}/result', [HospitalWorkflowController::class,'labResult'])->name('lab-results.update');
    Route::post('patients/{patient}/prescriptions', [HospitalWorkflowController::class,'prescription'])->name('patients.prescriptions.store');
    Route::post('patients/{patient}/admissions', [HospitalWorkflowController::class,'admit'])->name('patients.admissions.store');
    Route::patch('admissions/{admission}/discharge', [HospitalWorkflowController::class,'discharge'])->name('admissions.discharge');
    Route::post('patients/{patient}/invoices', [HospitalWorkflowController::class,'invoice'])->name('patients.invoices.store');
    Route::post('patient-invoices/{invoice}/payments', [HospitalWorkflowController::class,'invoicePayment'])->name('patient-invoices.payments.store');
    Route::get('hospital/bed-board',[HospitalOperationsController::class,'index'])->name('hospital.bed-board');
    Route::post('hospital/wards',[HospitalOperationsController::class,'ward'])->name('hospital.wards.store');
    Route::post('hospital/wards/{ward}/rooms',[HospitalOperationsController::class,'room'])->name('hospital.rooms.store');
    Route::post('hospital/rooms/{room}/beds',[HospitalOperationsController::class,'bed'])->name('hospital.beds.store');
    Route::patch('hospital/beds/{bed}/status',[HospitalOperationsController::class,'bedStatus'])->name('hospital.beds.status');
    Route::post('hospital/admissions/{admission}/transfer',[HospitalOperationsController::class,'transfer'])->name('hospital.admissions.transfer');
    Route::post('hospital/admissions/{admission}/sync-invoice',[HospitalOperationsController::class,'syncInvoice'])->name('hospital.admissions.sync-invoice');
    Route::delete('hospital/invoice-payments/{payment}',[HospitalOperationsController::class,'voidPayment'])->name('hospital.invoice-payments.void');

    // ----------------------
    // Pharmacy
    // ----------------------
    Route::get('/pharmacy/search-drugs', [PharmacyController::class, 'searchDrugs'])->name('pharmacy.search-drugs');

    Route::get('pharmacy/{pharmacy}/dental', [PharmacyController::class, 'dental'])->name('dental.show');
    Route::resource('pharmacy', PharmacyController::class);

    // ----------------------
    // Drugs
    // ----------------------
    Route::resource('drugs', DrugController::class);


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
        Route::resource('payments', PaymentsController::class)->except(['create', 'edit', 'show']);
    });


    // ----------------------
    // Finance: Incomes & Expenses
    // ----------------------
    Route::resource('incomes', IncomeController::class);
    Route::resource('expenses', ExpenseController::class);

    // ----------------------
    // doctor visits
    // ----------------------
    Route::resource('visits', DoctorVisitController::class)->except(['show']);

    // ----------------------
    // doctor visits
    // ----------------------
    Route::get('/reports', ReportController::class)->middleware('role:admin,manager,accountant,cashier')->name('reports');
    Route::get('/finance/control', FinanceControlController::class)->middleware('role:admin,manager,accountant,cashier')->name('finance.control');

    // ----------------------
    // Settings: Database Backup
    // ----------------------
    Route::get('/settings/database', function () {
        $lastRun = \App\Models\BackupRun::latest('started_at')->first();
        return Inertia\Inertia::render('Settings/Database', [
            'backupHealth' => [
                'lastRun' => $lastRun,
                'healthy' => $lastRun?->status === 'success' && $lastRun->finished_at?->greaterThan(now()->subDay()),
                'nextScheduledRun' => now()->addDay()->startOfDay()->addHours(2)->toDateTimeString(),
            ],
        ]);
    })->middleware('role:admin,manager')->name('settings.database');

    Route::post('/backup/run', [BackupController::class, 'run'])->middleware('role:admin,manager')->name('backup.run');
});
require __DIR__ . '/auth.php';
