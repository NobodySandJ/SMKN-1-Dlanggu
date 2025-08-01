document.addEventListener('DOMContentLoaded', () => {
    // 1. Ambil ID dari URL
    const params = new URLSearchParams(window.location.search);
    const jurusanId = params.get('id');
    
    const contentContainer = document.getElementById('jurusan-detail-content');
    const loadingIndicator = document.getElementById('loading');

    if (!jurusanId) {
        contentContainer.innerHTML = `<p class="text-center text-red-500">ID Jurusan tidak ditemukan.</p>`;
        return;
    }

    // 2. Ambil data dari JSON
    async function fetchJurusanDetail() {
        try {
            // PERBAIKAN: Path dibuat relatif dari file HTML, bukan dari file JS
            const response = await fetch('./data/data.json'); 
            if (!response.ok) throw new Error('Data tidak bisa dimuat.');
            const data = await response.json();
            
            // 3. Cari jurusan yang cocok dengan ID
            const jurusan = data.jurusan.find(j => j.id === jurusanId);

            if (jurusan) {
                // 4. Tampilkan data ke halaman
                renderJurusan(jurusan);
            } else {
                contentContainer.innerHTML = `<p class="text-center text-red-500">Jurusan dengan ID "${jurusanId}" tidak ditemukan.</p>`;
            }
        } catch (error) {
            console.error('Error fetching jurusan detail:', error);
            contentContainer.innerHTML = `<p class="text-center text-red-500">Terjadi kesalahan saat memuat data. Pastikan Anda menjalankan website ini menggunakan Live Server.</p>`;
        } finally {
            // Hilangkan tulisan "loading"
            if(loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
        }
    }

    function renderJurusan(jurusan) {
        // Ganti judul halaman sesuai nama jurusan
        document.title = `${jurusan.nama} - SMKN 1 Dlanggu`;

        // Buat HTML untuk ditampilkan
        contentContainer.innerHTML = `
            <section class="relative h-[40vh] rounded-lg overflow-hidden" data-aos="fade-in">
                <img src="${jurusan.detail.gambar_utama}" alt="Hero image for ${jurusan.nama}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-brand-purple/60"></div>
                <div class="absolute inset-0 flex items-center justify-center text-center text-white p-6">
                    <div>
                        <span class="text-lg">Kompetensi Keahlian</span>
                        <h1 class="text-4xl md:text-6xl font-poppins font-bold mt-2">${jurusan.nama}</h1>
                    </div>
                </div>
            </section>

            <section class="mt-16" data-aos="fade-up">
                <h2 class="text-3xl font-bold font-poppins text-gray-900">Tentang Jurusan</h2>
                <p class="mt-4 text-lg text-gray-700 leading-relaxed">${jurusan.detail.deskripsi_panjang}</p>
            </section>

            <section class="mt-16 grid md:grid-cols-2 gap-12">
                <div data-aos="fade-right" data-aos-delay="200">
                    <h3 class="text-2xl font-bold font-poppins text-gray-900 mb-4">💼 Prospek Karir</h3>
                    <ul class="space-y-3">
                        ${jurusan.detail.prospek_karir.map(item => `
                            <li class="flex items-start">
                                <span class="text-green-500 mr-3 mt-1">✔</span>
                                <span>${item}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <div data-aos="fade-left" data-aos-delay="400">
                    <h3 class="text-2xl font-bold font-poppins text-gray-900 mb-4">📚 Apa yang Dipelajari</h3>
                     <ul class="space-y-3">
                        ${jurusan.detail.apa_yang_dipelajari.map(item => `
                            <li class="flex items-start">
                                <span class="text-brand-purple mr-3 mt-1">✔</span>
                                <span>${item}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </section>
        `;
    }

    fetchJurusanDetail();
});