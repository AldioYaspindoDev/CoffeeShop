# Prompt Instruksi — Membuat Website KopKit Fully Responsive (Terasa Seperti Aplikasi Android)

> Dokumen ini adalah **prompt siap pakai** untuk diberikan ke AI Agent (desain/dev) agar website KopKit (Homepage, Menu, About) bisa diakses dengan mulus di semua ukuran layar — dan khususnya terasa senyaman aplikasi Android native saat dibuka dari HP.

---

## PROMPT UNTUK AI AGENT

```
Kamu adalah AI Agent yang bertugas membuat website KopKit menjadi fully responsive
di semua perangkat (mobile, tablet, desktop), dengan prioritas utama pengalaman di
HP Android — seolah-olah website ini memang dibangun khusus sebagai aplikasi Android,
bukan sekadar "website yang menyempit".

Ikuti seluruh aturan di bawah ini secara konsisten pada SEMUA halaman
(Homepage, Menu, About) dan JANGAN mengubah palet warna, tipografi, atau gaya
ilustrasi yang sudah ditetapkan di MENU.md — tugasmu murni membuat layout tersebut
adaptif, cepat, dan terasa native di semua ukuran layar.
```

Gunakan bagian 1–8 di bawah sebagai detail instruksi yang menyertai prompt di atas.

---

## 1. Prinsip Utama

1. **Mobile-first, bukan desktop-yang-diciutkan.** Rancang dulu dari layar terkecil (360px), baru diperluas ke tablet & desktop.
2. **Terasa seperti aplikasi, bukan halaman web.** Tidak ada elemen yang terpotong, overflow horizontal, teks kepencet, atau tombol yang sulit ditekan jari.
3. **Konsisten di semua device**, bukan cuma "muat" — tapi proporsi, jarak, dan hierarki visual harus tetap enak dilihat di semua ukuran layar (HP kecil, HP besar, tablet, laptop, monitor lebar).
4. **Satu codebase, satu pengalaman** — bukan versi desktop dan versi mobile yang terpisah, tapi satu layout yang beradaptasi secara fluid.

---

## 2. Breakpoints Wajib

| Breakpoint | Lebar | Target perangkat |
|---|---|---|
| `xs` | 360px – 479px | HP kecil/lama |
| `sm` | 480px – 767px | HP standar/besar |
| `md` | 768px – 1023px | Tablet portrait |
| `lg` | 1024px – 1279px | Tablet landscape / laptop kecil |
| `xl` | ≥ 1280px | Desktop/monitor lebar |

Gunakan pendekatan **fluid/relative units** (`%`, `rem`, `clamp()`, `minmax()`) dibanding nilai piksel tetap, supaya transisi antar breakpoint mulus, bukan patah-patah.

---

## 3. Adaptasi Komponen per Section (Homepage sebagai acuan, berlaku juga untuk Menu & About)

### Navbar
- **Desktop:** pill navbar horizontal seperti desain asli (home, menu, about, Contact).
- **Mobile (< 768px):** ubah jadi salah satu dari dua pola app-like:
  - **Opsi A (disarankan):** top bar ramping (logo kiri + hamburger icon kanan) yang membuka menu full-screen/slide-in saat ditekan.
  - **Opsi B:** bottom navigation bar tetap (fixed) dengan ikon Home / Menu / About / Contact — pola ini paling terasa "seperti aplikasi Android".
- Tombol/menu minimal **44x44px** area sentuh (standar touch target Android/iOS).
- Navbar harus **sticky/fixed** saat scroll agar navigasi selalu terjangkau ibu jari.

### Hero Section
- Desktop: teks kiri + ilustrasi kanan (side-by-side).
- Mobile: **stack vertikal** — teks & CTA dulu di atas, ilustrasi di bawah teks (atau jadi elemen dekoratif belakang, jangan mendorong CTA ke bawah layar/off-screen).
- Judul besar "KOPKIT" harus pakai `clamp()` font-size supaya tidak overflow di layar sempit tapi tetap terasa "besar & berani" di semua ukuran.
- Tombol "Lihat Menu" full-width atau minimal 48px tinggi di mobile agar mudah ditekan.

