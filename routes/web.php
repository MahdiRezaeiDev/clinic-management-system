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
use App\Http\Controllers\TriageController;
use App\Http\Controllers\AppointmentBoardController;
use App\Http\Controllers\PatientDocumentController;
use App\Http\Controllers\HospitalCatalogController;
use App\Http\Controllers\CashShiftController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\LabDashboardController;
use App\Http\Controllers\NotificationCenterController;
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
    Route::post('patients/{patient}/documents',[PatientDocumentController::class,'store'])->name('patients.documents.store');
    Route::delete('patient-documents/{document}',[PatientDocumentController::class,'destroy'])->name('patients.documents.destroy');
    Route::patch('appointments/{appointment}/status', [HospitalWorkflowController::class,'appointmentStatus'])->name('appointments.status');
    Route::get('hospital/appointments', AppointmentBoardController::class)->name('hospital.appointments.index');
    Route::get('hospital/catalog',[HospitalCatalogController::class,'index'])->middleware('role:admin,manager,accountant')->name('hospital.catalog.index');
    Route::get('hospital/lab',LabDashboardController::class)->middleware('role:admin,manager,doctor,laboratory')->name('hospital.lab.index');
    Route::get('hospital/inventory',[InventoryController::class,'index'])->middleware('role:admin,manager,pharmacy,inventory')->name('hospital.inventory.index');
    Route::post('hospital/inventory/batches',[InventoryController::class,'batch'])->middleware('role:admin,manager,pharmacy,inventory')->name('hospital.inventory.batches.store');
    Route::post('hospital/inventory/movements',[InventoryController::class,'movement'])->middleware('role:admin,manager,pharmacy,inventory')->name('hospital.inventory.movements.store');
    Route::post('hospital/insurers',[HospitalCatalogController::class,'insurer'])->middleware('role:admin,manager')->name('hospital.insurers.store');
    Route::post('hospital/tariffs',[HospitalCatalogController::class,'tariff'])->middleware('role:admin,manager')->name('hospital.tariffs.store');
    Route::post('patients/{patient}/clinical-notes', [HospitalWorkflowController::class,'note'])->name('patients.notes.store');
    Route::post('patients/{patient}/lab-orders', [HospitalWorkflowController::class,'labOrder'])->name('patients.lab-orders.store');
    Route::patch('lab-order-items/{item}/result', [HospitalWorkflowController::class,'labResult'])->name('lab-results.update');
    Route::post('patients/{patient}/prescriptions', [HospitalWorkflowController::class,'prescription'])->name('patients.prescriptions.store');
    Route::post('patients/{patient}/admissions', [HospitalWorkflowController::class,'admit'])->name('patients.admissions.store');
    Route::patch('admissions/{admission}/discharge', [HospitalWorkflowController::class,'discharge'])->name('admissions.discharge');
    Route::post('patients/{patient}/invoices', [HospitalWorkflowController::class,'invoice'])->name('patients.invoices.store');
    Route::post('patient-invoices/{invoice}/payments', [HospitalWorkflowController::class,'invoicePayment'])->name('patient-invoices.payments.store');
    Route::get('hospital/bed-board',[HospitalOperationsController::class,'index'])->name('hospital.bed-board');
    Route::get('hospital/triage',[TriageController::class,'index'])->name('hospital.triage.index');
    Route::post('hospital/triage',[TriageController::class,'store'])->name('hospital.triage.store');
    Route::patch('hospital/triage/{triage}/status',[TriageController::class,'status'])->name('hospital.triage.status');
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
    Route::get('/finance/shifts',[CashShiftController::class,'index'])->middleware('role:admin,manager,cashier')->name('finance.shifts.index');
    Route::post('/finance/shifts/open',[CashShiftController::class,'open'])->middleware('role:admin,manager,cashier')->name('finance.shifts.open');
    Route::get('/notifications',[NotificationCenterController::class,'index'])->name('notifications.index');
    Route::patch('/notifications/read-all',[NotificationCenterController::class,'readAll'])->name('notifications.read-all');
    Route::patch('/notifications/{notification}/read',[NotificationCenterController::class,'read'])->name('notifications.read');
    Route::patch('/finance/shifts/{shift}/close',[CashShiftController::class,'close'])->middleware('role:admin,manager,cashier')->name('finance.shifts.close');

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
