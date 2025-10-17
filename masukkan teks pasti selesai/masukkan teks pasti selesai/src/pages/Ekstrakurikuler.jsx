import React from "react";
import { Helmet } from "react-helmet-async";
import { Mic2, FlaskConical, Sword, Dribbble, Bot, AudioLines, HeartPulse, Music2, Volleyball, BookOpen, Trophy, Music4, Rocket, Droplets, Palette } from "lucide-react";

const EXTRAS = [
  {
    name: "Paduan Suara",
    icon: Mic2,
    desc: "Latihan vokal, harmoni, dan penampilan paduan suara pada acara sekolah dan lomba.",
  },
  {
    name: "KIR",
    icon: FlaskConical,
    desc: "Kelompok Ilmiah Remaja: riset sederhana, karya tulis, dan eksperimen sains.",
  },
  {
    name: "Silat",
    icon: Sword,
    desc: "Beladiri pencak silat untuk ketangkasan, sportivitas, dan prestasi.",
  },
  {
    name: "Basket",
    icon: Dribbble,
    desc: "Teknik dasar, taktik tim, dan kompetisi bola basket antar sekolah.",
  },
  {
    name: "Robotik",
    icon: Bot,
    desc: "Perakitan dan pemrograman robot untuk kompetisi dan proyek inovasi.",
  },
  {
    name: "Karawitan",
    icon: AudioLines,
    desc: "Seni musik tradisional Jawa (gamelan) dan penghayatan nilai budaya.",
  },
  {
    name: "PMR",
    icon: HeartPulse,
    desc: "Palang Merah Remaja: kesehatan, P3K, dan aksi sosial kemanusiaan.",
  },
  {
    name: "Hadroh",
    icon: Music2,
    desc: "Grup rebana/hadroh untuk lantunan shalawat dan musik islami.",
  },
  {
    name: "Voli",
    icon: Volleyball,
    desc: "Latihan teknik dan kekompakan tim bola voli serta kejuaraan.",
  },
  {
    name: "Qiro'ah",
    icon: BookOpen,
    desc: "Pembinaan tilawah Al-Qur'an: tajwid, lagu, dan adab membaca.",
  },
  {
    name: "Futsal",
    icon: Trophy,
    desc: "Pembinaan fisik, strategi, dan turnamen futsal.",
  },
  {
    name: "Band",
    icon: Music4,
    desc: "Band sekolah: aransemen, latihan rutin, dan penampilan panggung.",
  },
  {
    name: "IT Entrepreneur",
    icon: Rocket,
    desc: "Kewirausahaan digital: pembuatan produk, pemasaran, dan pitching.",
  },
  {
    name: "Renang",
    icon: Droplets,
    desc: "Teknik dasar renang, ketahanan, dan pembinaan prestasi.",
  },
  {
    name: "Tari",
    icon: Palette,
    desc: "Eksplorasi tari tradisional/modern, koreografi, dan pertunjukan.",
  },
];

const ExtraCard = ({ item }) => (
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

export default function EkstrakurikulerPage() {
  return (
    <div className="min-h-screen text-white">
      <Helmet>
        <title>Ekstrakurikuler | SMK Negeri 1 Bantul</title>
        <meta
          name="description"
          content="Wadah pengembangan minat dan bakat siswa melalui berbagai kegiatan ekstrakurikuler di SMK Negeri 1 Bantul."
        />
      </Helmet>

      {/* Hero Section */}
      <div className="relative pt-24 pb-16 px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            Ekstrakurikuler
          </span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Mengasah karakter, kolaborasi, dan kreativitas siswa melalui kegiatan yang bermakna dan menyenangkan.
        </p>
      </div>

      {/* Grid Section */}
      <div className="max-w-7xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {EXTRAS.map((item) => (
            <ExtraCard key={item.name} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
