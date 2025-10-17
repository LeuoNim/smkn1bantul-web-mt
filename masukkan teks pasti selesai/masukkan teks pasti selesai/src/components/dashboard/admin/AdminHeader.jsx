import React, { useEffect, useState } from 'react';
import { Bell, Search } from 'lucide-react';
import { NotificationsAPI } from '../../../utils/api';

const AdminHeader = () => {
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  const loadCount = async () => {
    try {
      const data = await NotificationsAPI.admin();
      const list = Array.isArray(data) ? data : (data?.notifikasi || []);
      setCount(list.length);
      return list;
    } catch {
      setCount(0);
      return [];
    }
  };

  const loadList = async () => {
    const list = await loadCount();
    setItems(list);
  };

  useEffect(() => {
    let mounted = true;
    (async () => { if (mounted) await loadCount(); })();
    const t = setInterval(() => { if (mounted) loadCount(); }, 15000);
    return () => { mounted = false; clearInterval(t); };
  }, []);

  const toggle = async () => {
    const next = !open; setOpen(next);
    if (next) {
      await loadList();
    } else {
      // ditutup: tandai semua dibaca
      try { await NotificationsAPI.adminReadAll(); setCount(0); } catch {}
    }
  };

  const badge = count > 99 ? '99+' : (count > 0 ? String(count) : '');
  return (
    <header className="flex items-center justify-between p-6 relative">
      <div>
        <h2 className="text-2xl font-bold text-white">Dasbor Admin</h2>
        <p className="text-slate-400">Selamat datang kembali, Admin!</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari siswa, guru, kelas..."
            className="bg-slate-700/50 text-white placeholder-slate-400 pl-9 pr-4 py-2 rounded-lg border border-transparent focus:border-blue-500 focus:outline-none transition"
          />
        </div>
        <div className="relative">
          <button onClick={toggle} className="relative p-2 rounded-lg hover:bg-slate-700/50 transition">
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
        <img
          src="https://i.pravatar.cc/150?u=admin"
          alt="Admin Avatar"
          className="w-10 h-10 rounded-full border-2 border-blue-500"
        />
      </div>
    </header>
  );
};

export default AdminHeader;