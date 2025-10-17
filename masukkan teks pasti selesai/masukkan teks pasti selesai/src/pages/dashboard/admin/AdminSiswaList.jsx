import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UsersAPI } from '../../../utils/api';
import { Plus, Edit3, Trash2, IdCard, User2 } from 'lucide-react';

const Card = ({ children }) => (
  <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden hover:border-slate-600/50 transition-colors">
    {children}
  </div>
);

const AdminSiswaList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const load = async () => {
    try {
      setLoading(true);
      const data = await UsersAPI.list({ role: 'siswa', per_page: 100 });
      // data mungkin array langsung atau paginated
      const list = (data.data || data).map(u => ({
        id: u.id,
        name: u.name,
        nis: u.nis,
        nisn: u.nisn,
        username: u.username,
      }));
      setItems(list);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onDelete = async (id) => {
    if (!window.confirm('Hapus siswa ini?')) return;
    try {
      await UsersAPI.remove(id);
      await load();
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Manajemen Siswa</h1>
          <p className="text-slate-400">Kelola akun siswa (NIS/NISN)</p>
        </div>
        <Link to="/admin/manajemen-siswa/new" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors">
          <Plus size={18} /> Tambah Siswa
        </Link>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400" />
          <span className="ml-3 text-slate-400">Memuat siswa...</span>
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
            <div className="col-span-full text-center py-12 text-slate-400">Belum ada siswa</div>
          ) : (
            items.map((s) => (
              <Card key={s.id}>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-white text-lg">{s.name}</h3>
                      <div className="text-xs text-slate-500">ID: {s.id}</div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-slate-300">
                    <div className="flex items-center gap-2"><User2 size={14} className="text-slate-400" /> Username: {s.username || '-'}</div>
                    <div className="flex items-center gap-2"><IdCard size={14} className="text-slate-400" /> NIS: {s.nis || '-'}</div>
                    <div className="flex items-center gap-2"><IdCard size={14} className="text-slate-400" /> NISN: {s.nisn || '-'}</div>
                  </div>
                  <div className="flex items-center justify-end gap-2 mt-4">
                    <button onClick={() => navigate(`/admin/manajemen-siswa/${s.id}/edit`)} className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors" title="Edit">
                      <Edit3 size={14} className="text-slate-300" />
                    </button>
                    <button onClick={() => onDelete(s.id)} className="p-2 bg-red-600/20 hover:bg-red-600/30 rounded-lg transition-colors" title="Hapus">
                      <Trash2 size={14} className="text-red-400" />
                    </button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminSiswaList;