import React, { useEffect, useState } from 'react';
import { AdminReportsAPI } from '../../../utils/api';

export default function AdminLaporanList() {
  const [tab, setTab] = useState('resmi'); // 'resmi' | 'sementara'

  // Resmi
  const [items, setItems] = useState([]);
  // Sementara
  const [pending, setPending] = useState([]);
  const [selected, setSelected] = useState(new Set());

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadResmi = async () => {
    const data = await AdminReportsAPI.list();
    setItems(data.data || data);
  };
  const loadPending = async () => {
    const data = await AdminReportsAPI.pending();
    setPending(data.laporan_sementara || []);
  };

  const load = async (which = tab) => {
    try {
      setLoading(true);
      setError('');
      if (which === 'resmi') await loadResmi(); else await loadPending();
    } catch (e) { setError(e.message); } finally { setLoading(false); }
  };

  useEffect(() => { load(tab); }, [tab]);

  const setStatus = async (id, status) => {
    try {
      await AdminReportsAPI.updateStatus(id, status);
      await load('resmi');
    } catch (e) { alert(e.message); }
  };

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
      await load('sementara');
      // Jika diterima, refresh tab resmi agar berpindah terlihat
      if (status === 'diterima') await loadResmi();
    } catch (e) { alert(e.message); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-white">Laporan</h1>
          <div className="ml-4 bg-slate-800/60 rounded-lg p-1 border border-slate-700/50">
            <button onClick={() => setTab('resmi')} className={`px-3 py-1.5 text-sm rounded-md ${tab==='resmi'?'bg-blue-600 text-white':'text-slate-300 hover:bg-slate-700/50'}`}>Laporan</button>
            <button onClick={() => setTab('sementara')} className={`px-3 py-1.5 text-sm rounded-md ${tab==='sementara'?'bg-blue-600 text-white':'text-slate-300 hover:bg-slate-700/50'}`}>Laporan Sementara</button>
          </div>
        </div>
        <div className="flex gap-2">
          {tab==='resmi' && (
            <button
              onClick={async () => {
                try {
                  if (!window.confirm('Hapus SEMUA laporan resmi? Tindakan ini permanen.')) return;
                  const ids = items.map((r) => r.id);
                  if (ids.length === 0) return;
                  await AdminReportsAPI.deleteMany(ids);
                  await loadResmi();
                } catch (e) { alert(e.message); }
              }}
              className="px-3 py-2 bg-red-600/80 hover:bg-red-600 rounded text-white"
            >
              Hapus Semua
            </button>
          )}
          {tab==='sementara' && (
            <>
              <button onClick={() => confirm('diterima')} className="px-3 py-2 bg-green-600 hover:bg-green-500 rounded text-white">Terima</button>
              <button onClick={() => confirm('ditolak')} className="px-3 py-2 bg-red-600/80 hover:bg-red-600 rounded text-white">Tolak</button>
              <button
                onClick={async () => {
                  try {
                    if (!window.confirm('Hapus SEMUA laporan sementara? (akan ditolak massal)')) return;
                    const ids = pending.map((p) => p.id);
                    if (ids.length === 0) return;
                    await AdminReportsAPI.confirm({ ids, status: 'ditolak' });
                    await loadPending();
                  } catch (e) { alert(e.message); }
                }}
                className="px-3 py-2 bg-red-600/80 hover:bg-red-600 rounded text-white"
              >
                Hapus Semua
              </button>
            </>
          )}
        </div>
      </div>

      {loading && <div className="text-slate-400">Memuat...</div>}
      {error && <div className="text-red-400">{error}</div>}

      {!loading && !error && tab==='resmi' && (
        <div className="space-y-3">
          {items.length === 0 ? (
            <div className="text-slate-400">Belum ada laporan.</div>
          ) : items.map((r) => (
            <div key={r.id} className="bg-slate-800/50 border border-slate-700/50 rounded p-4">
              <div className="text-white font-semibold">{r.judul}</div>
              <div className="text-slate-400 text-sm">{r.deskripsi}</div>
              <div className="text-slate-500 text-xs mt-1">Kategori: {r.kategori} • Oleh: {r?.user?.name}</div>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-xs text-slate-400">Status: {r.status}</span>
                <div className="ml-auto flex gap-2">
                  <button onClick={() => setStatus(r.id, 'diproses')} className="px-2 py-1 bg-yellow-600/60 hover:bg-yellow-600 rounded text-white text-xs">Diproses</button>
                  <button onClick={() => setStatus(r.id, 'selesai')} className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded text-white text-xs">Selesai</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && tab==='sementara' && (
        <div className="space-y-3">
          {pending.length === 0 ? (
            <div className="text-slate-400">Tidak ada laporan sementara.</div>
          ) : pending.map((it) => (
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
