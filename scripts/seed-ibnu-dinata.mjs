import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import nextEnv from "@next/env";
import { createClient } from "@supabase/supabase-js";

nextEnv.loadEnvConfig(fileURLToPath(new URL("../", import.meta.url)));
const content = JSON.parse(await readFile(new URL("../lib/admin/ibnu-dinata.json", import.meta.url), "utf8"));
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("Supabase URL and service-role key are required in the local environment.");
const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
const publish = process.argv.includes("--publish");

function checked(result, operation) {
  if (result.error) throw new Error(`${operation} failed (${result.error.code || "unknown"}).`);
  return result.data;
}

const existing = checked(await client.from("invitation_orders").select("id,is_published").eq("public_slug", content.slug).maybeSingle(), "Read order");
const details = {
  public_slug: content.slug,
  customer_name: content.displayNames,
  groom_name: content.groom,
  bride_name: content.bride,
  template_slug: "garden-sage",
  music_title: null,
  love_story: content.story,
  gift_account: `${content.bank}\n${content.accountHolder}\n${content.accountDisplay}`,
  notes: `${content.verseSource}: "${content.verse}"\n\n${content.closing}`,
};
let order;
if (existing) {
  // Do not overwrite contact, package, totals, payment, expiry, or workflow state.
  order = checked(await client.from("invitation_orders").update({ ...details, ...(publish ? { is_published: true } : {}) }).eq("id", existing.id).select("id,is_published").single(), "Update order");
} else {
  order = checked(await client.from("invitation_orders").insert({
    ...details, customer_whatsapp: "", package_slug: "basic", package_name: "Basic",
    payment_status: "belum_bayar", work_status: "review",
    subtotal_price: 0, addon_total: 0, total_price: 0, active_until: null,
    // Publish only after the app and its assets have been deployed.
    is_published: publish,
  }).select("id,is_published").single(), "Create order");
}

// Remain usable while the additive SQL migration awaits database access.
const columnCheck = await client.from("order_events").select("event_end_time").limit(0);
if (columnCheck.error && columnCheck.error.code !== "42703" && columnCheck.error.code !== "PGRST204") {
  checked(columnCheck, "Check event schema");
}
const hasEndTime = !columnCheck.error;
const event = { ...content.event, order_id: order.id };
if (!hasEndTime) delete event.event_end_time;
const events = checked(await client.from("order_events").select("id").eq("order_id", order.id).eq("event_type", "akad").eq("event_date", content.event.event_date).order("id").limit(1), "Read event");
checked(events.length
  ? await client.from("order_events").update(event).eq("id", events[0].id)
  : await client.from("order_events").insert(event), "Save event");

for (const asset of [
  { asset_type: "hero", file_name: "ibnu-dinata-couple-illustration.webp", public_url: content.illustration },
  { asset_type: "other", file_name: "ibnu-dinata-botanical-spray.webp", public_url: content.botanical },
]) {
  const assets = checked(await client.from("order_assets").select("id").eq("order_id", order.id).eq("file_name", asset.file_name).order("id").limit(1), "Read managed asset");
  const values = { ...asset, order_id: order.id, storage_path: asset.public_url.replace(/^\//, ""), mime_type: "image/webp" };
  checked(assets.length
    ? await client.from("order_assets").update(values).eq("id", assets[0].id)
    : await client.from("order_assets").insert(values), "Save managed asset");
}
console.log(JSON.stringify({ slug: content.slug, orderId: order.id, published: order.is_published, endTimeMigrationApplied: hasEndTime }));
if (!hasEndTime) console.warn("Apply supabase/migrations/202610270001_event_end_time.sql. The invitation uses its configured 09.00 end time until then.");
