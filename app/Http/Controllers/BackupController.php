<?php

namespace App\Http\Controllers;

use App\Models\BackupRun;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class BackupController extends Controller
{
    /**
     * Run database backup and save it to storage/app/backups
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function run()
    {
        $run = BackupRun::create(['status' => 'running', 'started_at' => now(), 'user_id' => Auth::id()]);
        try {
            // Get database connection info
            $connection = config('database.default');
            $dbConfig = config("database.connections.$connection");

            $host = $dbConfig['host'] ?? '127.0.0.1';
            $database = $dbConfig['database'];
            $username = $dbConfig['username'];
            $password = $dbConfig['password'];

            // Fetch all tables
            $tables = DB::select('SHOW TABLES');
            $tableColumn = 'Tables_in_' . $database;

            if (empty($tables)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'No tables found in database.'
                ]);
            }

            $sqlContent = "-- Database Backup: $database\n";
            $sqlContent .= "-- Generated at: " . Carbon::now() . "\n\n";
            $sqlContent .= "SET FOREIGN_KEY_CHECKS=0;\n\n";

            foreach ($tables as $table) {
                $tableName = $table->$tableColumn;

                // Drop table if exists
                $sqlContent .= "DROP TABLE IF EXISTS `$tableName`;\n";

                // Create table statement
                $createTableStmt = DB::select("SHOW CREATE TABLE `$tableName`")[0]->{'Create Table'};
                $sqlContent .= $createTableStmt . ";\n\n";

                // Insert table data
                $rows = DB::table($tableName)->get();
                foreach ($rows as $row) {
                    $columns = array_keys((array)$row);
                    $values = array_map(function ($value) {
                        return is_null($value) ? 'NULL' : "'" . str_replace("'", "''", $value) . "'";
                    }, (array)$row);

                    $sqlContent .= "INSERT INTO `$tableName` (`" . implode('`,`', $columns) . "`) VALUES (" . implode(',', $values) . ");\n";
                }

                $sqlContent .= "\n\n";
            }

            $sqlContent .= "SET FOREIGN_KEY_CHECKS=1;\n";

            // Backup directory
            $backupDir = storage_path('app/backups');
            if (!file_exists($backupDir)) {
                mkdir($backupDir, 0755, true);
            }

            $filename = 'backup-' . Carbon::now()->format('Y-m-d-H-i-s') . '.sql';
            $filePath = $backupDir . '/' . $filename;

            file_put_contents($filePath, $sqlContent);

            $run->update(['status' => 'success', 'filename' => $filename, 'size' => filesize($filePath), 'tables_count' => count($tables), 'finished_at' => now(), 'message' => 'Backup completed']);

            return response()->json([
                'status' => 'success',
                'message' => 'پشتیبان‌گیری با موفقیت انجام شد.',
                'file' => $filename,
                'path' => $filePath,
                'size' => filesize($filePath),
                'tables' => count($tables),
            ]);
        } catch (\Exception $e) {
            $run->update(['status' => 'failed', 'finished_at' => now(), 'message' => $e->getMessage()]);
            return response()->json([
                'status' => 'error',
                'message' => 'Backup failed: ' . $e->getMessage()
            ]);
        }
    }
}
