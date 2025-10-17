import React from 'react';
import StatCard from '../../../components/dashboard/shared/StatCard';
import { Users, UserCheck, School, Activity, UserPlus, Megaphone } from 'lucide-react';

const ActivityItem = ({ icon: Icon, text, time, color }) => (
  <div className="flex items-center gap-4 py-3">
    <div className={`p-2 bg-${color}-500/10 rounded-full`}>
      <Icon size={18} className={`text-${color}-400`} />
    </div>
    <div className="flex-1">
      <p className="text-sm text-slate-200" dangerouslySetInnerHTML={{ __html: text }} />
    </div>
    <span className="text-xs text-slate-500">{time}</span>
  </div>
);

const AdminOverviewPage = () => {
  return (
    <main className="px-6 pb-6">
      {/* Kartu Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard icon={Users} title="Total Siswa" value="1,250" color="blue" />
        <StatCard icon={UserCheck} title="Total Guru" value="80" color="green" />
        <StatCard icon={School} title="Jumlah Kelas" value="36" color="yellow" />
        <StatCard icon={Activity} title="Siswa Aktif Hari Ini" value="1,124" color="pink" />
      </div>

      {/* Aktivitas & Pendaftaran Baru */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-lg p-6 rounded-xl border border-slate-700/50">
          <h3 className="text-lg font-bold text-white mb-2">Aktivitas Terbaru</h3>
          <div className="divide-y divide-slate-700/50">
            <ActivityItem icon={UserPlus} text="<b>Andi Pratama</b> baru saja ditambahkan ke kelas <b>XI RPL 1</b>." time="5m lalu" color="green" />
            <ActivityItem icon={Megaphone} text="Pengumuman <b>'Libur Hari Raya'</b> telah dipublikasikan." time="1j lalu" color="blue" />
            <ActivityItem icon={UserPlus} text="<b>Siti Nurhaliza</b> baru saja ditambahkan ke kelas <b>X DKV 2</b>." time="3j lalu" color="green" />
            <ActivityItem icon={Megaphone} text="Jadwal ujian semester telah diperbarui." time="1h lalu" color="yellow" />
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-lg p-6 rounded-xl border border-slate-700/50">
            <h3 className="text-lg font-bold text-white mb-4">Grafik Pertumbuhan Siswa</h3>
            <div className="h-56 flex items-center justify-center bg-slate-700/20 rounded-lg">
                <p className="text-slate-500 text-sm">(Placeholder untuk Grafik)</p>
            </div>
        </div>
      </div>
    </main>
  );
};

export default AdminOverviewPage;