import { z } from "zod";

export const reservedRootSlugs = new Set([
  "admin",
  "api",
  "blog",
  "design",
  "favicon.ico",
  "icon.png",
  "apple-icon.png",
  "logo.png",
  "robots.txt",
  "sitemap.xml",
]);

export const workStatuses = [
  "baru",
  "data_lengkap",
  "dikerjakan",
  "review",
  "selesai",
] as const;

export const paymentStatuses = [
  "belum_bayar",
  "menunggu",
  "lunas",
  "refund",
] as const;

export const packageCatalog = [
  {
    slug: "basic",
    name: "Basic",
    price: 49000,
    durationMonths: 6,
    revisionLabel: "Revisi 1x",
    slaLabel: "Estimasi 1x24 jam",
    popular: false,
    description:
      "Undangan digital simpel, elegan, dan cepat jadi dengan fitur inti lengkap.",
    features: [
      "Semua template premium",
      "Nama tamu otomatis",
      "Background music request",
      "Countdown acara",
      "Google Maps",
      "RSVP kehadiran",
      "Buku tamu digital",
      "Amplop digital",
      "Love story",
      "Galeri foto maksimal 6 foto",
      "1 video prewedding",
      "Share WhatsApp unlimited",
      "Masa aktif 6 bulan",
    ],
  },
  {
    slug: "premium",
    name: "Premium",
    price: 99000,
    durationMonths: 12,
    revisionLabel: "Revisi 3x",
    slaLabel: "Pengerjaan prioritas",
    popular: true,
    description:
      "Paket paling favorit dengan fitur lebih lengkap dan tampilan lebih premium.",
    features: [
      "Semua fitur Paket Basic",
      "Tanpa watermark",
      "Unlimited nama tamu",
      "Galeri foto hingga 20 foto",
      "Request lagu bebas",
      "Multi acara",
      "Live streaming",
      "Save to calendar",
      "Tema premium eksklusif",
      "Masa aktif 1 tahun",
    ],
  },
  {
    slug: "exclusive",
    name: "Exclusive",
    price: 149000,
    durationMonths: 24,
    revisionLabel: "Unlimited revisi minor",
    slaLabel: "Fast response priority",
    popular: false,
    description:
      "Untuk pasangan yang ingin tampilan undangan lebih elegan dan eksklusif.",
    features: [
      "Semua fitur Paket Premium",
      "Video background hero",
      "Custom warna & font",
      "Unlimited galeri foto",
      "Opening screen premium",
      "Animasi premium",
      "Masa aktif 2 tahun",
      "Save the date image",
      "Instagram story wedding",
    ],
  },
] as const;

export const addonCatalog = [
  {
    slug: "domain-my-id",
    name: "Domain .my.id",
    price: 29000,
    category: "domain",
  },
  {
    slug: "domain-biz-id",
    name: "Domain .biz.id",
    price: 49000,
    category: "domain",
  },
  {
    slug: "domain-id",
    name: "Domain .id",
    price: 149000,
    category: "domain",
  },
  {
    slug: "domain-com",
    name: "Domain .com",
    price: 199000,
    category: "domain",
  },
  {
    slug: "express",
    name: "Express pengerjaan",
    price: 49000,
    category: "service",
  },
  {
    slug: "extend-active",
    name: "Tambah masa aktif",
    price: 25000,
    category: "service",
  },
  {
    slug: "custom-design",
    name: "Custom design",
    price: 199000,
    category: "creative",
  },
  {
    slug: "instagram-filter",
    name: "Wedding Instagram filter",
    price: 25000,
    category: "creative",
  },
  {
    slug: "video-gallery",
    name: "Tambah video gallery",
    price: 15000,
    category: "media",
  },
] as const;

