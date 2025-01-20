<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class rolespermissionsController extends Controller
{
    public function index()
    {
        $permissions = Permission::all();
        $roles = DB::table('roles')->get();

        return Inertia::render('RolesPermissions', [
            'permissions' => $permissions,
            'roles' => $roles,
        ]);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|unique:roles,name',
            'permissions' => 'array',
        ]);

        $role = Role::create([
            'name' => $validated['name'],
            'display_name' => ucfirst($validated['name']),
            'description' => "Role for {$validated['name']}",
        ]);

        if (!empty($validated['permissions'])) {
            $role->syncPermissions($validated['permissions']);
        }

        return to_route('roles');
    }
    public function delete($id)
    {
        $roles = Role::findOrFail($id);

        $roles->delete();

        return to_route('roles');
    }
}
