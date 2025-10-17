<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\LaporanMasalah;
use App\Models\Notifikasi;
use App\Models\LaporanSementara;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

use Laravel\Sanctum\PersonalAccessToken;

class AdminController extends Controller
{
    public function authorizedAdmin($user)
    {
        if ($user->role !== 'admin') {
            abort(403, 'Hanya admin yang dapat mengakses fitur ini');
        }
    }

    // Lihat semua user
    public function index(Request $request)
    {
        $this->authorizedAdmin($request->user());

        $query = User::select('id', 'name', 'role', 'username', 'nis', 'nisn', 'nip', 'last_login_at');

        if ($role = $request->query('role')) {
            $query->where('role', $role);
        }

        if ($exclude = $request->query('exclude')) {
            $roles = array_filter(array_map('trim', explode(',', $exclude)));
            if (!empty($roles)) {
                $query->whereNotIn('role', $roles);
            }
        }

        $users = $query->orderBy('role')->orderBy('name')->get();

        return response()->json($users);
    }

    // Tambah user (guru/siswa)
    public function store(Request $request)
    {
        $this->authorizedAdmin($request->user());

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|in:siswa,guru',
            'username' => 'nullable|string|unique:users',
            'password' => 'nullable|string|min:6',
            'nis' => 'nullable|string|unique:users',
            'nisn' => 'nullable|string|unique:users',
            'nip' => 'nullable|string|unique:users',
        ]);

        // Wajib NIP untuk guru
        if (($validated['role'] ?? '') === 'guru' && empty($validated['nip'])) {
            return response()->json(['message' => 'NIP wajib diisi untuk user guru'], 422);
        }

        // Siapkan email fallback jika kolom email ada dan NOT NULL
        $email = null;
        if (Schema::hasColumn('users', 'email')) {
            if (($validated['role'] ?? '') === 'siswa') {
                $email = ($validated['nis'] ?? ('siswa'.uniqid())) . '@student.local';
            } elseif (($validated['role'] ?? '') === 'guru') {
                $email = ($validated['nip'] ?? ('guru'.uniqid())) . '@teacher.local';
            } else { // admin
                $email = ($validated['username'] ?? ('admin'.uniqid())) . '@admin.local';
            }
        }

        // Tentukan username default untuk guru: pakai NIP
        $username = $validated['username'] ?? null;
        if (($validated['role'] ?? '') === 'guru' && empty($username)) {
            $username = $validated['nip'];
        }

        // Tentukan password default bila tidak diberikan
        $passwordHash = null;
        if (!empty($validated['password'])) {
            $passwordHash = Hash::make($validated['password']);
        } elseif (($validated['role'] ?? '') === 'siswa' && !empty($validated['nisn'])) {
            // siswa: pakai NISN sebagai password agar selaras login siswa
            $passwordHash = Hash::make($validated['nisn']);
        } elseif (($validated['role'] ?? '') === 'guru' && !empty($validated['nip'])) {
            // guru: pakai NIP sebagai password
            $passwordHash = Hash::make($validated['nip']);
        } else {
            // fallback acak bila skema DB mensyaratkan NOT NULL
            $passwordHash = Hash::make(Str::random(16));
        }

        $user = User::create([
            'name' => $validated['name'],
            'username' => $username,
            'email' => $email,
            'password' => $passwordHash,
            'role' => $validated['role'],
            'nis' => $validated['nis'] ?? null,
            'nisn' => $validated['nisn'] ?? null,
            'nip' => $validated['nip'] ?? null,
        ]);

        return response()->json(['message' => 'User berhasil ditambahkan', 'user' => $user]);
    }

    // Edit user
    public function update(Request $request, User $user)
    {
        $this->authorizedAdmin($request->user());

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'username' => 'sometimes|string|unique:users,username,' . $user->id,
            'role' => 'sometimes|in:siswa,guru,admin',
            'password' => 'nullable|string|min:6',
            'nis' => 'sometimes|nullable|string|unique:users,nis,' . $user->id,
            'nisn' => 'sometimes|nullable|string|unique:users,nisn,' . $user->id,
            'nip' => 'sometimes|nullable|string|unique:users,nip,' . $user->id,
        ]);

        // Default username guru = NIP (jika username tidak dikirim)
        if (($validated['role'] ?? $user->role) === 'guru') {
            if (empty($validated['username'])) {
                $validated['username'] = $validated['nip'] ?? $user->nip ?? $user->username;
            }
        }

        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $user->update($validated);

        return response()->json(['message' => 'User diperbarui', 'user' => $user]);
    }

    // Hapus user
    public function destroy(Request $request, User $user)
    {
        $this->authorizedAdmin($request->user());
        $user->delete();
        return response()->json(['message' => 'User dihapus']);
    }

    //Lihat siapa saja yang sedang aktif
    public function activeUsers(Request $request)
    {
        $this->authorizedAdmin($request->user());

        $tokens = PersonalAccessToken::with('tokenable')
                    ->latest()
                    ->get()
                    ->groupBy('tokenable.role');

        return response()->json($tokens);
    }

    //Melihat semua laporan siswa
    public function semuaLaporan(Request $request)
    {
        $this->authorizedAdmin($request->user());

        $reports = LaporanMasalah::with('user')->latest()->get();

        return response()->json(['message' => 'Daftar Laporan', 'data' => $reports]);
    }

    // Memperbarui status laporan
    public function updateLaporan(Request $request)
    {
        $this->authorizedAdmin($request->user());

        $validated = $request->validate([
            'ids' => 'required|array',               // bisa 1 atau lebih
            'ids.*' => 'exists:laporan,id',          // validasi semua id ada
            'status' => 'required|string|in:menunggu,diproses,selesai',
        ]);

        $laporans = LaporanMasalah::whereIn('id', $validated['ids'])->get();

        foreach ($laporans as $laporan) {
            $laporan->update(['status' => $validated['status']]);

            if (in_array($validated['status'], ['diproses', 'selesai'])) {
                Notifikasi::create([
                    'user_id' => $laporan->user_id,
                    'title' => $validated['status'] === 'diproses' ? 'Laporan Diproses' : 'Laporan Selesai',
                    'message' => "Laporan '{$laporan->judul}' Anda telah {$validated['status']}."
                ]);
            }
        }

        $updatedLaporans = LaporanMasalah::whereIn('id', $validated['ids'])->get();

        return response()->json([
            'message' => 'Status laporan diperbarui',
            'laporans' => $updatedLaporans
        ]);
    }

    public function deleteLaporan(Request $request)
    {
        $this->authorizedAdmin($request->user());

        $validated = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:laporan,id',
        ]);

        $laporans = LaporanMasalah::whereIn('id', $validated['ids'])->get();

        foreach ($laporans as $laporan) {
            $laporan->delete();
        }

        return response()->json([
            'message' => 'Laporan dihapus',
            'deleted_ids' => $validated['ids']
        ]);
    }

    // Lihat laporan sementara
    public function daftarLaporanSementara()
    {
        $laporans = LaporanSementara::with(['user:id,name,nis,nisn,role'])->get();

        // Hanya ambil field penting dari laporan
        $laporans = $laporans->map(function ($laporan) {
            return [
                'id' => $laporan->id,
                'judul' => $laporan->judul,
                'deskripsi' => $laporan->deskripsi,
                'kategori' => $laporan->kategori,
                'foto' => $laporan->foto,
                'created_at' => $laporan->created_at,
                'user' => $laporan->user
            ];
        });

        return response()->json([
            'laporan_sementara' => $laporans
        ]);
    }

    // Konfirmasi laporan → pindah ke tabel resmi
    public function konfirmasiLaporan(Request $request)
    {
        $this->authorizedAdmin($request->user());

        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:laporan_sementara,id',
            'status' => 'required|in:diterima,ditolak',
        ]);

        $laporans = LaporanSementara::whereIn('id', $request->ids)->get();

        foreach ($laporans as $laporan) {
            $userSiswa = $laporan->user;

            if ($request->status === 'diterima') {
                LaporanMasalah::create([
                    'user_id' => $laporan->user_id,
                    'judul' => $laporan->judul,
                    'deskripsi' => $laporan->deskripsi,
                    'kategori' => $laporan->kategori,
                    'foto' => $laporan->foto,
                    'status' => 'diproses',
                    'laporan_sementara_id' => $laporan->id
                ]);

                Notifikasi::create([
                    'user_id' => $userSiswa->id,
                    'title' => 'Laporan Diproses',
                    'message' => "Laporan '{$laporan->judul}' Anda sedang diproses."
                ]);

                $laporan->delete();

            } else {
                $laporan->delete();

                Notifikasi::create([
                    'user_id' => $userSiswa->id,
                    'title' => 'Laporan Ditolak',
                    'message' => "Laporan '{$laporan->judul}' Anda ditolak oleh Admin."
                ]);
            }
        }

        return response()->json([
            'message' => 'Laporan berhasil dikonfirmasi',
            'laporan_sementara' => $laporans
        ]);
    }

    // Update status satu laporan via route model binding
    public function updateStatusLaporan(Request $request, LaporanMasalah $laporan)
    {
        $this->authorizedAdmin($request->user());

        $validated = $request->validate([
            'status' => 'required|string|in:menunggu,diproses,selesai',
        ]);

        $laporan->update(['status' => $validated['status']]);

        if (in_array($validated['status'], ['diproses', 'selesai'])) {
            Notifikasi::create([
                'user_id' => $laporan->user_id,
                'title' => $validated['status'] === 'diproses' ? 'Laporan Diproses' : 'Laporan Selesai',
                'message' => "Laporan '{$laporan->judul}' Anda telah {$validated['status']}."
            ]);
        }

        return response()->json([
            'message' => 'Status laporan diperbarui',
            'laporan' => $laporan
        ]);
    }
}
