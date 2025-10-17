import React from 'react';

export default function SambutanKepsek() {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-20xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="bg-gray-800/30 rounded-xl border border-gray-700/50 rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3">
            
            {/* Bagian Kiri: Foto */}
            {/* DIUBAH: Menambahkan border responsif di sini */}
            <div className="md:col-span-1 p-6 flex items-center justify-center bg-gray-800/30 border-b md:border-b-0 md:border-r border-gray-700/50">
              <div className="relative">
                <img
                  className="h-64 w-64 md:h-80 md:w-full object-cover rounded-xl shadow-md"
                  src="https://smkn1bantul.sch.id/assets/images/kepsek.jpeg"
                  alt="Foto Kepala Sekolah - Raharjo, M.Pd."
                />
                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
              </div>
            </div>

            {/* Bagian Kanan: Sambutan */}
            <div className="md:col-span-2 p-8 sm:p-10">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Sambutan Kepala Sekolah
              </h2>
              <h3 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white  ">
                Raharjo, M.Pd.
              </h3>

              {/* Garis Pembagi Internal */}
              <hr className="w-16 border-t-2 border-blue-500 my-5" />

              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700/60">
                  <div className="space-y-4 text-white leading-relaxed">
                    <p>
                        Assalamualaikum warahmatullahi wabarakatuh, Salam sejahtera bagi kita semua. Saya, Raharjo, M.Pd., Kepala SMK Negeri 1 Bantul, dengan bangga menyampaikan visi dan misi sekolah kami, yaitu mencetak lulusan yang unggul, berkompeten, dan siap bersaing di dunia global. Visi ini kami wujudkan melalui pendidikan yang berbasis pada penguatan karakter, keterampilan, dan penguasaan teknologi. Kami percaya bahwa dengan pendidikan yang berkualitas, kami dapat menyiapkan generasi yang siap menghadapi tantangan masa depan, baik di dunia kerja, wirausaha, maupun pendidikan tinggi.
                    </p>
                    <p>
                        Di SMK Negeri 1 Bantul, kami menerapkan pembelajaran yang memanusiakan hubungan, memahami konsep, membangun keberlanjutan, memilih tantangan, dan memberdayakan konteks. Dengan pendekatan ini, kami berupaya menciptakan siswa yang tidak hanya cerdas secara akademik, tetapi juga memiliki karakter yang sesuai dengan Profil Pelajar Pancasila. Kami ingin siswa mampu berkolaborasi, berinovasi, dan berkontribusi positif dalam masyarakat. Harapan besar kami adalah lulusan SMK Negeri 1 Bantul menjadi generasi yang siap kerja di dunia industri, siap berwirausaha dengan ide-ide kreatifnya, serta siap melanjutkan pendidikan ke jenjang yang lebih tinggi. Kami percaya, dengan dukungan semua pihak, cita-cita ini dapat terwujud, dan lulusan kami akan menjadi kebanggaan bangsa. Teruslah belajar, berinovasi, dan berkontribusi untuk masa depan yang lebih baik. Wassalamualaikum warahmatullahi wabarakatuh.
                    </p>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}