# PROMPT: Build High-Conversion Landing Page — Undangan Digital (Next.js)

## CONTEXT
Kamu adalah expert frontend developer dan conversion rate optimizer. Tugasmu adalah membangun landing page bisnis undangan digital online yang high-conversion menggunakan Next.js 14 (App Router) dengan Tailwind CSS.

Nama bisnis: BikinUndangan.net (atau sesuaikan)
Target audiens: Pasangan yang akan menikah, panitia acara, keluarga yang ingin membuat undangan digital praktis dan murah.

---

## STACK
- Next.js (App Router)
- Tailwind CSS
- Framer Motion (untuk animasi scroll & entrance)
- Lucide React (icons)
- next/image untuk optimasi gambar
- next/font untuk Google Fonts
- Diperbolehkan menggunakan UI library seperti shadcn

---

## DESAIN & ESTETIKA
Kamu memiliki kebebasan penuh dalam menentukan palet warna, tipografi, dan arah visual. Namun wajib memenuhi kriteria berikut:

- Gaya: Modern, clean, premium — hindari kesan murahan atau terlalu ramai
- Tipografi: Gunakan kombinasi font serif elegan untuk heading dan sans-serif bersih untuk body
- Warna: Pilih palet yang kohesif dan sesuai niche pernikahan — bisa warm neutral, dusty rose, sage green, champagne, deep navy, atau kombinasi apapun yang terasa mewah dan romantis. Tidak ada warna yang ditetapkan — pilih yang terbaik menurutmu sebagai desainer
- Visual atmosphere: Tambahkan subtle floral/botanical SVG ornament, texture halus, atau decorative element yang memperkuat kesan wedding/pernikahan
- Estetika keseluruhan harus terasa seperti brand premium, bukan template gratisan
- Gunakan whitespace secara strategis untuk kesan bersih dan elegan
- Setiap section harus punya visual rhythm dan hierarchy yang jelas

---

## PENGGUNAAN GAMBAR
Kamu diperbolehkan dan dianjurkan menggunakan gambar untuk memperkuat kualitas visual landing page. Ketentuan:

- Gunakan gambar dari sumber free-to-use seperti Unsplash (unsplash.com), Pexels (pexels.com), atau Pixabay (pixabay.com)
- Cari dan gunakan gambar yang relevan dengan tema pernikahan, seperti: foto pasangan, bunga, dekorasi wedding, venue, cincin, dsb
- Implementasikan via next/image dengan URL langsung dari sumber gambar (gunakan domain yang sudah diizinkan di next.config.js)
- Tambahkan konfigurasi domain gambar di next.config.js:
  images: {
    domains: ['images.unsplash.com', 'images.pexels.com', 'cdn.pixabay.com']
  }
- Gunakan gambar untuk memperkaya: hero section background atau illustration, testimoni avatar (foto pasangan nyata dari Unsplash), preview mockup undangan, section background dekoratif
- Setiap gambar wajib punya alt text yang deskriptif
- Gunakan gambar berkualitas tinggi dan pastikan aspek rasio sesuai konteks penggunaannya
- Untuk placeholder atau thumbnail template undangan, gunakan gambar wedding aesthetic dari Unsplash dengan query seperti: "wedding invitation", "wedding aesthetic", "floral wedding", "elegant wedding"
- Jangan gunakan gambar yang terlihat stock photo generik — pilih yang natural, cinematic, dan on-brand

---

## STRUKTUR HALAMAN (urutan section, WAJIB semua ada)

### 1. NAVBAR
- Logo kiri (gunakan font serif + icon cincin atau bunga kecil)
- Nav links: Fitur | Harga | Testimoni | FAQ
- CTA button kanan: "Buat Undangan Sekarang"
- Sticky navbar dengan backdrop blur saat scroll
- Navbar transparan di top, solid saat scroll

### 2. HERO SECTION
Headline utama (H1, besar, serif):
"Undangan Digital Elegan,
Harga Mulai 49 Ribu"

Sub-headline:
"Buat undangan pernikahan online dalam 5 menit. Tanpa ribet, tanpa desainer, langsung bisa dibagikan via WhatsApp."

- 2 CTA button: "Buat Sekarang — Mulai 49rb" (primary) + "Lihat Contoh Undangan" (secondary/ghost)
- Social proof bar di bawah CTA: 4.9/5 dari 2.000+ pasangan | 10.000+ undangan dibuat | Proses 5 menit
- Urgency badge: "Sudah 2.347 undangan dibuat bulan ini"
- Background dengan foto wedding aesthetic dari Unsplash sebagai hero image, overlay gradient lembut agar teks tetap terbaca, ditambah subtle floral ornament SVG di pojok

