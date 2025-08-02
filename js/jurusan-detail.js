document.addEventListener("DOMContentLoaded", async function () {
  const container = document.getElementById("jurusan-detail-content");
  const loadingEl = document.getElementById("loading");

  const params = new URLSearchParams(window.location.search);
  const jurusanId = params.get("id");
  console.log("ID dari URL:", jurusanId);

  if (!jurusanId) {
    loadingEl.innerHTML = `<p class="text-red-500">ID jurusan tidak ditemukan di URL.</p>`;
    return;
  }

  try {
    const res = await fetch("data/data.json");
    if (!res.ok) throw new Error("Gagal fetch");

    const data = await res.json();
    console.log("DATA:", data);

    const jurusan = data.jurusan.find((j) => j.id === jurusanId);
    if (!jurusan) {
      loadingEl.innerHTML = `<p class="text-red-500">Jurusan tidak ditemukan.</p>`;
      return;
    }

    loadingEl.remove();

    container.innerHTML = `
      <div class="text-center mb-12">
        <h1 class="text-3xl md:text-4xl font-bold font-poppins text-gray-900 mb-4">${jurusan.nama}</h1>
        <p class="text-lg text-gray-700">${jurusan.detail.deskripsi_panjang}</p>
      </div>
      
      <div class="mb-10">
        <img src="${jurusan.detail.gambar_utama}" alt="${jurusan.nama}" class="rounded-lg shadow-md w-full max-h-[500px] object-cover">
      </div>

      <div class="grid md:grid-cols-2 gap-8">
        <div>
          <h2 class="text-2xl font-semibold mb-4 text-brand-purple">Apa yang Dipelajari</h2>
          <ul class="list-disc list-inside space-y-2 text-gray-700">
            ${jurusan.detail.apa_yang_dipelajari.map(item => `<li>${item}</li>`).join("")}
          </ul>
        </div>
        <div>
          <h2 class="text-2xl font-semibold mb-4 text-brand-purple">Prospek Karir</h2>
          <ul class="list-disc list-inside space-y-2 text-gray-700">
            ${jurusan.detail.prospek_karir.map(item => `<li>${item}</li>`).join("")}
          </ul>
        </div>
      </div>
    `;
  } catch (err) {
    console.error("Error saat mengambil data:", err);
    loadingEl.innerHTML = `<p class="text-red-500">Gagal memuat data jurusan.</p>`;
  }
});