### Card Grid (Spesial Menu / Menu Kategori / Take Us With You)
- Desktop: grid 3 kolom.
- Tablet (`md`): grid 2 kolom.
- Mobile (`sm` ke bawah): 
  - **1 kolom stack**, atau
  - **Horizontal scroll snap carousel** (disarankan untuk area "Spesial Menu Kita" agar terasa seperti carousel promo di aplikasi e-commerce/aplikasi kopi Android) — pakai `scroll-snap-type: x mandatory` dengan card lebar ~85% viewport supaya terlihat sedikit card berikutnya (memberi affordance bahwa bisa di-swipe).

### Gallery Kita (grid 2x3)
- Desktop: grid 3 kolom x 2 baris.
- Mobile: grid 2 kolom (foto tetap terlihat rapi, tidak jadi 1 kolom panjang yang bikin scroll kepanjangan), atau horizontal scroll carousel seperti card promo.

### Peta Lokasi + Daftar Alamat
- Desktop: peta besar di atas, list alamat di bawah dalam grid/rows lebar.
- Mobile: 
  - Peta full-width, tinggi disesuaikan (jangan terlalu pendek sampai pin susah dibaca, jangan terlalu panjang sampai mendominasi layar — idealnya ~250–320px tinggi).
  - List alamat jadi **accordion/collapsible per cabang** (tap nama cabang untuk expand alamat) agar halaman tidak terlalu panjang di HP — pola ini umum di aplikasi native.

### CTA Banner ("Tunggu Apa Lagi Ayo!")
- Tetap full-width rounded di semua ukuran, tapi padding & ukuran font mengecil proporsional di mobile; tombol CTA full-width di dalam banner pada layar < 480px.

### Footer
- Desktop: 4 kolom sejajar.
- Mobile: kolom disusun **accordion collapsible** (Lokasi, Menu, Kontak masing-masing bisa di-expand/collapse) supaya footer tidak jadi scroll panjang yang melelahkan — atau minimal stack vertikal dengan spacing rapi dan ukuran font tetap terbaca (≥14px).

---

## 4. Tipografi Responsif

- Gunakan `clamp(min, preferred, max)` untuk semua ukuran heading besar, contoh pendekatan:
  - Judul brand (KOPKIT): `clamp(2.5rem, 8vw, 5rem)`
  - Judul section: `clamp(1.5rem, 5vw, 2.25rem)`
  - Body text: minimal `16px` di mobile (di bawah itu terasa seperti web biasa, bukan app-quality) — jangan pernah di bawah 14px untuk teks penting.
- Line-height lebih longgar di mobile (1.5–1.6) supaya nyaman dibaca dengan jarak baca HP yang lebih dekat ke mata.

---

## 5. Interaksi & Rasa "Native App"

1. **Touch target minimal 44x44px** untuk semua tombol, ikon, tab, dan link yang bisa ditekan.
2. **Jarak antar elemen interaktif minimal 8px** supaya tidak salah tekan (mis. antar tab kategori Menu).
3. **Smooth scroll & scroll-snap** untuk carousel (card promo, gallery) — hindari scroll patah-patah.
4. **Transisi/animasi halus** (200–300ms ease) saat membuka menu hamburger, accordion footer, expand alamat cabang — beri kesan responsif seperti native app, bukan halaman statis.
5. **Feedback visual saat ditekan** (active/pressed state: sedikit scale-down atau opacity berubah) pada semua tombol & card, mirip ripple effect Android.
6. **Sticky bottom CTA** opsional di halaman Menu (mis. tombol "Pesan Sekarang" tetap muncul di bawah layar saat scroll) — pola umum aplikasi F&B Android.
7. **Hindari hover-only interaction** — semua fungsi yang di desktop pakai `:hover` harus punya alternatif tap/klik yang jelas di mobile (karena HP tidak punya hover).

