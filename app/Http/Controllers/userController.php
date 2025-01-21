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
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'Number_bi' => 'required|string|max:255',
            'role' => 'required|exists:roles,id',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'Number_bi' => $validated['bi'],
            'password' => bcrypt('defaultpassword'), // Ou peça a senha no formulário
        ]);

        $user->assignRole($validated['role']);

        return to_route('users');
    }
    public function update()
    {

    }
    public function delete($id)
    {
        $user = User::findOrFail($id);

        $user->delete();

        return to_route('users');
    }
}
