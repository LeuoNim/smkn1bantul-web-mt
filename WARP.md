# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Overview

- Root contains a simple static site scaffold documented in `README.md`.
- `backend-sekolah-mt/` is a Laravel 12 API backend using Sanctum for auth, Vite/Tailwind for assets, and PHPUnit for tests.

## Common commands

- Install & initialize (copies .env, generates key, runs migrations, installs/builds assets):

```bash path=null start=null
cd backend-sekolah-mt
composer run setup
```

- Start development (Laravel server, queue listener, logs, and Vite in one command):

```bash path=null start=null
cd backend-sekolah-mt
composer run dev
```

- Alternatively, run separately:

```bash path=null start=null
php artisan serve
npm run dev
```

- Build frontend assets:

```bash path=null start=null
npm run build
```

- Run tests:

```bash path=null start=null
php artisan test
```

- Run a single test (by class, method, or pattern):

```bash path=null start=null
php artisan test --filter=ExampleTest
php artisan test --filter=ExampleTest::test_basic_example
php artisan test --filter=some_regex
```

- Lint/format PHP (Laravel Pint):

```bash path=null start=null
./vendor/bin/pint --test   # check
./vendor/bin/pint          # fix
```

- Database migrations (if needed manually):

```bash path=null start=null
php artisan migrate
```

## High-level architecture

- Routing & Middleware
  - `bootstrap/app.php` wires routes and middleware using the Laravel 12 configuration API.
    - Web routes: `routes/web.php`; API routes: `routes/api.php`.
    - Sanctum stateful middleware is prepended for API; custom alias `role` maps to `App\Http\Middleware\RoleMiddleware`.
  - `RoleMiddleware` authorizes by role and returns JSON 401/403 for unauthenticated/forbidden.

- Authentication
  - Sanctum token-based login in `App\Http\Controllers\AuthController` supports three login forms:
    - Siswa: `nis` + `nisn`
    - Guru: `nip` + password
    - Admin: `username` + password
  - On success, updates `last_login_at` and issues a personal access token.

- Domain & Data Flow
  - Models (Eloquent):
    - `User` (roles: siswa, guru, admin)
    - `LaporanMasalah` (table `laporan`) — belongsTo `User`, belongsTo `LaporanSementara` via `laporan_sementara_id`.
    - `LaporanSementara` (staging table for submissions) — belongsTo `User`, hasOne final `LaporanMasalah`.
    - `Notifikasi` — belongsTo `User`.
  - Controllers:
    - `LaporanController` (siswa): list own reports; submit to `laporan_sementara` and notify admins.
    - `AdminController` (admin): CRUD users; view active tokens; batch update/delete `laporan`; confirm staged reports into final table with notifications.
    - `NotifikasiController`: list notifications for current user.
  - API protection:
    - Siswa endpoints under `auth:sanctum` + `role:siswa`.
    - Admin endpoints under `auth:sanctum` + `role:admin`.

- Testing
  - `phpunit.xml` configures in-memory SQLite (`DB_CONNECTION=sqlite`, `DB_DATABASE=:memory:`) and isolates app/services for fast tests; run with `php artisan test`.

- Frontend assets
  - Vite/Tailwind via `package.json`; use `npm run dev` during development and `npm run build` for production bundles.
