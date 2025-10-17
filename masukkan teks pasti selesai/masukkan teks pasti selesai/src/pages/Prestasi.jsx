import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Trophy } from 'lucide-react';
import PrestasiCard from '../components/PrestasiCard';
import { PublicGalleryAPI } from '../utils/api';

const PrestasiPage = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const data = await PublicGalleryAPI.latest(60);
        setItems((data.data || data).map(g => ({ title: g.title, description: g.caption, image: g.image_url, id: g.id })));
      } catch { setItems([]); }
    })();
  }, []);
  return (
    <div className="min-h-screen text-white">
      <Helmet>
        <title>Galeri Prestasi | SMK Negeri 1 Bantul</title>
        <meta name="description" content="Lihat berbagai pencapaian dan prestasi gemilang yang telah diraih oleh siswa-siswi SMK Negeri 1 Bantul." />
      </Helmet>
      
      <div className="relative pt-24 pb-16 px-4 text-center">
        <div className="inline-block p-4 bg-gray-800/50 rounded-2xl border border-gray-700/50 mb-6">
           <Trophy size={32} className="text-blue-400" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            Galeri Prestasi
          </span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Sebuah apresiasi atas kerja keras, dedikasi, dan pencapaian gemilang para siswa kami di berbagai bidang.
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 mt-8">
          {items.length === 0 ? (
            <div className="text-slate-400">Belum ada galeri prestasi.</div>
          ) : items.map((prestasi) => (
            <PrestasiCard key={prestasi.id} {...prestasi} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrestasiPage;