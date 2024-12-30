<?php

use App\Http\Controllers\dashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', [dashboardController::class, 'login'])->name('login');

Route::middleware('auth')->group(function () {
    //*Start with the main route, that make the redirect for other pages in the system
    Route::get('/dashboard', [dashboardController::class, 'index'])->name('dashboard');
    //*Start with the profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
