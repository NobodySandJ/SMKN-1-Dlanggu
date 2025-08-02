document.addEventListener('DOMContentLoaded', function() {
    
    async function fetchData() {
        try {
            const response = await fetch('data/data.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            
            renderHero(data.hero);
            renderSambutan(data.sambutan);
            renderJurusan(data.jurusan);
            renderBerita(data.berita);
            
        } catch (error) {
            console.error("Gagal memuat data website:", error);
        }
    }

  function renderHero(item) {
    const container = document.getElementById("hero-image-container");
    if (!container) return;
    container.innerHTML = `
      <img src="${item.image}" alt="Siswa SMKN 1 Dlanggu" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-t from-brand-purple/30 to-transparent"></div>
    `;
  }

  function renderKontak(kontak) {
    const container = document.getElementById("kontak-header");
    if (!container) return;

    container.innerHTML = `
    <div style="color:#fff;opacity:.6;">
      <i class="zmdi zmdi-phone"></i> &nbsp;&nbsp;&nbsp;${kontak.telepon}
      &nbsp;&nbsp;&nbsp;&nbsp;| &nbsp;&nbsp;&nbsp;&nbsp;
      <i class="zmdi zmdi-email"></i> &nbsp;&nbsp;&nbsp;${kontak.email}
    </div>
  `;
  }

    function renderSambutan(item) {
        const container = document.getElementById('sambutan-container');
        if (!container) return;
        container.innerHTML = `
            <div class="relative">
                <img src="${item.foto_kepsek}" alt="Kepala Sekolah SMKN 1 Dlanggu" class="w-full rounded-lg shadow-lg">
                <div class="absolute -bottom-4 -right-4 bg-brand-purple text-white p-4 rounded-lg shadow-xl max-w-xs">
                    <p class="font-poppins font-semibold">${item.nama_kepsek}</p>
                    <p class="text-sm text-purple-200">Kepala SMKN 1 Dlanggu</p>
                </div>
            </div>
            <div class="mt-8 md:mt-0">
                <h2 class="text-3xl font-bold text-gray-900 mb-4">${item.judul}</h2>
                <p class="text-gray-600 leading-relaxed">${item.isi_sambutan}</p>
            </div>
        `;
    }

    function renderJurusan(items) {
        const container = document.getElementById('jurusan-container');
        if (!container) return;
        
        container.innerHTML = items.map(item => `
            <div class="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div class="text-4xl mb-4">${item.icon}</div>
                <h3 class="text-xl font-poppins font-semibold text-gray-900 mb-2">${item.nama}</h3>
                <p class="text-gray-600">${item.deskripsi}</p>
            </div>
        `).join('');
    }
    
    function renderBerita(items) {
        const container = document.getElementById('berita-container');
        if (!container) return;

        container.innerHTML = items.map(item => `
            <div class="bg-white rounded-lg shadow-md overflow-hidden group">
                <div class="overflow-hidden">
                    <img src="${item.gambar}" alt="${item.judul}" class="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500">
                </div>
                <div class="p-6">
                    <span class="text-sm font-semibold text-brand-purple">${item.kategori}</span>
                    <h4 class="font-poppins font-semibold text-lg text-gray-900 mt-2 mb-3 leading-tight hover:text-brand-purple transition-colors duration-300">
                        <a href="#">${item.judul}</a>
                    </h4>
                    <p class="text-sm text-gray-500">${item.tanggal}</p>
                </div>
            </div>
        `).join('');
    }

  fetchData();
});
