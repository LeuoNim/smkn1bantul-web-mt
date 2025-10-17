import React from "react";
import {
  Briefcase,
  Landmark,
  PenTool,
  Building,
  Palette,
  Camera,
  Users,
  Award,
  Network,
  Target,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

// --- UPDATED & REALISTIC DATA ---
const MAJORS = [
  {
    id: 1,
    name: "Akuntansi & Keuangan Lembaga (AKL)",
    icon: Landmark,
    gif: "https://i.pinimg.com/originals/b6/11/8b/b6118b48803159351a14d52fce120955.gif",
    description:
      "Membekali siswa dengan pengetahuan dan keterampilan mendalam di bidang akuntansi, dari siklus akuntansi perusahaan hingga administrasi pajak.",
    skills: ["Komputer Akuntansi (MYOB)", "Administrasi Pajak", "Akuntansi Keuangan"],
  },
  {
    id: 2,
    name: "Manajemen Perkantoran & Layanan Bisnis (MPLB)",
    icon: Briefcase,
    gif: "https://i.pinimg.com/originals/f2/ec/68/f2ec68e054445832a85590918854559c.gif",
    description:
      "Fokus pada manajemen administrasi perkantoran yang efisien dan efektif, serta mengasah kemampuan komunikasi dan teknologi perkantoran modern.",
    skills: ["Otomatisasi Tata Kelola", "Manajemen Arsip", "Layanan Bisnis"],
  },
  {
    id: 3,
    name: "Pemasaran",
    icon: Target,
    gif: "https://i.pinimg.com/originals/2e/33/2c/2e332c1c3a613b5c877484a0d4c8279c.gif",
    description:
      "Mendidik siswa untuk menjadi profesional pemasaran yang kompeten, mencakup strategi marketing, branding, dan pemasaran digital di era modern.",
    skills: ["Digital Marketing", "Manajemen Pemasaran", "Strategi Branding"],
  },
  {
    id: 4,
    name: "Usaha Layanan Pariwisata (ULP)",
    icon: Camera,
    gif: "https://i.pinimg.com/originals/44/1a/0d/441a0d0a51c4a008c2a912c9305c488b.gif",
    description:
      "Program yang dirancang untuk mencetak tenaga profesional di industri pariwisata, mulai dari perencanaan perjalanan hingga pemanduan wisata.",
    skills: ["Tour Planning", "Guiding", "Manajemen MICE"],
  },
  {
    id: 5,
    name: "Desain Komunikasi Visual (DKV)",
    icon: Palette,
    gif: "https://i.pinimg.com/originals/26/66/70/266670557b4440536750201a18206900.gif",
    description:
      "Mengembangkan kreativitas siswa dalam menyampaikan pesan melalui elemen visual, mencakup desain grafis, ilustrasi, dan multimedia interaktif.",
    skills: ["Desain Grafis", "Videografi", "Animasi 2D & 3D"],
  },
  {
    id: 6,
    name: "Teknik Komputer & Jaringan",
    icon: Network,
    gif: "https://i.pinimg.com/originals/30/d6/a2/30d6a2f8c057088927976e6a182a45e9.gif",
    description:
      "Mempersiapkan siswa menjadi ahli di bidang infrastruktur teknologi, meliputi administrasi jaringan komputer, sistem operasi, dan keamanan siber.",
    skills: ["Administrasi Jaringan", "Keamanan Siber", "Cloud Computing"],
  },
];


// --- ENHANCED MAJOR CARD COMPONENT ---
const MajorCard = ({ major }) => (
  <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group overflow-hidden">
    {/* GIF Background */}
    <img
      src={major.gif}
      alt="Major Background GIF"
      className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500"
    />
    {/* Overlay */}
    <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-300" />
    {/* Hover Gradient */}
    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-100" />

    {/* Content */}
    <div className="relative z-10 flex flex-col h-full">
      <div className="flex-grow">
        <div className="flex items-center space-x-4 mb-4">
          <major.icon className="w-10 h-10 text-blue-400 group-hover:text-white transition-colors duration-300" />
          <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
            {major.name}
          </h3>
        </div>
        <p className="text-gray-300 leading-relaxed mb-5">
          {major.description}
        </p>
      </div>
      
      <div className="mt-auto">
        <h4 className="text-sm font-semibold text-gray-400 mb-2">Keahlian Utama:</h4>
        <div className="flex flex-wrap gap-2">
          {major.skills.map((skill, index) => (
            <span key={index} className="bg-blue-500/20 text-blue-300 text-xs font-medium px-3 py-1 rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// --- UNCHANGED STATS CARD COMPONENT ---
const StatsCard = ({ icon: Icon, value, label }) => (
  <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <Icon
      className="text-blue-400 mb-3 group-hover:scale-110 transition-transform duration-300"
      size={28}
    />
    <div className="text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300">
      {value}
    </div>
    <div className="text-gray-400 font-medium">{label}</div>
  </div>
);


export default function ProgramKeahlian() {
  return (
    <div className="min-h-screen text-white">
      <Helmet>
        <title>Program Keahlian | SMK Negeri 1 Bantul</title>
        <meta
          name="description"
          content="Jelajahi berbagai program keahlian unggulan yang ditawarkan di SMK Negeri 1 Bantul untuk mempersiapkan karir masa depan Anda."
        />
      </Helmet>

      {/* Hero Section */}
      <div className="relative pt-24 pb-16 px-4 text-center">
        <div className="absolute inset-0 -z-10 h-full w-full"></div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            Program Keahlian
          </span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
          SMK Negeri 1 Bantul menyediakan program keahlian yang relevan dengan kebutuhan industri, didukung oleh fasilitas modern dan pengajar profesional untuk mencetak lulusan kompeten dan siap kerja.
        </p>
      </div>

      {/* --- NEW STATS SECTION --- */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatsCard icon={Building} value="7" label="Program Keahlian" />
            <StatsCard icon={Users} value="1700+" label="Siswa Aktif" />
            <StatsCard icon={Award} value="A" label="Akreditasi Unggul" />
            <StatsCard icon={Briefcase} value="20+" label="Mitra Industri" />
         </div>
      </div>
      
      {/* Majors Grid Section */}
      <div className="max-w-7xl mx-auto px-4 pb-24">
        {/* --- UPDATED 3-COLUMN GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MAJORS.map((major) => (
            <MajorCard key={major.id} major={major} />
          ))}
        </div>
      </div>
    </div>
  );
}