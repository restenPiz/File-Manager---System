<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//*Start with the main route
Route::get('/', function () {
    return Inertia::render('Auth/Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified', 'role.super'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//*Start with the main routes
Route::inertia('/folders', 'Folder')->name('folder');
Route::inertia('/file', 'File')->name('file');
Route::inertia('/users', 'User')->name('user');
Route::inertia('/rolesandpermissions', 'RolesPermissions')->name('roles');
Route::inertia('/settings', 'Settings')->name('settings');

//*Start with the Requests methods
Route::post('/storeFolder', [folderController::class, 'store'])->name('storeFolder');
Route::post('/updateFolder/{id}', [folderController::class, 'update'])->name('updateFolder');
Route::post('/deleteFolder/{id}', [folderController::class, 'delete'])->name('deleteFolder');

require __DIR__.'/auth.php';
