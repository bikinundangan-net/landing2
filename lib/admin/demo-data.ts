import type { TemplateSlug } from "@/lib/admin/catalog";
import type { AdminOrderSummary, PublicInvitation } from "@/lib/admin/types";

export const demoOrders: AdminOrderSummary[] = [
  {
    id: 1048,
    public_slug: "rina-fajar",
    customer_name: "Rina Paramita",
    customer_whatsapp: "+6281211101048",
    groom_name: "Fajar",
    bride_name: "Rina",
    package_slug: "premium",
    template_slug: "luxury-maroon",
    payment_status: "lunas",
    work_status: "data_lengkap",
    total_price: 148000,
    active_until: "2027-05-14T00:00:00+00:00",
    created_at: "2026-05-14T08:12:00+00:00",
  },
  {
    id: 1047,
    public_slug: "ayu-rizki",
    customer_name: "Ayu Maharani",
    customer_whatsapp: "+6285155347714",
    groom_name: "Rizki",
    bride_name: "Ayu",
    package_slug: "exclusive",
    template_slug: "garden-sage",
    payment_status: "menunggu",
    work_status: "dikerjakan",
    total_price: 373000,
    active_until: "2028-05-14T00:00:00+00:00",
    created_at: "2026-05-13T12:25:00+00:00",
  },
  {
    id: 1046,
    public_slug: "dewi-arman",
    customer_name: "Dewi Lestari",
    customer_whatsapp: "+6287788221046",
    groom_name: "Arman",
    bride_name: "Dewi",
    package_slug: "basic",
    template_slug: "classic-rose",
    payment_status: "lunas",
    work_status: "review",
    total_price: 74000,
    active_until: "2026-11-14T00:00:00+00:00",
    created_at: "2026-05-13T09:40:00+00:00",
  },
];

export const demoInvitation: PublicInvitation = {
  id: 1048,
  public_slug: "rina-fajar",
  customer_name: "Rina Paramita",
  groom_name: "Fajar",
  bride_name: "Rina",
  package_slug: "premium",
  template_slug: "luxury-maroon",
  payment_status: "lunas",
  work_status: "selesai",
  total_price: 148000,
  active_until: "2027-05-14T00:00:00+00:00",
  music_title: "Perfect - Ed Sheeran",
  love_story:
    "Berawal dari pertemuan sederhana, kami belajar bahwa rumah adalah seseorang yang membuat hari terasa tenang. Dengan penuh syukur, kami mengundang keluarga dan sahabat untuk menjadi bagian dari hari bahagia kami.",
  gift_account: "BCA 1234567890 a.n. Rina Paramita",
  notes: "Mohon doa restu dan kehadirannya.",
  order_events: [
    {
      event_type: "akad",
      title: "Akad Nikah",
      event_date: "2026-08-22",
      event_time: "09:00",
      location_name: "Masjid Agung Bandung",
      maps_url: "https://maps.google.com",
    },
    {
      event_type: "resepsi",
      title: "Resepsi",
      event_date: "2026-08-22",
      event_time: "12:00",
      location_name: "The Trans Luxury Hotel Bandung",
      maps_url: "https://maps.google.com",
    },
  ],
  order_addons: [
    {
      addon_slug: "express",
      addon_name: "Express pengerjaan",
      price_snapshot: 49000,
    },
  ],
  order_assets: [],
  guestbook_entries: [
    {
      guest_name: "Sarah & Budi",
      message: "Selamat menempuh hidup baru. Semoga selalu bahagia.",
      created_at: "2026-05-14T08:30:00+00:00",
    },
    {
      guest_name: "Mia",
      message: "Barakallah, lancar sampai hari H.",
      created_at: "2026-05-14T09:00:00+00:00",
    },
  ],
};

const demoGuestbook: PublicInvitation["guestbook_entries"] = [
  {
    guest_name: "Sarah & Budi",
    message: "Selamat menempuh hidup baru. Semoga selalu bahagia.",
    created_at: "2026-05-14T08:30:00+00:00",
  },
  {
    guest_name: "Mia",
    message: "Barakallah, lancar sampai hari H.",
    created_at: "2026-05-14T09:00:00+00:00",
  },
];

