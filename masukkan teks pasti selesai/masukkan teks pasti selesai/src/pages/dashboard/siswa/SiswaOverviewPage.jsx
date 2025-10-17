import React from 'react';
import StatCard from '../../../components/dashboard/shared/StatCard';
import { BookOpen, CheckCircle, BarChart2, MessageSquare } from 'lucide-react';

const JadwalItem = ({ jam, mapel, guru }) => (
  <div className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-slate-700/30 transition">
    <div className="flex items-center gap-3">
      <div className="w-1 h-10 bg-purple-500 rounded-full"></div>
      <div>
        <p className="font-semibold text-white">{mapel}</p>
        <p className="text-sm text-slate-400">{guru}</p>
      </div>
    </div>
    <span className="text-sm font-medium text-slate-300">{jam}</span>
  </div>
);

const TugasItem = ({ mapel, judul, deadline }) => (
  <div className="flex items-start gap-4 p-4">
    <div className="mt-1 p-2 bg-green-500/10 rounded-full">
      <CheckCircle size={18} className="text-green-400" />
    </div>
    <div>
      <p className="font-semibold text-white">{judul}</p>
      <p className="text-sm text-slate-400">{mapel}</p>
      <p className="text-xs text-red-400 mt-1">{deadline}</p>
    </div>
  </div>
);

const DashboardOverviewPage = () => {
  return (
    <main className="px-6 pb-6">
      {/* Kartu Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard icon={BookOpen} title="Mata Pelajaran Hari Ini" value="5" color="blue" />
        <StatCard icon={CheckCircle} title="Tugas Belum Dikerjakan" value="3" color="green" />
        <StatCard icon={BarChart2} title="Kehadiran Bulan Ini" value="98%" color="yellow" />
        <StatCard icon={MessageSquare} title="Pesan Baru" value="2" color="pink" />
      </div>

      {/* Jadwal dan Tugas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Jadwal Pelajaran Hari Ini */}
        <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-lg p-6 rounded-xl border border-slate-700/50">
          <h3 className="text-lg font-bold text-white mb-4">Jadwal Pelajaran Hari Ini</h3>
          <div className="space-y-2">
            <JadwalItem jam="07:30 - 09:00" mapel="Matematika Wajib" guru="Ibu Siti Aminah, S.Pd." />
            <JadwalItem jam="09:00 - 10:30" mapel="Bahasa Inggris" guru="Bapak John Doe, M.Pd." />
            <JadwalItem jam="11:00 - 12:30" mapel="Dasar Desain Grafis" guru="Bapak Budi Santoso, S.Sn." />
          </div>
        </div>

        {/* Tugas Mendatang */}
        <div className="bg-slate-800/50 backdrop-blur-lg p-6 rounded-xl border border-slate-700/50">
          <h3 className="text-lg font-bold text-white mb-4">Tugas Mendatang</h3>
          <div className="divide-y divide-slate-700/50">
            <TugasItem mapel="Matematika" judul="Latihan Soal Integral" deadline="Tenggat: Besok, 16 Okt 2025" />
            <TugasItem mapel="Dasar Desain Grafis" judul="Membuat Logo Sederhana" deadline="Tenggat: 18 Okt 2025" />
            <TugasItem mapel="Bahasa Inggris" judul="Mengerjakan Esai" deadline="Tenggat: 20 Okt 2025" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardOverviewPage;