"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import content from "@/lib/admin/ibnu-dinata.json";
import type { InvitationFormState } from "@/lib/invitation-form-state";
import { appendSheetRow } from "@/lib/google-sheets";
import { createClient } from "@/lib/supabase/server";
import { createIbnuDinataPreviewClient } from "@/lib/supabase/ibnu-dinata-preview";

const nameSchema = z.string().trim().min(2).max(100);
const rsvpSchema = z.object({
  guestName: nameSchema,
  attendance: z.enum(["hadir", "tidak_hadir", "ragu"]),
  guestCount: z.coerce.number().int().min(1).max(10),
});
const wishSchema = z.object({
  guestName: nameSchema,
  message: z.string().trim().min(2).max(2000),
});

async function submit(kind: "rsvp" | "wish", formData: FormData): Promise<InvitationFormState> {
  const parsed = kind === "rsvp"
    ? rsvpSchema.safeParse(Object.fromEntries(formData))
    : wishSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { status: "error", message: "Periksa nama dan isian Anda. Jumlah tamu harus 1–10, dan ucapan maksimal 2.000 karakter." };
  }

  try {
    const preview = createIbnuDinataPreviewClient();
    const supabase = preview ?? await createClient();
    if (!supabase) return { status: "error", message: "Penyimpanan belum tersedia. Silakan coba kembali nanti." };

    // Resolve the real published order on the server; never trust a client order ID.
    let orderQuery = supabase
      .from("invitation_orders")
      .select("id, active_until")
      .eq("public_slug", content.slug);
    if (!preview) orderQuery = orderQuery.eq("is_published", true);
    const { data: order, error: orderError } = await orderQuery.maybeSingle();
    if (orderError || !order || (order.active_until && new Date(order.active_until).getTime() <= Date.now())) {
      return { status: "error", message: "Undangan belum dapat menerima jawaban. Silakan coba kembali nanti." };
    }

    const values = parsed.data;
    const isRsvp = "attendance" in values;
    const { error } = await supabase.from(isRsvp ? "rsvps" : "guestbook_entries").insert(
      isRsvp
        ? { order_id: order.id, guest_name: values.guestName, attendance: values.attendance, guest_count: values.guestCount }
        : { order_id: order.id, guest_name: values.guestName, message: values.message },
    );
    if (error) {
      console.error("Invitation response could not be saved", error.code);
      return { status: "error", message: "Jawaban belum tersimpan. Silakan coba sekali lagi." };
    }

    // Sheets is a best-effort mirror; database persistence determines success.
    try {
      const { data: sheet } = await supabase.from("invitation_orders").select("google_sheet_id").eq("id", order.id).maybeSingle();
      if (sheet?.google_sheet_id) {
        await appendSheetRow(isRsvp ? "RSVP" : "Ucapan", isRsvp
          ? [new Date().toISOString(), content.slug, values.guestName, values.attendance, values.guestCount, ""]
          : [new Date().toISOString(), content.slug, values.guestName, values.message], sheet.google_sheet_id);
      }
    } catch {
      console.error("Invitation response saved; Sheets mirror unavailable");
    }

    revalidatePath(`/${content.slug}`);
    return { status: "success", message: isRsvp ? "Terima kasih, konfirmasi kehadiran Anda sudah tersimpan." : "Terima kasih, doa dan ucapan Anda sudah tersimpan." };
  } catch {
    return { status: "error", message: "Koneksi terputus. Silakan periksa koneksi dan coba kembali." };
  }
}

export async function submitIbnuRsvp(_state: InvitationFormState, formData: FormData) {
  return submit("rsvp", formData);
}

export async function submitIbnuWish(_state: InvitationFormState, formData: FormData) {
  return submit("wish", formData);
}
