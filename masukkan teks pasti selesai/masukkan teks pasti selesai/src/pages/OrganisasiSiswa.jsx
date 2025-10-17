import React from "react";
import { Helmet } from "react-helmet-async";
import { Users, Shield, HeartPulse, Sparkles } from "lucide-react";

const ORGS = [
  {
    name: "OSIS",
    icon: Users,
    desc: "Wadah utama kepemimpinan dan kreativitas siswa dalam merancang serta menjalankan program kesiswaan.",
  },
  {
    name: "MPK",
    icon: Shield,
    desc: "Majelis Perwakilan Kelas yang menjalankan fungsi legislasi, pengawasan, dan serap aspirasi terhadap program OSIS.",
  },
  {
    name: "PMR",
    icon: HeartPulse,
    desc: "Palang Merah Remaja: pembinaan kepalangmerahan, kesehatan, P3K, dan kesiapsiagaan bencana.",
  },
  {
    name: "Rohis",
    icon: Sparkles,
    desc: "Rohani Islam: pembinaan karakter Islami, kajian, dan kegiatan keagamaan di sekolah.",
  },
];

const OrgCard = ({ item }) => (
  <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative z-10">
      <div className="flex items-center gap-4 mb-3">
        <item.icon className="w-8 h-8 text-blue-400 group-hover:text-white transition-colors duration-300" />
        <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
          {item.name}
        </h3>
      </div>
      <p className="text-gray-300 leading-relaxed">{item.desc}</p>
    </div>
  </div>
);

export default function OrganisasiSiswaPage() {
  return (
    <div className="min-h-screen text-white">
      <Helmet>
        <title>Organisasi Siswa | SMK Negeri 1 Bantul</title>
        <meta name="description" content="Daftar organisasi siswa di SMK Negeri 1 Bantul beserta peran dan kegiatannya." />
      </Helmet>

      {/* Hero Section */}
      <div className="relative pt-24 pb-16 px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            Organisasi Siswa
          </span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Sarana pembinaan kepemimpinan, karakter, dan kolaborasi siswa melalui berbagai organisasi kesiswaan.
        </p>
      </div>

      {/* Grid Section */}
      <div className="max-w-7xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ORGS.map((item) => (
            <OrgCard key={item.name} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