export const templateCatalog = [
  {
    slug: "classic-rose",
    name: "Classic Rose",
    theme: "Romantic floral",
    image: "/images/designs/classic-rose.png",
    palette: {
      background: "#fff7f4",
      accent: "#b94b60",
      deep: "#4b0f1a",
      soft: "#f7dfe3",
    },
  },
  {
    slug: "modern-minimal",
    name: "Modern Minimal",
    theme: "Clean editorial",
    image: "/images/designs/modern-minimal.png",
    palette: {
      background: "#faf7f1",
      accent: "#35302b",
      deep: "#171513",
      soft: "#e7dfd4",
    },
  },
  {
    slug: "garden-sage",
    name: "Garden Sage",
    theme: "Botanical green",
    image: "/images/designs/garden-sage.png",
    palette: {
      background: "#f5f8ee",
      accent: "#6f8266",
      deep: "#2f3d2b",
      soft: "#dae8d1",
    },
  },
  {
    slug: "luxury-maroon",
    name: "Luxury Maroon",
    theme: "Maroon gold",
    image: "/images/designs/luxury-maroon.png",
    palette: {
      background: "#fff4e8",
      accent: "#9d2b3f",
      deep: "#4b0f1a",
      soft: "#f3d2b1",
    },
  },
  {
    slug: "islamic-elegant",
    name: "Islamic Elegant",
    theme: "Navy gold",
    image: "/images/designs/islamic-elegant.png",
    palette: {
      background: "#f1f5f2",
      accent: "#2c6a67",
      deep: "#102636",
      soft: "#d5b46d",
    },
  },
  {
    slug: "rustic-cream",
    name: "Rustic Cream",
    theme: "Terracotta rustic",
    image: "/images/designs/rustic-cream.png",
    palette: {
      background: "#fff7ec",
      accent: "#c56a48",
      deep: "#553224",
      soft: "#f5ddb8",
    },
  },
  {
    slug: "pastel-floral",
    name: "Pastel Floral",
    theme: "Lilac peach",
    image: "/images/designs/pastel-floral.png",
    palette: {
      background: "#fff6fb",
      accent: "#9d7ac2",
      deep: "#47294e",
      soft: "#ffd1c5",
    },
  },
  {
    slug: "gold-premium",
    name: "Gold Premium",
    theme: "Black gold",
    image: "/images/designs/gold-premium.png",
    palette: {
      background: "#111111",
      accent: "#c59b4a",
      deep: "#050505",
      soft: "#f2dfad",
    },
  },
] as const;

export type PackageSlug = (typeof packageCatalog)[number]["slug"];
export type AddonSlug = (typeof addonCatalog)[number]["slug"];
export type TemplateSlug = (typeof templateCatalog)[number]["slug"];
export type WorkStatus = (typeof workStatuses)[number];
export type PaymentStatus = (typeof paymentStatuses)[number];

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const orderFormSchema = z.object({
  customerName: z.string().trim().min(2, "Nama customer wajib diisi"),
  customerWhatsapp: z.string().trim().min(8, "Nomor WhatsApp wajib diisi"),
  customerEmail: z.string().trim().email().optional().or(z.literal("")),
  groomName: z.string().trim().min(2, "Nama mempelai pria wajib diisi"),
  brideName: z.string().trim().min(2, "Nama mempelai wanita wajib diisi"),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(slugPattern, "Slug hanya boleh huruf kecil, angka, dan strip")
    .refine((slug) => !reservedRootSlugs.has(slug), "Slug ini sudah dipakai"),
  weddingDate: z.string().trim().min(1, "Tanggal pernikahan wajib diisi"),
  akadTime: z.string().trim().optional(),
  akadLocation: z.string().trim().min(2, "Lokasi akad wajib diisi"),
  receptionTime: z.string().trim().optional(),
  receptionLocation: z.string().trim().optional(),
  mapsUrl: z.string().trim().url().optional().or(z.literal("")),
  packageSlug: z.enum(["basic", "premium", "exclusive"]),
  templateSlug: z.enum([
    "classic-rose",
    "modern-minimal",
    "garden-sage",
    "luxury-maroon",
    "islamic-elegant",
    "rustic-cream",
    "pastel-floral",
    "gold-premium",
  ]),
  paymentStatus: z.enum(paymentStatuses),
  workStatus: z.enum(workStatuses),
  musicTitle: z.string().trim().optional(),
  loveStory: z.string().trim().optional(),
  giftAccount: z.string().trim().optional(),
  notes: z.string().trim().optional(),
});

export type OrderFormInput = z.infer<typeof orderFormSchema>;

export function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getPackage(slug: string) {
  return packageCatalog.find((item) => item.slug === slug) ?? packageCatalog[0];
}

export function getTemplate(slug: string) {
  return (
    templateCatalog.find((item) => item.slug === slug) ?? templateCatalog[0]
  );
}

export function getAddon(slug: string) {
  return addonCatalog.find((item) => item.slug === slug);
}

export function calculateOrderTotal(packageSlug: string, addonSlugs: string[]) {
  const selectedPackage = getPackage(packageSlug);
  const addonTotal = addonSlugs.reduce((total, slug) => {
    return total + (getAddon(slug)?.price ?? 0);
  }, 0);

  return {
    packageTotal: selectedPackage.price,
    addonTotal,
    grandTotal: selectedPackage.price + addonTotal,
  };
}

export function addMonths(date: Date, months: number) {
  const nextDate = new Date(date);
  nextDate.setMonth(nextDate.getMonth() + months);
  return nextDate;
}
