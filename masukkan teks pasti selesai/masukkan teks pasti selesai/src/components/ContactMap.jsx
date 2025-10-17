import React from 'react';
import { IoLocationSharp, IoCall, IoMail, IoTime } from 'react-icons/io5';

const ContactMap = () => {
  const contactInfo = [
    {
      icon: <IoLocationSharp size={24} className="text-teal-500" />,
      label: 'Alamat',
      value: 'Jl. Parangtritis No.KM.11, Dukuh, Sabdodadi, Kec. Bantul, Kab. Bantul Daerah Istimewa Yogyakarta 55715',
    },
    {
      icon: <IoCall size={24} className="text-teal-500" />,
      label: 'Telepon',
      value: '+62 274 367 156',
      link: 'tel:+62274367156'
    },
    {
      icon: <IoMail size={24} className="text-teal-500" />,
      label: 'Email',
      value: 'smkn1bantul@yahoo.co.id',
      link: 'mailto:smkn1bantul@yahoo.co.id',
    },
    {
      icon: <IoTime size={24} className="text-teal-500" />,
      label: 'Jam Operasional',
      value: 'Senin - Jumat: 07:00 - 15:30 WIB',
    },
  ];

  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.0492814196223!2d110.35562934470948!3d-7.889913320805627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7b00889ad8f84d%3A0x2e0009ca7815eaf0!2sSMK%20Negeri%201%20Bantul!5e0!3m2!1sen!2sid!4v1760561743895!5m2!1sen!2sid";

  return (
    // Kontainer diperlebar ke max-w-7xl
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Card 1: Informasi Kontak dengan padding lebih besar */}
        <div className="lg:col-span-1 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <h2 className="text-2xl font-bold mb-8 text-white">Informasi Kontak</h2>
          
          {/* Jarak antar item diperbesar */}
          <div className="space-y-8">
            {contactInfo.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <p className="font-semibold text-white">{item.label}</p>
                  {item.link ? (
                    <a href={item.link} className="text-white hover:text-teal-600 transition-colors break-words">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-white break-words">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-8">
            <a
              href="https://maps.app.goo.gl/35Y5FzF1xZNVc2oK9"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-teal-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-600 transition-all duration-300 flex items-center justify-center text-center"
            >
              Petunjuk Arah
            </a>
          </div>
        </div>

        {/* Card 2: Peta dengan tinggi minimum lebih besar */}
        <div className="lg:col-span-2 h-96 lg:h-full min-h-[450px] bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Peta Lokasi SMKN 1 Bantul"
          ></iframe>
        </div>

      </div>
    </div>
  );
};

export default ContactMap;