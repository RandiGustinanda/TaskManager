<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Landing');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', fn () => Inertia::render('Dashboard'));

    Route::middleware(['role:Administrator'])->group(function () {
        Route::get('/users', [UserController::class, 'index']);
        // ...route lainnya
    });
});

require __DIR__.'/auth.php';
