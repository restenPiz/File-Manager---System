<?php

namespace App\Http\Middleware;

use Auth;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckUserRole
{
    public function handle(Request $request, Closure $next): Response
    {
        //* Verifique se o usuário está autenticado e tem a role 'super'
        if (Auth::check() && Auth::user()->hasRole !== 'super') {
            return redirect()->route('login');
        }

        return $next($request);
    }
}
