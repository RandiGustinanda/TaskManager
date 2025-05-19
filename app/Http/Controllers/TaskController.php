<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\User;
use App\Models\Task;
use Illuminate\Support\Facades\Log;
use OwenIt\Auditing\Models\Audit;
class TaskController extends Controller
{
    public function index(Project $project)
    {
        $tasks = $project->tasks()
            ->with('member')
            ->paginate(5) // kamu bisa ubah jumlah per halaman
            ->withQueryString(); // agar query tetap saat pindah halaman

        $activity = Audit::with('auditable') // ambil relasi user dan project
            ->where('auditable_type', Task::class)
            ->latest()
            ->take(20) // batasi jumlah history jika perlu
            ->get();
            
        return inertia('Task/Index', [
            'project' => $project,
            'tasks' => $tasks,
            'activity' => $activity
        ]);
    }

    public function create(Project $project)
    {
        $members = User::where('role', 'Member')->get(['id', 'name']);
        return inertia('Task/Create', [
            'project' => $project,
            'members' => $members, // <- kamu butuh ini supaya data project.id bisa dipakai
        ]);
    }

    public function store(Request $request, Project $project)
    {

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'assigned_to' => 'required|exists:users,id',
            'description' => 'nullable|string',
            'deadline' => 'nullable|date',
        ]);

        // Tambahkan project_id
        $validated['project_id'] = $project->id;
        \Log::info('Data Validated:', $validated);
        // Buat task
        \App\Models\Task::create($validated);

        return redirect()->route('projects.tasks.index', $project->id)->with('success', 'Task created.');
    }

    public function updateStatus($taskId)
    {
        $task = Task::find($taskId);
        if ($task) {
            $task->status = true;
            $task->save();
        }

        return redirect()->back();
    }
}
