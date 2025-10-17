import React, { useEffect, useState } from 'react';
import { AdminReportsAPI } from '../../../utils/api';

export default function AdminLaporanSementara() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(new Set());

  const load = async () => {
    try {
      setLoading(true);
      const data = await AdminReportsAPI.pending();
      setItems(data.laporan_sementara || []);
    } catch (e) {
      setError(e.message);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const toggle = (id) => {
    const s = new Set(selected);
    if (s.has(id)) s.delete(id); else s.add(id);
    setSelected(s);
  };

  const confirm = async (status) => {
    try {
      if (selected.size === 0) return alert('Pilih minimal satu laporan');
      await AdminReportsAPI.confirm({ ids: Array.from(selected), status });
      setSelected(new Set());
      await load();
    } catch (e) { alert(e.message); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-white">Laporan Sementara</h1>
        <div className="flex gap-2">
          <button onClick={() => confirm('diterima')} className="px-3 py-2 bg-green-600 hover:bg-green-500 rounded text-white">Terima</button>
          <button onClick={() => confirm('ditolak')} className="px-3 py-2 bg-red-600/80 hover:bg-red-600 rounded text-white">Tolak</button>
        </div>
      </div>

      {loading && <div className="text-slate-400">Memuat...</div>}
      {error && <div className="text-red-400">{error}</div>}

      {!loading && !error && (
        <div className="space-y-3">
          {items.length === 0 ? (
            <div className="text-slate-400">Tidak ada laporan sementara.</div>
          ) : items.map((it) => (
            <label key={it.id} className="block bg-slate-800/50 border border-slate-700/50 rounded p-4 cursor-pointer">
              <div className="flex items-start gap-3">
                <input type="checkbox" checked={selected.has(it.id)} onChange={() => toggle(it.id)} className="mt-1" />
                <div>
                  <div className="text-white font-semibold">{it.judul}</div>
                  <div className="text-slate-400 text-sm">{it.deskripsi}</div>
                  <div className="text-slate-500 text-xs mt-1">Kategori: {it.kategori} • Oleh: {it?.user?.name}</div>
                </div>
              </div>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}