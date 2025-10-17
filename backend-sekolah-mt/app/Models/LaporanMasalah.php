<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class LaporanMasalah extends Model
{
    use HasFactory;

    protected $table = 'laporan';

    protected $fillable = [
        'user_id','judul','deskripsi','kategori','foto','status', 'laporan_sementara_id'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function laporanSementara() {
    return $this->belongsTo(LaporanSementara::class, 'laporan_sementara_id');
    }
}
