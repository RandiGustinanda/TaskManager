<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserManagementController;
use App\Http\Middleware\RoleMiddleware;
use App\Http\Middleware\ManagerMiddleware;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TugasController;
use App\Http\Middleware\MemberMiddleware;

Route::get('/', function () {
    return Inertia::render('Landing');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});

Route::middleware([
    'auth',
    RoleMiddleware::class
])->group(function () {
    Route::get('/user-management', [UserManagementController::class, 'index'])->name('users.index');
    Route::post('/user-management', [UserManagementController::class, 'store'])->name('users.store');
    Route::put('/users/{id}', [App\Http\Controllers\UserManagementController::class, 'update'])->name('users.update');
    // Atau jika perlu, tambahkan rute dengan method POST untuk kompabilitas
});


Route::middleware([
    'auth',
    ManagerMiddleware::class
])->group(function () {
    Route::get('/project', [ProjectController::class, 'index'])->name('projects.index');
    Route::get('/project/create', [ProjectController::class, 'create'])->name('projects.create');
    Route::post('/project', [ProjectController::class, 'store'])->name('projects.store');
    Route::get('/project/{project}/edit', [ProjectController::class, 'edit'])->name('projects.edit');
    Route::put('/project/{project}', [ProjectController::class, 'update'])->name('projects.update');
    Route::delete('/project/{project}', [ProjectController::class, 'destroy'])->name('projects.destroy');
    Route::get('/projects/{project}/tasks', [TaskController::class, 'index'])->name('projects.tasks.index');
    Route::get('/projects/{project}/tasks/create', [TaskController::class, 'create'])->name('tasks.create');
    Route::post('/projects/{project}/tasks', [TaskController::class, 'store'])->name('tasks.store');
    Route::put('/tasks/{task}/status', [TaskController::class, 'updateStatus'])
    ->name('tasks.updateStatus');
});

Route::middleware([
    'auth',
    MemberMiddleware::class
])->group(function () {
    Route::get('/tugas', [TugasController::class, 'index'])->name('tugas.index');
    Route::post('/tasks/{task}/upload', [TugasController::class, 'uploadAttachment'])->name('tasks.upload');
    Route::post('/tasks/{id}/update-notes', [TugasController::class, 'updateNotes']);
});

require __DIR__ . '/auth.php';
