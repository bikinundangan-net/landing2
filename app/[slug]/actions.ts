"use server";

import { revalidatePath } from "next/cache";
import { appendSheetRow } from "@/lib/google-sheets";
import { createClient } from "@/lib/supabase/server";

export async function submitRsvp(formData: FormData) {
  const supabase = await createClient();

  if (!supabase) {
    return;
  }

  const orderId = Number(formData.get("orderId"));
  const slug = String(formData.get("slug") ?? "");
  const guestName = String(formData.get("guestName") ?? "").trim();
  const attendance = String(formData.get("attendance") ?? "hadir");
  const guestCount = Number(formData.get("guestCount") ?? 1);
  const message = String(formData.get("message") ?? "").trim();

  if (!orderId || !guestName) {
    return;
  }

  const clampedGuestCount = Math.min(Math.max(guestCount, 1), 10);

  await supabase.from("rsvps").insert({
    order_id: orderId,
    guest_name: guestName,
    attendance,
    guest_count: clampedGuestCount,
    message: message || null,
  });

  await appendSheetRow("RSVP", [
    new Date().toISOString(),
    slug,
    guestName,
    attendance,
    clampedGuestCount,
    message,
  ]);

  revalidatePath(`/${slug}`);
}

export async function submitGuestbook(formData: FormData) {
  const supabase = await createClient();

  if (!supabase) {
    return;
  }

  const orderId = Number(formData.get("orderId"));
  const slug = String(formData.get("slug") ?? "");
  const guestName = String(formData.get("guestName") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!orderId || !guestName || !message) {
    return;
  }

  await supabase.from("guestbook_entries").insert({
    order_id: orderId,
    guest_name: guestName,
    message,
  });

  await appendSheetRow("Ucapan", [
    new Date().toISOString(),
    slug,
    guestName,
    message,
  ]);

  revalidatePath(`/${slug}`);
}
