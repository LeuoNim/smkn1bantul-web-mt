<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    protected function redirectTo(Request $request): ?string
    {
        // For API/Sanctum endpoints, do not redirect to a login route.
        // Let Laravel return a 401 JSON response instead of throwing RouteNotFoundException.
        return null;
    }
}
