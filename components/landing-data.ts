import {
  CalendarHeart,
  CheckCircle2,
  Clock3,
  Gift,
  Globe2,
  HeartHandshake,
  ImagePlus,
  Images,
  LockKeyhole,
  MapPin,
  MessageCircleHeart,
  Music2,
  Palette,
  PenLine,
  Rocket,
  Send,
  ShieldCheck,
  Sparkles,
  Timer,
  UsersRound,
  Zap,
} from "lucide-react";

export const navItems = [
  { label: "Design", href: "#design" },
  { label: "Blog", href: "/blog" },
  { label: "Fitur", href: "#fitur" },
  { label: "Harga", href: "#harga" },
  { label: "Testimoni", href: "#testimoni" },
  { label: "FAQ", href: "#faq" },
];

export const steps = [
  {
    icon: Sparkles,
    title: "Pilih Paket",
    text: "Pilih paket sesuai kebutuhanmu, mulai dari yang paling simpel.",
  },
  {
    icon: PenLine,
    title: "Isi Data Undangan",
    text: "Nama, tanggal, lokasi, foto, semua diisi lewat form mudah.",
  },
  {
    icon: Rocket,
    title: "Bagikan via WhatsApp",
    text: "Langsung dapat link undangan, tinggal copy-paste ke grup.",
  },
];

export const features = [
  {
    icon: Sparkles,
    title: "Desain Profesional & Elegan",
    text: "30+ template pilihan, semua mobile-friendly dan indah.",
  },
  {
    icon: UsersRound,
    title: "RSVP Online Otomatis",
    text: "Tamu konfirmasi kehadiran langsung dari undangan.",
  },
  {
    icon: Gift,
    title: "Amplop Digital / Gift Registry",
    text: "Terima angpao digital langsung ke rekeningmu.",
  },
  {
    icon: Music2,
    title: "Musik Latar Romantis",
    text: "Undangan berputar otomatis dengan lagu pilihanmu.",
  },
  {
    icon: MapPin,
    title: "Google Maps Terintegrasi",
    text: "Lokasi akad dan resepsi langsung bisa diklik tamu.",
  },
  {
    icon: Timer,
    title: "Countdown Timer",
    text: "Hitung mundur hari spesialmu secara real-time.",
  },
  {
    icon: Images,
    title: "Galeri Foto Prewedding",
    text: "Upload foto kenangan bersama pasangan.",
  },
  {
    icon: MessageCircleHeart,
    title: "Buku Tamu Digital",
    text: "Tamu bisa kirim ucapan dan doa langsung di undangan.",
  },
  {
    icon: CalendarHeart,
    title: "Multi Sesi Acara",
    text: "Tambah jadwal akad, resepsi, pengajian dalam 1 link.",
  },
  {
    icon: Send,
    title: "Link Undangan Kustom",
    text: "Misal: bikinundangan.net/rizki-dan-ayu.",
  },
  {
    icon: LockKeyhole,
    title: "Privasi Password",
    text: "Proteksi undangan dengan password agar lebih eksklusif.",
  },
  {
    icon: Clock3,
    title: "Statistik Pengunjung",
    text: "Lihat berapa orang sudah buka undanganmu.",
  },
];

