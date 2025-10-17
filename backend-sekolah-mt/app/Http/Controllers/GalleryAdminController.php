<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Gallery;

class GalleryAdminController extends Controller
{
    public function index(Request $request)
    {
        $q = Gallery::query()->orderByDesc('published_at')->orderByDesc('id');
        $per = (int) $request->query('per_page', 20);
        $page = $q->paginate(max(1,$per));
        return response()->json(['data' => $page->items(), 'meta' => [
            'current_page' => $page->currentPage(),
            'per_page' => $page->perPage(),
            'total' => $page->total(),
            'last_page' => $page->lastPage(),
        ]]);
    }

    public function show(int $id)
    {
        $g = Gallery::find($id);
        if (!$g) return response()->json(['message' => 'Item tidak ditemukan'], 404);
        return response()->json($g);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'caption' => 'nullable|string',
            'image_url' => 'nullable|string|max:1000',
            'published_at' => 'nullable|date',
        ]);
        $g = Gallery::create($data);
        return response()->json(['message' => 'Item dibuat', 'data' => $g], 201);
    }

    public function update(Request $request, int $id)
    {
        $g = Gallery::find($id);
        if (!$g) return response()->json(['message' => 'Item tidak ditemukan'], 404);
        $data = $request->validate([
            'title' => 'sometimes|string|max:255',
            'caption' => 'sometimes|nullable|string',
            'image_url' => 'sometimes|nullable|string|max:1000',
            'published_at' => 'sometimes|nullable|date',
        ]);
        $g->update($data);
        return response()->json(['message' => 'Item diperbarui', 'data' => $g]);
    }

    public function destroy(int $id)
    {
        $g = Gallery::find($id);
        if (!$g) return response()->json(['message' => 'Item tidak ditemukan'], 404);
        $g->delete();
        return response()->json(['message' => 'Item dihapus']);
    }

    public function uploadImage(Request $request)
    {
        if (!$request->hasFile('image')) return response()->json(['message' => 'Tidak ada file image'], 422);
        $file = $request->file('image');
        if (!$file->isValid()) return response()->json(['message' => 'File tidak valid'], 422);
        if ($file->getSize() > 10 * 1024 * 1024) return response()->json(['message' => 'Ukuran file melebihi 10MB'], 413);

        $ext = strtolower($file->getClientOriginalExtension() ?: 'jpg');
        $safe = in_array($ext, ['jpg','jpeg','png','gif','webp']) ? $ext : 'jpg';
        $name = 'galeri_'.Str::random(12).'_'.time().'.'.$safe;
        $frontendRoot = base_path('..');
        $target = $frontendRoot.DIRECTORY_SEPARATOR.'masukkan teks pasti selesai'.DIRECTORY_SEPARATOR.'masukkan teks pasti selesai'.DIRECTORY_SEPARATOR.'public'.DIRECTORY_SEPARATOR.'images'.DIRECTORY_SEPARATOR.'galeri';
        if (!is_dir($target)) @mkdir($target, 0777, true);
        $file->move($target, $name);
        $url = '/images/galeri/'.$name;
        return response()->json(['url' => $url]);
    }
}
