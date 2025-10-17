import React from "react";
import { Helmet } from "react-helmet-async";
import { Workflow, ExternalLink } from "lucide-react";

const URL_GAMBAR_STRUKTUR = "https://smkn1bantul.sch.id/assets/images/SO-min.jpg"; // Contoh URL gambar

const StrukturOrganisasiPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Helmet>
        <title>Struktur Organisasi | SMK Negeri 1 Bantul</title>
        <meta
          name="description"
          content="Lihat bagan struktur organisasi resmi SMK Negeri 1 Bantul yang menggambarkan hierarki dan alur koordinasi di sekolah kami."
        />
      </Helmet>

      {/* Latar Belakang Pola Radial */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-gray-900 bg-[radial-gradient(#2d3748_1px,transparent_1px)] [background-size:32px_32px]"></div>

      {/* Hero Section */}
      <div className="relative pt-24 pb-16 px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            Struktur Organisasi
          </span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Bagan resmi yang menggambarkan hierarki, peran, dan alur koordinasi
          di lingkungan SMK Negeri 1 Bantul.
        </p>
      </div>

      {/* Konten Utama - Kartu Bagan Organisasi */}
      <div className="max-w-7xl mx-auto px-4 pb-24">
        <div className="relative bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 md:p-10 border border-gray-700/50 shadow-xl transition-all duration-300 hover:border-blue-500/50 group">
          
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 blur-lg transition-all duration-500 opacity-0 group-hover:opacity-100" />

          <div className="relative z-10">
            {/* Header Kartu */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-full border border-blue-500/20">
                  {/* PERBAIKAN: Menggunakan ikon <Workflow /> yang valid */}
                  <Workflow className="w-8 h-8 text-blue-400" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Bagan Organisasi Sekolah
                </h2>
              </div>
              <a
                href={URL_GAMBAR_STRUKTUR}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 bg-gray-700/50 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Lihat Ukuran Penuh
                <ExternalLink size={16} />
              </a>
            </div>

            <hr className="border-t border-gray-700 my-6" />

            {/* Kontainer Gambar */}
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
              <img
                src={URL_GAMBAR_STRUKTUR}
                alt="Bagan Struktur Organisasi SMK Negeri 1 Bantul"
                className="w-full h-auto rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrukturOrganisasiPage;