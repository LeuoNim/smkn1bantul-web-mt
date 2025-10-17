import React from 'react';
import { Helmet } from 'react-helmet-async';
import { School } from 'lucide-react';
import beritaJurusanData from '../data/berita-jurusan.json';
import BeritaCard from '../components/BeritaCard'; // Menggunakan ulang komponen BeritaCard

const SemuaBeritaJurusanPage = () => {
  // Balik urutan array untuk menampilkan berita terbaru di paling atas
  const semuaBerita = [...beritaJurusanData].reverse();

  return (
    <div className="min-h-screen text-white">
      <Helmet>
        <title>Semua Berita Jurusan | SMK Negeri 1 Bantul</title>
        <meta name="description" content="Kumpulan berita, kegiatan, dan prestasi dari semua program keahlian di SMK Negeri 1 Bantul." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <School size={40} className="mx-auto text-blue-400 mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Kabar dari Semua Jurusan
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Jelajahi inovasi, prestasi, dan kegiatan yang terjadi di setiap program keahlian kami.
          </p>
        </div>

        {semuaBerita.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {semuaBerita.map(berita => (
              <BeritaCard key={berita.id} berita={berita} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-800/50 rounded-2xl">
            <p className="text-gray-400 text-xl">Belum ada berita jurusan yang dipublikasikan.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SemuaBeritaJurusanPage;