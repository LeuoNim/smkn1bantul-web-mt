import React from "react";
import { Link } from "react-router-dom";
import { Compass, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <section className="min-h-screen flex items-center justify-center text-white p-4 relative overflow-hidden">
      {/* Teks 404 Raksasa di Latar Belakang */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
         <h1 className="text-[30rem] font-black text-gray-800/50 opacity-10 leading-none select-none">
           404
         </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">

        {/* Teks 404 dengan Animasi */}
        <h1 className="text-8xl md:text-9xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse">
          404
        </h1>

        {/* Deskripsi dalam Bahasa Indonesia */}
        <h2 className="text-3xl font-semibold text-gray-200 mb-4">
          Oops! Sepertinya Anda tersesat.
        </h2>
        <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto font-medium">
          Halaman yang Anda tuju tidak ada, mungkin telah dihapus atau URL yang Anda masukkan salah. Mari kami bantu Anda kembali ke jalur yang benar.
        </p>

        {/* Tombol Kembali ke Beranda yang Baru */}
        <Link
          to="/"
          className="inline-flex items-center gap-x-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 ease-in-out px-8 py-4 rounded-full shadow-lg hover:shadow-blue-500/30 transform hover:scale-105 group"
        >
          <Home size={22} className="transition-transform duration-300 group-hover:rotate-[-12deg]" />
          Kembali ke Beranda
        </Link>
      </div>
    </section>
  );
};

export default NotFound;