<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
   use Illuminate\Support\Facades\Storage;
class TugasController extends Controller
{
    public function index()
    {
        $tasks = Task::where('assigned_to', Auth::user()->id)
            ->with('member')
            ->paginate(5)
            ->withQueryString(); // Agar query tetap saat berpindah halaman

        return inertia('Tugas/Index', [
            'tasks' => $tasks,
        ]);
    }

 

    public function uploadAttachment(Request $request, Task $task)
    {
        $request->validate([
            'attachment' => 'required|mimes:pdf|file|min:100|max:500', // ukuran dalam KB
        ]);

        if ($request->hasFile('attachment')) {
            $file = $request->file('attachment');
            $filename = time() . '_' . $file->getClientOriginalName();

            $path = $file->storeAs('attachments', $filename, 'public');

            $task->attachment = $path;
            $task->save();
        }

        return redirect()->back()->with('success', 'File berhasil diunggah.');
    }
}
