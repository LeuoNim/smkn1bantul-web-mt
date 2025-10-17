import React, { useEffect, useState } from 'react';
import { Bell, Home, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { NotificationsAPI } from '../../../utils/api';

const Header = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const data = await NotificationsAPI.siswa();
        if (!mounted) return;
        const list = Array.isArray(data) ? data : (data?.notifikasi || []);
        setCount(list.length);
        setItems(list);
      } catch {
        setCount(0); setItems([]);
      }
    };
    load();
    const t = setInterval(load, 15000);
    return () => { mounted = false; clearInterval(t); };
  }, []);

  const badge = count > 99 ? '99+' : (count > 0 ? String(count) : '');
  const goHome = () => navigate('/');

  return (
    <header className="flex items-center justify-between p-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Dashboard Siswa</h2>
        <p className="text-slate-400">Kelola aktivitas dan pengaduan Anda.</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari..."
            className="bg-slate-700/50 text-white placeholder-slate-400 pl-9 pr-4 py-2 rounded-lg border border-transparent focus:border-blue-500 focus:outline-none transition"
          />
        </div>
        <div className="relative" title="Notifikasi">
          <button onClick={async () => { const next = !open; setOpen(next); if (!next) { try { await NotificationsAPI.siswaReadAll(); setCount(0); } catch {} } }} className="relative p-2 rounded-lg hover:bg-slate-700/50 transition">
            <Bell size={20} className="text-slate-300" />
            {badge && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-600 text-white text-[10px] leading-[18px] text-center font-bold">
                {badge}
              </span>
            )}
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-auto bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50">
              <div className="px-3 py-2 text-sm font-semibold text-white border-b border-slate-700">Notifikasi</div>
              {items.length === 0 ? (
                <div className="px-3 py-4 text-sm text-slate-400">Belum ada notifikasi.</div>
              ) : items.map((n, i) => (
                <div key={i} className="px-3 py-3 border-b border-slate-700/50 hover:bg-slate-700/30">
                  <div className="text-white text-sm font-medium">{n.title || 'Notifikasi'}</div>
                  <div className="text-slate-400 text-xs">{n.message || ''}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <button onClick={goHome} className="inline-flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white" title="Ke Beranda">
          <Home size={16} /> Ke Beranda
        </button>
      </div>
    </header>
  );
};

export default Header;
