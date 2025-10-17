<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (!Schema::hasColumn('berita', 'category')) {
            Schema::table('berita', function (Blueprint $table) {
                $table->string('category')->nullable()->index()->after('image_url');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('berita', 'category')) {
            Schema::table('berita', function (Blueprint $table) {
                $table->dropColumn('category');
            });
        }
    }
};