import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Edit3, Trash2, Eye, EyeOff, Plus } from 'lucide-react';
import { NewsAPI } from '../../../utils/api';

const AdminBeritaList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const load = async () => {
    try {
      setLoading(true);
      const data = await NewsAPI.adminList({ per_page: 50, published_only: false });
      setItems(data.data || data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onDelete = async (id) => {
    if (!window.confirm('Hapus berita ini?')) return;
    try {
      await NewsAPI.remove(id);
      await load();
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Manajemen Berita</h1>
          <p className="text-slate-400">Kelola berita dan pengumuman sekolah</p>
        </div>
        <Link 
          to="/admin/berita/new" 
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
        >
          <Plus size={18} />
          Tambah Berita
        </Link>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
          <span className="ml-3 text-slate-400">Memuat berita...</span>
        </div>
      )}
      
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {items.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-slate-400 mb-4">
                <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-lg font-medium">Belum ada berita</p>
                <p className="text-sm">Mulai dengan membuat berita pertama Anda</p>
              </div>
              <Link 
                to="/admin/berita/new" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
              >
                <Plus size={18} />
                Tambah Berita Pertama
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden hover:border-slate-600/50 transition-colors">
                {/* Image */}
                <div className="aspect-video bg-slate-700/30 relative overflow-hidden">
                  {item.image_url ? (
                    <img 
                      src={item.image_url} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-500">
                      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      item.is_published 
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                        : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                    }`}>
                      {item.is_published ? <Eye size={12} /> : <EyeOff size={12} />}
                      {item.is_published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-white mb-2 line-clamp-2 leading-tight">
                    {item.title}
                  </h3>
                  
                  {item.excerpt && (
                    <p className="text-slate-400 text-sm mb-3 line-clamp-2">
                      {item.excerpt}
                    </p>
                  )}

                  <div className="flex items-center text-xs text-slate-500 mb-4">
                    <Calendar size={12} className="mr-1" />
                    {item.published_at ? new Date(item.published_at).toLocaleDateString('id-ID') : 'Belum dipublikasi'}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-slate-500 truncate mr-2">
                      /{item.slug}
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => navigate(`/admin/berita/${item.id}/edit`)}
                        className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                        title="Edit berita"
                      >
                        <Edit3 size={14} className="text-slate-300" />
                      </button>
                      <button 
                        onClick={() => onDelete(item.id)}
                        className="p-2 bg-red-600/20 hover:bg-red-600/30 rounded-lg transition-colors"
                        title="Hapus berita"
                      >
                        <Trash2 size={14} className="text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminBeritaList;