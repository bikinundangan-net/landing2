import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicInvitationView } from "@/components/invitation/public-invitation";
import { reservedRootSlugs } from "@/lib/admin/catalog";
import { demoInvitation } from "@/lib/admin/demo-data";
import {
  hamsyahYuyunInvitation,
  normalizeHamsyahYuyunInvitation,
} from "@/lib/admin/hamsyah-yuyun-data";
import { getPublicInvitation } from "@/lib/admin/queries";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { siteUrl } from "@/lib/site";
import ibnuDinata from "@/lib/admin/ibnu-dinata.json";
import { getIbnuDinataPreview } from "@/lib/supabase/ibnu-dinata-preview";

type InvitationPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

async function resolveInvitation(slug: string) {
  if (reservedRootSlugs.has(slug)) {
    return null;
  }

  if (slug === ibnuDinata.slug) {
    const preview = await getIbnuDinataPreview();
    if (preview) return preview;
  }

  if (slug === hamsyahYuyunInvitation.public_slug) {
    const databaseInvitation = await getPublicInvitation(slug);

    return normalizeHamsyahYuyunInvitation(
      databaseInvitation ?? hamsyahYuyunInvitation,
    );
  }

  if (!isSupabaseConfigured() && slug === demoInvitation.public_slug) {
    return demoInvitation;
  }

  return getPublicInvitation(slug);
}

export async function generateMetadata({
  params,
}: InvitationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const invitation = await resolveInvitation(slug);

  if (!invitation) {
    return {
      title: "Undangan Tidak Ditemukan | BikinUndangan.net",
    };
  }

  const isHamsyahYuyunInvitation =
    invitation.public_slug === hamsyahYuyunInvitation.public_slug;
  const isIbnuDinata = invitation.public_slug === ibnuDinata.slug;
  const firstName = isIbnuDinata ? "Ibnu" : isHamsyahYuyunInvitation
    ? invitation.groom_name
    : invitation.bride_name;
  const secondName = isIbnuDinata ? "Dinata" : isHamsyahYuyunInvitation
    ? "Yuyun"
    : invitation.groom_name;
  const title = `Undangan ${firstName} & ${secondName}`;
  const description = isIbnuDinata
    ? "Undangan pernikahan Ibnu Hardani & Pebriani Dinata. Akad Nikah, 8 November 2026, pukul 07.00–09.00 WIB di Bunut, Gang Jambu."
    : `Dengan hormat mengundang Anda ke acara pernikahan ${firstName} dan ${secondName}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${invitation.public_slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${invitation.public_slug}`,
      type: "website",
      ...(isIbnuDinata ? { images: [{ url: ibnuDinata.illustration, width: 1024, height: 1536, alt: "Ilustrasi pernikahan Ibnu & Dinata" }] } : {}),
    },
    ...(isIbnuDinata ? { twitter: { card: "summary_large_image" as const, title, description, images: [ibnuDinata.illustration] } } : {}),
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function InvitationPage({ params }: InvitationPageProps) {
  const { slug } = await params;
  const invitation = await resolveInvitation(slug);

  if (!invitation) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black">
      <PublicInvitationView invitation={invitation} />
    </div>
  );
}
