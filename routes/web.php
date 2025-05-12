<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserManagementController;
use App\Http\Middleware\RoleMiddleware;

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
    Route::put('/user-management/{id}', [UserManagementController::class, 'update'])->name('users.update');
});


require __DIR__ . '/auth.php';
