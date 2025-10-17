<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use Illuminate\Http\Request;

class BeritaController extends Controller
{
    public function index(Request $request)
    {
        $query = Berita::query();

        if ($search = $request->query('q') ?? $request->query('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        // Only published first, newest first
        $query->orderByDesc('published_at')->orderByDesc('id');

        $perPage = (int) ($request->query('per_page', 20));
        if ($request->boolean('paginate', true)) {
            $page = $query->paginate(max(1, $perPage));
            return response()->json([
                'data' => $page->items(),
                'meta' => [
                    'current_page' => $page->currentPage(),
                    'per_page' => $page->perPage(),
                    'total' => $page->total(),
                    'last_page' => $page->lastPage(),
                ],
            ]);
        }

        return response()->json(['data' => $query->limit($perPage)->get()]);
    }

    public function show(string $slug)
    {
        $berita = Berita::where('slug', $slug)->first();
        if (!$berita) {
            return response()->json(['message' => 'Berita tidak ditemukan'], 404);
        }
        return response()->json($berita);
    }
}
