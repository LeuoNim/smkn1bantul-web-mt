import React, { useEffect, useState } from "react";
import { Calendar, User2, Tag, ArrowRight } from "lucide-react";
import { ReportsPublicAPI } from "../utils/api";

export default function HomeLaporanSelesai() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await ReportsPublicAPI.latestConfirmed(3);
        const rows = (data?.data || []).slice(0, 3);
        if (mounted) setItems(rows);
      } catch (e) {
        if (mounted) setError(e?.message || "Gagal memuat laporan");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Laporan Terbaru
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Laporan yang telah dikonfirmasi oleh Admin (status Diproses atau Selesai).
          </p>
        </div>

        {loading ? (
          <div className="text-center text-gray-400">Memuat...</div>
        ) : error ? (
          <div className="text-center text-red-400">{error}</div>
        ) : items.length === 0 ? (
          <div className="text-center text-gray-400">Belum ada laporan.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((it) => {
              const foto = it.foto_url || it.foto || it.gambar || null;
              const nama = it.siswa_nama || it.pelapor_nama || it.user?.name || (it.nis ? `Siswa NIS ${it.nis}` : "Siswa");
              const tgl = it.selesai_at || it.completed_at || it.updated_at || it.created_at;
              const rawStatus = (it.status || it.state || it.status_text || '').toString().toLowerCase();
              const isDone = rawStatus.includes('selesai') || rawStatus.includes('done') || rawStatus.includes('finished');
              const isProcessing = rawStatus.includes('proses') || rawStatus.includes('process');
              const statusLabel = isDone ? 'Selesai' : (isProcessing ? 'Diproses' : (rawStatus ? rawStatus : 'Diproses'));
              const statusClasses = isDone
                ? 'bg-green-500/15 text-green-300 border border-green-500/30'
                : 'bg-yellow-500/15 text-yellow-300 border border-yellow-500/30';
              return (
                <article key={it.id} className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300">
                  {foto ? (
                    <div className="aspect-video bg-gray-900 overflow-hidden">
                      <img src={foto} alt={it.judul || "Laporan"} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gray-900" />
                  )}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-white line-clamp-2">{it.judul}</h3>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-400">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md font-medium ${statusClasses}`}>{statusLabel}</span>
                      <span className="inline-flex items-center gap-1"><User2 size={14} />{nama}</span>
                      {it.kategori && (
                        <span className="inline-flex items-center gap-1"><Tag size={14} />{it.kategori}</span>
                      )}
                      {tgl && (
                        <span className="inline-flex items-center gap-1 ml-auto"><Calendar size={14} />{new Date(tgl).toLocaleDateString('id-ID')}</span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}


        <div className="text-center mt-16">
          <a
            href="/laporan"
            className="inline-flex items-center gap-2 text-lg font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            Lihat Semua Laporan
            <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
