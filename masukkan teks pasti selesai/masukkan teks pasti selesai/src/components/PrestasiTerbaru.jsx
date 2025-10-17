import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PrestasiCard from './PrestasiCard';
import { PublicGalleryAPI } from '../utils/api';

const PrestasiTerbaru = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const data = await PublicGalleryAPI.latest(3);
        const list = data.data || data;
        setItems(list.map((g) => ({ id: g.id, title: g.title, image: g.image_url, description: g.caption })));
      } catch {
        setItems([]);
      }
    })();
  }, []);

  return (
    <section className="py-16 sm:py-24 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Prestasi Terbaru
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Apresiasi bagi siswa-siswi kami yang baru saja mengukir pencapaian gemilang.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {items.length === 0 ? (
            <div className="text-gray-400">Belum ada galeri prestasi.</div>
          ) : items.map((prestasi) => (
            <PrestasiCard key={prestasi.id} {...prestasi} />
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/prestasi"
            className="inline-flex items-center gap-2 text-lg font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            Lihat Semua Prestasi
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PrestasiTerbaru;