import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import beritaJurusanData from '../data/berita-jurusan.json';
import NotFound from './404';

const DetailBeritaJurusanPage = () => {
  const { slug } = useParams();
  const berita = beritaJurusanData.find(b => b.slug === slug);

  if (!berita) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen text-white">
      <Helmet>
        <title>{berita.title} | SMK Negeri 1 Bantul</title>
        <meta name="description" content={berita.excerpt} />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-24">
        <div className="mb-8">
          <Link
            to={`/program-keahlian/${berita.majorSlug}/berita`}
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ArrowLeft size={20} />
            Kembali ke Berita Jurusan
          </Link>
        </div>

        <article>
          <img src={berita.image} alt={berita.title} className="w-full h-80 object-cover rounded-2xl mb-8" />
          <div className="flex items-center text-gray-400 mb-4">
            <span className="bg-blue-500/20 text-blue-300 text-sm font-semibold px-3 py-1 rounded-full mr-4">{berita.category}</span>
            <Calendar size={16} className="mr-2" />
            <span>{berita.date}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">{berita.title}</h1>
          <div 
            className="prose prose-invert prose-lg max-w-none text-gray-300"
            dangerouslySetInnerHTML={{ __html: berita.content }}
          />
        </article>
      </div>
    </div>
  );
};

export default DetailBeritaJurusanPage;