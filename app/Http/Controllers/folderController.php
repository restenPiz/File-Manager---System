<?php

namespace App\Http\Controllers;

use App\Models\Folder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class folderController extends Controller
{
    public function index()
    {
        $folders = Folder::all();

        return Inertia::render('Folder', [
            'folders' => $folders,
        ]);
    }
    public function store(Request $request)
    {
        $table = new Folder();

        $table->Folder_name = $request->input('Folder_name');
        $table->id_user = $request->input('id_user');
        $table->Parent_id = $request->input('Parent_id');
        $table->save();

        return to_route('folder');
    }
    public function update(Request $request, $id)
    {
        $table = Folder::findOrFail($id);

        $table->Folder_name = $request->input('Folder_name');
        $table->id_user = $request->input('id_user');
        $table->Parent_id = $request->input('Parent_id');
        $table->save();

        return to_route('folder');
    }
    public function delete($id)
    {
        //*Find the folder id
        $folder = Folder::findOrFail($id);

        $folder->delete();

        return to_route('folder');
    }
}
