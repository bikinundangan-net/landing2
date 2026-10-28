import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { PublicInvitation } from "@/lib/admin/types";
import content from "@/lib/admin/ibnu-dinata.json";

// Explicit, development-only preview of this order. Never enabled in production.
export function createIbnuDinataPreviewClient() {
  if (process.env.NODE_ENV !== "development" || process.env.IBNU_DINATA_PREVIEW !== "1") return null;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

export async function getIbnuDinataPreview() {
  const client = createIbnuDinataPreviewClient();
  if (!client) return null;
  const { data, error } = await client.from("invitation_orders")
    .select(`id, public_slug, customer_name, groom_name, bride_name, package_slug, template_slug,
      payment_status, work_status, total_price, active_until, music_title, love_story, gift_account,
      notes, order_events(*), order_addons(*), order_assets(*), guestbook_entries(*)`)
    .eq("public_slug", content.slug).maybeSingle();
  if (error || !data) return null;
  const invitation = data as PublicInvitation;
  invitation.guestbook_entries?.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
  return invitation;
}
