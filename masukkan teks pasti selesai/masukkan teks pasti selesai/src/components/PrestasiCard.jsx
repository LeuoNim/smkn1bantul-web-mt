import React from 'react';

const PrestasiCard = (props) => {
  const nama = props.nama || props.title || '';
  const kejuaraan = props.kejuaraan || props.description || props.caption || '';
  const peringkat = props.peringkat || '';
  const imageUrl = props.imageUrl || props.image || props.image_url || '';
  return (
  <div className="relative">
    {peringkat && (
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold px-4 py-1.5 rounded-full border-2 border-slate-900 shadow-lg">
          {peringkat}
        </span>
      </div>
    )}
    <div className="relative group rounded-xl overflow-hidden aspect-square border border-slate-700/80 shadow-lg transform transition-transform duration-300 hover:-translate-y-2">
      <img
        src={imageUrl}
        alt={`Foto ${nama}`}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-75"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      <div className="relative p-5 flex flex-col justify-end h-full text-white">
        <div className="transform transition-transform duration-300 ease-in-out group-hover:-translate-y-2">
          <h3 className="text-2xl font-bold leading-tight">{nama}</h3>
          {kejuaraan && <p className="text-slate-300 text-sm mt-1">{kejuaraan}</p>}
        </div>
      </div>
    </div>
  </div>
)};

export default PrestasiCard;