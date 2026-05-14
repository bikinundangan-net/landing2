import type {
  AddonSlug,
  PaymentStatus,
  TemplateSlug,
  WorkStatus,
} from "@/lib/admin/catalog";

export type AdminOrderSummary = {
  id: number;
  public_slug: string;
  customer_name: string;
  customer_whatsapp: string;
  groom_name: string;
  bride_name: string;
  package_slug: string;
  template_slug: string;
  payment_status: PaymentStatus;
  work_status: WorkStatus;
  total_price: number;
  active_until: string | null;
  created_at: string;
};

export type PublicInvitation = {
  id: number;
  public_slug: string;
  customer_name: string;
  groom_name: string;
  bride_name: string;
  package_slug: string;
  template_slug: TemplateSlug;
  payment_status: PaymentStatus;
  work_status: WorkStatus;
  total_price: number;
  active_until: string | null;
  music_title: string | null;
  love_story: string | null;
  gift_account: string | null;
  notes: string | null;
  order_events: Array<{
    event_type: "akad" | "resepsi" | "other";
    title: string;
    event_date: string;
    event_time: string | null;
    location_name: string;
    maps_url: string | null;
  }>;
  order_addons: Array<{
    addon_slug: AddonSlug;
    addon_name: string;
    price_snapshot: number;
  }>;
  order_assets: Array<{
    asset_type: string;
    file_name: string;
    public_url: string;
  }>;
  guestbook_entries?: Array<{
    guest_name: string;
    message: string;
    created_at: string;
  }>;
};
