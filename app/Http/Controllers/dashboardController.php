<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class dashboardController extends Controller
{
    public function index()
    {
        if (auth::user()->hasRole('super')) {
            //*Start the method to return the inertia component
            return Inertia::render('Dashboard');

        } elseif (Auth::user()->hasRole('manager')) {
            return redirect()->route('login');
        } else {
            return redirect()->route('login');
        }
    }
}
