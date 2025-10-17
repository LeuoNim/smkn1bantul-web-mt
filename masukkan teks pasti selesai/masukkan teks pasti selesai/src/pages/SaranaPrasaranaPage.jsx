import React from "react";
import { Helmet } from "react-helmet-async";
import { Building2 } from "lucide-react";

const SARANA_DATA = [
  {
    id: 1,
    nama: "Bagian Depan Sekolah",
    deskripsi: "Wajah sekolah yang modern dan ramah menyambut setiap siswa.",
    imageUrl: "https://smkn1bantul.sch.id/assets/sarpras/7.jpeg",
  },
  {
    id: 2,
    nama: "Perpustakaan",
    deskripsi: "Sumber ilmu pengetahuan dengan koleksi buku yang lengkap.",
    imageUrl: "https://smkn1bantul.sch.id/assets/sarpras/1.jpeg",
  },
  {
    id: 3,
    nama: "Taman Hijau",
    deskripsi: "Area terbuka hijau untuk bersantai dan berdiskusi.",
    imageUrl: "https://smkn1bantul.sch.id/assets/sarpras/2.jpeg",
  },
  {
    id: 4,
    nama: "Masjid Sekolah",
    deskripsi: "Pusat kegiatan keagamaan dan pembinaan karakter siswa.",
    imageUrl: "https://smkn1bantul.sch.id/assets/sarpras/3.jpeg",
  },
  {
    id: 5,
    nama: "Pojok Baca",
    deskripsi: "Sudut nyaman untuk membaca dan literasi di berbagai area.",
    imageUrl: "https://smkn1bantul.sch.id/assets/sarpras/4.jpeg",
  },
  {
    id: 6,
    nama: "Kantin Higienis",
    deskripsi: "Menyediakan makanan sehat dan bersih untuk seluruh warga sekolah.",
    imageUrl: "https://smkn1bantul.sch.id/assets/sarpras/5.jpeg",
  },
  {
    id: 7,
    nama: "Area Parkir Luas",
    deskripsi: "Kapasitas parkir yang aman dan memadai untuk siswa & guru.",
    imageUrl: "https://smkn1bantul.sch.id/assets/sarpras/6.jpeg",
  },
  {
    id: 8,
    nama: "Unit Kesehatan Sekolah (UKS)",
    deskripsi: "Memberikan pelayanan kesehatan primer bagi siswa.",
    imageUrl: "https://smkn1bantul.sch.id/assets/sarpras/8.jpeg",
  },
  {
    id: 9,
    nama: "Ruang Wijaya Kusuma",
    deskripsi: "Aula serbaguna untuk acara, pertemuan, dan kegiatan sekolah.",
    imageUrl: "https://smkn1bantul.sch.id/assets/sarpras/9.jpeg",
  },
];

const SaranaCard = ({ sarana }) => (
  <div className="relative rounded-xl overflow-hidden group border border-gray-700/50 transition-all duration-300 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transform hover:-translate-y-2">
    {/* Gambar Latar Belakang dengan Efek Zoom */}
    <img
      src={sarana.imageUrl}
      alt={sarana.nama}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
    />
    {/* Gradien Overlay untuk Teks */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
    
    {/* Konten Teks */}
    <div className="relative p-6 flex flex-col justify-end h-80">
      <h3 className="text-2xl font-bold text-white mb-1 transition-colors duration-300 group-hover:text-blue-300">
        {sarana.nama}
      </h3>
      <p className="text-gray-300 text-sm leading-relaxed">
        {sarana.deskripsi}
      </p>
    </div>
  </div>
);

const SaranaPrasaranaPage = () => {
  return (
    <div className="min-h-screen text-white">
      <Helmet>
        <title>Sarana & Prasarana | SMK Negeri 1 Bantul</title>
        <meta
          name="description"
          content="Jelajahi fasilitas lengkap dan modern di SMK Negeri 1 Bantul yang mendukung proses belajar mengajar secara optimal."
        />
      </Helmet>

      {/* Hero Section */}
      <div className="relative pt-24 pb-16 px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            Sarana & Prasarana
          </span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Fasilitas modern dan lengkap kami sediakan untuk menunjang
          pengalaman belajar yang unggul dan komprehensif bagi setiap siswa.
        </p>
      </div>

      {/* Grid Galeri Sarana */}
      <div className="max-w-7xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SARANA_DATA.map((item) => (
            <SaranaCard key={item.id} sarana={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SaranaPrasaranaPage;