### 3. HOW IT WORKS (3 langkah)
Judul: "Semudah 1-2-3"

Step 1 | Pilih Paket | Pilih paket sesuai kebutuhanmu, mulai dari yang paling simpel
Step 2 | Isi Data Undangan | Nama, tanggal, lokasi, foto — semua diisi lewat form mudah
Step 3 | Bagikan via WhatsApp | Langsung dapat link undangan, tinggal copy-paste ke grup

Tampilkan sebagai card horizontal dengan connector/line antar step, bukan list biasa.

### 4. FITUR UNGGULAN (Feature Grid)
Judul: "Semua yang Kamu Butuhkan, Ada di Sini"

Tampilkan sebagai card grid 3x4, tiap card punya icon, judul, dan deskripsi singkat:

- Desain Profesional & Elegan — 30+ template pilihan, semua mobile-friendly dan indah
- RSVP Online Otomatis — Tamu konfirmasi kehadiran langsung dari undangan
- Amplop Digital / Gift Registry — Terima angpao digital langsung ke rekeningmu
- Musik Latar Romantis — Undangan berputar otomatis dengan lagu pilihanmu
- Google Maps Terintegrasi — Lokasi akad & resepsi langsung bisa diklik tamu
- Countdown Timer — Hitung mundur hari spesialmu secara real-time
- Galeri Foto Prewedding — Upload foto kenangan bersama pasangan
- Buku Tamu Digital — Tamu bisa kirim ucapan & doa langsung di undangan
- Multi Sesi Acara — Bisa tambah jadwal akad, resepsi, pengajian dalam 1 link
- Link Undangan Kustom — Misal: bikinundangan.net/rizki-dan-ayu
- Privasi Password — Proteksi undangan dengan password agar lebih eksklusif
- Statistik Pengunjung — Lihat berapa orang sudah buka undanganmu

### 5. PRICING SECTION (PALING PENTING)
Judul: "Pilih Paket Sesuai Kebutuhanmu"
Sub: "Harga terjangkau, kualitas premium. Tidak ada biaya tersembunyi."

Trust badges di atas card: Pembayaran Aman | Proses 5 Menit | Garansi Revisi

Buat 3 pricing card dalam layout horizontal:

PAKET BASIC — Rp49.000
- Link undangan standar
- Template basic
- Detail acara akad/resepsi
- Google Maps
- Galeri foto maksimal 5 foto
- Musik background
- Masa aktif 3 bulan

PAKET STANDARD — Rp99.000 — [badge: PALING POPULER — tampilkan secara visual berbeda, lebih besar, elevated]
- Semua fitur Basic
- Pilihan template premium
- RSVP konfirmasi kehadiran
- Buku tamu digital
- Galeri foto maksimal 10 foto
- Story/couple journey
- Countdown acara
- Masa aktif 6 bulan

PAKET PREMIUM — Rp199.000
- Semua fitur Standard
- Link personal / subdomain
- Amplop digital
- Galeri foto maksimal 20 foto
- Video prewedding embed
- Bebas watermark
- Prioritas pengerjaan
- Masa aktif 12 bulan

Add-ons section di bawah card:
- Custom domain: +Rp100.000
- Extra fast delivery: +Rp25.000
- Tambah galeri foto: +Rp15.000
- Custom design request: mulai +Rp150.000

### 6. TESTIMONI / SOCIAL PROOF
Judul: "Ribuan Pasangan Sudah Mempercayai Kami"

Tampilkan 6 testimoni dalam masonry grid layout. Gunakan foto pasangan dari Unsplash (query: "couple portrait", "wedding couple", "indonesian couple") sebagai avatar testimoni agar terasa lebih nyata dan personal:

Rina & Fajar, Bandung — bintang 5
"Prosesnya super gampang! Dalam 10 menit udah jadi dan langsung bisa kirim ke grup. Tamu-tamu pada tanya beli di mana undangannya hehe"

Dewi & Arman, Surabaya — bintang 5
"Paket premium worth banget! RSVP-nya memudahkan kami rekap siapa yang hadir. Ga perlu repot WhatsApp satu-satu lagi."

Sarah & Budi, Jakarta — bintang 5
"Design-nya cantik banget, banyak yang kira undangannya mahal. Padahal cuma 99 ribu. Recommended!"

