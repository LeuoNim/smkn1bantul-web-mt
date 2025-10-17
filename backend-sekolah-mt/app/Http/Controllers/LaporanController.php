<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LaporanMasalah;
use App\Models\LaporanSementara;
use App\Models\User;
use App\Models\Notifikasi;

class LaporanController extends Controller
{
    // Laporan selesai terbaru untuk beranda (publik)
    public function latestSelesai(Request $request)
    {
        $limit = (int) $request->query('limit', 6);
        $items = LaporanMasalah::with(['user:id,name'])
            ->where('status', 'selesai')
            ->orderByDesc('updated_at')
            ->limit(max(1, min(24, $limit)))
            ->get([ 'id','user_id','judul','deskripsi','kategori','foto','status','updated_at','created_at' ]);
        return response()->json(['data' => $items]);
    }

    // Laporan terkonfirmasi (diproses atau selesai) untuk beranda (publik)
    public function latestConfirmed(Request $request)
    {
        $limit = (int) $request->query('limit', 6);
        $items = LaporanMasalah::with(['user:id,name'])
            ->whereIn('status', ['diproses','selesai'])
            ->orderByDesc('updated_at')
            ->limit(max(1, min(24, $limit)))
            ->get([ 'id','user_id','judul','deskripsi','kategori','foto','status','updated_at','created_at' ]);
        return response()->json(['data' => $items]);
    }

    // Laporan berstatus diproses (opsional untuk fallback)
    public function latestDiproses(Request $request)
    {
        $limit = (int) $request->query('limit', 6);
        $items = LaporanMasalah::with(['user:id,name'])
            ->where('status', 'diproses')
            ->orderByDesc('updated_at')
            ->limit(max(1, min(24, $limit)))
            ->get([ 'id','user_id','judul','deskripsi','kategori','foto','status','updated_at','created_at' ]);
        return response()->json(['data' => $items]);
    }
   public function index(Request $request)
   {
        // Admin tidak boleh mengakses endpoint ini
        if ($request->user()->role === 'admin') {
            return response()->json(['message' => 'Admin tidak dapat melihat laporan pribadi.'], 403);
        }

        $laporan = LaporanMasalah::where('user_id', $request->user()->id)->latest()->get();

        return response()->json([
            'message' => 'Daftar laporan Anda',
            'data' => $laporan
        ]);
   }
    
   public function store(Request $request)
   {
       $validated = $request->validate([
           'judul' => 'required|string',
           'deskripsi' => 'required|string',
           'kategori' => 'required|string',
           'foto' => 'nullable|string'
       ]);

        $laporan = LaporanSementara::create([
            'user_id' => $request->user()->id,
            'judul' => $validated['judul'],
            'deskripsi' => $validated['deskripsi'],
            'kategori' => $validated['kategori'],
            'foto' => $validated['foto'] ?? null
        ]);

        // Kirim notifikasi ke Admin
        $admins = User::where('role', 'admin')->get();
        foreach ($admins as $admin) {
            Notifikasi::create([
                'user_id' => $admin->id,
                'title' => 'Laporan Baru Diajukan',
                'message' => "Siswa {$request->user()->name} mengajukan laporan: {$laporan->judul}"
            ]);
        }

    return response()->json(['message' => 'Laporan berhasil diajukan', 'laporan' => $laporan]);
   }

    public function uploadFoto(Request $request)
    {
        if (!$request->hasFile('image')) {
            return response()->json(['message' => 'Tidak ada file image'], 422);
        }
        $file = $request->file('image');
        if (!$file->isValid()) {
            return response()->json(['message' => 'File tidak valid'], 422);
        }
        if ($file->getSize() > 10 * 1024 * 1024) {
            return response()->json(['message' => 'Ukuran file melebihi 10MB'], 413);
        }

        $ext = strtolower($file->getClientOriginalExtension() ?: 'jpg');
        $safeExt = in_array($ext, ['jpg','jpeg','png','gif','webp']) ? $ext : 'jpg';
        $name = 'laporan_'.bin2hex(random_bytes(6)).'_'.time().'.'.$safeExt;

        $frontendRoot = base_path('..');
        $targetDir = $frontendRoot
            . DIRECTORY_SEPARATOR . 'masukkan teks pasti selesai'
            . DIRECTORY_SEPARATOR . 'masukkan teks pasti selesai'
            . DIRECTORY_SEPARATOR . 'public'
            . DIRECTORY_SEPARATOR . 'images'
            . DIRECTORY_SEPARATOR . 'laporan';

        if (!is_dir($targetDir)) {
            @mkdir($targetDir, 0777, true);
        }

        $file->move($targetDir, $name);
        $url = '/images/laporan/'.$name;
        return response()->json(['url' => $url]);
    }
}

