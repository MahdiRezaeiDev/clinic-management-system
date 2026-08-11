<?php

namespace App\Providers;

use App\Events\UserRegistered;
use App\Listeners\SendUserRegisteredNotification;
use App\Models\{Expense, Income, PharmacySale, PurchasedMedicinePayment, Salary, Visit};
use App\Observers\FinancialRecordObserver;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Event;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        Event::listen(UserRegistered::class, [SendUserRegisteredNotification::class, 'handle']);
        foreach ([Visit::class, Income::class, PharmacySale::class, Expense::class, PurchasedMedicinePayment::class, Salary::class] as $model) {
            $model::observe(FinancialRecordObserver::class);
        }
    }
}
