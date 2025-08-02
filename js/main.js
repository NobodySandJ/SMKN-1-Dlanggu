document.addEventListener("DOMContentLoaded", function () {
  async function fetchData() {
    try {
      const response = await fetch("data/data.json");
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();

      // Panggil semua fungsi render
      renderHero(data.hero);
      renderSambutan(data.sambutan);
      renderJurusan(data.jurusan);
      renderBerita(data.berita);
      renderGaleri(data.galeri);
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

  function renderSambutan(item) {
    const container = document.getElementById("sambutan-container");
    if (!container) return;
    container.innerHTML = `
            <div class="relative" data-aos="fade-right" data-aos-delay="200">
                <img src="${item.foto_kepsek}" alt="Kepala Sekolah SMKN 1 Dlanggu" class="w-full rounded-lg shadow-lg">
                <div class="absolute -bottom-4 -right-4 bg-brand-purple text-white p-4 rounded-lg shadow-xl max-w-xs">
                    <p class="font-poppins font-semibold">${item.nama_kepsek}</p>
                    <p class="text-sm text-purple-200">Kepala SMKN 1 Dlanggu</p>
                </div>
            </div>
            <div class="mt-8 md:mt-0" data-aos="fade-left" data-aos-delay="400">
                <h2 class="text-3xl font-bold text-gray-900 mb-4">${item.judul}</h2>
                <p class="text-gray-600 leading-relaxed">${item.isi_sambutan}</p>
            </div>
        `;
  }

  function renderJurusan(items) {
    const container = document.getElementById("jurusan-container");
    if (!container) return;

    container.innerHTML = items
      .map(
        (item, index) => `
            <a href="jurusan-detail.html?id=${
              item.id
            }" class="block bg-white p-6 rounded-lg border border-gray-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300" data-aos="fade-up" data-aos-delay="${
          index * 100
        }">
                <div class="text-4xl mb-4">${item.icon}</div>
                <h3 class="text-xl font-poppins font-semibold text-gray-900 mb-2">${
                  item.nama
                }</h3>
                <p class="text-gray-600">${item.deskripsi}</p>
            </a>
        `
      )
      .join("");
  }

  function renderBerita(items) {
    const container = document.getElementById("berita-container");
    if (!container) return;

    window.beritaItems = items;

    container.innerHTML = items
      .map(
        (item, index) => `
      <div onclick="openBeritaModal(${index})" class="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-all" data-aos="fade-up" data-aos-delay="${
          index * 100
        }">
          <div class="overflow-hidden">
              <img src="${item.gambar}" alt="${
          item.judul || "Gambar"
        }" class="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500">
          </div>
          <div class="p-6">
              <span class="text-sm font-semibold text-brand-purple">${
                item.kategori
              }</span>
              <h4 class="font-poppins font-semibold text-lg text-gray-900 mt-2 mb-3 leading-tight hover:text-brand-purple transition-colors duration-300">
                  ${item.judul}
              </h4>
              <p class="text-sm text-gray-500">${item.tanggal}</p>
          </div>
      </div>
    `
      )
      .join("");
  }

  function renderGaleri(items) {
    const container = document.getElementById("galeri-container");
    if (!container) return;

    container.innerHTML = items
      .map(
        (item, index) => `
            <div class="relative rounded-lg overflow-hidden shadow-md group" data-aos="zoom-in" data-aos-delay="${
              index * 100
            }">
                <img src="${item.foto}" alt="${
          item.judul
        }" class="w-full h-full object-cover aspect-square">
                <div class="absolute inset-0 bg-black/70 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div>
                        <h4 class="text-white font-poppins font-semibold">${
                          item.judul
                        }</h4>
                        <span class="text-gray-300 text-sm">${
                          item.kategori
                        }</span>
                    </div>
                </div>
            </div>
        `
      )
      .join("");
  }

  fetchData();
  
  // Kode untuk toggle menu mobile
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
  }
});

function openBeritaModal(index) {
  const item = window.beritaItems[index];
  if (!item) return;

  document.getElementById("modal-gambar").src = item.gambar;
  document.getElementById("modal-gambar").alt = item.judul;
  document.getElementById("modal-kategori").textContent = item.kategori;
  document.getElementById("modal-judul").textContent = item.judul;
  document.getElementById("modal-tanggal").textContent = item.tanggal;
  document.getElementById("modal-deskripsi").textContent =
    item.deskripsi || "Deskripsi belum tersedia.";

  document.getElementById("berita-modal").classList.remove("hidden");
}

function closeBeritaModal() {
  document.getElementById("berita-modal").classList.add("hidden");
}