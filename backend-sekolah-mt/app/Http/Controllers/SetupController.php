<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class SetupController extends Controller
{
    public function createAdmin(Request $request)
    {
        try {
            $data = $request->validate([
                'name' => 'sometimes|string|max:255',
                'username' => 'sometimes|string|max:255',
                'password' => 'sometimes|string|min:6',
            ]);

            $username = $data['username'] ?? 'developer';
            $password = $data['password'] ?? 'developer123';
            $name = $data['name'] ?? 'Developer Admin';

            // Upsert by username
            $user = User::where('username', $username)->first();
            if ($user) {
                $user->update([
                    'name' => $name,
                    'password' => Hash::make($password),
                    'role' => 'admin',
                ]);
                $status = 200;
                $message = 'Admin updated';
            } else {
                $user = User::create([
                    'name' => $name,
                    'username' => $username,
                    'password' => Hash::make($password),
                    'role' => 'admin',
                ]);
                $status = 201;
                $message = 'Default admin created';
            }

            return response()->json([
                'message' => $message,
                'credentials' => [
                    'username' => $username,
                    'password' => $password,
                ],
                'user' => $user,
            ], $status);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Failed to create admin',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
