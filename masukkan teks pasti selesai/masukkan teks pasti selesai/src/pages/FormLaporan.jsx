import React, { useState } from 'react';
import { ReportsAPI } from '../utils/api';
import { Home, Brush, Shield, GraduationCap, Ellipsis, ChevronDown } from 'lucide-react';

const Card = ({ children, className }) => (
  <div className={`bp-6 sm:p-8 ${className}`}>
    {children}
  </div>
);

const FormLabel = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-white mb-2">
    {children}
  </label>
);

const CATEGORY_OPTIONS = [
  { value: 'fasilitas', label: 'Fasilitas Sekolah', icon: Home, hint: 'Kerusakan/permintaan sarpras' },
  { value: 'kebersihan', label: 'Kebersihan', icon: Brush, hint: 'Kebersihan kelas/lingkungan' },
  { value: 'keamanan', label: 'Keamanan', icon: Shield, hint: 'Keamanan & ketertiban' },
  { value: 'akademik', label: 'Akademik', icon: GraduationCap, hint: 'Proses belajar & administrasi' },
  { value: 'lainnya', label: 'Lainnya', icon: Ellipsis, hint: 'Kategori di luar pilihan' },
];

const FormLaporan = () => {
  const [judul, setJudul] = useState('');
  const [kategori, setKategori] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [file, setFile] = useState(null);
  const [fotoUrl, setFotoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const uploadIfNeeded = async () => {
    if (!file) return '';
    const { url } = await ReportsAPI.uploadImage(file);
    return url;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!judul || !kategori || !keterangan) {
      alert('Harap lengkapi semua field yang wajib diisi.');
      return;
    }
    setLoading(true);
    try {
      let url = fotoUrl;
      if (!url && file) {
        url = await uploadIfNeeded();
        setFotoUrl(url);
      }
      await ReportsAPI.create({
        judul,
        deskripsi: keterangan,
        kategori,
        foto: url || null,
      });
      alert('Laporan berhasil diajukan. Menunggu konfirmasi admin.');
      setJudul(''); setKategori(''); setKeterangan(''); setFile(null); setFotoUrl('');
    } catch (e) {
      alert(e.message || 'Gagal mengirim laporan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 mt-20 text-white">
    <br></br>
    <br></br>
      <div className="max-w-4xl mx-auto bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl">
        {/* Card Utama/Master yang membungkus semuanya */}
        <Card>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
            Form Pengisian Laporan
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Baris pertama: Judul & Kategori */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Bagian Kiri: Judul Keluhan */}
              <div>
                <FormLabel htmlFor="judul-keluhan">Judul Keluhan</FormLabel>
                <input
                  type="text"
                  id="judul-keluhan"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  placeholder="cth: Keran air di toilet lantai 2 rusak"
                  className="w-full px-3 py-2 border bg-gray-900/50 p-6 rounded-xl border border-gray-700/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Bagian Kanan: Kategori */}
              <div>
                <FormLabel htmlFor="kategori-keluhan">Kategori</FormLabel>
                <select
                  id="kategori-keluhan"
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl border border-black-700/50 bg-gray-900/50 text-white hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                >
                  <option value="" disabled>Pilih salah satu kategori...</option>
                  <option value="fasilitas">Fasilitas Sekolah</option>
                  <option value="kebersihan">Kebersihan</option>
                  <option value="keamanan">Keamanan</option>
                  <option value="akademik">Akademik</option>
                  <option value="lainnya">Lainnya</option>
                </select>
              </div>
            </div>

            {/* Bagian Keterangan */}
            <div>
              <FormLabel htmlFor="keterangan-masalah">Keterangan</FormLabel>
              <textarea
                id="keterangan-masalah"
                rows="5"
                value={keterangan}
                onChange={(e) => setKeterangan(e.target.value)}
                placeholder="Jelaskan detail masalah yang Anda temukan di sini..."
                className="w-full px-3 py-2 bg-gray-900/50 p-6 rounded-xl border border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>

            {/* Bagian Upload Foto */}
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700/50 rounded-md p-4     ">
              <FormLabel htmlFor="upload-foto">Upload Foto Masalah</FormLabel>
              <input
                type="file"
                id="upload-foto"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full text-sm text-gray-500 
                           file:mr-4 file:py-2 file:px-4 
                           file:rounded-full file:border-0 
                           file:text-sm file:font-semibold 
                           file:bg-blue-50 file:text-blue-700 
                           hover:file:bg-blue-100 cursor-pointer"
              />
              <p className="mt-2 text-xs text-gray-500">Wajib melampirkan foto sebagai bukti.</p>
            </div>
            
            {/* Tombol Submit */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 shadow-lg"
              >
                {loading ? 'Mengirim...' : 'Kirim Laporan'}
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default FormLaporan;