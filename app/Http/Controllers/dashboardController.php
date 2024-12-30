<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class dashboardController extends Controller
{
    public function login()
    {
        return view('auth.login');
    }
    public function index()
    {
        if (Auth::user()->hasRole('super')) {
            return view('dashboard');
        } else {
            return redirect()->route('login');
        }
    }
}
