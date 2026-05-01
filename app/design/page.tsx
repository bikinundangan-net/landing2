import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { DesignTemplateCard } from "@/components/design-template-card";
import { invitationDesigns } from "@/components/landing-data";

export const metadata: Metadata = {
  title: "Katalog Design Undangan Digital | BikinUndangan.net",
  description:
    "Lihat pilihan design undangan digital BikinUndangan.net. Pilih template elegan, minimalis, botanical, rustic, pastel, hingga premium gold.",
  alternates: {
    canonical: "/design",
  },
};

export default function DesignCatalogPage() {
  return (
    <main className="min-h-screen bg-cream pb-16">
      <header className="border-b border-maroon/10 bg-cream/78 backdrop-blur-xl">
        <nav className="section-shell flex h-[4.5rem] items-center justify-between gap-5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-black !text-maroon"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Kembali
          </Link>
          <Link
            href="/#harga"
            className="rounded-full bg-maroon px-5 py-3 text-sm font-black !text-cream"
          >
            Buat Undangan Sekarang
          </Link>
        </nav>
      </header>

      <section className="section-shell pt-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-4xl font-bold leading-tight text-maroon-dark sm:text-6xl">
            Katalog Design Undangan Digital
          </h1>
          <p className="mt-5 text-lg leading-8 text-ink/66">
            Pilih gaya yang paling cocok dengan konsep acaramu. Semua template
            sudah mobile-friendly dan bisa langsung dipakai.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {invitationDesigns.map((design, index) => (
            <DesignTemplateCard
              key={design.slug}
              design={design}
              priority={index < 4}
            />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/#harga"
            className="inline-flex items-center gap-2 rounded-full bg-maroon px-7 py-4 text-sm font-black !text-cream shadow-soft transition hover:bg-maroon-dark"
          >
            Lihat Paket Mulai 49rb
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
