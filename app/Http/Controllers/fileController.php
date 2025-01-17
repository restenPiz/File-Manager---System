<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Inertia\Inertia;

class fileController extends Controller
{
    public function index($id)
    {
        $files = File::where('id_folder', $id)->get();

        //*Returning the component
        return Inertia::render('File', [
            'files' => $files,
        ]);
    }
    public function upload(Request $request)
    {
        $file = new File();

        $file->File_name = $request->file('Path')->getClientOriginalName();
        $file->Quantity = $request->input('Quantity');
        $file->id_folder = $request->input('id_folder');
        $file->id_user = $request->input('id_user');

        if ($request->hasFile('Path')) {
            $filePath = $request->file('Path')->store('uploads/files', 'public');
            $file->Path = $filePath;
        }

        $file->save();

        return to_route('file');
    }
    public function delete($id)
    {
        $file = File::findOrFail($id);

        $file->delete();

        return to_route('file');
    }
}
