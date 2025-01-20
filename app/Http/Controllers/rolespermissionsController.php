<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class rolespermissionsController extends Controller
{
    public function index()
    {
        $permissions = Permission::all();

        return Inertia::render('RolesPermissions', [
            'permissions' => $permissions,
        ]);
    }
}
