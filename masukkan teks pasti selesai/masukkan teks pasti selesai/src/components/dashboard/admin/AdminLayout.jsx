import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex bg-slate-900 text-slate-300">
      <AdminSidebar />
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        <AdminHeader />
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