export const packages = [
  {
    name: "Basic",
    price: "Rp49.000",
    note: "Untuk undangan digital simpel.",
    cta: "Mulai Basic 49rb",
    benefits: [
      "Link undangan standar",
      "Template basic",
      "Detail acara akad/resepsi",
      "Google Maps",
      "Galeri foto maksimal 5 foto",
      "Musik background",
      "Masa aktif 3 bulan",
    ],
  },
  {
    name: "Standard",
    price: "Rp99.000",
    note: "Pilihan favorit untuk mayoritas pasangan.",
    cta: "Pilih Standard 99rb",
    popular: true,
    benefits: [
      "Semua fitur Basic",
      "Pilihan template premium",
      "RSVP konfirmasi kehadiran",
      "Buku tamu digital",
      "Galeri foto maksimal 10 foto",
      "Story/couple journey",
      "Countdown acara",
      "Masa aktif 6 bulan",
    ],
  },
  {
    name: "Premium",
    price: "Rp199.000",
    note: "Pengalaman undangan lengkap.",
    cta: "Ambil Premium 199rb",
    benefits: [
      "Semua fitur Standard",
      "Link personal / subdomain",
      "Amplop digital",
      "Galeri foto maksimal 20 foto",
      "Video prewedding embed",
      "Bebas watermark",
      "Prioritas pengerjaan",
      "Masa aktif 12 bulan",
    ],
  },
];

export const addOns = [
  {
    icon: Globe2,
    title: "Custom domain",
    price: "+Rp100.000",
    text: "Gunakan domain pribadi untuk link undangan.",
  },
  {
    icon: Zap,
    title: "Extra fast delivery",
    price: "+Rp25.000",
    text: "Prioritas pengerjaan untuk kebutuhan mendesak.",
  },
  {
    icon: ImagePlus,
    title: "Tambah galeri foto",
    price: "+Rp15.000",
    text: "Tambahkan slot foto ekstra di galeri undangan.",
  },
  {
    icon: Palette,
    title: "Custom design request",
    price: "Mulai +Rp150.000",
    text: "Request penyesuaian visual sesuai tema acara.",
  },
];

export const invitationDesigns = [
  {
    slug: "classic-rose",
    name: "Classic Rose",
    theme: "Romantic floral",
    image: "/images/designs/classic-rose.png",
    alt: "Template undangan digital Classic Rose dalam mockup handphone",
    priceLabel: "Mulai 49rb",
    background:
      "linear-gradient(145deg, rgba(255, 225, 229, 0.95), rgba(255, 248, 238, 0.72))",
  },
  {
    slug: "modern-minimal",
    name: "Modern Minimal",
    theme: "Clean editorial",
    image: "/images/designs/modern-minimal.png",
    alt: "Template undangan digital Modern Minimal dalam mockup handphone",
    priceLabel: "Mulai 49rb",
    background:
      "linear-gradient(145deg, rgba(255, 255, 255, 0.98), rgba(224, 218, 207, 0.62))",
  },
  {
    slug: "garden-sage",
    name: "Garden Sage",
    theme: "Botanical green",
    image: "/images/designs/garden-sage.png",
    alt: "Template undangan digital Garden Sage dalam mockup handphone",
    priceLabel: "Mulai 99rb",
    background:
      "linear-gradient(145deg, rgba(218, 234, 210, 0.98), rgba(242, 248, 234, 0.68))",
  },
  {
    slug: "luxury-maroon",
    name: "Luxury Maroon",
    theme: "Maroon gold",
    image: "/images/designs/luxury-maroon.png",
    alt: "Template undangan digital Luxury Maroon dalam mockup handphone",
    priceLabel: "Mulai 99rb",
    background:
      "linear-gradient(145deg, rgba(157, 43, 63, 0.95), rgba(250, 222, 190, 0.72))",
  },
  {
    slug: "islamic-elegant",
    name: "Islamic Elegant",
    theme: "Navy gold",
    image: "/images/designs/islamic-elegant.png",
    alt: "Template undangan digital Islamic Elegant dalam mockup handphone",
    priceLabel: "Mulai 99rb",
    background:
      "linear-gradient(145deg, rgba(16, 38, 54, 0.96), rgba(58, 106, 105, 0.7))",
  },
  {
    slug: "rustic-cream",
    name: "Rustic Cream",
    theme: "Terracotta rustic",
    image: "/images/designs/rustic-cream.png",
    alt: "Template undangan digital Rustic Cream dalam mockup handphone",
    priceLabel: "Mulai 49rb",
    background:
      "linear-gradient(145deg, rgba(197, 106, 72, 0.82), rgba(245, 221, 184, 0.7))",
  },
  {
    slug: "pastel-floral",
    name: "Pastel Floral",
    theme: "Lilac peach",
    image: "/images/designs/pastel-floral.png",
    alt: "Template undangan digital Pastel Floral dalam mockup handphone",
    priceLabel: "Mulai 99rb",
    background:
      "linear-gradient(145deg, rgba(221, 204, 255, 0.96), rgba(255, 196, 178, 0.76))",
  },
  {
    slug: "gold-premium",
    name: "Gold Premium",
    theme: "Black gold",
    image: "/images/designs/gold-premium.png",
    alt: "Template undangan digital Gold Premium dalam mockup handphone",
    priceLabel: "Mulai 199rb",
    background:
      "linear-gradient(145deg, rgba(12, 12, 13, 0.98), rgba(166, 120, 45, 0.72))",
  },
];

