<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Berita extends Model
{
    use HasFactory;

    protected $table = 'berita';

    protected $fillable = [
        'title', 'slug', 'excerpt', 'content', 'image_url', 'published_at', 'category'
    ];

    protected $casts = [
        'published_at' => 'datetime',
    ];

    protected $appends = ['is_published'];

    public function getIsPublishedAttribute(): bool
    {
        return !is_null($this->published_at);
    }
}
