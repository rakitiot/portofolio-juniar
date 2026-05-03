# Circuit Core Portfolio

Portfolio statis bertema electrical engineering + web development.

## Cara buka

Jalankan lewat dev server Vite agar script module, canvas 3D, dan aset lokal terbaca stabil.

## Cara run dengan npm

Install dependency satu kali:

```bash
npm install
```

Jalankan dev server:

```bash
npm run dev
```

Buka URL yang muncul di terminal, biasanya `http://127.0.0.1:5173/`.

## Cara update konten

Edit `src/content.js` untuk mengganti:

- nama, status, kontak, dan link sosial
- daftar project unggulan
- lab feed / eksperimen
- skill cluster
- proses kerja

Layout, filter project, command palette, dan scene 3D akan mengambil data dari file itu otomatis.

## Foto dan dokumen lokal

Taruh aset lokal di folder ini:

- `public/assets/images/profile/` untuk foto profil
- `public/assets/images/projects/` untuk thumbnail project
- `public/assets/images/lab/` untuk foto eksperimen
- `public/assets/images/tools/` untuk logo software/tool di sphere 3D hero
- `public/assets/docs/` untuk CV atau dokumen PDF

Contoh path di `src/content.js`:

```js
image: "assets/images/projects/smart-energy-monitor.jpg"
```

Untuk mengganti logo tool, replace file di `public/assets/images/tools/` atau ubah path pada array `tools` di `src/content.js`.

## File utama

- `index.html` - struktur halaman
- `styles.css` - visual, layout, responsive, dan motion
- `src/content.js` - data portofolio
- `src/main.js` - render konten, filter, command palette, dan Three.js core module

## catatan pengembangan
- buat opsi bahasa
- layout di projek di buat horizontal gulir saja dan tampilkan ringkas saja, namun jika di klik akan menampilkan case studynya bro dan semua foto dapat di lihat serta geser
- buat lebih minimalis lagi
- hapus lab yang bisa di coba atau apa itu bro
- hapus 3d intervace lab, pcb prototype board, control room dashboard
hapus tulisan rakit dari kebutuhann
ga perlu ada bagian gambar 1 
batalkan gambar rakit iot di foto saya
tentang sayanya gausah pake kota lagi bro buat nyatu aja sama bacground 
buminya masih hilang keika di scroll, dan udah ga gerak otomatis lagi, perbaiki
gambar ke 2 itu yang aku maksud belum full dan bumi hilang di sini
begitu pula selanjutnya