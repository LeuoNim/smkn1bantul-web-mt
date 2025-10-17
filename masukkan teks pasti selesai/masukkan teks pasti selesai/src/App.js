import React, { lazy, useState, useEffect, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./utils/ScrollToTop";

// --- LAYOUTS ---
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/dashboard/admin/AdminLayout';


// --- EAGERLY LOADED PAGES (CORE PAGES) ---
import HomePage from "./pages/HomePage";
import NotFound from "./pages/404";
import ProgramKeahlianListPage from './pages/ProgramKeahlianListPage';
import DetailPageProgramKeahlian from './pages/DetailPageProgramKeahlian';
import AdminOverviewPage from './pages/dashboard/admin/AdminOverviewPage';
import LoginPage from './pages/Login';
import BeritaJurusanPage from './pages/BeritaJurusanPage';
import DetailBeritaJurusanPage from './pages/DetailBeritaJurusanPage';
import SemuaBeritaJurusanPage from './pages/SemuaBeritaJurusanPage';
import AdminBeritaList from './pages/dashboard/admin/AdminBeritaList';
import AdminBeritaForm from './pages/dashboard/admin/AdminBeritaForm';
import AdminSiswaList from './pages/dashboard/admin/AdminSiswaList';
import AdminSiswaForm from './pages/dashboard/admin/AdminSiswaForm';

// --- LAZILY LOADED PAGES ---
const BeritaPage = lazy(() => import("./pages/Berita"));
const DetailBeritaPage = lazy(() => import("./pages/DetailBeritaPage"));
const VisiMisiPage = lazy(() => import("./pages/VisiMisi"));
const SejarahPage = lazy(() => import("./pages/Sejarah"));
const StrukturOrganisasiPage = lazy(() => import("./pages/StrukturOrganisasiPage"));
const SaranaPrasaranaPage = lazy(() => import("./pages/SaranaPrasaranaPage"));
const TeachingFactoryPage = lazy(() => import("./pages/TeachingFactoryPage"));
const BerkasDownloadPage = lazy(() => import("./pages/BerkasDownloadPage"));
const LaporanPage = lazy(() => import("./pages/LaporanPage"));
const FormLaporanPage = lazy(() => import("./pages/FormLaporan"));
const PrestasiPage = lazy(() => import("./pages/Prestasi"));
const DownloadPage = lazy(() => import("./pages/Download"));
const EkstrakurikulerPage = lazy(() => import("./pages/Ekstrakurikuler"));
const OrganisasiSiswaPage = lazy(() => import("./pages/OrganisasiSiswa"));
const AdminGuruList = lazy(() => import("./pages/dashboard/admin/AdminGuruList"));
const AdminGuruForm = lazy(() => import("./pages/dashboard/admin/AdminGuruForm"));
// --- LOADING COMPONENTS ---
function LoadingSpinner() {
  // (Your LoadingSpinner component code remains unchanged)
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/80 backdrop-blur-sm">
      <div className="relative w-24 h-24 animate-pulse">
        <img src="/images/favicon.png" alt="Loading..." className="w-full h-full object-contain" />
      </div>
    </div>
  );
}

function PageTransitionLoader() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300); // Shorter, more pleasant loading time
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return isLoading ? <LoadingSpinner /> : null;
}


function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <PageTransitionLoader />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* --- Group 1: Public Pages (with Navbar and Footer) --- */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/berita" element={<BeritaPage />} />
              <Route path="/berita/:slug" element={<DetailBeritaPage />} />
              <Route path="/program-keahlian" element={<ProgramKeahlianListPage />} />
              <Route path="/program-keahlian/:slug" element={<DetailPageProgramKeahlian />} />
              <Route path="/visi-misi" element={<VisiMisiPage />} />
              <Route path="/sejarah" element={<SejarahPage />} />
              <Route path="/struktur-organisasi" element={<StrukturOrganisasiPage />} />
              <Route path="/sarana-prasarana" element={<SaranaPrasaranaPage />} />
              <Route path="/teaching-factory" element={<TeachingFactoryPage />} />
              <Route path="/laporan" element={<LaporanPage />} />
              <Route path="/laporan/new" element={<FormLaporanPage />} />
              <Route path="/spmb" element={<BerkasDownloadPage />} />
              <Route path="/prestasi" element={<PrestasiPage />} />
              <Route path="/download" element={<DownloadPage />} />
              <Route path="/ekstrakurikuler" element={<EkstrakurikulerPage />} />
              <Route path="/organisasi-siswa" element={<OrganisasiSiswaPage />} />
              <Route path="/program-keahlian/:majorSlug/berita" element={<BeritaJurusanPage />} />
              <Route path="/berita-jurusan" element={<SemuaBeritaJurusanPage />} />
              <Route path="/berita-jurusan/:slug" element={<DetailBeritaJurusanPage />} />
            </Route>

            {/* --- Admin Dashboard --- */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminOverviewPage />} />
              <Route path="berita" element={<AdminBeritaList />} />
              <Route path="berita/new" element={<AdminBeritaForm />} />
              <Route path="berita/:id/edit" element={<AdminBeritaForm />} />

              <Route path="manajemen-siswa" element={<AdminSiswaList />} />
              <Route path="manajemen-siswa/new" element={<AdminSiswaForm />} />
              <Route path="manajemen-siswa/:id/edit" element={<AdminSiswaForm />} />

              <Route path="manajemen-guru" element={<AdminGuruList />} />
              <Route path="manajemen-guru/new" element={<AdminGuruForm />} />
              <Route path="manajemen-guru/:id/edit" element={<AdminGuruForm />} />

              <Route path="galeri" element={React.createElement(require('./pages/dashboard/admin/AdminGalleryList').default)} />
              <Route path="galeri/new" element={React.createElement(require('./pages/dashboard/admin/AdminGalleryForm').default)} />
              <Route path="galeri/:id/edit" element={React.createElement(require('./pages/dashboard/admin/AdminGalleryForm').default)} />

              <Route path="laporan-sementara" element={React.createElement(require('./pages/dashboard/admin/AdminLaporanSementara').default)} />
              <Route path="laporan" element={React.createElement(require('./pages/dashboard/admin/AdminLaporanList').default)} />
            </Route>
           

            {/* --- Group 4: Fullscreen Pages (NO Layout) --- */}
            <Route path="*" element={<NotFound />} />
            {/* You can add a login page here if needed, e.g., <Route path="/login" element={<LoginPage />} /> */}
          </Routes>
        </Suspense>
      </Router>
    </HelmetProvider>
  );
}

export default App;