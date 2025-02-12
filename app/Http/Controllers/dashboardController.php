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
            return Inertia::render('Dashboard');
        } elseif (Auth::user()->hasRole('manager')) {

        } else {

        }
    }
}