function buildDemoInvitation(
  overrides: Partial<PublicInvitation> & {
    template_slug: TemplateSlug;
    public_slug: string;
    groom_name: string;
    bride_name: string;
  },
): PublicInvitation {
  return {
    id: 9000,
    customer_name: `${overrides.bride_name} & ${overrides.groom_name}`,
    package_slug: "premium",
    payment_status: "lunas",
    work_status: "selesai",
    total_price: 99000,
    active_until: "2027-12-31T00:00:00+00:00",
    music_title: "Perfect - Ed Sheeran",
    love_story:
      "Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.",
    gift_account: "BCA 1234567890 a.n. Wedding Couple",
    notes: "Mohon doa restu dan kehadirannya.",
    order_addons: [],
    order_assets: [],
    guestbook_entries: demoGuestbook,
    order_events: [
      {
        event_type: "akad",
        title: "Akad Nikah",
        event_date: "2026-12-12",
        event_time: "09:00",
        location_name: "Gedung Serba Guna",
        maps_url: "https://maps.google.com",
      },
      {
        event_type: "resepsi",
        title: "Resepsi",
        event_date: "2026-12-12",
        event_time: "12:00",
        location_name: "Jl. Bahagia No. 123, Jakarta Selatan",
        maps_url: "https://maps.google.com",
      },
    ],
    ...overrides,
  };
}

