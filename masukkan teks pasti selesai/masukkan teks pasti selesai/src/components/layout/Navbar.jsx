import React, { useState, useEffect, useCallback } from "react";
import {
  ChevronDown,
  ChevronRight,
  Gamepad2,
  BoxIcon,
  Shield,
  Globe,
  HeadsetIcon,
  HomeIcon,
  Cpu,
  LaptopIcon,
  Gamepad2Icon,
  ArrowRight,
  RadarIcon,
  HandHelpingIcon,
  Gamepad,
  BookOpen,
  Users,
  Briefcase,
  ShoppingBag,
  Palette,
  Code,
  Network,
  MessageSquareWarning,
} from "lucide-react";
import { Link } from "react-router-dom";
import NotificationBell from '../NotificationBell';
import { AuthAPI } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const mainNavLinks = [
  {
    label: "Profil Sekolah",
    icon: <BoxIcon size={18} />,
    submenu: [
      {
        to: "/sejarah",
        label: "Sejarah",
        icon: <BookOpen size={20} />,
        description: "Jelajahi perjalanan sekolah dari masa ke masa.",
      },
      {
        to: "/visi-misi",
        label: "Visi & Misi",
        icon: <RadarIcon size={20} />,
        description: "Tujuan dan cita-cita yang kami junjung tinggi.",
      },
      {
        to: "/struktur-organisasi",
        label: "Struktur Organisasi",
        icon: <Users size={20} />,
        description: "Kenali tim manajemen dan staf pengajar kami.",
      },
      {
        to: "/sarana-prasarana",
        label: "Sarana Prasarana",
        icon: <HomeIcon size={20} />,
        description: "Lihat fasilitas pendukung kegiatan belajar.",
      },
      {
        to: "/teaching-factory",
        label: "Teaching Factory",
        icon: <Cpu size={20} />,
        description: "Pembelajaran berbasis industri untuk siswa siap kerja.",
      },
    ],
  },
  {
    label: "Informasi",
    icon: <Globe size={18} />,
    submenu: [
      {
        to: "/berita",
        label: "Berita dan Informasi",
        icon: <BookOpen size={16} />,
        description: "Kabar terbaru dan pengumuman penting sekolah.",
      },
      {
        to: "/prestasi",
        label: "Prestasi",
        icon: <RadarIcon size={16} />,
        description: "Capaian gemilang siswa dan sekolah di berbagai bidang.",
      },
      {
        to: "/laporan",
        label: "Laporan",
        icon: <MessageSquareWarning size={16} />,
        description: "Masuk ke dashboard laporan untuk membuat dan memantau pengaduan.",
      },
      {
        to: "/download",
        label: "Download",
        icon: <ChevronDown size={16} />,
        description: "Unduh dokumen dan berkas penting terkait sekolah.",
      },
      {
        to: "/spmb",
        label: "Berkas SPMB 2025",
        icon: <Users size={16} />,
        description: "Dokumen yang diperlukan untuk pendaftaran siswa baru.",
      },
      {
        to: "https://spmb.jogjaprov.go.id/",
        label: "SPMB 2025",
        icon: <ArrowRight size={16} />,
        description: "Informasi lengkap seputar Penerimaan Siswa Baru.",
      },
    ],
  },
  {
    label: "Program Keahlian",
    icon: <Cpu size={18} />,
    submenu: [
      {
        to: "/program-keahlian/akuntansi-dan-keuangan-lembaga",
        label: "Akuntansi dan Keuangan Lembaga",
        icon: <BookOpen size={16} />,
        description: "Mencetak ahli keuangan yang kompeten dan profesional.",
      },
      {
        to: "/program-keahlian/layanan-perbankan-syariah",
        label: "Layanan Perbankan Syariah",
        icon: <HandHelpingIcon size={16} />,
        description: "Fokus pada prinsip perbankan syariah modern.",
      },
      {
        to: "/program-keahlian/manajemen-perkantoran-dan-layanan-bisnis",
        label: "Manajemen Perkantoran dan Layanan Bisnis",
        icon: <Briefcase size={16} />,
        description: "Keterampilan administrasi untuk dunia bisnis.",
      },
      {
        to: "/program-keahlian/pemasaran",
        label: "Pemasaran",
        icon: <ShoppingBag size={16} />,
        description: "Strategi pemasaran di era digital dan konvensional.",
      },
      {
        to: "/program-keahlian/desain-komunikasi-visual",
        label: "Desain Komunikasi Visual",
        icon: <Palette size={16} />,
        description: "Mengubah ide menjadi karya visual yang memukau.",
      },
      {
        to: "/program-keahlian/rekayasa-perangkat-lunak",
        label: "Rekayasa Perangkat Lunak",
        icon: <Code size={16} />,
        description: "Membangun solusi digital melalui rekayasa perangkat lunak.",
      },
      {
        to: "/program-keahlian/teknik-jaringan-komputer-telekomunikasi",
        label: "Teknik Komputer & Jaringan",
        icon: <Network size={16} />,
        description: "Ahli infrastruktur teknologi dan jaringan komputer.",
      },
    ],
  },
  {
    label: "Lainnya",
    icon: <BoxIcon size={18} />,
    submenu: [
      {
        to: "/ekstrakurikuler",
        label: "Ekstrakurikuler",
        icon: <Gamepad2Icon size={16} />,
        description: "Wadah pengembangan minat dan bakat siswa.",
      },
      {
        to: "/organisasi-siswa",
        label: "Organisasi Siswa",
        icon: <Users size={16} />,
        description: "Aktivitas kesiswaan untuk melatih kepemimpinan.",
      },
    ],
  },
];


