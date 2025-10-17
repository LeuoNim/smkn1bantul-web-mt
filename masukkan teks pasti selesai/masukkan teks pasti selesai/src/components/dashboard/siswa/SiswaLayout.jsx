import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet
import SiswaSidebar from './SiswaSidebar';
import SiswaHeader from './SiswaHeader';

const SiswaLayout = () => {
  return (
    <div className="min-h-screen flex bg-slate-900 text-slate-300">
      <SiswaSidebar />
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        <SiswaHeader />
        <Outlet /> {/* Replace children with Outlet */}
      </div>
    </div>
  );
};

export default SiswaLayout;