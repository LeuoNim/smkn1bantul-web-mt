import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const imageGallery = [
  { src: "images/hero/1.JPG", alt: "Siswa belajar di kelas" },
  { src: "images/hero/2.JPG", alt: "Kegiatan kewirausahaan" },
  { src: "images/hero/3.JPG", alt: "Siswa praktek" },
  { src: "https://smkn2depoksleman.sch.id/wp-content/uploads/2023/12/AKHLAK-MULIA.jpeg", alt: "Kegiatan keagamaan" },
  { src: "https://smkn2depoksleman.sch.id/wp-content/uploads/2024/01/IMG_0190-scaled.jpg", alt: "Siswa di perpustakaan" },
  { src: "https://smkn2depoksleman.sch.id/wp-content/uploads/2024/01/IMG_0110-scaled.jpg", alt: "Praktik bengkel" },
];

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden text-white min-h-screen flex items-center py-20 lg:py-0">
      <div className="absolute inset-0 -z-10 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23a0aec0\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 20v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 4v-4H4v4H0v2h4v4h2v-4h4v-2H6zm0 20v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 44v-4H4v4H0v2h4v4h2v-4h4v-2H6zm30-20v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM16 0h-2v6h-4v2h4v4h2v-4h4V6h-4V0zm0 20h-2v6h-4v2h4v4h2v-4h4v-2h-4zm0 20h-2v6h-4v2h4v4h2v-4h4v-2h-4zM16 40h-2v6h-4v2h4v4h2v-4h4v-2h-4z\'/%3E%3C/g%3E%3C/g%3E%3Csvg%3E")' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center z-10">
        <div className="text-center lg:text-left py-12 lg:py-24">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6">
            Selamat Datang di
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-400">
              SMK Negeri 1 Bantul
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-lg mx-auto lg:mx-0">
            Membentuk generasi unggul dengan pendidikan berkualitas dan karakter yang kuat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              to="/visi-misi"
              className="inline-flex items-center justify-center px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-teal-500/30"
            >
              Visi & Misi <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/pendaftaran"
              className="inline-flex items-center justify-center px-8 py-4 bg-white bg-opacity-10 hover:bg-opacity-20 text-white text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 border border-white/20"
            >
              Penerimaan Siswa Baru <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="group relative w-full max-w-lg mx-auto overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
          <div className="flex animate-scroll-x group-hover:[animation-play-state:paused]">
            {[...imageGallery, ...imageGallery].map((image, index) => (
              <div key={index} className="flex-shrink-0 w-96 mx-3"> 
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full aspect-square object-cover rounded-2xl shadow-2xl"
                />
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default HeroSection;