export const demoInvitationsByTemplate: Record<TemplateSlug, PublicInvitation> = {
  "classic-rose": buildDemoInvitation({
    template_slug: "classic-rose",
    public_slug: "demo-classic-rose",
    groom_name: "Rizki",
    bride_name: "Ayu",
    music_title: "A Thousand Years - Christina Perri",
    love_story:
      "Berawal dari pertemuan sederhana, kami menemukan rumah dalam satu sama lain. Dengan penuh syukur, kami mengundang keluarga dan sahabat untuk menyaksikan awal perjalanan baru kami.",
    gift_account: "BCA 1234567890 a.n. Ayu & Rizki",
    order_events: [
      {
        event_type: "akad",
        title: "Akad Nikah",
        event_date: "2026-10-12",
        event_time: "10:00",
        location_name:
          "Gedung Serba Guna\nJl. Bahagia No. 123\nJakarta Selatan",
        maps_url: "https://maps.google.com",
      },
      {
        event_type: "resepsi",
        title: "Resepsi",
        event_date: "2026-10-12",
        event_time: "12:00",
        location_name:
          "Gedung Serba Guna\nJl. Bahagia No. 123\nJakarta Selatan",
        maps_url: "https://maps.google.com",
      },
    ],
    order_assets: [
      {
        asset_type: "hero",
        file_name: "Foto utama Rizki dan Ayu",
        public_url:
          "/images/invitations/classic-rose/couple-portrait.webp",
      },
      {
        asset_type: "gallery",
        file_name: "Rizki dan Ayu berjalan bersama",
        public_url: "/images/invitations/classic-rose/gallery-01.webp",
      },
      {
        asset_type: "gallery",
        file_name: "Rizki dan Ayu saling menatap",
        public_url: "/images/invitations/classic-rose/gallery-02.webp",
      },
      {
        asset_type: "gallery",
        file_name: "Rizki dan Ayu bersama buket bunga",
        public_url: "/images/invitations/classic-rose/gallery-03.webp",
      },
      {
        asset_type: "gallery",
        file_name: "Rizki dan Ayu berjalan di taman",
        public_url: "/images/invitations/classic-rose/gallery-04.webp",
      },
    ],
  }),
  "modern-minimal": buildDemoInvitation({
    template_slug: "modern-minimal",
    public_slug: "demo-modern-minimal",
    groom_name: "Yoga",
    bride_name: "Nadia",
    package_slug: "basic",
    total_price: 49000,
    love_story:
      "Di antara langkah-langkah kecil, kami menemukan rumah. Kini kami memilih untuk menulis seluruh bab berikutnya bersama.",
    gift_account: "BCA 1234567890 a.n. Nadia & Yoga",
    order_events: [
      {
        event_type: "akad",
        title: "Akad Nikah",
        event_date: "2026-08-08",
        event_time: "10:00",
        location_name:
          "Gedung Serba Guna\nJl. Bahagia No. 123\nJakarta Selatan",
        maps_url: "https://maps.google.com",
      },
      {
        event_type: "resepsi",
        title: "Resepsi",
        event_date: "2026-08-08",
        event_time: "11:30",
        location_name:
          "Gedung Serba Guna\nJl. Bahagia No. 123\nJakarta Selatan",
        maps_url: "https://maps.google.com",
      },
    ],
    order_assets: [
      {
        asset_type: "hero",
        file_name: "Foto utama Nadia dan Yoga",
        public_url:
          "/images/invitations/modern-minimal/couple-portrait.webp",
      },
      {
        asset_type: "gallery",
        file_name: "Potret Nadia dan Yoga",
        public_url:
          "/images/invitations/modern-minimal/couple-portrait.webp",
      },
      {
        asset_type: "gallery",
        file_name: "Nadia dan Yoga berjalan bersama",
        public_url: "/images/invitations/modern-minimal/gallery-02.webp",
      },
      {
        asset_type: "gallery",
        file_name: "Momen hangat Nadia dan Yoga",
        public_url: "/images/invitations/modern-minimal/gallery-03.webp",
      },
    ],
  }),
  "garden-sage": buildDemoInvitation({
    template_slug: "garden-sage",
    public_slug: "demo-garden-sage",
    groom_name: "Arman",
    bride_name: "Dewi",
    package_slug: "exclusive",
    total_price: 149000,
    gift_account: "BCA 1234567890 a.n. Dewi & Arman",
    order_events: [
      {
        event_type: "akad",
        title: "Akad Nikah",
        event_date: "2026-09-21",
        event_time: "10:00",
        location_name:
          "Gedung Serba Guna\nJl. Kebahagiaan No. 88\nBandung",
        maps_url: "https://maps.google.com",
      },
      {
        event_type: "resepsi",
        title: "Resepsi",
        event_date: "2026-09-21",
        event_time: "12:00",
        location_name:
          "Gedung Serba Guna\nJl. Kebahagiaan No. 88\nBandung",
        maps_url: "https://maps.google.com",
      },
    ],
    order_assets: [
      {
        asset_type: "hero",
        file_name: "Foto utama Dewi dan Arman",
        public_url: "/images/invitations/garden-sage/couple-portrait.webp",
      },
      {
        asset_type: "gallery",
        file_name: "Potret Dewi dan Arman di taman",
        public_url: "/images/invitations/garden-sage/couple-portrait.webp",
      },
      {
        asset_type: "gallery",
        file_name: "Dewi dan Arman berjalan di taman",
        public_url: "/images/invitations/garden-sage/gallery-02.webp",
      },
      {
        asset_type: "gallery",
        file_name: "Momen hangat Dewi dan Arman",
        public_url: "/images/invitations/garden-sage/gallery-03.webp",
      },
    ],
  }),
  "luxury-maroon": buildDemoInvitation({
    template_slug: "luxury-maroon",
    public_slug: "demo-luxury-maroon",
    groom_name: "Budi",
    bride_name: "Sarah",
    love_story:
      "Di antara gemerlap malam, kami menemukan seseorang yang membuat hidup terasa utuh. Dengan penuh syukur, kami mengundang Anda merayakan awal kami.",
    gift_account: "BCA 1234567890 a.n. Sarah & Budi",
    order_events: [
      {
        event_type: "akad",
        title: "Akad Nikah",
        event_date: "2026-11-17",
        event_time: "19:00",
        location_name:
          "Gedung Serba Guna\nJl. Kebahagiaan No. 88\nJakarta Selatan",
        maps_url: "https://maps.google.com",
      },
      {
        event_type: "resepsi",
        title: "Royal Reception",
        event_date: "2026-11-17",
        event_time: "20:00",
        location_name:
          "Gedung Serba Guna\nJl. Kebahagiaan No. 88\nJakarta Selatan",
        maps_url: "https://maps.google.com",
      },
    ],
    order_assets: [
      {
        asset_type: "hero",
        file_name: "Foto utama Sarah dan Budi",
        public_url:
          "/images/invitations/luxury-maroon/couple-portrait.webp",
      },
      {
        asset_type: "gallery",
        file_name: "Potret malam Sarah dan Budi",
        public_url:
          "/images/invitations/luxury-maroon/couple-portrait.webp",
      },
      {
        asset_type: "gallery",
        file_name: "Sarah dan Budi di ballroom",
        public_url: "/images/invitations/luxury-maroon/gallery-02.webp",
      },
      {
        asset_type: "gallery",
        file_name: "Momen hangat Sarah dan Budi",
        public_url: "/images/invitations/luxury-maroon/gallery-03.webp",
      },
    ],
  }),
  "islamic-elegant": buildDemoInvitation({
    template_slug: "islamic-elegant",
    public_slug: "demo-islamic-elegant",
    groom_name: "Farhan",
    bride_name: "Aisyah",
    package_slug: "exclusive",
    total_price: 149000,
    love_story:
      "Dengan memohon rahmat dan rida Allah SWT, kami berniat menyempurnakan separuh agama dan menapaki ibadah terpanjang bersama.",
    gift_account: "BCA 1234567890 a.n. Aisyah & Farhan",
    order_events: [
      {
        event_type: "akad",
        title: "Akad Nikah",
        event_date: "2026-12-05",
        event_time: "10:00",
        location_name:
          "Gedung Serba Guna\nJl. Cendrawasih No. 45\nBandung",
        maps_url: "https://maps.google.com",
      },
      {
        event_type: "resepsi",
        title: "Walimatul 'Urs",
        event_date: "2026-12-05",
        event_time: "12:00",
        location_name:
          "Gedung Serba Guna\nJl. Cendrawasih No. 45\nBandung",
        maps_url: "https://maps.google.com",
      },
    ],
    order_assets: [
      {
        asset_type: "hero",
        file_name: "Foto utama Aisyah dan Farhan",
        public_url:
          "/images/invitations/islamic-elegant/couple-portrait.webp",
      },
      {
        asset_type: "gallery",
        file_name: "Potret Aisyah dan Farhan",
        public_url:
          "/images/invitations/islamic-elegant/couple-portrait.webp",
      },
      {
        asset_type: "gallery",
        file_name: "Aisyah dan Farhan berjalan bersama",
        public_url: "/images/invitations/islamic-elegant/gallery-02.webp",
      },
      {
        asset_type: "gallery",
        file_name: "Momen hangat Aisyah dan Farhan",
        public_url: "/images/invitations/islamic-elegant/gallery-03.webp",
      },
    ],
  }),
  "rustic-cream": buildDemoInvitation({
    template_slug: "rustic-cream",
    public_slug: "demo-rustic-cream",
    groom_name: "Hendra",
    bride_name: "Lina",
    package_slug: "basic",
    total_price: 49000,
    gift_account: "BCA 1234567890 a.n. Lina & Hendra",
    order_events: [
      {
        event_type: "akad",
        title: "Akad Nikah",
        event_date: "2026-07-14",
        event_time: "10:00",
        location_name:
          "Gedung Serba Guna\nJl. Raya Sukamaju No. 25\nBandung",
        maps_url: "https://maps.google.com",
      },
      {
        event_type: "resepsi",
        title: "Resepsi",
        event_date: "2026-07-14",
        event_time: "12:00",
        location_name:
          "Gedung Serba Guna\nJl. Raya Sukamaju No. 25\nBandung",
        maps_url: "https://maps.google.com",
      },
    ],
    order_assets: [
      {
        asset_type: "hero",
        file_name: "Foto utama Lina dan Hendra",
        public_url: "/images/invitations/rustic-cream/couple-portrait.webp",
      },
      {
        asset_type: "gallery",
        file_name: "Potret Lina dan Hendra di taman",
        public_url: "/images/invitations/rustic-cream/couple-portrait.webp",
      },
      {
        asset_type: "gallery",
        file_name: "Lina dan Hendra di padang rumput",
        public_url: "/images/invitations/rustic-cream/gallery-02.webp",
      },
      {
        asset_type: "gallery",
        file_name: "Momen hangat Lina dan Hendra",
        public_url: "/images/invitations/rustic-cream/gallery-03.webp",
      },
    ],
  }),
  "pastel-floral": buildDemoInvitation({
    template_slug: "pastel-floral",
    public_slug: "demo-pastel-floral",
    groom_name: "Reza",
    bride_name: "Mia",
    package_slug: "exclusive",
    total_price: 149000,
    gift_account: "BCA 1234567890 a.n. Mia & Reza",
    order_events: [
      {
        event_type: "akad",
        title: "Akad Nikah",
        event_date: "2026-06-23",
        event_time: "16:00",
        location_name:
          "Gedung Serba Guna\nJl. Bahagia No. 88\nSurabaya",
        maps_url: "https://maps.google.com",
      },
      {
        event_type: "resepsi",
        title: "Resepsi",
        event_date: "2026-06-23",
        event_time: "18:00",
        location_name:
          "Gedung Serba Guna\nJl. Bahagia No. 88\nSurabaya",
        maps_url: "https://maps.google.com",
      },
    ],
    order_assets: [
      {
        asset_type: "hero",
        file_name: "Foto utama Mia dan Reza",
        public_url:
          "/images/invitations/pastel-floral/couple-portrait.webp",
      },
      {
        asset_type: "gallery",
        file_name: "Mia dan Reza di taman bunga",
        public_url: "/images/invitations/pastel-floral/gallery-01.webp",
      },
      {
        asset_type: "gallery",
        file_name: "Mia dan Reza berjalan bersama",
        public_url: "/images/invitations/pastel-floral/gallery-02.webp",
      },
      {
        asset_type: "gallery",
        file_name: "Portrait hangat Mia dan Reza",
        public_url: "/images/invitations/pastel-floral/gallery-03.webp",
      },
    ],
  }),
  "gold-premium": buildDemoInvitation({
    template_slug: "gold-premium",
    public_slug: "demo-gold-premium",
    groom_name: "Dimas",
    bride_name: "Rania",
    package_slug: "exclusive",
    total_price: 149000,
    gift_account: "BCA 1234567890 a.n. Rania & Dimas",
    order_events: [
      {
        event_type: "akad",
        title: "Akad Nikah",
        event_date: "2026-12-30",
        event_time: "19:00",
        location_name:
          "Gedung Serba Guna\nJl. Kebahagiaan No. 88\nJakarta Selatan",
        maps_url: "https://maps.google.com",
      },
      {
        event_type: "resepsi",
        title: "Gala Reception",
        event_date: "2026-12-30",
        event_time: "20:00",
        location_name:
          "Gedung Serba Guna\nJl. Kebahagiaan No. 88\nJakarta Selatan",
        maps_url: "https://maps.google.com",
      },
    ],
    order_assets: [
      {
        asset_type: "hero",
        file_name: "Foto utama Rania dan Dimas",
        public_url: "/images/invitations/gold-premium/couple-portrait.webp",
      },
      {
        asset_type: "gallery",
        file_name: "Potret Rania dan Dimas",
        public_url: "/images/invitations/gold-premium/couple-portrait.webp",
      },
      {
        asset_type: "gallery",
        file_name: "Rania dan Dimas di ballroom",
        public_url: "/images/invitations/gold-premium/gallery-02.webp",
      },
      {
        asset_type: "gallery",
        file_name: "Momen hangat Rania dan Dimas",
        public_url: "/images/invitations/gold-premium/gallery-03.webp",
      },
    ],
  }),
  "hamsyah-yuyun-edition": buildDemoInvitation({
    template_slug: "hamsyah-yuyun-edition",
    public_slug: "demo-hamsyah-yuyun-edition",
    groom_name: "Hamsyah",
    bride_name: "Yuyun",
    package_slug: "premium",
    love_story:
      "Berawal dari sebuah pertemuan yang tak pernah direncanakan, kami memilih untuk menulis babak baru dalam perjalanan cinta kami bersama.",
    gift_account: "BCA 0601133562 a.n. Yuyun Istiqomah",
    order_events: [
      {
        event_type: "akad",
        title: "Akad Nikah",
        event_date: "2026-10-25",
        event_time: "08:00",
        location_name: "Joglo Ndalijan\nSleman, Yogyakarta",
        maps_url: "https://maps.google.com",
      },
      {
        event_type: "resepsi",
        title: "Resepsi",
        event_date: "2026-10-25",
        event_time: "10:30",
        location_name: "Joglo Ndalijan\nSleman, Yogyakarta",
        maps_url: "https://maps.google.com",
      },
    ],
    order_assets: [
      {
        asset_type: "hero",
        file_name: "Foto utama Hamsyah dan Yuyun",
        public_url:
          "/images/invitations/modern-minimal/couple-portrait.webp",
      },
      {
        asset_type: "gallery",
        file_name: "Potret Hamsyah dan Yuyun",
        public_url:
          "/images/invitations/modern-minimal/couple-portrait.webp",
      },
      {
        asset_type: "gallery",
        file_name: "Hamsyah dan Yuyun berjalan bersama",
        public_url: "/images/invitations/modern-minimal/gallery-02.webp",
      },
      {
        asset_type: "gallery",
        file_name: "Momen hangat Hamsyah dan Yuyun",
        public_url: "/images/invitations/modern-minimal/gallery-03.webp",
      },
    ],
  }),
};
