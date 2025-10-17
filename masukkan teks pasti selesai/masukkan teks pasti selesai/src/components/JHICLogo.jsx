import React from "react";

const JHICLogo = () => {
  return (
    <section className="py-12 sm:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="text-center">
          <div className="bg-gradient-to-br from-gray-800/50 via-gray-800/30 to-gray-900/50 rounded-2xl backdrop-blur-sm border border-gray-700/50 shadow-xl p-8 sm:p-12 max-w-6xl mx-auto transform hover:scale-[1.01] transition-transform duration-300">
            {/* --- PERUBAHAN DI SINI --- */}
            <img
              src="./images/LogoJagoanHosting,Komdigi,MaspionIT,GarudaSpark.png"
              alt="Logo Mitra Industri: JagoanHosting, Komdigi, MaspionIT, GarudaSpark"
              className="mx-auto w-auto max-h-48 sm:max-h-64 object-contain" // Kelas filter, grayscale, hover:grayscale-0, dan transition dihapus
            />
            {/* ------------------------- */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JHICLogo;