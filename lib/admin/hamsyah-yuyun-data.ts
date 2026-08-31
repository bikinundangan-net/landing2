import type { PublicInvitation } from "@/lib/admin/types";

const hamsyahYuyunGalleryOrder = [
  "/images/invitations/modern-minimal/hamsyah-yuyun-foto2.webp",
  "/images/invitations/modern-minimal/hamsyah-yuyun-foto1.webp",
  "/images/invitations/modern-minimal/hamsyah-yuyun-foto3.webp",
];

const hamsyahYuyunVintageBlueAssets: PublicInvitation["order_assets"] = [
  {
    asset_type: "hero",
    file_name: "vintage-blue-cover-real",
    public_url:
      "/images/invitations/hamsyah-yuyun/vintage-blue/cover-real.webp",
  },
  {
    asset_type: "other",
    file_name: "vintage-blue-verse-couple",
    public_url:
      "/images/invitations/hamsyah-yuyun/vintage-blue/verse-couple-real.webp",
  },
  {
    asset_type: "other",
    file_name: "vintage-blue-groom-portrait",
    public_url:
      "/images/invitations/hamsyah-yuyun/vintage-blue/groom-portrait-ai.webp",
  },
  {
    asset_type: "other",
    file_name: "vintage-blue-bride-portrait",
    public_url:
      "/images/invitations/hamsyah-yuyun/vintage-blue/bride-portrait-ai.webp",
  },
  {
    asset_type: "gallery",
    file_name: "Momen 4",
    public_url:
      "/images/invitations/hamsyah-yuyun/vintage-blue/countdown-couple-ai.webp",
  },
  {
    asset_type: "other",
    file_name: "vintage-blue-closing-couple",
    public_url:
      "/images/invitations/hamsyah-yuyun/vintage-blue/closing-couple-ai.webp",
  },
];

const hamsyahYuyunVintageBlueAssetNames = new Set(
  [
    ...hamsyahYuyunVintageBlueAssets.map((asset) => asset.file_name),
    "vintage-blue-countdown-couple",
  ],
);

export const hamsyahYuyunLoveStory = [
  "Berawal dari sebuah pertemuan yang tak pernah direncanakan.",
  "Awal tahun 2024 menjadi awal dari sebuah cerita yang tak pernah kami sangka sebelumnya. Kami dipertemukan tanpa sengaja, dalam sebuah pertemuan sederhana yang perlahan membawa kami pada kisah yang begitu berarti.",
  "Seiring berjalannya waktu, rasa nyaman tumbuh menjadi rasa sayang. Kami mulai mengenal satu sama lain lebih dalam, berbagi cerita, melewati berbagai momen bersama, hingga akhirnya menyadari bahwa ada seseorang yang ingin kami jadikan tempat untuk pulang.",
  "Bukan hanya kami yang semakin dekat, tetapi juga kedua keluarga. Kehangatan, doa, dan dukungan dari orang-orang yang kami sayangi membuat hubungan ini semakin yakin untuk melangkah ke tahap berikutnya.",
  "Hingga akhirnya, dengan penuh rasa syukur dan keyakinan, kami memutuskan untuk menyatukan dua hati dalam sebuah ikatan pernikahan.",
  "Dari sebuah pertemuan yang tak disengaja, tumbuh sebuah cinta yang kami pilih untuk dijaga selamanya.",
  "Dan kini, kami siap menulis babak baru dalam perjalanan cinta kami bersama, dalam satu ikatan, menuju selamanya. 🤍",
].join("\n\n");

export const hamsyahYuyunInvitation: PublicInvitation = {
  id: 900001,
  public_slug: "hamsyah-yuyun",
  customer_name: "Hamsyah & Yuyun Istiqomah",
  groom_name: "Hamsyah",
  bride_name: "Yuyun Istiqomah",
  package_slug: "premium",
  template_slug: "vintage-blue",
  payment_status: "lunas",
  work_status: "selesai",
  total_price: 0,
  active_until: null,
  music_title: "Kusuma Wijaya",
  love_story: hamsyahYuyunLoveStory,
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
      event_end_time: "12:00",
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
      file_name: "Momen 2",
      public_url: "/images/invitations/modern-minimal/hamsyah-yuyun-foto2.webp",
    },
    {
      asset_type: "gallery",
      file_name: "Momen 1",
      public_url: "/images/invitations/modern-minimal/hamsyah-yuyun-foto1.webp",
    },
    {
      asset_type: "gallery",
      file_name: "Momen 3",
      public_url: "/images/invitations/modern-minimal/hamsyah-yuyun-foto3.webp",
    },
  ],
  guestbook_entries: [],
};

export function normalizeHamsyahYuyunInvitation(
  invitation: PublicInvitation,
): PublicInvitation {
  const seenGalleryUrls = new Set<string>();
  const orderAssets = invitation.order_assets.filter((asset) => {
    if (
      asset.asset_type === "music" ||
      asset.asset_type === "hero" ||
      hamsyahYuyunVintageBlueAssetNames.has(asset.file_name)
    ) {
      return false;
    }

    if (asset.asset_type !== "gallery") {
      return true;
    }

    if (seenGalleryUrls.has(asset.public_url)) {
      return false;
    }

    seenGalleryUrls.add(asset.public_url);
    return true;
  });
  const galleryOrder = new Map(
    hamsyahYuyunGalleryOrder.map((publicUrl, index) => [publicUrl, index]),
  );
  const orderedGalleryAssets = orderAssets
    .filter((asset) => asset.asset_type === "gallery")
    .map((asset, index) => ({ asset, index }))
    .sort((first, second) => {
      const firstOrder = galleryOrder.get(first.asset.public_url);
      const secondOrder = galleryOrder.get(second.asset.public_url);

      if (firstOrder === undefined && secondOrder === undefined) {
        return first.index - second.index;
      }

      return (
        (firstOrder ?? hamsyahYuyunGalleryOrder.length + first.index) -
        (secondOrder ?? hamsyahYuyunGalleryOrder.length + second.index)
      );
    })
    .map(({ asset }) => asset);
  let galleryIndex = 0;
  const orderedAssets = orderAssets.map((asset) =>
    asset.asset_type === "gallery"
      ? orderedGalleryAssets[galleryIndex++]
      : asset,
  );

  return {
    ...invitation,
    bride_name: "Yuyun",
    template_slug: "vintage-blue",
    music_title: "Kusuma Wijaya",
    love_story: invitation.love_story?.trim() || hamsyahYuyunLoveStory,
    profile_details: {
      groom_name: "Hamsyah",
      bride_name: "Yuyun Istiqomah",
      groom: "Putra Ketiga dari Bp. Basuki dan Ibu Satinem",
      bride:
        "Putri Pertama dari Bp. Ali Maksudi dan Ibu Semi Purwanti",
    },
    order_events: invitation.order_events.map((event) =>
      event.event_type === "resepsi"
        ? { ...event, event_time: "10:30", event_end_time: "12:00" }
        : event,
    ),
    order_assets: [...orderedAssets, ...hamsyahYuyunVintageBlueAssets],
  };
}
