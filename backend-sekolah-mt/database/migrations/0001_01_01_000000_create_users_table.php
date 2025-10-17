<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();

            // Data Umum
            $table->string('name');
            $table->string('username')->unique()->nullable();

            //NIS, NISN untuk Siswa | NIP untuk Guru
            $table->string('nis')->unique()->nullable();
            $table->string('nisn')->unique()->nullable();
            $table->string('nip')->unique()->nullable();

            //Password Guru dan Admin
            $table->string('password')->nullable();

            // Role: siswa, guru, admin
            $table->enum('role', ['siswa', 'guru', 'admin'])->default('siswa');

            // Last login timestamp
            $table->timestamp('last_login_at')->nullable();

            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
