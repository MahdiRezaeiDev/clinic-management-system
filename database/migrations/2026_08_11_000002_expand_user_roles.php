<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (DB::getDriverName() === 'mysql') {
            DB::statement("ALTER TABLE users MODIFY role ENUM('admin','finance','manager','accountant','cashier','pharmacy','doctor','regular') NOT NULL DEFAULT 'regular'");
            DB::table('users')->where('role', 'finance')->update(['role' => 'accountant']);
            DB::statement("ALTER TABLE users MODIFY role ENUM('admin','manager','accountant','cashier','pharmacy','doctor','regular') NOT NULL DEFAULT 'regular'");
        }
    }
    public function down(): void {}
};
