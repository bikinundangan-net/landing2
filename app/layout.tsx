import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://bikinundangan.net"
).replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Undangan Digital Pernikahan Online | Mulai 49rb — BikinUndangan.net",
  description:
    "Buat undangan pernikahan digital elegan dalam 5 menit. RSVP online, amplop digital, desain cantik. Harga mulai 49 ribu. Sudah dipercaya 10.000+ pasangan.",
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title:
      "Undangan Digital Pernikahan Online | Mulai 49rb — BikinUndangan.net",
    description:
      "Buat undangan pernikahan digital elegan dalam 5 menit. RSVP online, amplop digital, desain cantik. Harga mulai 49 ribu.",
    url: siteUrl,
    siteName: "BikinUndangan.net",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/images/hero-invitation-mockup.png",
        width: 1448,
        height: 1086,
        alt: "Mockup undangan digital BikinUndangan.net",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Undangan Digital Pernikahan Online | Mulai 49rb — BikinUndangan.net",
    description:
      "Buat undangan pernikahan digital elegan dalam 5 menit. Harga mulai 49 ribu.",
    images: ["/images/hero-invitation-mockup.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${playfair.variable} scroll-smooth antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