const NavIcon = React.memo(({ icon, className = "" }) => {
  if (typeof icon === "string") {
    return (
      <img
        src={icon}
        alt=""
        className={`w-6 h-6 ${className}`}
        aria-hidden="true"
        loading="lazy"
      />
    );
  }
  return <span className={`text-gray-400 ${className}`}>{icon}</span>;
});

NavIcon.displayName = "NavIcon";

const Logo = React.memo(() => (
  <Link
    to="/"
    className="flex items-center gap-3"
    aria-label="SMKN 1 Bantul Homepage"
  >
    <a href="/" class="navbar-brand"><img width="200" src="/images/full_logo.png" alt="SKANSABA-LOGO"></img></a>
  </Link>
));

Logo.displayName = "Logo";

const MobileSubmenu = React.memo(
  ({ title, icon, items, isOpen, onToggle, onLinkClick }) => (
    <div className="border-b border-gray-800 last:border-b-0">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full p-4 text-gray-200 hover:bg-gray-800/50 rounded-lg transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <NavIcon icon={icon} />
          <span className="font-medium">{title}</span>
        </div>
        <ChevronRight
          size={18}
          className={`transform transition-transform duration-300 ${isOpen ? "rotate-90" : ""
            }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="space-y-1 p-2 bg-gray-800/30 mx-4 rounded-lg">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={onLinkClick}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors duration-200"
            >
              <NavIcon icon={item.icon} className="mt-1" />
              <div>
                <div className="text-gray-200 font-medium">{item.label}</div>
                {item.description && (
                  <div className="text-sm text-gray-400">
                    {item.description}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
);

MobileSubmenu.displayName = "MobileSubmenu";

const DesktopDropdown = React.memo(({ items }) => (
  <div
    className="grid grid-cols-1 gap-1 p-3 min-w-[320px]"
    role="menu"
    onMouseDown={(e) => e.preventDefault()}
  >
    {items.map((item) => (
      <Link
        key={item.to}
        to={item.to}
        className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-all duration-200 group"
        role="menuitem"
      >
        <NavIcon
          icon={item.icon}
          className="mt-1 text-gray-400 group-hover:text-blue-400"
        />
        <div>
          <div className="text-gray-200 font-medium group-hover:text-white transition-colors duration-200">
            {item.label}
          </div>
          {item.description && (
            <div className="text-sm text-gray-400">{item.description}</div>
          )}
        </div>
      </Link>
    ))}
  </div>
));

DesktopDropdown.displayName = "DesktopDropdown";

const DesktopNav = React.memo(({ links, isActive }) => {
  const [logged, setLogged] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const check = () => { try { setLogged(!!localStorage.getItem('auth_token')); } catch {} };
    check();
    const onStorage = () => check();
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);
  const onLogout = async () => {
    try { await AuthAPI.logout(); } catch {}
    try { localStorage.removeItem('auth_token'); localStorage.removeItem('auth_role'); } catch {}
    setLogged(false);
    navigate('/');
  };
  return (
  <div className="hidden lg:flex items-center gap-6">
    {links.map((link) =>
      !link.submenu ? (
        <Link
          key={link.to}
          to={link.to}
          className={`
            flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-200
            hover:bg-gray-800 ${link.highlight ? "text-blue-400" : "text-gray-200"
            }
            ${isActive(link.to) ? "bg-gray-800" : ""}
          `}
          aria-current={isActive(link.to) ? "page" : undefined}
        >
          <NavIcon icon={link.icon} />
          <span>{link.label}</span>
        </Link>
      ) : (
        <div key={link.label} className="relative group">
          <button
            className="flex items-center gap-2 py-2 px-3 rounded-lg text-gray-200 hover:bg-gray-800 transition-all duration-200"
            aria-expanded="false"
            aria-haspopup="true"
          >
            <NavIcon icon={link.icon} />
            <span>{link.label}</span>
            <ChevronDown
              size={16}
              className="transform transition-transform duration-200 group-hover:rotate-180"
            />
          </button>
          <div className="absolute top-full left-0 hidden group-hover:block pt-2">
            <div className="bg-gray-900 rounded-lg shadow-xl border border-gray-800">
              <DesktopDropdown items={link.submenu} />
            </div>
          </div>
        </div>
      )
    )}

    <div className="flex items-center gap-4 pl-4 border-l border-gray-800">
      {logged ? (
        <>
          <NotificationBell />
          <button onClick={onLogout} className="px-4 py-2 text-gray-200 hover:bg-gray-800 rounded-lg transition-colors duration-200">Logout</button>
        </>
      ) : (
        <Link
          to="/login"
          className="px-4 py-2 text-gray-200 hover:bg-gray-800 rounded-lg transition-colors duration-200"
        >
          Login
        </Link>
      )}
    </div>
  </div>
)});

DesktopNav.displayName = "DesktopNav";

const MobileNav = React.memo(({ isOpen, links, onClose }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
    } else {
      const timer = setTimeout(() => {
        setMounted(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <div
      className={`
        lg:hidden fixed inset-0 z-50
        transition-all duration-300 ease-in-out
        ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
    >
      <div
        className={`
          fixed inset-0 bg-gray-900/80 backdrop-blur-sm
          transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0"}
        `}
        onClick={onClose}
      />

      <div
        className={`
          fixed right-0 top-0 h-[100dvh] w-full sm:w-[380px] bg-gray-900 
          transform transition-transform duration-300 ease-in-out overflow-hidden
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="h-full overflow-y-auto pt-20">
          <div className="flex-1 px-4 py-6 space-y-2">{links}</div>

          <div className="p-4 border-t border-gray-800">
            <div className="space-y-3">
              <Link
                to="https://example.com"
                onClick={onClose}
                className="block w-full p-3 text-center text-gray-200 hover:text-blue-400 
                  transition-colors duration-200 rounded-lg hover:bg-gray-800"
              >
                Game Panel
              </Link>
              <Link
                to="https://example.com"
                onClick={onClose}
                className="primary-button block w-full bg-gradient-to-r from-blue-500 to-blue-600 p-3 
                  rounded-lg text-center hover:opacity-90 transition-all duration-200 
                  text-white font-medium shadow-lg shadow-blue-500/25"
              >
                Client Area
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

MobileNav.displayName = "MobileNav";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [pathname, setPathname] = useState("/");

  const handleClose = useCallback(() => {
    setIsMenuOpen(false);
    setOpenSubmenu(null);
  }, []);

  // Scroll listener untuk mengubah navbar background
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    handleClose();
  }, [pathname, handleClose]);

  const isActive = useCallback(
    (path) => (path === "/" ? pathname === "/" : pathname.startsWith(path)),
    [pathname]
  );

  return (
    <nav
      className={`
        fixed w-full top-0 z-[60]
        transition-all duration-300
        ${scrolled 
          ? "bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-700/50" 
          : "bg-transparent border-b border-transparent"
        }
      `}
    >
      <div className="container max-w-screen-2xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Logo />

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`
              lg:hidden fixed right-4 z-[70] p-2 rounded-lg 
              transition-all duration-200
              ${isMenuOpen
                ? "text-white bg-gray-800 hover:bg-gray-700"
                : "text-gray-200 hover:bg-gray-800/50"
              }
            `}
            style={{ top: "1.25rem" }}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative w-6 h-6">
              <span
                className={`
                  absolute left-0 block w-6 h-0.5 bg-current transform 
                  transition-all duration-300 ease-in-out
                  ${isMenuOpen ? "rotate-45 top-3" : "top-2"}
                `}
              />
              <span
                className={`
                  absolute left-0 block w-6 h-0.5 bg-current transform 
                  transition-all duration-300 ease-in-out
                  ${isMenuOpen ? "-rotate-45 top-3" : "top-4"}
                `}
              />
            </div>
          </button>

          <DesktopNav links={mainNavLinks} isActive={isActive} />
        </div>
      </div>

      <MobileNav
        isOpen={isMenuOpen}
        onClose={handleClose}
        links={mainNavLinks.map((link) =>
          !link.submenu ? (
            <Link
              key={link.to}
              to={link.to}
              className={`
                flex items-center gap-3 p-4 rounded-lg transition-all duration-200
                hover:bg-gray-800 text-gray-200
                ${isActive(link.to) ? "bg-gray-800" : ""}
              `}
              onClick={() => {
                setPathname(link.to);
                handleClose();
              }}
            >
              <NavIcon icon={link.icon} />
              <span className="font-medium">{link.label}</span>
            </Link>
          ) : (
            <MobileSubmenu
              key={link.label}
              title={link.label}
              icon={link.icon}
              items={link.submenu}
              isOpen={openSubmenu === link.label}
              onToggle={() =>
                setOpenSubmenu(openSubmenu === link.label ? null : link.label)
              }
              onLinkClick={handleClose}
            />
          )
        )}
      />
    </nav>
  );
};

export default Navbar;