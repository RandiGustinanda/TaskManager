<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use OwenIt\Auditing\Models\Audit;

class ProjectController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        $projects = Project::withCount('tasks')
            ->where('created_by', auth()->id())
            ->latest()
            ->get();

        $projectIds = $projects->pluck('id');

        $history = Audit::with(['user', 'auditable']) // ambil relasi user dan project
            ->where('auditable_type', Project::class)
            ->whereIn('auditable_id', $projectIds)
            ->latest()
            ->take(20) // batasi jumlah history jika perlu
            ->get();

        return Inertia::render('Projects/Index', [
            'projects' => $projects,
            'history' => $history
        ]);
    }

    public function create()
    {
        return Inertia::render('Projects/Create');
    }

    public function store(Request $request)
    {
        // Debugging
        \Log::info('Project store request data:', $request->all());

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        // Log validated data
        \Log::info('Validated data:', $validated);

        // Explicitly define all fields
        $project = Project::create([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'created_by' => auth()->id(),
        ]);

        // Log created project
        \Log::info('Created project:', $project->toArray());

        return redirect()->route('projects.index')->with('success', 'Project created successfully.');
    }

    public function edit(Project $project)
    {
        $this->authorize('update', $project);

        return Inertia::render('Projects/Edit', [
            'project' => $project
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $this->authorize('update', $project);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);
        $project->update($validated);
        return redirect()->route('projects.index')->with('success', 'Project updated.');
    }

    public function destroy(Project $project)
    {
        $this->authorize('delete', $project);

        $project->delete();

        return redirect()->route('projects.index')->with('success', 'Project deleted.');
    }
}
