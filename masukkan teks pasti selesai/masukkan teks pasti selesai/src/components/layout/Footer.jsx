import React from "react";
import {
  Github,
  Headset,
  Mail,
  Instagram,
  Youtube,
  Music,
  ArrowUp,
  // --- 1. Impor ikon yang dibutuhkan untuk kategori ---
  Package,      // Untuk Products
  Building,     // Untuk Company
  LifeBuoy,     // Untuk Support
  Scale,        // Untuk Legal
  MapPin,
  Phone,
} from "lucide-react";

// --- 2. Perbarui struktur data untuk menyertakan ikon ---
// Sekarang setiap kategori memiliki objek yang berisi 'icon' dan 'links'.
const footerLinkCategories = {
  profile: {
    icon: Building,
    links: [
      { name: "Sejarah", href: "/sejarah" },
      { name: "Visi & Misi", href: "/visi-misi" },
      { name: "Struktur Organisasi", href: "/struktur-organisasi" },
      { name: "Sarana Prasarana", href: "/sarana-prasarana" },
      { name: "Teaching Factory", href: "/teaching-factory" },
    ],
  },
  informasi: {
    icon: LifeBuoy,
    links: [
      { name: "Berita dan Informasi", href: "/berita" },
      { name: "Prestasi", href: "/prestasi" },
      { name: "Laporan", href: "/laporan" },
      { name: "Download", href: "/download" },
      { name: "Berkas SPMB 2025", href: "/spmb" },
      { name: "SPMB 2025", href: "https://spmb.jogjaprov.go.id/" },
    ],
  },
  lainnya: {
    icon: Scale,
    links: [
      { name: "Ekstrakurikuler", href: "/ekstrakurikuler" },
      { name: "Organisasi Siswa", href: "/organisasi-siswa" },
    ],
  },
};

// Data ini tetap sama
const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/smkn1bantul", label: "Instagram" },
  { icon: Music, href: "https://www.tiktok.com/@skansaba.id?is_from_webapp=1&sender_device=pc", label: "TikTok" },
  { icon: Youtube, href: "https://youtube.com/@officialsmkn1bantul?si=ut9z5U88b5Q2OIZB", label: "YouTube" },
];


export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="text-white relative">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
                <a href="/" aria-label="Beranda SMK Negeri 1 Bantul">
                  <img
                    src="/images/full_logo.png"
                    alt="Logo SMK Negeri 1 Bantul"
                    className="h-20 mr-3"
                  />
                </a>
            </div>
            <address className="not-italic text-gray-300 space-y-2">
                <div className="flex items-start">
                    <MapPin size={18} className="text-blue-400 mt-1 mr-2 flex-shrink-0" />
                    <span>Jl. Parangtritis No.KM.11, Dukuh, Sabdodadi, Kec. Bantul, Kab. Bantul Daerah Istimewa Yogyakarta 55715</span>
                </div>
                <div className="flex items-center">
                    <Phone size={18} className="text-blue-400 mr-2 flex-shrink-0" />
                    <span>+62 274 367 156</span>
                </div>
                <div className="flex items-center">
                    <Mail size={18} className="text-blue-400 mr-2 flex-shrink-0" />
                    <span>smkn1bantul@yahoo.co.id</span> {/* Contoh email, sesuaikan */}
                </div>
            </address>
          </div>
          {/* --- 3. Perbarui JSX untuk menampilkan ikon --- */}
          {Object.entries(footerLinkCategories).map(([category, data]) => {
            const { icon: Icon, links } = data; // Ambil ikon dan link dari data
            return (
              <div key={category}>
                {/* Gunakan flexbox untuk mensejajarkan ikon dan teks */}
                <h3 className="text-lg font-bold mb-4 capitalize flex items-center gap-x-2">
                  <Icon size={20} className="text-blue-400" />
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                    {category}
                  </span>
                </h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all rounded-lg py-1 px-2 -ml-2 inline-block"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-400 text-center sm:text-left">
            <img 
              src="/images/favicon.png"
              alt="SKANSABA Logo" 
              className="h-10"
            />
            <div>
              <p>© {new Date().getFullYear()} SMK Negeri 1 Bantul. All rights reserved.</p>
              <p>
                <span className="text-gray-500">JHIC</span>
                <span className="text-gray-500"> - Masukkan Teks </span>
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon size={20} />
                </a>
              ))}
              <button
                onClick={scrollToTop}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all hover:scale-105"
                aria-label="Scroll to top"
              >
                <ArrowUp size={22} />
              </button>
          </div>
        </div>
      </div>
    </footer>
  );
}