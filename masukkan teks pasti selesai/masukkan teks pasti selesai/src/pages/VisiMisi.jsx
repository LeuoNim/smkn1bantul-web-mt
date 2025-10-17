import React from 'react';
import { Eye, Target, CheckCircle } from 'lucide-react';

// Card untuk Visi
const VisiCard = () => (
  <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 group overflow-hidden">
    {/* Efek Hover */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300" />
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-blue-500/5 blur-xl transition-all duration-300" />

    <div className="relative">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6">
          <Eye className="w-6 h-6 text-blue-400" />
        </div>
        <h2 className="text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
          Our Vision
        </h2>
      </div>
      <p className="text-gray-300 text-lg leading-relaxed">
        Terwujudnya sekolah berkualitas, berkarakter dan berwawasan lingkungan.
      </p>
    </div>
  </div>
);

// Card untuk Misi
const MisiCard = () => (
  <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 group overflow-hidden">
    {/* Efek Hover */}
    <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300" />
    <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-teal-500/0 to-green-500/0 group-hover:from-green-500/5 group-hover:via-teal-500/5 group-hover:to-green-500/5 blur-xl transition-all duration-300" />

    <div className="relative">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500/10 to-teal-500/10 flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
          <Target className="w-6 h-6 text-green-400" />
        </div>
        <h2 className="text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-green-400 group-hover:to-teal-400 transition-all duration-300">
          Our Mission
        </h2>
      </div>
      <ul className="space-y-4 text-gray-300 text-lg">
        <li className="flex items-start gap-3">
          <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
          <span>
            Menyiapkan sarana prasarana dan SDM yang memenuhi SNP (Standar Nasional Pendidikan)
          </span>
        </li>
        <li className="flex items-start gap-3">
          <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
          <span>
            Melaksanakan pembelajaran yang berbasis sains dan teknologi
          </span>
        </li>
        <li className="flex items-start gap-3">
          <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
          <span>
            Mengimplementasikan iman, takwa dan nilai-nilai karakter bangsa dalam kehidupan sehari-hari
          </span>
        </li>
        <li className="flex items-start gap-3">
          <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
          <span>
            Melaksanakan pembelajaran berbasis lingkungan serta mengaplikasikannya dalam kehidupan sehari-hari
          </span>
        </li>
        <li className="flex items-start gap-3">
          <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
          <span>
            Menyiapkan tamatan yang mampu mengisi dan menciptakan lapangan kerja serta mengembangkan profesionalitas di bidang bisnis.
          </span>
        </li>
      </ul>
    </div>
  </div>
);

// Komponen Utama Halaman
export default function VisiMisi() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Our Vision & Mission
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            The driving force behind our commitment to excellence in the gaming world.
          </p>
        </div>

        {/* Container untuk Card */}
        <div className="flex flex-col gap-10">
          <VisiCard />
          <MisiCard />
        </div>
      </div>
    </div>
  );
}