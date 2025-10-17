import React, { useEffect, useState } from 'react';
import { FileText, CheckSquare, Users, Shield, Clock, ChevronRight, MessageSquareWarning, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ReportsPublicAPI } from '../utils/api';
// Komponen utama untuk Halaman Laporan
export default function LaporanPage() {
  const navigate = useNavigate();
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(true);
  // List laporan untuk tampilan daftar + filter
  const [list, setList] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [activeCat, setActiveCat] = useState(''); // '' = Semua
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await ReportsPublicAPI.latestFinished(6);
        setLatest(data.data || []);
      } catch {}
      finally { setLoading(false); }
    })();
  }, []);

  // Muat daftar laporan terkonfirmasi (diproses/selesai)
  useEffect(() => {
    (async () => {
      try {
        setLoadingList(true);
        const data = await ReportsPublicAPI.latestConfirmed(50);
        setList(data.data || []);
      } catch {}
      finally { setLoadingList(false); }
    })();
  }, []);
  const goToForm = () => {
    try {
      const token = localStorage.getItem('auth_token');
      navigate(token ? '/laporan/new' : '/login');
    } catch {
      navigate('/login');
    }
  };
  return (
    <div className="min-h-screen text-white py-12 px-4 sm:px-6 lg:px-8 mt-10">
      <div className="max-w-4xl mx-auto">

        {/* Header Halaman */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Dashboard Laporan
          </h1>
          <p className="text-lg text-gray-400">
            Ringkasan dan detail laporan aktivitas terkini.
          </p>
        </div>

        {/* 1. Card Utama */}
        <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 md:p-8 mb-8">
          
          {/* 2. Dua Card Penjelasan di Dalam Card Utama (DIUBAH) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card Kiri - Cara Membuat Laporan (DIUBAH) */}
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700/50 flex flex-col items-start gap-4">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-500/10 p-2.5 rounded-lg flex-shrink-0">
                        <FileText className="h-5 w-5 text-blue-400" />
                    </div>
                    <h3 className="text-base font-bold text-white">Cara Membuat Laporan</h3>
                </div>
                <ul className="list-decimal list-inside text-gray-300 text-sm space-y-2 pl-1">
                    <li>Login dengan akun siswa atau Guru.</li>
                    <li>Klik tombol "Buat Laporan".</li>
                    <li>Isi form lengkap dengan jelas.</li>
                    <li>Lampirkan foto jika diperlukan.</li>
                    <li>Kirim laporan dan tunggu tanggapan.</li>
                </ul>
            </div>

            {/* Card Kanan */}
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700/50 flex flex-col items-start gap-4">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-500/10 p-2.5 rounded-lg flex-shrink-0">
                        <CheckSquare className="h-5 w-5 text-green-400" />
                    </div>
                    <h3 className="text-base font-bold text-white">Kategori Laporan</h3>
                </div>
                <ul className="list-inside text-gray-300 text-sm space-y-2 pl-1">
                    <li>Laporan mengenai sarana dan prasarana</li>
                    <li>Terkait masalah belajar mengajar</li>
                    <li>Isi form lengkap dengan jelas</li>
                    <li>Masalah administratif</li>
                    <li>Laporan di luar kategori diatas</li>
                </ul>
            </div>
          </div>

          {/* 3. Tombol Memanjang di Bawah Dua Card */}
          <button
            onClick={goToForm}
            className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500"
          >
            <MessageSquareWarning className="h-5 w-5" />
            Membuat Laporan
          </button>
        </div>

        {/* Daftar Laporan dengan filter kategori */}
        <div className="mt-10 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 md:p-6">
          <h2 className="text-2xl font-bold mb-4">Daftar Laporan</h2>
          <div className="flex gap-4">
            {/* Sidebar kategori */}
            <div className="w-48 flex-shrink-0 space-y-3">
              {[
                {key:'', label:'Semua'},
                {key:'fasilitas', label:'Fasilitas Sekolah'},
                {key:'kebersihan', label:'Kebersihan'},
                {key:'keamanan', label:'Keamanan'},
                {key:'akademik', label:'Akademik'},
                {key:'lainnya', label:'Lainnya'},
              ].map(cat => (
                <button
                  key={cat.key || 'all'}
                  onClick={() => setActiveCat(cat.key)}
                  className={`w-full px-4 py-2 rounded-full border transition-all ${activeCat===cat.key ? 'bg-blue-600 text-white border-blue-500' : 'bg-gray-900/40 text-gray-200 border-gray-700 hover:border-gray-600'}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* List laporan (scrollable card) */}
            <div className="flex-1">
              <div className="relative bg-gray-900/40 border border-gray-700/50 rounded-2xl">
                {/* Edge gradients for depth */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-gray-900/80 to-transparent rounded-t-2xl" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-gray-900/80 to-transparent rounded-b-2xl" />

                {loadingList ? (
                  <div className="text-gray-400 p-6">Memuat...</div>
                ) : (
                  <div className="custom-scroll max-h-[640px] overflow-y-auto p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {(list || [])
                        .filter(it => !activeCat || (it.kategori||'').toLowerCase()===activeCat)
                        .slice(0, 50)
                        .map(item => (
                        <div key={item.id} className="group bg-gray-900/50 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 overflow-hidden flex flex-col">
                          {item.foto && (
                            <div className="h-44 overflow-hidden">
                              <img src={item.foto} alt={item.judul} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            </div>
                          )}
                          <div className="p-4 flex flex-col gap-2">
                            <div className="text-xs text-gray-400">{new Date(item.updated_at || item.created_at).toLocaleDateString('id-ID')}</div>
                            <div className="font-semibold text-white leading-snug line-clamp-2">{item.judul}</div>
                            <div className="text-sm text-gray-400 line-clamp-3">{item.deskripsi}</div>
                            <div className="mt-2 text-xs text-gray-400">Kategori: {item.kategori || '-'}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
