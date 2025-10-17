<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\NotifikasiController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\SetupController;
use App\Http\Controllers\BeritaAdminController;
use App\Http\Controllers\GalleryAdminController;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use App\Models\User;


Route::get('/', function () {
    return response()->json(['message' => 'API routes aktif ✅']);
});

// ===== PUBLIC: BERITA =====
Route::get('/berita', [BeritaController::class, 'index']);
Route::get('/berita/{slug}', [BeritaController::class, 'show']);

// ===== PUBLIC: LAPORAN (untuk beranda) =====
Route::get('/laporan/selesai', [LaporanController::class, 'latestSelesai']);
Route::get('/laporan/terkonfirmasi', [LaporanController::class, 'latestConfirmed']);
Route::get('/laporan/diproses', [LaporanController::class, 'latestDiproses']);

// ===== PUBLIC: GALERI PRESTASI =====
Route::get('/galeri', [\App\Http\Controllers\GalleryController::class, 'index']);

// ==== AUTH ====
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// ==== SETUP (developer only; create default admin if none) ====
Route::post('/setup/admin', [SetupController::class, 'createAdmin']);

// DEV helper: force create/update admin
Route::post('/dev-create-admin', function () {
    $values = [
        'name' => 'Developer Admin',
        'password' => Hash::make('developer123'),
        'role' => 'admin',
    ];
    if (Schema::hasColumn('users', 'email')) {
        $values['email'] = 'developer@example.com';
    }
    $user = User::updateOrCreate(
        ['username' => 'developer'],
        array_merge(['username' => 'developer'], $values)
    );
    return response()->json(['message' => 'ok', 'user' => $user]);
});

Route::get('/dev-create-admin', function () {
    $values = [
        'name' => 'Developer Admin',
        'password' => Hash::make('developer123'),
        'role' => 'admin',
    ];
    if (Schema::hasColumn('users', 'email')) {
        $values['email'] = 'developer@example.com';
    }
    $user = User::updateOrCreate(
        ['username' => 'developer'],
        array_merge(['username' => 'developer'], $values)
    );
    return response()->json(['message' => 'ok', 'user' => $user]);
});

// ===== LAPORAN (Siswa & Guru) =====
// Dibuka untuk semua user terautentikasi (admin akan ditolak oleh controller)
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/laporan', [LaporanController::class, 'index']);
    Route::post('/laporan', [LaporanController::class, 'store']);
    Route::post('/laporan/upload-foto', [LaporanController::class, 'uploadFoto']);
    Route::get('/laporan/upload-foto', function () {
        return response()->json(['message' => 'Gunakan POST multipart/form-data untuk mengunggah gambar'], 405);
    });
    Route::get('/notifikasi', [NotifikasiController::class, 'index']);
    Route::post('/notifikasi/read-all', [NotifikasiController::class, 'readAll']);
});

// ===== ADMIN (khusus role admin) =====
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/admin/users', [AdminController::class, 'index']); // lihat semua user
    Route::post('/admin/users', [AdminController::class, 'store']); // tambah user (guru/siswa)
    Route::put('/admin/users/{user}', [AdminController::class, 'update']); // edit user
    Route::delete('/admin/users/{user}', [AdminController::class, 'destroy']); // hapus user
    Route::get('/admin/active-users', [AdminController::class, 'activeUsers']); // lihat user aktif
    Route::get('/admin/laporan', [AdminController::class, 'semuaLaporan']); // lihat semua laporan
    Route::patch('/admin/laporan', [AdminController::class, 'updateLaporan']); // update status laporan
    Route::delete('/admin/laporan', [AdminController::class, 'deleteLaporan']); // hapus laporan

    // Laporan Sementara
    Route::get('/admin/laporan-sementara', [AdminController::class, 'daftarLaporanSementara']);
    Route::post('/admin/konfirmasi-laporan', [AdminController::class, 'konfirmasiLaporan']);
    Route::patch('/admin/laporan/{laporan}', [AdminController::class, 'updateStatusLaporan']);

    // ===== ADMIN: BERITA =====
    Route::get('/admin/berita', [BeritaAdminController::class, 'index']);
    Route::post('/admin/berita', [BeritaAdminController::class, 'store']);
    Route::get('/admin/berita/{id}', [BeritaAdminController::class, 'show']);
    Route::put('/admin/berita/{id}', [BeritaAdminController::class, 'update']);
    Route::delete('/admin/berita/{id}', [BeritaAdminController::class, 'destroy']);
    Route::post('/admin/berita/upload-image', [BeritaAdminController::class, 'uploadImage']);

    // ===== ADMIN: GALERI =====
    Route::get('/admin/galeri', [\App\Http\Controllers\GalleryAdminController::class, 'index']);
    Route::post('/admin/galeri', [\App\Http\Controllers\GalleryAdminController::class, 'store']);
    Route::get('/admin/galeri/{id}', [\App\Http\Controllers\GalleryAdminController::class, 'show']);
    Route::put('/admin/galeri/{id}', [\App\Http\Controllers\GalleryAdminController::class, 'update']);
    Route::delete('/admin/galeri/{id}', [\App\Http\Controllers\GalleryAdminController::class, 'destroy']);
    Route::post('/admin/galeri/upload-image', [\App\Http\Controllers\GalleryAdminController::class, 'uploadImage']);

    // ===== ADMIN: NOTIFIKASI =====
    Route::get('/admin/notifikasi', [NotifikasiController::class, 'index']);
    Route::post('/admin/notifikasi/read-all', [NotifikasiController::class, 'readAll']);
}); 
