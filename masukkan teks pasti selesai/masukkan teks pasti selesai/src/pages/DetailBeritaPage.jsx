import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { NewsAPI } from '../utils/api';
import NotFound from './404';

const DetailBeritaPage = () => {
  const { slug } = useParams();
  const [berita, setBerita] = React.useState(null);
  const [notFound, setNotFound] = React.useState(false);

  React.useEffect(() => {
    NewsAPI.detailBySlug(slug)
      .then(setBerita)
      .catch(() => setNotFound(true));
  }, [slug]);

  if (notFound) return <NotFound />;
  if (!berita) return <div className="min-h-screen text-white"><div className="max-w-4xl mx-auto px-4 py-24">Memuat...</div></div>;

  return (
    <div className="min-h-screen text-white">
      <Helmet>
        <title>{berita.title} | SMK Negeri 1 Bantul</title>
        <meta name="description" content={berita.excerpt || (berita.body ? berita.body.substring(0, 160) : '')} />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-24">
        <div className="mb-8">
          <Link
            to="/berita"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ArrowLeft size={20} />
            Kembali ke Semua Berita
          </Link>
        </div>

        <article>
          {berita.image_url && (
            <img
              src={berita.image_url}
              alt={berita.title}
              className="w-full h-80 object-cover rounded-2xl mb-8"
            />
          )}
          <div className="flex items-center text-gray-400 mb-4">
            <Calendar size={16} className="mr-2" />
            <span>{berita.published_at ? new Date(berita.published_at).toLocaleDateString('id-ID') : ''}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
            {berita.title}
          </h1>
          
          {/* --- PERUBAHAN UTAMA DI SINI --- */}
          <div 
            className="prose prose-invert prose-lg max-w-none text-gray-300 whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: berita.body || '' }}
          />
          {/* ---------------------------------- */}
          
        </article>
      </div>
    </div>
  );
};

export default DetailBeritaPage;