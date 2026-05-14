import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { AdminOrderSummary, PublicInvitation } from "@/lib/admin/types";

export const getAdminSession = cache(async () => {
  const supabase = await createClient();

  if (!supabase) {
    return {
      configured: false,
      user: null,
      profile: null,
      isAdmin: false,
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      configured: true,
      user: null,
      profile: null,
      isAdmin: false,
    };
  }

  const { data: profile } = await supabase
    .from("admin_profiles")
    .select("id, display_name, role")
    .eq("id", user.id)
    .maybeSingle();

  return {
    configured: true,
    user,
    profile,
    isAdmin: profile?.role === "admin",
  };
});

export async function getAdminOrders() {
  const supabase = await createClient();

  if (!supabase) {
    return [] satisfies AdminOrderSummary[];
  }

  const { data, error } = await supabase
    .from("invitation_orders")
    .select(
      "id, public_slug, customer_name, customer_whatsapp, groom_name, bride_name, package_slug, template_slug, payment_status, work_status, total_price, active_until, created_at",
    )
    .order("created_at", { ascending: false })
    .limit(30);

  if (error) {
    console.error("Failed to fetch admin orders", error.message);
    return [] satisfies AdminOrderSummary[];
  }

  return (data ?? []) as AdminOrderSummary[];
}

export async function getPublicInvitation(slug: string) {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabase = await createClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("invitation_orders")
    .select(
      `
      id,
      public_slug,
      customer_name,
      groom_name,
      bride_name,
      package_slug,
      template_slug,
      payment_status,
      work_status,
      total_price,
      active_until,
      music_title,
      love_story,
      gift_account,
      notes,
      order_events (
        event_type,
        title,
        event_date,
        event_time,
        location_name,
        maps_url
      ),
      order_addons (
        addon_slug,
        addon_name,
        price_snapshot
      ),
      order_assets (
        asset_type,
        file_name,
        public_url
      ),
      guestbook_entries (
        guest_name,
        message,
        created_at
      )
    `,
    )
    .eq("public_slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch public invitation", error.message);
    return null;
  }

  return data as PublicInvitation | null;
}
