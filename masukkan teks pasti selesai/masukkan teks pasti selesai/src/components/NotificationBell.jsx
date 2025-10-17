import React, { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { NotificationsAPI } from '../utils/api';

export default function NotificationBell() {
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [role, setRole] = useState('');
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const check = () => {
      try {
        const t = localStorage.getItem('auth_token');
        const r = localStorage.getItem('auth_role') || '';
        setLogged(!!t);
        setRole(r);
      } catch {}
    };
    check();
    const onStorage = () => check();
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const load = async () => {
    try {
      const data = role === 'admin' ? await NotificationsAPI.admin() : await NotificationsAPI.siswa();
      const list = Array.isArray(data) ? data : (data?.notifikasi || []);
      setCount(list.length);
      setItems(list);
    } catch {
      setCount(0); setItems([]);
    }
  };

  useEffect(() => {
    if (!logged) return;
    load();
    const t = setInterval(load, 15000);
    return () => clearInterval(t);
  }, [logged, role]);

  if (!logged) return null;

  const badge = count > 99 ? '99+' : (count > 0 ? String(count) : '');
  const readAll = async () => {
    try {
      if (role === 'admin') await NotificationsAPI.adminReadAll(); else await NotificationsAPI.siswaReadAll();
      setCount(0);
    } catch {}
  };

  const toggle = async () => {
    const next = !open; setOpen(next);
    if (!next) await readAll(); else await load();
  };

  return (
    <div className="relative">
      <button onClick={toggle} className="relative p-2 rounded-lg hover:bg-slate-700/50 transition" aria-label="Notifikasi">
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
  );
}
