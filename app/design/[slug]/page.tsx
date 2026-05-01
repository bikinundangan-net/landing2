import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, MessageCircle } from "lucide-react";
import {
  getDesignWhatsAppUrl,
} from "@/components/design-template-card";
import { invitationDesigns } from "@/components/landing-data";

type DesignDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return invitationDesigns.map((design) => ({ slug: design.slug }));
}

export async function generateMetadata({
  params,
}: DesignDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const design = invitationDesigns.find((item) => item.slug === slug);

  if (!design) {
    return {
      title: "Design Tidak Ditemukan | BikinUndangan.net",
    };
  }

  return {
    title: `${design.name} | Demo Design Undangan Digital`,
    description: `Lihat demo template ${design.name} untuk undangan digital BikinUndangan.net.`,
    alternates: {
      canonical: `/design/${design.slug}`,
    },
  };
}

export default async function DesignDetailPage({
  params,
}: DesignDetailPageProps) {
  const { slug } = await params;
  const design = invitationDesigns.find((item) => item.slug === slug);

  if (!design) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-cream">
      <header className="border-b border-maroon/10 bg-cream/78 backdrop-blur-xl">
        <nav className="section-shell flex h-[4.5rem] items-center justify-between gap-5">
          <Link
            href="/design"
            className="inline-flex items-center gap-2 text-sm font-black !text-maroon"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Katalog Design
          </Link>
          <Link
            href="/#harga"
            className="rounded-full bg-maroon px-5 py-3 text-sm font-black !text-cream"
          >
            Lihat Paket
          </Link>
        </nav>
      </header>

      <section className="section-shell grid min-h-[calc(100vh-4.5rem)] gap-10 py-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-maroon">
            Demo template
          </p>
          <h1 className="mt-4 font-serif text-5xl font-bold leading-tight text-maroon-dark sm:text-7xl">
            {design.name}
          </h1>
          <p className="mt-4 text-xl font-semibold text-ink/62">
            {design.theme} · {design.priceLabel}
          </p>
          <p className="mt-6 max-w-xl text-lg leading-8 text-ink/66">
            Preview mockup mobile untuk membantu kamu membayangkan tampilan
            undangan saat dibuka tamu. Template bisa disesuaikan dengan nama,
            tanggal, lokasi, foto, musik, dan detail acara.
          </p>

          <ul className="mt-8 grid gap-3 text-sm font-bold text-ink/68 sm:grid-cols-2">
            {[
              "Mobile responsive",
              "Bisa dibagikan via WhatsApp",
              "CTA dan RSVP siap pakai",
              "Konten bisa disesuaikan",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="size-4 text-maroon" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={getDesignWhatsAppUrl(design.name)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-maroon px-7 py-4 text-base font-black !text-cream shadow-soft transition hover:bg-maroon-dark"
            >
              <MessageCircle className="size-5" aria-hidden="true" />
              Pakai Template Ini
            </a>
            <Link
              href="/design"
              className="inline-flex items-center justify-center rounded-full border border-maroon/15 bg-white/58 px-7 py-4 text-base font-black !text-maroon transition hover:bg-white"
            >
              Lihat Template Lain
            </Link>
          </div>
        </div>

        <div
          className="relative flex min-h-[44rem] items-end justify-center overflow-hidden rounded-[2rem] border border-maroon/10"
          style={{ background: design.background }}
        >
          <div
            className="absolute inset-x-16 bottom-10 top-16 rounded-full bg-white/20 blur-3xl"
            aria-hidden="true"
          />
          <Image
            src={design.image}
            alt={design.alt}
            width={520}
            height={1040}
            priority
            className="relative z-10 h-[92%] w-auto object-contain drop-shadow-[0_28px_52px_rgba(47,21,23,0.3)]"
            sizes="(min-width: 1024px) 440px, 86vw"
          />
        </div>
      </section>
    </main>
  );
}
