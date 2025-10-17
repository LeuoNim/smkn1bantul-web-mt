import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, LayoutDashboard, Users, UserCheck, Images, Megaphone, BarChart3, Settings, LogOut, ChevronLeft } from 'lucide-react';

const NavItem = ({ to, icon: Icon, children }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(to);

  return (
    <Link
      to={to}
      className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
        isActive ? 'bg-blue-600/20 text-blue-300' : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
      }`}
    >
      <Icon size={18} className="mr-3" />
      <span>{children}</span>
    </Link>
  );
};

const AdminSidebar = () => {
  return (
    <aside className="w-64 flex-shrink-0 bg-slate-800/50 backdrop-blur-lg border-r border-slate-700/50 flex flex-col">
      <div className="h-20 flex items-center px-6 border-b border-slate-700/50">
        <Shield size={28} className="text-blue-400" />
        <h1 className="text-xl font-bold text-white ml-3">Admin Panel</h1>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        <NavItem to="/admin/dashboard" icon={LayoutDashboard}>Beranda</NavItem>
        <NavItem to="/admin/berita" icon={Megaphone}>Berita</NavItem>
        <NavItem to="/admin/manajemen-siswa" icon={Users}>Manajemen Siswa</NavItem>
        <NavItem to="/admin/manajemen-guru" icon={UserCheck}>Manajemen Guru</NavItem>
        <NavItem to="/admin/galeri" icon={Images}>Galeri Prestasi</NavItem>
        <NavItem to="/admin/laporan" icon={BarChart3}>Laporan</NavItem>
      </nav>

      <div className="px-4 py-6 border-t border-slate-700/50 space-y-2">
        <NavItem to="/admin/pengaturan" icon={Settings}>Pengaturan Sistem</NavItem>
        <button className="w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-slate-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-200">
          <LogOut size={18} className="mr-3" />
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;