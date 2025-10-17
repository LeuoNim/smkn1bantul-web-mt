import React from "react";
import { Helmet } from "react-helmet-async";
import { BookOpen } from "lucide-react";

const SejarahPage = () => {
  return (
    <div className="min-h-screen text-white">
      <Helmet>
        <title>Sejarah | SMK Negeri 1 Bantul</title>
        <meta
          name="description"
          content="Telusuri jejak langkah dan tonggak bersejarah perjalanan SMK Negeri 1 Bantul dari awal berdiri hingga menjadi institusi pendidikan unggulan seperti sekarang."
        />
      </Helmet>

      {/* Hero Section */}
      <div className="relative pt-24 pb-16 px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            Sejarah Sekolah
          </span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Menelusuri jejak langkah dan tonggak bersejarah yang membentuk
          identitas kami hingga saat ini.
        </p>
      </div>

      {/* Konten Utama - Kartu Sejarah */}
      <div className="max-w-5xl mx-auto px-4 pb-24">
        <div className="relative bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-gray-700/50 shadow-xl transition-all duration-300 hover:border-blue-500/50">
          {/* Efek Glow pada Hover */}
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 blur-lg transition-all duration-500 opacity-0 group-hover:opacity-100" />
          
          <div className="relative z-10">
            {/* Header Kartu */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
              <div className="p-3 bg-blue-500/10 rounded-full border border-blue-500/20">
                <BookOpen className="w-8 h-8 text-blue-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">
                Jejak Langkah SMK Negeri 1 Bantul
              </h2>
            </div>

            <hr className="border-t border-gray-700 my-6" />

            {/* Isi Konten Sejarah */}
            <div className="prose prose-invert prose-lg max-w-none text-gray-300">
              <p>
                SMK Negeri 1 Bantul memiliki perjalanan sejarah panjang yang penuh dengan komitmen terhadap pendidikan berkualitas. Berdiri pada tahun 1968 berdasarkan Surat Keputusan Menteri Pendidikan dan Kebudayaan Nomor: 213/UKK/III/1968 tertanggal 9 Juni 1968, sekolah ini awalnya bernama SMEA Negeri VI Bantul. Seiring waktu, nama sekolah berubah menjadi SMEA Negeri 1 Bantul dan kini dikenal sebagai SMK Negeri 1 Bantul.
              </p>
              <p>
                Sejak awal, SMK Negeri 1 Bantul telah hadir sebagai lembaga pendidikan yang berfokus pada pengembangan keterampilan vokasional yang siap menghadapi tuntutan dunia kerja. Dalam perkembangannya, sekolah ini terus menunjukkan komitmen tinggi terhadap peningkatan mutu dan kualitas pendidikan.
              </p>
              <p>
                Sebagai bukti dari komitmen ini, SMK Negeri 1 Bantul menerapkan Sistem Manajemen Mutu (SMM) ISO 9001:2008 sejak tanggal 21 Oktober 2010 hingga 29 Mei 2013. Upaya ini dilanjutkan dengan resertifikasi di awal tahun 2013 untuk memastikan bahwa standar kualitas yang diterapkan tetap konsisten dan diakui. Sertifikasi tersebut diberikan oleh lembaga sertifikasi internasional TÜV Rheinland Cert GmbH dengan nomor sertifikat 01.100.065 164. Penerapan standar internasional ini menunjukkan bahwa mutu pendidikan di SMK Negeri 1 Bantul telah diakui secara global, memberikan kepercayaan lebih kepada para siswa, orang tua, dan mitra industri.
              </p>
              <p>
                Dengan pengalaman lebih dari lima dekade, SMK Negeri 1 Bantul terus berkembang dan berinovasi. Melalui peningkatan fasilitas, transformasi kurikulum, serta kemitraan dengan berbagai sektor industri, sekolah ini senantiasa berupaya mencetak lulusan yang tidak hanya terampil secara teknis, tetapi juga berkarakter dan siap bersaing di era digital dan industri 4.0.
              </p>
              <p>
                SMK Negeri 1 Bantul bangga menjadi bagian penting dalam sejarah pendidikan vokasional di Kabupaten Bantul, dan dengan semangat “Cerdas, Istimewa, dan Berkarakter,” sekolah ini berkomitmen untuk terus memberikan kontribusi nyata dalam menciptakan generasi yang siap menghadapi tantangan global.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SejarahPage;