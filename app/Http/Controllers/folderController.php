<?php

namespace App\Http\Controllers;

use App\Models\Folder;
use Illuminate\Http\Request;

class folderController extends Controller
{
    public function store(Request $request)
    {
        // dd($request->all());
        $table = new Folder();

        $table->Folder_name = $request->input('Folder_name');
        $table->user_id = $request->input('user_id');
        $table->Parent_id = $request->input('Parent_id');
        $table->save();

        return to_route('folder');
    }
}
