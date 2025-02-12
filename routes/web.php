<?php

use App\Http\Controllers\dashboardController;
use App\Http\Controllers\fileController;
use App\Http\Controllers\folderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\rolespermissionsController;
use App\Http\Controllers\userController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//*Start with the main route
Route::get('/', [dashboardController::class, 'main']);
Route::get('/dashboard', [dashboardController::class, 'index'])->middleware(['auth', 'verified', 'role.super'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    //*Start with the settings route
    Route::inertia('/settings', 'Settings')->name('settings');

    //*Start with the Requests methods
    Route::get('/folders', [folderController::class, 'index'])->name('folder');
    Route::post('/storeFolder', [folderController::class, 'store'])->name('storeFolder');
    Route::post('/updateFolder/{id}', [folderController::class, 'update'])->name('updateFolder');
    Route::post('/deleteFolder/{id}', [folderController::class, 'delete'])->name('deleteFolder');

    Route::get('/file/{id}', [fileController::class, 'index'])->name('file');
    Route::post('/storefile', [fileController::class, 'upload'])->name('storefile');
    Route::post('/deletefile/{id}', [fileController::class, 'delete'])->name('deleteFile');

    Route::get('/rolesandpermissions', [rolespermissionsController::class, 'index'])->name('roles');
    Route::post('/storeRoles', [rolespermissionsController::class, 'store'])->name('storeRole');
    Route::post('/deleteRole/{id}', [rolespermissionsController::class, 'delete'])->name('deleteRole');
    Route::get('/editRole/{id}', [rolespermissionsController::class, 'edit'])->name('editRole');
    Route::post('/updateRole/{id}', [rolespermissionsController::class, 'update'])->name('updateRole');

    Route::get('/users', [userController::class, 'index'])->name('user');
    Route::post('/storeUser', [userController::class, 'store'])->name('storeUser');
    Route::post('/deleteUser/{id}', [userController::class, 'delete'])->name('deleteUser');

});

require __DIR__ . '/auth.php';