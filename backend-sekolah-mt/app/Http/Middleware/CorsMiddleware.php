<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CorsMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $allowedOrigin = '*'; // adjust if you need to lock to a specific frontend origin

        $headers = [
            'Access-Control-Allow-Origin' => $allowedOrigin,
            'Access-Control-Allow-Methods' => 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
            'Access-Control-Allow-Headers' => 'Accept, Content-Type, Authorization, X-Requested-With, Origin',
            'Access-Control-Allow-Credentials' => 'true',
            'Access-Control-Max-Age' => '86400',
        ];

        if ($request->getMethod() === 'OPTIONS') {
            $response = response('', 204);
            foreach ($headers as $k => $v) $response->headers->set($k, $v);
            return $response;
        }

        $response = $next($request);
        foreach ($headers as $k => $v) $response->headers->set($k, $v);
        return $response;
    }
}