Lina & Hendra, Semarang — bintang 5
"Amplop digitalnya keren! Tamu dari luar kota tetap bisa kasih hadiah. Praktis banget."

Mia & Reza, Yogyakarta — bintang 5
"Pelayanannya responsif, ada yang perlu diubah langsung dibantu. Musiknya bikin terharu pas dibuka."

Fitri & Doni, Medan — bintang 5
"Sudah rekomendasiin ke 3 teman yang mau nikah. Harganya murah tapi kualitasnya ga murahan sama sekali!"

### 7. FAQ SECTION
Judul: "Pertanyaan yang Sering Ditanya"
Implementasi sebagai accordion (expand/collapse) dengan animasi smooth:

1. Berapa lama proses pembuatan undangannya?
   Setelah pembayaran dan data terisi lengkap, undangan siap dalam 5 Menit!

2. Apakah link undangan bisa dikustomisasi?
   Ya! Di paket Premium, kamu bisa pilih nama sendiri. Contoh: bikinundangan.net/rizki-ayu

3. Bagaimana cara pembayarannya?
   Transfer bank, GoPay, OVO, QRIS, atau Shopee Pay. Semua tersedia.

4. Apakah bisa direvisi setelah jadi?
   Bisa! Basic 1x revisi gratis, Standard 2x, Premium 3x revisi.

5. Apakah undangan bisa dibuka di HP dan laptop?
   Ya, semua template kami 100% mobile-responsive dan tampil sempurna di semua perangkat.

6. Apa bedanya dengan undangan fisik?
   Lebih hemat, ramah lingkungan, langsung bisa dibagikan via WhatsApp/sosmed, dan tamu bisa RSVP tanpa repot.

### 8. CTA SECTION (Final Push)
Background dengan foto wedding dari Unsplash + overlay gradient dramatis dan decorative ornament

Headline: "Mulai Buat Undanganmu Sekarang"
Sub: "Ribuan pasangan sudah membuat kenangan indah bersama kami. Giliranmu!"

CTA Button besar: "Buat Undangan Sekarang — Mulai 49rb"
Di bawah tombol: Pembayaran aman | Proses cepat | Support via WhatsApp

### 9. FOOTER
- Logo + tagline singkat
- Links: Beranda | Fitur | Harga | Contoh Undangan | FAQ | Kontak
- Sosmed icons (Instagram, TikTok, WhatsApp)
- Copyright 2025 BikinUndangan.net
- "Dibuat dengan cinta untuk pasangan Indonesia"

---

## CONVERSION OPTIMIZATION — WAJIB SEMUA DIIMPLEMENTASIKAN
1. Sticky CTA bar di mobile (fixed bottom dengan tombol "Buat Sekarang")
2. WhatsApp floating button di pojok kanan bawah
3. Paket Standard tampil elevated/highlighted secara jelas dibanding dua paket lain
4. Urgency element di hero section
5. Trust badges di dekat pricing section
6. Scroll-triggered animations dengan Framer Motion (fadeInUp, staggerChildren)
7. Active nav highlight berdasarkan scroll position via Intersection Observer
8. Semua tombol CTA wajib menyebutkan harga atau nilai — contoh: "Mulai 49rb"

---

## TECHNICAL REQUIREMENTS
- TypeScript strict mode
- Semua section punya id untuk smooth scroll navigation
- next/image untuk semua gambar dengan konfigurasi domain eksternal di next.config.js
- Konfigurasi next.config.js wajib include:
  images: {
    domains: ['images.unsplash.com', 'images.pexels.com', 'cdn.pixabay.com']
  }
- Metadata SEO lengkap di layout.tsx:
  title: "Undangan Digital Pernikahan Online | Mulai 49rb — BikinUndangan.net"
  description: "Buat undangan pernikahan digital elegan dalam 5 menit. RSVP online, amplop digital, desain cantik. Harga mulai 49 ribu. Sudah dipercaya 10.000+ pasangan."
- Open Graph tags, robots meta, canonical URL
- Google Fonts via next/font/google
- Mobile-first responsive dengan breakpoint sm/md/lg

---

## OUTPUT YANG DIHARAPKAN
1. Struktur folder Next.js lengkap
2. app/page.tsx — halaman utama dengan semua section
3. Component terpisah per section di folder components/
4. tailwind.config.ts dengan custom colors dan fonts
5. app/layout.tsx dengan metadata SEO lengkap
6. next.config.js dengan konfigurasi domain gambar eksternal
7. Instruksi singkat cara run dev

Prioritas eksekusi: visual impact dan estetika dulu → conversion elements → clean code.