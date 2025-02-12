<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

class dashboardController extends Controller
{
    public function main()
    {
        return Inertia::render('Auth/Login', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }
    public function index()
    {
        if (auth::user()->hasRole('super')) {
            //*Start the method to return the inertia component
            return Inertia::render('Dashboard', [
                'auth' => [
                    'user' => Auth::user()->load('roles'), // Carrega as roles do usuário
                ]
            ]);


        } elseif (Auth::user()->hasRole('manager')) {
            return redirect()->route('login');
        } else {
            return redirect()->route('login');
        }
    }
}
