<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LaporanSementara extends Model
{
    protected $table = 'laporan_sementara';

    protected $fillable = ['user_id','judul','deskripsi','kategori','foto'];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function laporanResmi() {
        return $this->hasOne(LaporanMasalah::class, 'laporan_sementara_id');
    }
}
