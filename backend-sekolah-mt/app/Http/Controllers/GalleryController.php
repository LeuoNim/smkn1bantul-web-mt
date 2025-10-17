<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Gallery;

class GalleryController extends Controller
{
    public function index(Request $request)
    {
        $limit = (int) $request->query('limit', 6);
        $items = Gallery::orderByDesc('published_at')->orderByDesc('id')
            ->limit(max(1, min(24, $limit)))
            ->get(['id','title','caption','image_url','published_at','created_at']);
        return response()->json(['data' => $items]);
    }
}