export const testimonials = [
  {
    name: "Rina & Fajar",
    city: "Bandung",
    text: "Prosesnya super gampang! Dalam 10 menit udah jadi dan langsung bisa kirim ke grup. Tamu-tamu pada tanya beli di mana undangannya hehe.",
  },
  {
    name: "Dewi & Arman",
    city: "Surabaya",
    text: "Paket premium worth banget! RSVP-nya memudahkan kami rekap siapa yang hadir. Ga perlu repot WhatsApp satu-satu lagi.",
  },
  {
    name: "Sarah & Budi",
    city: "Jakarta",
    text: "Design-nya cantik banget, banyak yang kira undangannya mahal. Padahal cuma 99 ribu. Recommended!",
  },
  {
    name: "Lina & Hendra",
    city: "Semarang",
    text: "Amplop digitalnya keren! Tamu dari luar kota tetap bisa kasih hadiah. Praktis banget.",
  },
  {
    name: "Mia & Reza",
    city: "Yogyakarta",
    text: "Pelayanannya responsif, ada yang perlu diubah langsung dibantu. Musiknya bikin terharu pas dibuka.",
  },
  {
    name: "Fitri & Doni",
    city: "Medan",
    text: "Sudah rekomendasiin ke 3 teman yang mau nikah. Harganya murah tapi kualitasnya ga murahan sama sekali!",
  },
];

export const faqs = [
  {
    question: "Berapa lama proses pembuatan undangannya?",
    answer:
      "Setelah pembayaran dan data terisi lengkap, undangan siap dalam 5 menit!",
  },
  {
    question: "Apakah link undangan bisa dikustomisasi?",
    answer:
      "Ya! Di paket Premium dan Eksklusif, kamu bisa pilih nama sendiri. Contoh: bikinundangan.net/rizki-ayu.",
  },
  {
    question: "Bagaimana cara pembayarannya?",
    answer:
      "Transfer bank, GoPay, OVO, QRIS, atau Shopee Pay. Semua tersedia.",
  },
  {
    question: "Apakah bisa direvisi setelah jadi?",
    answer:
      "Bisa! Basic 1x revisi gratis, Premium 2x, Eksklusif 3x revisi.",
  },
  {
    question: "Apakah undangan bisa dibuka di HP dan laptop?",
    answer:
      "Ya, semua template kami 100% mobile-responsive dan tampil sempurna di semua perangkat.",
  },
  {
    question: "Apa bedanya dengan undangan fisik?",
    answer:
      "Lebih hemat, ramah lingkungan, langsung bisa dibagikan via WhatsApp/sosmed, dan tamu bisa RSVP tanpa repot.",
  },
];

export const trustBadges = [
  { icon: ShieldCheck, label: "Pembayaran Aman" },
  { icon: Clock3, label: "Proses 5 Menit" },
  { icon: CheckCircle2, label: "Garansi Revisi" },
  { icon: HeartHandshake, label: "Support via WhatsApp" },
];
