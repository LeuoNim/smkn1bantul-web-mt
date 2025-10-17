import React, { useEffect, useState } from 'react';
import { Plus, Edit3, Trash2, Image as ImageIcon } from 'lucide-react';
import { AdminGalleryAPI } from '../../../utils/api';
import { useNavigate } from 'react-router-dom';

export default function AdminGalleryList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const load = async () => {
    try {
      setLoading(true);
      const data = await AdminGalleryAPI.list({ per_page: 50 });
      setItems(data.data || data);
    } catch (e) { setError(e.message); } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const onDelete = async (id) => {
    if (!window.confirm('Hapus item galeri ini?')) return;
    try { await AdminGalleryAPI.remove(id); await load(); } catch (e) { alert(e.message); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Galeri Prestasi</h1>
          <p className="text-slate-400">Kelola galeri gambar prestasi terbaru</p>
        </div>
        <button onClick={() => navigate('/admin/galeri/new')} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors">
          <Plus size={18} /> Tambah Item
        </button>
      </div>

      {loading && <div className="text-slate-400">Memuat...</div>}
      {error && <div className="text-red-400">{error}</div>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {items.length === 0 ? (
            <div className="col-span-full text-center text-slate-400">Belum ada item galeri.</div>
          ) : items.map((g) => (
            <div key={g.id} className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
              <div className="aspect-video bg-slate-700/30 flex items-center justify-center">
                {g.image_url ? (
                  <img src={g.image_url} alt={g.title} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="text-slate-500" />
                )}
              </div>
              <div className="p-4">
                <div className="text-white font-semibold">{g.title}</div>
                {g.caption && <div className="text-slate-400 text-sm line-clamp-2">{g.caption}</div>}
                <div className="flex items-center justify-end gap-2 mt-3">
                  <button onClick={() => navigate(`/admin/galeri/${g.id}/edit`)} className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors" title="Edit">
                    <Edit3 size={14} className="text-slate-300" />
                  </button>
                  <button onClick={() => onDelete(g.id)} className="p-2 bg-red-600/20 hover:bg-red-600/30 rounded-lg transition-colors" title="Hapus">
                    <Trash2 size={14} className="text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