---

## 6. Performa & "Terasa Cepat Diakses Kapan Saja, Dimana Saja"

1. **Lazy-load semua gambar** (foto produk, gallery, ilustrasi besar) — gunakan `loading="lazy"` dan format gambar modern (WebP/AVIF) dengan fallback.
2. **Skeleton loading / placeholder blur** saat gambar/peta belum termuat, bukan area kosong putih tiba-tiba muncul — supaya terasa smooth seperti aplikasi.
3. **Optimasi peta lokasi**: jangan load peta interaktif penuh langsung saat halaman dibuka jika berat; pertimbangkan static map image yang berubah jadi interaktif saat di-tap (menghemat data & mempercepat load di koneksi lambat — penting karena target "bisa diakses kapan saja dimana saja").
4. **Font-loading strategy**: gunakan `font-display: swap` supaya teks tetap terbaca saat font custom masih dimuat.
5. **Test di kondisi koneksi lambat (3G/4G throttled)** — pastikan first meaningful paint tetap cepat.

---

## 7. Perlakuan Khusus "Seperti Aplikasi Android" (PWA-ready)

Tambahkan elemen berikut supaya saat dibuka dari HP Android (terutama jika di-"Add to Home Screen"), pengalamannya benar-benar terasa seperti aplikasi:

1. **Meta viewport wajib benar:**
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
   ```
2. **Web App Manifest** (`manifest.json`) — nama app "KopKit", ikon berbagai ukuran (192px, 512px), `theme_color` = `#1E1E1E` (senada palet dark), `background_color` = `#FFF5E9`, `display: "standalone"` (supaya saat dibuka dari homescreen, tampilan tanpa address bar browser — full seperti app).
3. **Safe-area-inset support** untuk HP dengan notch/punch-hole:
   ```css
   padding-top: env(safe-area-inset-top);
   padding-bottom: env(safe-area-inset-bottom);
   ```
4. **Favicon & app icon** menggunakan logo KopKit dengan padding aman (maskable icon) agar tidak terpotong saat jadi ikon aplikasi di Android.
5. **Theme color bar** (`<meta name="theme-color" content="#1E1E1E">`) supaya status bar Android menyatu dengan warna brand.
6. **Optional tapi disarankan:** Service worker sederhana untuk basic caching, supaya halaman yang sudah pernah dibuka tetap bisa diakses walau sinyal lemah — mendukung tujuan "bisa diakses kapan saja dimana saja".

---

## 8. Checklist Uji Responsivitas (wajib dicek sebelum dianggap selesai)

- [ ] Tidak ada scroll horizontal tak disengaja di layar manapun (360px – 1920px+)
- [ ] Semua tombol & link punya area sentuh ≥ 44x44px
- [ ] Navbar berubah jadi hamburger/bottom-nav dengan benar di bawah 768px
- [ ] Card grid beradaptasi: 3 kolom (desktop) → 2 kolom (tablet) → 1 kolom/carousel (mobile)
- [ ] Semua gambar lazy-load & punya placeholder saat memuat
- [ ] Teks tetap terbaca (≥14px) dan tidak overflow di layar 360px
- [ ] Semua elemen interaktif punya feedback saat ditekan (pressed state)
- [ ] Diuji di minimal: 360px, 390px, 768px, 1024px, 1440px
- [ ] Diuji di Chrome Android asli (bukan cuma resize browser desktop)
- [ ] `manifest.json` + meta viewport + theme-color sudah terpasang dan valid
- [ ] Saat "Add to Home Screen" di Android, tampilan terbuka tanpa address bar (standalone mode)
- [ ] Tidak ada elemen yang tertutup notch/status bar di HP layar penuh
- [ ] Palet warna, tipografi, dan gaya ilustrasi dari MENU.md tetap konsisten di semua breakpoint
- [ ] Palet warna, tipografi, dan gaya ilustrasi dari MENU.md tetap konsisten di npx prisma migrate dev --name init

