<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Folder extends Model
{
    use HasFactory;

    protected $table = 'folders';

    protected $fillable = [
        'Folder_name',
        'id_user',
        'Parent_id'
    ];

    //*Start with relationship method
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_user', 'id');
    }
    public function file(): HasMany
    {
        return $this->hasMany(File::class, 'id_folder', 'id');
    }
}
