<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notifikasi;
use App\Models\User;
use App\Models\LaporanMasalah;

class NotifikasiController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $notifikasi = Notifikasi::where('user_id', $user->id)
                                ->orderBy('created_at', 'desc')
                                ->get();

        return response()->json(['notifikasi' => $notifikasi]);
    }

    public function readAll(Request $request)
    {
        $user = $request->user();
        Notifikasi::where('user_id', $user->id)
            ->where(function($q){ $q->whereNull('read')->orWhere('read', false); })
            ->update(['read' => true]);
        return response()->json(['message' => 'Semua notifikasi ditandai telah dibaca']);
    }
}
