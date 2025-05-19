<?php

namespace App\Jobs;

use Maatwebsite\Excel\Facades\Excel;
use App\Exports\ProjectsExport;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Storage;

class ExportProjectsJob implements ShouldQueue
{
    use Dispatchable, Queueable, SerializesModels;

    protected $fields;
    protected $userEmail;

    public function __construct(array $fields, $userEmail)
    {
        $this->fields = $fields;
        $this->userEmail = $userEmail;
    }

    public function handle()
    {
        $fileName = 'exports/projects_' . now()->timestamp . '.xlsx';
        Excel::store(new ProjectsExport($this->fields), $fileName, 'public');

        // Optionally: kirim email ke user setelah selesai
        // Mail::to($this->userEmail)->send(new ExportReadyMail($fileName));
    }
}
