<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BeritaAdminController extends Controller
{
    public function index(Request $request)
    {
        $q = Berita::query();
        if ($search = $request->query('q') ?? $request->query('search')) {
            $q->where(function ($qq) use ($search) {
                $qq->where('title', 'like', "%{$search}%")
                   ->orWhere('excerpt', 'like', "%{$search}%")
                   ->orWhere('content', 'like', "%{$search}%");
            });
        }
        $q->orderByDesc('published_at')->orderByDesc('id');
        $per = (int) $request->query('per_page', 20);
        $page = $q->paginate(max(1, $per));
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

    public function show(int $id)
    {
        $b = Berita::find($id);
        if (!$b) return response()->json(['message' => 'Berita tidak ditemukan'], 404);
        return response()->json($b);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'excerpt' => 'nullable|string',
            'content' => 'nullable|string',
            'body' => 'nullable|string',
            'image_url' => 'nullable|string|max:1000',
            'published_at' => 'nullable|date',
            'is_published' => 'sometimes|boolean',
            'category' => 'required|string|in:Acara,Pengumuman',
        ]);

        // map body -> content if provided
        if (!empty($data['body']) && empty($data['content'])) {
            $data['content'] = $data['body'];
        }

        // handle publish flag
        if (array_key_exists('is_published', $data)) {
            if ($data['is_published']) {
                $data['published_at'] = $data['published_at'] ?? now();
            } else {
                $data['published_at'] = null;
            }
            unset($data['is_published']);
        }

        $slug = $data['slug'] ?? Str::slug($data['title']);
        $base = $slug;
        $i = 1;
        while (Berita::where('slug', $slug)->exists()) {
            $slug = $base.'-'.(++$i);
        }
        $data['slug'] = $slug;

        $b = Berita::create($data);
        return response()->json(['message' => 'Berita dibuat', 'data' => $b], 201);
    }

    public function update(Request $request, int $id)
    {
        $b = Berita::find($id);
        if (!$b) return response()->json(['message' => 'Berita tidak ditemukan'], 404);

        $data = $request->validate([
            'title' => 'sometimes|string|max:255',
            'slug' => 'sometimes|string|max:255',
            'excerpt' => 'sometimes|nullable|string',
            'content' => 'sometimes|nullable|string',
            'body' => 'sometimes|nullable|string',
            'image_url' => 'sometimes|nullable|string|max:1000',
            'published_at' => 'sometimes|nullable|date',
            'is_published' => 'sometimes|boolean',
            'category' => 'sometimes|string|in:Acara,Pengumuman',
        ]);

        if (isset($data['body']) && !isset($data['content'])) {
            $data['content'] = $data['body'];
            unset($data['body']);
        }

        if (array_key_exists('is_published', $data)) {
            if ($data['is_published']) {
                $data['published_at'] = $data['published_at'] ?? now();
            } else {
                $data['published_at'] = null;
            }
            unset($data['is_published']);
        }

        if (isset($data['slug']) && $data['slug'] !== $b->slug) {
            $slug = Str::slug($data['slug']);
            $base = $slug;
            $i = 1;
            while (Berita::where('slug', $slug)->where('id', '!=', $b->id)->exists()) {
                $slug = $base.'-'.(++$i);
            }
            $data['slug'] = $slug;
        }

        $b->update($data);
        return response()->json(['message' => 'Berita diperbarui', 'data' => $b]);
    }

    public function destroy(int $id)
    {
        $b = Berita::find($id);
        if (!$b) return response()->json(['message' => 'Berita tidak ditemukan'], 404);
        $b->delete();
        return response()->json(['message' => 'Berita dihapus']);
    }

    public function uploadImage(Request $request)
    {
        if (!$request->hasFile('image')) {
            return response()->json(['message' => 'Tidak ada file image'], 422);
        }
        $file = $request->file('image');
        if (!$file->isValid()) {
            return response()->json(['message' => 'File tidak valid'], 422);
        }
        if ($file->getSize() > 10 * 1024 * 1024) { // 10MB
            return response()->json(['message' => 'Ukuran file melebihi 10MB'], 413);
        }

        $ext = strtolower($file->getClientOriginalExtension() ?: 'jpg');
        $safeExt = in_array($ext, ['jpg','jpeg','png','gif','webp']) ? $ext : 'jpg';
        $name = 'berita_'.Str::random(12).'_'.time().'.'.$safeExt;

        // Simpan ke folder frontend: masukkan teks pasti selesai/masukkan teks pasti selesai/public/images/berita
        $frontendRoot = base_path('..');
        $targetDir = $frontendRoot
            . DIRECTORY_SEPARATOR . 'masukkan teks pasti selesai'
            . DIRECTORY_SEPARATOR . 'masukkan teks pasti selesai'
            . DIRECTORY_SEPARATOR . 'public'
            . DIRECTORY_SEPARATOR . 'images'
            . DIRECTORY_SEPARATOR . 'berita';

        if (!is_dir($targetDir)) {
            @mkdir($targetDir, 0777, true);
        }

        $file->move($targetDir, $name);

        // Kembalikan URL agar bisa digunakan di frontend (CRA menyajikan /public di root)
        $url = '/images/berita/' . $name;
        return response()->json(['url' => $url]);
    }
}
