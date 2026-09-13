"use server";

import { revalidatePath } from "next/cache";
import { appendSheetRow } from "@/lib/google-sheets";
import { createClient } from "@/lib/supabase/server";

const MIN_SUBMIT_DURATION_MS = 500;

async function ensureMinDuration<T>(task: Promise<T>): Promise<T> {
  const start = Date.now();
  const result = await task;
  const elapsed = Date.now() - start;

  if (elapsed < MIN_SUBMIT_DURATION_MS) {
    await new Promise((resolve) =>
      setTimeout(resolve, MIN_SUBMIT_DURATION_MS - elapsed),
    );
  }

  return result;
}

async function getOrderSheetId(
  supabase: NonNullable<Awaited<ReturnType<typeof createClient>>>,
  orderId: number,
) {
  const { data } = await supabase
    .from("invitation_orders")
    .select("google_sheet_id")
    .eq("id", orderId)
    .maybeSingle();

  return data?.google_sheet_id ?? null;
}

async function saveGuestbookEntry({
  supabase,
  orderId,
  slug,
  guestName,
  message,
}: {
  supabase: NonNullable<Awaited<ReturnType<typeof createClient>>>;
  orderId: number;
  slug: string;
  guestName: string;
  message: string;
}) {
  const { error: guestbookError } = await supabase
    .from("guestbook_entries")
    .insert({
      order_id: orderId,
      guest_name: guestName,
      message,
    });

  if (guestbookError) {
    console.error("Failed to insert guestbook entry", guestbookError.message);
    return;
  }

  const sheetId = await getOrderSheetId(supabase, orderId);

  await appendSheetRow(
    "Ucapan",
    [new Date().toISOString(), slug, guestName, message],
    sheetId,
  );
}

export async function submitRsvp(formData: FormData) {
  await ensureMinDuration(submitRsvpInternal(formData));
}

async function submitRsvpInternal(formData: FormData) {
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

  const { error: rsvpError } = await supabase.from("rsvps").insert({
    order_id: orderId,
    guest_name: guestName,
    attendance,
    guest_count: clampedGuestCount,
    message: message || null,
  });

  if (rsvpError) {
    console.error("Failed to insert rsvp", rsvpError.message);
    return;
  }

  const sheetId = await getOrderSheetId(supabase, orderId);

  await appendSheetRow(
    "RSVP",
    [new Date().toISOString(), slug, guestName, attendance, clampedGuestCount, message],
    sheetId,
  );

  if (message) {
    await saveGuestbookEntry({ supabase, orderId, slug, guestName, message });
  }

  revalidatePath(`/${slug}`);
}

export async function submitGuestbook(formData: FormData) {
  await ensureMinDuration(submitGuestbookInternal(formData));
}

async function submitGuestbookInternal(formData: FormData) {
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

  await saveGuestbookEntry({ supabase, orderId, slug, guestName, message });

  revalidatePath(`/${slug}`);
}
