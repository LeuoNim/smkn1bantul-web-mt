import React from 'react';
import { Helmet } from 'react-helmet-async';
// PERUBAHAN DI SINI: Mengganti FileWord dengan FilePen
import { FolderDown, FileText, FilePen, DownloadCloud } from 'lucide-react';

// --- PENTING: GANTI DATA FILE DI SINI ---
// Letakkan file Anda di dalam folder `public/downloads/` di proyek Anda,
// lalu perbarui properti `fileUrl` di bawah ini.
const DOWNLOAD_FILES = [
  {
    id: 1,
    title: "Akreditasi Sekolah",
    description:
      "Akreditasi sekolah adalah proses penilaian terhadap mutu dan kinerja sekolah oleh BAN-S/M untuk memastikan bahwa sekolah memenuhi standar nasional pendidikan. Hasilnya berupa peringkat A, B, C, atau Tidak Terakreditasi.",
    icon: FileText,
    fileUrl: "/downloads/akreditasi-sekolah.pdf",
    fileType: "PDF",
    fileSize: "471 KB",
  },
  {
    id: 2,
    title:
      "Surat Edaran Nomor 800.1.12.5/8959 Tentang Penggunaan Pakaian Tradisional Jawa Yogyakarta Tahun 2025",
    description:
      "Surat Edaran ini berisi ketentuan bagi pegawai di lingkungan Pemerintah DIY untuk mengenakan pakaian tradisional Jawa Yogyakarta pada hari tertentu, seperti Kamis Pon, sebagai bentuk pelestarian budaya daerah.",
    icon: FilePen,
    fileUrl: "/downloads/surat-edaran-pakaian-tradisional.docx",
    fileType: "DOCX",
    fileSize: "2.2 MB",
  },
  {
    id: 3,
    title: "SNBP 2025 untuk SMK",
    description:
      "SNBP 2025 merupakan jalur masuk perguruan tinggi negeri bagi siswa SMK berdasarkan prestasi akademik dan nonakademik tanpa tes. Siswa yang terdaftar di PDSS dan memenuhi kuota sekolah dapat mendaftar.",
    icon: FileText,
    fileUrl: "/downloads/snbp-2025.pdf",
    fileType: "PDF",
    fileSize: "75 KB",
  },
];
// Komponen Kartu untuk setiap item unduhan
const DownloadCard = ({ icon: Icon, title, description, fileUrl, fileType, fileSize }) => (
  <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700/50 p-6 flex flex-col sm:flex-row items-center gap-6 transition-all duration-300 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10">
    <div className="flex-shrink-0">
      <div className="p-4 bg-blue-500/10 rounded-full">
        <Icon className="w-10 h-10 text-blue-400" />
      </div>
    </div>
    <div className="flex-grow text-center sm:text-left">
      <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
    <div className="flex-shrink-0 w-full sm:w-auto text-center">
      <a
        href={fileUrl}
        download
        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
      >
        <DownloadCloud size={20} />
        <span>Unduh</span>
      </a>
      <p className="text-xs text-slate-500 mt-2">{fileType} &bull; {fileSize}</p>
    </div>
  </div>
);

const DownloadPage = () => {
  return (
    <div className="min-h-screen text-white">
      <Helmet>
        <title>Download | SMK Negeri 1 Bantul</title>
        <meta name="description" content="Unduh berkas-berkas penting seperti kalender akademik, formulir pendaftaran, dan brosur sekolah SMK Negeri 1 Bantul." />
      </Helmet>
      
      {/* Hero Section */}
      <div className="relative pt-24 pb-16 px-4 text-center">
        <div className="inline-block p-4 bg-gray-800/50 rounded-2xl border border-gray-700/50 mb-6">
           <FolderDown size={32} className="text-blue-400" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            Pusat Unduhan
          </span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Temukan dan unduh berkas-berkas penting terkait kegiatan akademik dan administrasi sekolah.
        </p>
      </div>

      {/* Daftar Berkas */}
      <div className="max-w-5xl mx-auto px-4 pb-24">
        <div className="space-y-6">
          {DOWNLOAD_FILES.map((file) => (
            <DownloadCard key={file.id} {...file} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;