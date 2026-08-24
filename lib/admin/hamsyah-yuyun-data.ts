import type { PublicInvitation } from "@/lib/admin/types";

export const hamsyahYuyunInvitation: PublicInvitation = {
  id: 900001,
  public_slug: "hamsyah-yuyun",
  customer_name: "Hamsyah & Yuyun Istiqomah",
  groom_name: "Hamsyah",
  bride_name: "Yuyun Istiqomah",
  package_slug: "premium",
  template_slug: "hamsyah-yuyun-edition",
  payment_status: "lunas",
  work_status: "selesai",
  total_price: 0,
  active_until: null,
  music_title: null,
  love_story: null,
  gift_account:
    "Yuyun Istiqomah - BCA 0601133562\nHamsyah - BCA 8465510494\n\nWedding Gift dikirim ke:\nJl Monjali, Gemawang Rt 02/43 No.102, Sinduadi, Mlati, Sleman, Yogyakarta",
  notes: "QS. Ar-Rum : 21",
  order_events: [
    {
      event_type: "akad",
      title: "Akad Nikah",
      event_date: "2026-10-25",
      event_time: "08:00",
      location_name:
        "Joglo Ndalijan\nJl. Kabupaten No. Km. 2.5, Mayangan, Trihanggo, Kec. Gamping, Kabupaten Sleman, DIY 55291",
      maps_url: "https://maps.app.goo.gl/wunzG6LgvTuFTbjw7",
    },
    {
      event_type: "resepsi",
      title: "Resepsi",
      event_date: "2026-10-25",
      event_time: "10:30",
      location_name:
        "Joglo Ndalijan\nJl. Kabupaten No. Km. 2.5, Mayangan, Trihanggo, Kec. Gamping, Kabupaten Sleman, DIY 55291",
      maps_url: "https://maps.app.goo.gl/wunzG6LgvTuFTbjw7",
    },
  ],
  order_addons: [],
  order_assets: [
    {
      asset_type: "hero",
      file_name: "Foto utama Hamsyah & Yuyun",
      public_url: "/images/invitations/modern-minimal/hamsyah-yuyun-foto1.webp",
    },
    {
      asset_type: "gallery",
      file_name: "Momen 1",
      public_url: "/images/invitations/modern-minimal/hamsyah-yuyun-foto1.webp",
    },
    {
      asset_type: "gallery",
      file_name: "Momen 2",
      public_url: "/images/invitations/modern-minimal/hamsyah-yuyun-foto2.webp",
    },
    {
      asset_type: "gallery",
      file_name: "Momen 3",
      public_url: "/images/invitations/modern-minimal/hamsyah-yuyun-foto3.webp",
    },
  ],
  guestbook_entries: [],
};
