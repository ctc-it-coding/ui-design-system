<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/landing1', function () {
    return Inertia::render('Landing/Landing1');
})->name('landing1');

Route::get('/landing2', function () {
    return Inertia::render('Landing/Landing2');
})->name('landing2');

Route::get('/landing3', function () {
    return Inertia::render('Landing/Landing3');
})->name('landing3');

Route::get('/pricing1', function () {
    return Inertia::render('Pricing/Pricing1');
})->name('pricing1');

Route::get('/dashboard1', function () {
    return Inertia::render('Dashboard/Dashboard1');
})->name('dashboard1');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
