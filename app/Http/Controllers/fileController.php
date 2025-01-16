<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Inertia\Inertia;

class fileController extends Controller
{
    public function index()
    {
        $files = File::all();

        //*Returning the component
        return Inertia::render('File', [
            'files' => $files,
        ]);
    }
    public function upload(Request $request)
    {
        $file = new File();

        $file->File_name = $request->input('File_name');
        $file->Path = $request->input('Path');
        $file->Quantity = $request->input('Quantity');
        $file->id_folder = $request->input('id_folder');
        $file->id_user = $request->input('id_user');

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
