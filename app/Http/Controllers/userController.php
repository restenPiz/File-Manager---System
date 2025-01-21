<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class userController extends Controller
{
    public function index()
    {
        $roles = Role::where('name', '!=', 'super')->get();

        return Inertia::render('User', [
            'roles' => $roles,
        ]);
    }
    public function store()
    {

    }
    public function update()
    {

    }
    public function delete()
    {

    }
}
