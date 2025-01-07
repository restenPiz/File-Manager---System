<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Folder extends Model
{
    use HasFactory;

    protected $table = 'folders';

    protected $fillable = [

    ];

    //*Start with relationship method
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
