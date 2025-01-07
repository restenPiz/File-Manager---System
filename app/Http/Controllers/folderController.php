<?php

namespace App\Http\Controllers;

use App\Models\Folder;
use Illuminate\Http\Request;

class folderController extends Controller
{
    public function store(Request $request)
    {
        Folder::create($request->validate([
            'Folder_name' => ['required', 'max:50'],
            'id_user' => ['required', 'max:50'],
            'Parent_id',
        ]));

        return to_route('folder');
    }
}
