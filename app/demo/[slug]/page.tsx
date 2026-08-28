import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { getDesignWhatsAppUrl } from "@/components/design-template-card";
import { PublicInvitationView } from "@/components/invitation/public-invitation";
import { getTemplate, templateCatalog, type TemplateSlug } from "@/lib/admin/catalog";
import { demoInvitationsByTemplate } from "@/lib/admin/demo-data";

type DemoPageProps = {
  params: Promise<{ slug: string }>;
};

function isTemplateSlug(slug: string): slug is TemplateSlug {
  return slug in demoInvitationsByTemplate;
}

export function generateStaticParams() {
  return templateCatalog.map((template) => ({ slug: template.slug }));
}

export async function generateMetadata({
  params,
}: DemoPageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!isTemplateSlug(slug)) {
    return {
      title: "Demo Tidak Ditemukan | BikinUndangan.net",
    };
  }

  const template = getTemplate(slug);

  return {
    title: `Demo Live ${template.name} | BikinUndangan.net`,
    description: `Lihat demo undangan digital berjalan langsung dengan template ${template.name}.`,
    alternates: {
      canonical: `/demo/${slug}`,
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function DemoPage({ params }: DemoPageProps) {
  const { slug } = await params;

  if (!isTemplateSlug(slug)) {
    notFound();
  }

  const invitation = demoInvitationsByTemplate[slug];
  const template = getTemplate(slug);
  const isVintageBlue = slug === "vintage-blue";

  return (
    <div className="relative min-h-screen bg-black">
      <div
        className={`fixed top-8 z-50 hidden w-52 flex-col gap-3 rounded-[1.5rem] border border-white/10 bg-black/80 p-4 text-white shadow-2xl backdrop-blur-xl ${
          isVintageBlue
            ? "left-8 min-[1025px]:flex"
            : "left-[calc(50%+17rem)] lg:flex"
        }`}
      >
        <p className="px-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/55">
          Demo Live &middot; {template.name}
        </p>
        <Link
          href="/design"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-3 text-sm font-black text-white transition hover:bg-white/10"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Katalog Design
        </Link>
        <a
          href={getDesignWhatsAppUrl(template.name)}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f3d6b4] px-4 py-3 text-sm font-black text-[#4b0f1a] transition hover:bg-white"
        >
          <MessageCircle className="size-4" aria-hidden="true" />
          Pakai Template Ini
        </a>
      </div>
      <PublicInvitationView invitation={invitation} renderMode="demo" />
    </div>
  );
}
