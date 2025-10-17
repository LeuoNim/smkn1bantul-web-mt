import React, { useState, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import BeritaCard from '../components/BeritaCard'; // Impor komponen kartu
import { NewsAPI } from '../utils/api';

// Komponen FilterButton tetap sama, bisa diletakkan di sini atau dipisah
const FilterButton = ({ label, options, value, onChange }) => {
    // ... (kode FilterButton tidak berubah)
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="relative w-full sm:w-auto">
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between w-full bg-gray-800/50 backdrop-blur-sm text-white px-4 py-3 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all"
        >
            <span className="text-sm">{label}: {value || 'Semua'}</span>
            <ChevronDown size={16} className={`ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
            <div className="absolute z-10 w-full mt-2 bg-gray-800/90 backdrop-blur-sm rounded-xl border border-gray-700 shadow-xl">
            <div className="py-1">
                <button
                onClick={() => { onChange(''); setIsOpen(false); }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-blue-500/20 transition-colors"
                >
                Semua
                </button>
                {options.map(option => (
                <button
                    key={option}
                    onClick={() => { onChange(option); setIsOpen(false); }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-blue-500/20 transition-colors"
                >
                    {option}
                </button>
                ))}
            </div>
            </div>
        )}
        </div>
    );
};

export default function BeritaPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [filteredBerita, setFilteredBerita] = useState([]);
  const [allBerita, setAllBerita] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await NewsAPI.list({ per_page: 100 });
        const list = (data.data || data).map((n) => ({
          id: n.id,
          slug: n.slug,
          title: n.title,
          excerpt: n.excerpt || (n.body ? n.body.substring(0, 160) + '…' : ''),
          image: n.image_url || '/images/placeholder.jpg',
          date: n.published_at ? new Date(n.published_at).toLocaleDateString('id-ID') : '',
          category: n.category || 'Pengumuman',
        }));
        setAllBerita(list);
        setFilteredBerita(list);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    let results = [...allBerita];
    if (searchQuery) {
      results = results.filter(berita =>
        (berita.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (berita.excerpt || '').toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (categoryFilter) {
      results = results.filter(berita => berita.category === categoryFilter);
    }
    setFilteredBerita(results);
  }, [searchQuery, categoryFilter, allBerita]);

  return (
    <section className="py-24 relative overflow-hidden">
      <Helmet>
        <title>Berita | SMK Negeri 1 Bantul</title>
        <meta name="description" content="Kumpulan berita, kegiatan, prestasi, dan pengumuman terbaru dari SMK Negeri 1 Bantul." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16"><br></br>
          <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-4">
            Berita & Informasi Terkini
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
            Ikuti terus perkembangan, prestasi, dan kegiatan terbaru dari lingkungan sekolah kami.
          </p>
        </div>

        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <div className="relative">
                <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari judul berita atau kata kunci..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-800/50 backdrop-blur-sm text-white pl-12 pr-4 py-3 rounded-xl border border-gray-700/50 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                />
              </div>
            </div>
            <FilterButton
              label="Kategori"
              options={['Acara', 'Pengumuman']}
              value={categoryFilter}
              onChange={setCategoryFilter}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <p className="text-center col-span-3 text-slate-400">Memuat...</p>
          ) : (
            filteredBerita.map(berita => (
              <BeritaCard key={berita.id} berita={berita} />
            ))
          )}
        </div>

        {!loading && filteredBerita.length === 0 && (
          <div className="text-center py-12 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 mt-8">
            <p className="text-gray-300 text-xl mb-4">Tidak ada berita yang cocok dengan kriteria Anda.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('');
              }}
              className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              Hapus semua filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
}