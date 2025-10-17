import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Newspaper } from 'lucide-react';
import jurusanData from '../data/jurusan.json';
// Halaman 404 Anda mungkin perlu diimpor jika belum ada
// import NotFound from './404'; 

const DetailPageProgramKeahlian = () => {
  const { slug } = useParams();
  const jurusan = jurusanData.find(j => j.slug === slug);

  // Jika jurusan tidak ditemukan, Anda bisa menampilkan komponen NotFound
  if (!jurusan) {
    // return <NotFound />;
    return (
      <div className="min-h-screen text-white flex flex-col justify-center items-center text-center p-4">
        <h1 className="text-4xl font-bold mb-4">404 - Jurusan Tidak Ditemukan</h1>
        <p className="text-lg text-gray-300 mb-8">Maaf, program keahlian yang Anda cari tidak ada.</p>
        <Link
          to="/program-keahlian"
          className="inline-flex items-center gap-2 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-3 rounded-full"
        >
          <ArrowLeft size={20} />
          Kembali ke Daftar Jurusan
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <Helmet>
        <title>{jurusan.nama} | SMK Negeri 1 Bantul</title>
        <meta name="description" content={jurusan.deskripsi.substring(0, 160)} />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 py-24">
        <div className="mb-8">
          <Link
            to="/program-keahlian"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ArrowLeft size={20} />
            Kembali ke Semua Program Keahlian
          </Link>
        </div>

        <div className="relative bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 shadow-xl overflow-hidden">
          <img
            src={jurusan.gambarUrl}
            alt={`Ilustrasi untuk ${jurusan.nama}`}
            className="w-full h-64 md:h-80 object-cover"
          />
          {/* --- PERUBAHAN DI SINI --- */}
          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Program Keahlian {jurusan.nama}
            </h1>
            <div 
              className="prose prose-invert prose-lg max-w-none text-gray-300"
              dangerouslySetInnerHTML={{ __html: jurusan.deskripsi }}
            />
            {/* Tombol dipindahkan ke dalam div ini */}
            <div className="mt-10">
              <Link
                to={`/program-keahlian/${jurusan.slug}/berita`}
                className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
              >
                <Newspaper size={20} />
                Lihat Berita Jurusan
              </Link>
            </div>
          </div>
          {/* Tombol tidak lagi di sini */}
        </div>
      </div>
    </div>
  );
};

export default DetailPageProgramKeahlian;