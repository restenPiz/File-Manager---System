<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class userController extends Controller
{
    public function index()
    {
        $roles = Role::where('name', '!=', 'super')->get();
        $users = User::where('id', '>', 1)->get();

        return Inertia::render('User', [
            'roles' => $roles,
            'users' => $users,
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
