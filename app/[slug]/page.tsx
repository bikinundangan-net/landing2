import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicInvitationView } from "@/components/invitation/public-invitation";
import { reservedRootSlugs } from "@/lib/admin/catalog";
import { demoInvitation } from "@/lib/admin/demo-data";
import { getPublicInvitation } from "@/lib/admin/queries";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { siteUrl } from "@/lib/site";

type InvitationPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

async function resolveInvitation(slug: string) {
  if (reservedRootSlugs.has(slug)) {
    return null;
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

  const title = `Undangan ${invitation.bride_name} & ${invitation.groom_name}`;
  const description = `Dengan hormat mengundang Anda ke acara pernikahan ${invitation.bride_name} dan ${invitation.groom_name}.`;

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
    },
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

  return <PublicInvitationView invitation={invitation} />;
}
