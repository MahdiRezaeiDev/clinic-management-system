<?php
namespace App\Console\Commands;

use App\Models\BackupRun;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class RunScheduledBackup extends Command
{
    protected $signature = 'clinic:backup';
    protected $description = 'Run the scheduled hospital backup and record its health';

    public function handle(): int
    {
        $run = BackupRun::create(['status'=>'running', 'started_at'=>now()]);
        try {
            $exit = Artisan::call('backup:run', ['--only-db' => true]);
            if ($exit !== self::SUCCESS) throw new \RuntimeException(trim(Artisan::output()) ?: 'Backup command failed');
            $run->update(['status'=>'success', 'finished_at'=>now(), 'message'=>trim(Artisan::output())]);
            $this->info('Scheduled backup completed.');
            return self::SUCCESS;
        } catch (\Throwable $e) {
            $run->update(['status'=>'failed', 'finished_at'=>now(), 'message'=>$e->getMessage()]);
            $this->error($e->getMessage());
            return self::FAILURE;
        }
    }
}
