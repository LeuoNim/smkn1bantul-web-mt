import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import BeritaCard from './BeritaCard';
import { NewsAPI } from '../utils/api';

const BeritaTerbaru = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await NewsAPI.list({ per_page: 3 });
        const list = (data.data || data).map((n) => ({
          id: n.id,
          slug: n.slug,
          title: n.title,
          excerpt: n.excerpt || (n.body ? n.body.substring(0, 120) + '…' : ''),
          image: n.image_url || '/images/placeholder.jpg',
          date: n.published_at ? new Date(n.published_at).toLocaleDateString('id-ID') : '',
        }));
        setItems(list);
      } catch (e) {
        // ignore to avoid crashing homepage
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="py-16 sm:py-24 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Berita Terbaru
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Ikuti perkembangan dan pengumuman terbaru dari sekolah kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <p className="text-center col-span-3 text-slate-400">Memuat...</p>
          ) : items.length ? (
            items.map((berita) => (
              <BeritaCard key={berita.id} berita={berita} />
            ))
          ) : (
            <p className="text-center col-span-3 text-slate-400">Belum ada berita.</p>
          )}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/berita"
            className="inline-flex items-center gap-2 text-lg font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            Lihat Semua Berita
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BeritaTerbaru;