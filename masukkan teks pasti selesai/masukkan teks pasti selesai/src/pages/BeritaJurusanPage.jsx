import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { Newspaper, ArrowLeft } from 'lucide-react';
import beritaJurusanData from '../data/berita-jurusan.json';
import jurusanData from '../data/jurusan.json';
import BeritaCard from '../components/BeritaCard'; // Kita gunakan ulang komponen yang sudah ada
import NotFound from './404';

const BeritaJurusanPage = () => {
  const { majorSlug } = useParams();
  
  // Ambil data jurusan untuk mendapatkan nama lengkap
  const jurusan = jurusanData.find(j => j.slug === majorSlug);
  
  // Filter berita berdasarkan majorSlug, lalu balik urutannya
  const beritaTerkait = [...beritaJurusanData]
    .filter(berita => berita.majorSlug === majorSlug)
    .reverse();

  if (!jurusan) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen text-white">
      <Helmet>
        <title>Berita Jurusan {jurusan.nama} | SMK Negeri 1 Bantul</title>
        <meta name="description" content={`Kumpulan berita dan kegiatan terbaru dari jurusan ${jurusan.nama}.`} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="mb-8">
          <Link
            to={`/program-keahlian/${majorSlug}`}
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ArrowLeft size={20} />
            Kembali ke Halaman Jurusan
          </Link>
        </div>

        <div className="text-center mb-16">
          <Newspaper size={40} className="mx-auto text-blue-400 mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Berita Jurusan {jurusan.nama}
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Ikuti informasi dan pencapaian terbaru dari program keahlian kami.
          </p>
        </div>

        {beritaTerkait.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beritaTerkait.map(berita => (
              <BeritaCard key={berita.id} berita={berita} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-800/50 rounded-2xl">
            <p className="text-gray-400 text-xl">Belum ada berita untuk jurusan ini.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BeritaJurusanPage;