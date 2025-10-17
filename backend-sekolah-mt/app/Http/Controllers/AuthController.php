<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{   
    public function login(Request $request)
    {
        $user = null;

        // Login Siswa
        if ($request->filled(['nis', 'nisn'])) {
            $user = User::where('nis', $request->nis)
                        ->where('nisn', $request->nisn)
                        ->where('role', 'siswa')
                        ->first();
                        
           if (!$user) {
            return response()->json(['message' => 'NIS/NISN salah'], 401);
            }
        }

        // Login Guru
        elseif ($request->filled(['nip', 'password'])) {
            $user = User::where('nip', $request->nip)
                        ->where('role', 'guru')
                        ->first();
            if ($user && !Hash::check($request->password, $user->password)) {
                return response()->json(['message' => 'Password salah'], 401);
            }
        }

        // Login Admin
        elseif ($request->filled(['username', 'password'])) {
            $user = User::where('username', $request->username)
                        ->where('role', 'admin')
                        ->first();
            if ($user && !Hash::check($request->password, $user->password)) {
                return response()->json(['message' => 'Password salah'], 401);
            }
        }

        if (!$user) {
            return response()->json(['message' => 'User tidak ditemukan'], 404);
        }

        // Simpan waktu login terakhir
        $user->update(['last_login_at' => now()]);

        // Buat token Sanctum
        $token = $user->createToken('auth_token')->plainTextToken;

        // Simpan waktu login terakhir
        $user->update(['last_login_at' => now()]);

        return response()->json([
            'message' => 'Login berhasil',
            'token' => $token,
            'role' => $user->role,
            'user' => $user
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logout berhasil']);
    }
}
