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
        $roles = Role::where('id', '>', 1)->get();

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
    public function edit($id)
    {
        $role = Role::with('permissions')->findOrFail($id);

        return response()->json([
            'id' => $role->id,
            'name' => $role->name,
            'display_name' => $role->display_name,
            'description' => $role->description,
            'permissions' => $role->permissions->map(function ($permission) {
                return [
                    'id' => $permission->id,
                    'name' => $permission->name,
                    'display_name' => $permission->display_name,
                ];
            }),
        ]);
    }
    public function update($id, Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'display_name' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'permissions' => 'array',
        ]);

        $role = Role::findOrFail($id);
        $role->update([
            'name' => $validatedData['name'],
            'display_name' => $validatedData['display_name'],
            'description' => $validatedData['description'],
        ]);

        if (!empty($validatedData['permissions'])) {
            $role->syncPermissions($validatedData['permissions']);
        }
        return to_route('roles');
    }
}
