import React from "react";
import { Helmet } from "react-helmet-async";
import { Factory } from "lucide-react";

const FACTORY_DATA = [
  {
    id: 1,
    jurusan: "Rekayasa Perangkat Lunak",
    logoUrl: "https://smkn1bantul.sch.id/assets/tefa/Seven%20Inc.png", // Contoh Logo Seven Inc.
    altText: "Logo Seven Inc."
  },
  {
    id: 2,
    jurusan: "Akuntansi Dan Keuangan Lembaga",
    logoUrl: "https://smkn1bantul.sch.id/assets/tefa/Bank%20Bantul.jpg", // Contoh Logo Bank Bantul
    altText: "Logo Bank Bantul"
  },
  {
    id: 3,
    jurusan: "Teknik Komputer Dan Jaringan",
    logoUrl: "https://smkn1bantul.sch.id/assets/tefa/Telkom%20indonesia.png", // Contoh Logo Telkom Indonesia
    altText: "Logo Telkom Indonesia"
  },
  {
    id: 4,
    jurusan: "Desain Komunikasi Visual",
    logoUrl: "https://smkn1bantul.sch.id/assets/tefa/TE.png", // Contoh Logo Time Excelindo
    altText: "Logo Time Excelindo"
  },
  {
    id: 5,
    jurusan: "Manajemen Perkantoran",
    logoUrl: "https://smkn1bantul.sch.id/assets/tefa/kantorpos.png", // Contoh Logo Pos Indonesia
    altText: "Logo Pos Indonesia"
  },
  {
    id: 6,
    jurusan: "Pemasaran",
    logoUrl: "https://smkn1bantul.sch.id/assets/tefa/ABdina.png", // Contoh Logo Abdina Spunbond
    altText: "Logo Abdina Spunbond"
  },
];

const FactoryCard = ({ item }) => (
  <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 text-center border border-gray-700/50 transition-all duration-300 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transform hover:-translate-y-1 flex flex-col justify-between">
    <div>
      <h3 className="text-xl font-bold text-white mb-2">{item.jurusan}</h3>
      <p className="text-sm text-gray-400 mb-6">Bekerjasama Dengan</p>
    </div>
    <div className="flex-grow flex items-center justify-center">
      <img
        src={item.logoUrl}
        alt={item.altText}
        className="max-h-24 mx-auto object-contain"
      />
    </div>
  </div>
);

const TeachingFactoryPage = () => {
  return (
    <div className="min-h-screen text-white">
      <Helmet>
        <title>Teaching Factory | SMK Negeri 1 Bantul</title>
        <meta
          name="description"
          content="Program Teaching Factory SMK Negeri 1 Bantul yang menjembatani siswa dengan dunia industri melalui kemitraan strategis."
        />
      </Helmet>
      {/* Hero Section */}
      <div className="relative pt-24 pb-16 px-4 text-center">
    
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            Teaching Factory
          </span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Menghadirkan industri ke dalam sekolah, kami berkolaborasi dengan
          perusahaan terkemuka untuk memberikan pengalaman kerja nyata kepada siswa.
        </p>
      </div>

      {/* Grid Partner */}
      <div className="max-w-7xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {FACTORY_DATA.map((item) => (
            <FactoryCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeachingFactoryPage;