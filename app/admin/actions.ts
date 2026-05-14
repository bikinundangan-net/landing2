"use server";

import { redirect } from "next/navigation";
import {
  addMonths,
  addonCatalog,
  calculateOrderTotal,
  getAddon,
  getPackage,
  orderFormSchema,
  reservedRootSlugs,
} from "@/lib/admin/catalog";
import type { AddonSlug } from "@/lib/admin/catalog";
import { getAdminSession } from "@/lib/admin/queries";
import { createClient } from "@/lib/supabase/server";

export type CreateOrderState = {
  ok: boolean;
  message: string;
  publicUrl?: string;
  errors?: Record<string, string[] | undefined>;
};

function getStringArray(formData: FormData, key: string) {
  return formData
    .getAll(key)
    .map((value) => String(value))
    .filter(Boolean);
}

function getFileArray(formData: FormData, key: string) {
  return formData
    .getAll(key)
    .filter((value): value is File => value instanceof File && value.size > 0);
}

function sanitizeFileName(fileName: string) {
  return fileName
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

async function uploadOrderFiles({
  orderId,
  slug,
  files,
}: {
  orderId: number;
  slug: string;
  files: File[];
}) {
  const supabase = await createClient();

  if (!supabase || files.length === 0) {
    return [];
  }

  const uploadedAssets: Array<{
    order_id: number;
    asset_type: string;
    file_name: string;
    storage_path: string;
    public_url: string;
    file_size: number;
    mime_type: string;
  }> = [];

  for (const file of files) {
    const fileName = sanitizeFileName(file.name || `asset-${Date.now()}`);
    const storagePath = `orders/${orderId}/gallery/${Date.now()}-${fileName}`;
    const bytes = new Uint8Array(await file.arrayBuffer());

    const { error } = await supabase.storage
      .from("invitation-assets")
      .upload(storagePath, bytes, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      });

    if (error) {
      throw new Error(`Upload ${file.name} gagal: ${error.message}`);
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("invitation-assets").getPublicUrl(storagePath);

    uploadedAssets.push({
      order_id: orderId,
      asset_type: "gallery",
      file_name: fileName,
      storage_path: storagePath,
      public_url: publicUrl,
      file_size: file.size,
      mime_type: file.type || "application/octet-stream",
    });
  }

  console.info(`Uploaded ${uploadedAssets.length} assets for ${slug}`);
  return uploadedAssets;
}

export async function signOutAdmin() {
  const supabase = await createClient();
  await supabase?.auth.signOut();
  redirect("/admin/login");
}

export async function createInvitationOrder(
  _previousState: CreateOrderState,
  formData: FormData,
): Promise<CreateOrderState> {
  const session = await getAdminSession();

  if (!session.configured) {
    return {
      ok: false,
      message: "Supabase belum dikonfigurasi. Tambahkan env Supabase dulu.",
    };
  }

  if (!session.user || !session.isAdmin) {
    return {
      ok: false,
      message: "Kamu harus login sebagai admin untuk membuat pesanan.",
    };
  }

  const supabase = await createClient();

  if (!supabase) {
    return {
      ok: false,
      message: "Supabase client tidak tersedia.",
    };
  }

  const selectedAddonSlugs = getStringArray(formData, "addons").filter((slug) =>
    addonCatalog.some((addon) => addon.slug === slug),
  );

  const parsed = orderFormSchema.safeParse({
    customerName: formData.get("customerName"),
    customerWhatsapp: formData.get("customerWhatsapp"),
    customerEmail: formData.get("customerEmail"),
    groomName: formData.get("groomName"),
    brideName: formData.get("brideName"),
    slug: formData.get("slug"),
    weddingDate: formData.get("weddingDate"),
    akadTime: formData.get("akadTime"),
    akadLocation: formData.get("akadLocation"),
    receptionTime: formData.get("receptionTime"),
    receptionLocation: formData.get("receptionLocation"),
    mapsUrl: formData.get("mapsUrl"),
    packageSlug: formData.get("packageSlug"),
    templateSlug: formData.get("templateSlug"),
    paymentStatus: formData.get("paymentStatus"),
    workStatus: formData.get("workStatus"),
    musicTitle: formData.get("musicTitle"),
    loveStory: formData.get("loveStory"),
    giftAccount: formData.get("giftAccount"),
    notes: formData.get("notes"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Periksa lagi data pesanan.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const input = parsed.data;

  if (reservedRootSlugs.has(input.slug)) {
    return {
      ok: false,
      message: "Slug tersebut digunakan oleh route publik.",
      errors: { slug: ["Pilih slug lain."] },
    };
  }

  const { data: existingSlug } = await supabase
    .from("invitation_orders")
    .select("id")
    .eq("public_slug", input.slug)
    .maybeSingle();

  if (existingSlug) {
    return {
      ok: false,
      message: "Slug undangan sudah dipakai.",
      errors: { slug: ["Slug sudah dipakai pesanan lain."] },
    };
  }

  const selectedPackage = getPackage(input.packageSlug);
  const totals = calculateOrderTotal(input.packageSlug, selectedAddonSlugs);
  const activeUntil = addMonths(new Date(), selectedPackage.durationMonths);

  const { data: order, error: orderError } = await supabase
    .from("invitation_orders")
    .insert({
      created_by: session.user.id,
      public_slug: input.slug,
      customer_name: input.customerName,
      customer_whatsapp: input.customerWhatsapp,
      customer_email: input.customerEmail || null,
      groom_name: input.groomName,
      bride_name: input.brideName,
      package_slug: input.packageSlug,
      package_name: selectedPackage.name,
      template_slug: input.templateSlug,
      payment_status: input.paymentStatus,
      work_status: input.workStatus,
      subtotal_price: totals.packageTotal,
      addon_total: totals.addonTotal,
      total_price: totals.grandTotal,
      active_until: activeUntil.toISOString(),
      music_title: input.musicTitle || null,
      love_story: input.loveStory || null,
      gift_account: input.giftAccount || null,
      notes: input.notes || null,
      is_published: input.workStatus === "selesai",
    })
    .select("id, public_slug")
    .single();

  if (orderError || !order) {
    return {
      ok: false,
      message: orderError?.message ?? "Pesanan gagal dibuat.",
    };
  }

  const events = [
    {
      order_id: order.id,
      event_type: "akad",
      title: "Akad Nikah",
      event_date: input.weddingDate,
      event_time: input.akadTime || null,
      location_name: input.akadLocation,
      maps_url: input.mapsUrl || null,
    },
  ];

  if (input.receptionLocation) {
    events.push({
      order_id: order.id,
      event_type: "resepsi",
      title: "Resepsi",
      event_date: input.weddingDate,
      event_time: input.receptionTime || null,
      location_name: input.receptionLocation,
      maps_url: input.mapsUrl || null,
    });
  }

  const { error: eventError } = await supabase.from("order_events").insert(events);

  if (eventError) {
    return {
      ok: false,
      message: `Pesanan dibuat, tetapi event gagal disimpan: ${eventError.message}`,
    };
  }

  const addons = selectedAddonSlugs
    .map((slug) => getAddon(slug))
    .filter(
      (addon): addon is NonNullable<ReturnType<typeof getAddon>> =>
        addon !== undefined,
    )
    .map((addon) => ({
      order_id: order.id,
      addon_slug: addon.slug as AddonSlug,
      addon_name: addon.name,
      price_snapshot: addon.price,
    }));

  if (addons.length > 0) {
    const { error: addonError } = await supabase
      .from("order_addons")
      .insert(addons);

    if (addonError) {
      return {
        ok: false,
        message: `Pesanan dibuat, tetapi add-on gagal disimpan: ${addonError.message}`,
      };
    }
  }

  const files = getFileArray(formData, "galleryFiles");

  if (files.length > 0) {
    try {
      const uploadedAssets = await uploadOrderFiles({
        orderId: order.id,
        slug: order.public_slug,
        files,
      });

      if (uploadedAssets.length > 0) {
        const { error: assetError } = await supabase
          .from("order_assets")
          .insert(uploadedAssets);

        if (assetError) {
          return {
            ok: false,
            message: `File terupload, tetapi metadata aset gagal disimpan: ${assetError.message}`,
          };
        }
      }
    } catch (error) {
      return {
        ok: false,
        message:
          error instanceof Error ? error.message : "Upload aset gagal diproses.",
      };
    }
  }

  return {
    ok: true,
    message: "Pesanan berhasil dibuat.",
    publicUrl: `/${order.public_slug}`,
  };
}
