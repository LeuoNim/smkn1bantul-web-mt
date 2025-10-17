import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

const BeritaCard = ({ berita }) => (
  <Link to={`/berita/${berita.slug}`} className="group block">
    <div className="bg-gradient-to-br from-gray-800/50 via-gray-800/30 to-gray-900/50 rounded-2xl backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 overflow-hidden flex flex-col h-full">
      <div className="relative">
        <img
          src={berita.image}
          alt={berita.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {berita.badge && (
          <div className="absolute top-4 right-4 inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
            {berita.badge}
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{berita.title}</h3>
        <p className="text-gray-300 mb-4 flex-grow">{berita.excerpt}</p>
        
        <div className="mt-auto pt-4 border-t border-gray-700/50 flex items-center text-gray-400 text-sm">
          <Calendar size={16} className="mr-2" />
          <span>Dipublikasikan pada {berita.date}</span>
        </div>
      </div>
    </div>
  </Link>
);

export default BeritaCard;