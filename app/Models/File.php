<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;

    protected $table = 'files';

    protected $fillable = [
        'File_name',
        'Path',
        'Quantity',
        'id_folder',
        'id_user'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_user', 'id');
    }
    public function folder(): BelongsTo
    {
        return $this->belongsTo(Folder::class, 'id_folder', 'id');
    }
}
