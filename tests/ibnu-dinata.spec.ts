import { test, expect } from "@playwright/test";
import { createClient } from "@supabase/supabase-js";
import nextEnv from "@next/env";

nextEnv.loadEnvConfig(process.cwd());

async function openInvitation(page: import("@playwright/test").Page) {
  await page.goto("/ibnu-dinata?to=Keluarga%20Budi");
  await page.getByRole("button", { name: "Buka Undangan", exact: true }).click();
  await expect(page.locator("#invitation-content")).toHaveAttribute("data-open", "true");
}

for (const viewport of [{ width: 360, height: 640 }, { width: 390, height: 844 }, { width: 768, height: 1024 }, { width: 1440, height: 1000 }]) {
  test(`floral cover and gate sequence at ${viewport.width}px`, async ({ page }, testInfo) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.setViewportSize(viewport);
    await page.goto("/ibnu-dinata?to=Keluarga%20Budi");
    await expect(page).toHaveTitle("Undangan Ibnu & Dinata");
    await expect(page.getByText("Keluarga Budi", { exact: true })).toBeVisible();
    await expect(page.locator("#invitation-content")).toHaveAttribute("inert", "");
    expect(await page.evaluate(() => getComputedStyle(document.body).overflow)).toBe("hidden");
    const button = page.getByRole("button", { name: "Buka Undangan", exact: true });
    await expect(button).toBeInViewport();
    await expect(page.getByTestId("invitation-gate")).toBeVisible();
    await expect(page.locator("[data-logo-half]")).toHaveCount(2);
    await expect(page.locator("[data-logo-half='left']")).toHaveCSS("opacity", "1");
    await page.screenshot({ path: testInfo.outputPath("cover.png") });
    await button.focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("[data-phase='opening']")).toBeVisible();
    await expect(page.locator("button[aria-controls='invitation-content']")).toBeDisabled();
    await expect.poll(() => page.getByTestId("gate-left").evaluate(el => new DOMMatrixReadOnly(getComputedStyle(el).transform).m13)).toBeGreaterThan(0.2);
    await expect.poll(() => page.getByTestId("gate-right").evaluate(el => new DOMMatrixReadOnly(getComputedStyle(el).transform).m13)).toBeLessThan(-0.2);
    await expect.poll(() => page.getByTestId("gate-left").evaluate(el => new DOMMatrixReadOnly(getComputedStyle(el).transform).m11)).toBeLessThan(-0.2);
    await expect.poll(() => page.getByTestId("invitation-gate").evaluate(el => new DOMMatrixReadOnly(getComputedStyle(el).transform).m11)).toBeGreaterThan(1.2);
    await expect(page.locator("[data-logo-half='left']")).toHaveCSS("opacity", "0");
    await expect(page.getByTestId("opening-petal").filter({ visible: true })).toHaveCount(viewport.width <= 620 ? 18 : 30);
    await expect(page.locator("#invitation-content")).toHaveAttribute("inert", "");
    await page.screenshot({ path: testInfo.outputPath("opening.png") });
    await expect(page.locator("#invitation-content")).toHaveAttribute("data-open", "true");
    await expect(page.locator("#invitation-content")).toBeFocused();
    await expect(page.locator("#invitation-content")).not.toHaveAttribute("inert", "");
    expect(await page.evaluate(() => getComputedStyle(document.body).overflow)).not.toBe("hidden");
    await expect(page.getByRole("heading", { name: "Ibnu Hardani", exact: true })).toHaveCount(1);
    await page.getByText("07.00–09.00 WIB", { exact: true }).scrollIntoViewIfNeeded();
    await expect(page.getByText("07.00–09.00 WIB", { exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Petunjuk lokasi" })).toHaveAttribute("href", "https://maps.app.goo.gl/JUYQyFZva6c8rDW87");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.getByTestId("opening-petals")).toHaveCount(0);
    expect(await page.locator("#invitation-content > section").first().evaluate(el => getComputedStyle(el).transform)).toBe("none");
    await expect(page.locator("audio")).toHaveAttribute("src", "/song/youre-still-the-one.mp3");
    await expect(page.getByRole("heading", { name: "Galeri Kenangan" })).toHaveCount(0);
    expect(errors).toEqual([]);
  });
}

test("reduced motion opens immediately without petals", async ({ page }) => {
  const hydrationErrors: string[] = [];
  page.on("console", msg => { if (msg.type() === "error" && /hydrat/i.test(msg.text())) hydrationErrors.push(msg.text()); });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/ibnu-dinata");
  await expect(page.getByText("Bapak/Ibu/Saudara/i", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Buka Undangan", exact: true }).evaluate(el => { (el as HTMLButtonElement).click(); (el as HTMLButtonElement).click(); });
  await expect(page.locator("#invitation-content")).toHaveAttribute("data-open", "true", { timeout: 1000 });
  await expect(page.getByRole("button", { name: "Buka Undangan", exact: true })).toHaveCount(0);
  await expect(page.getByTestId("opening-petals")).toHaveCount(0);
  expect(hydrationErrors).toEqual([]);
});

test("gate opens through the scene and reveals a ready hero without a blank frame", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/ibnu-dinata");
  await page.evaluate(() => {
    const samples: { opacity: number; sceneScale: number; leftAngle: number; heroReady: boolean }[] = [];
    (window as unknown as { openingSamples: typeof samples }).openingSamples = samples;
    function sample() {
      const cover = document.querySelector<HTMLElement>("[data-testid='opening-cover']");
      if (!cover) return;
      const scene = document.querySelector<HTMLElement>("[data-testid='invitation-gate']")!;
      const door = document.querySelector<HTMLElement>("[data-testid='gate-left']")!;
      const heading = document.querySelector<HTMLElement>("[aria-label='Pernikahan Ibnu dan Dinata'] h2")!;
      const portrait = document.querySelector<HTMLImageElement>("[aria-label='Pernikahan Ibnu dan Dinata'] img:not([aria-hidden])")!;
      const opacity = Number(getComputedStyle(cover).opacity);
      if (opacity < 0.95 && opacity > 0.005) samples.push({
        opacity,
        sceneScale: new DOMMatrixReadOnly(getComputedStyle(scene).transform).m11,
        leftAngle: new DOMMatrixReadOnly(getComputedStyle(door).transform).m13,
        heroReady: getComputedStyle(heading).visibility === "visible" && Number(getComputedStyle(heading.parentElement!).opacity) > 0.95 && getComputedStyle(portrait).visibility === "visible" && portrait.complete && portrait.naturalWidth > 0,
      });
      requestAnimationFrame(sample);
    }
    requestAnimationFrame(sample);
  });
  await page.getByRole("button", { name: "Buka Undangan", exact: true }).click();
  await expect(page.locator("#invitation-content")).toHaveAttribute("data-open", "true");
  const samples = await page.evaluate(() => (window as unknown as { openingSamples: { opacity: number; sceneScale: number; leftAngle: number; heroReady: boolean }[] }).openingSamples);
  expect(samples.length).toBeGreaterThan(2);
  expect(samples.every(frame => frame.heroReady)).toBe(true);
  const finalFrame = samples[samples.length - 1];
  expect(finalFrame.sceneScale).toBeGreaterThan(1.2);
  expect(finalFrame.leftAngle).toBeGreaterThan(0.9);
});

test("rapid clicks start only one gate opening sequence", async ({ page }) => {
  await page.goto("/ibnu-dinata");
  await page.getByRole("button", { name: "Buka Undangan", exact: true }).evaluate(el => { for (let i = 0; i < 5; i++) (el as HTMLButtonElement).click(); });
  await expect(page.locator("[data-phase='opening']")).toHaveCount(1);
  await expect(page.getByTestId("opening-petals")).toHaveCount(1);
  await expect(page.locator("#invitation-content")).toHaveAttribute("data-open", "true");
  await expect(page.locator("#invitation-content")).toBeFocused();
  await expect(page.getByTestId("invitation-gate")).toHaveCount(0);
});

test("music starts with the opening click and the disc button pauses and resumes it", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/ibnu-dinata");
  await expect(page.getByRole("button", { name: /musik/ })).toHaveCount(0);
  await page.getByRole("button", { name: "Buka Undangan", exact: true }).click();
  const audio = page.locator("audio");
  await expect.poll(() => audio.evaluate(el => (el as HTMLAudioElement).paused)).toBe(false);
  await page.getByRole("button", { name: "Jeda musik: You're Still the One", exact: true }).click();
  await expect.poll(() => audio.evaluate(el => (el as HTMLAudioElement).paused)).toBe(true);
  await page.getByRole("button", { name: "Putar musik: You're Still the One", exact: true }).click();
  await expect.poll(() => audio.evaluate(el => (el as HTMLAudioElement).paused)).toBe(false);
});

test("metadata includes date, illustration, and canonical URL", async ({ request }) => {
  const response = await request.get("/ibnu-dinata");
  expect(response.ok()).toBeTruthy();
  const html = await response.text();
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  expect(canonical).toBe(`${(process.env.NEXT_PUBLIC_SITE_URL || "https://bikinundangan.net").replace(/\/$/, "")}/ibnu-dinata`);
  expect(html).toContain("07.00–09.00 WIB");
  expect(html).toContain("couple-illustration.webp");
});

test("copy account number handles success and denied clipboard", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await openInvitation(page);
  await page.getByRole("button", { name: "Salin nomor rekening", exact: true }).click();
  await expect(page.getByText("8666011215 berhasil disalin.", { exact: true })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("8666011215");
  await page.evaluate(() => { navigator.clipboard.writeText = async () => { throw new Error("denied"); }; });
  await page.getByRole("button", { name: "Nomor tersalin", exact: true }).click();
  await expect(page.getByText("Belum dapat menyalin. Salin manual nomor 8666011215.", { exact: true })).toBeVisible();
});

test("countdown reaches zero after the akad start", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.clock.install({ time: new Date("2026-11-08T06:59:00+07:00") });
  await openInvitation(page);
  const timer = page.getByRole("timer");
  await expect.poll(async () => Number((await timer.locator(":scope > div > span:first-child").allTextContents())[3])).toBeGreaterThan(0);
  await page.clock.fastForward(70_000);
  await expect.poll(() => timer.locator(":scope > div > span:first-child").allTextContents()).toEqual(["00", "00", "00", "00"]);
});

test("transport failure reports failure without claiming persistence", async ({ page }) => {
  await openInvitation(page);
  const form = page.getByRole("form", { name: "Konfirmasi kehadiran", exact: true });
  await form.getByLabel("Nama Anda", { exact: true }).fill("QA Tidak Terkirim");
  await page.route("**/ibnu-dinata*", route => route.request().method() === "POST" ? route.abort("failed") : route.continue());
  await form.getByRole("button", { name: "Kirim konfirmasi", exact: true }).click();
  await expect(form.getByRole("alert")).toContainText("Koneksi terputus");
  await expect(form.getByRole("button", { name: "Kirim konfirmasi", exact: true })).toBeEnabled();
});

test("server rejects invalid attendance even when client validation is bypassed", async ({ page }) => {
  await openInvitation(page);
  const form = page.getByRole("form", { name: "Konfirmasi kehadiran", exact: true });
  await form.getByLabel("Nama Anda", { exact: true }).fill("QA Invalid Attendance");
  await form.getByLabel("Konfirmasi kehadiran", { exact: true }).evaluate(el => {
    const option = document.createElement("option");
    option.value = "invalid"; option.selected = true;
    el.appendChild(option);
  });
  await form.getByRole("button", { name: "Kirim konfirmasi", exact: true }).click();
  await expect(form.getByRole("alert")).toContainText("Periksa nama dan isian Anda");
});

test("other invitation designs still render", async ({ page }) => {
  for (const path of ["/demo/garden-sage", "/hamsyah-yuyun"]) {
    const response = await page.goto(path);
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("[aria-label='Sampul undangan Ibnu dan Dinata']")).toHaveCount(0);
  }
});

test("RSVP and wishes persist on the real draft order", async ({ page }) => {
  test.skip(process.env.RUN_INVITATION_DB_TESTS !== "1", "Opt in to real, cleaned-up database writes with RUN_INVITATION_DB_TESTS=1.");
  nextEnv.loadEnvConfig(process.cwd());
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
  const name = `QA Ibnu ${Date.now()}`;
  const { data: order, error } = await client.from("invitation_orders").select("id,is_published").eq("public_slug", "ibnu-dinata").single();
  expect(error).toBeNull();
  expect(order?.is_published).toBe(false);
  try {
    await openInvitation(page);
    const form = page.getByRole("form", { name: "Konfirmasi kehadiran", exact: true });
    await form.evaluate(el => {
      const input = document.createElement("input");
      input.type = "hidden"; input.name = "orderId"; input.value = "999999999"; el.appendChild(input);
    });
    await form.getByLabel("Nama Anda", { exact: true }).fill(name);
    await form.getByLabel("Jumlah tamu", { exact: true }).fill("2");
    await form.getByRole("button", { name: "Kirim konfirmasi", exact: true }).click();
    await expect(form.getByRole("status")).toContainText("sudah tersimpan");
    const rsvp = await client.from("rsvps").select("order_id,attendance,guest_count").eq("order_id", order!.id).eq("guest_name", name).single();
    expect(rsvp.error).toBeNull();
    expect(rsvp.data).toMatchObject({ order_id: order!.id, attendance: "hadir", guest_count: 2 });
    await page.getByRole("button", { name: "Doa & ucapan", exact: true }).click();
    const wish = page.getByRole("form", { name: "Kirim doa dan ucapan", exact: true });
    await wish.getByLabel("Nama Anda", { exact: true }).fill(name);
    await wish.getByLabel("Doa & ucapan", { exact: true }).fill("QA: Semoga menjadi keluarga yang penuh kasih.");
    await wish.getByRole("button", { name: "Kirim ucapan", exact: true }).click();
    await expect(wish.getByRole("status")).toContainText("sudah tersimpan");
    const saved = await client.from("guestbook_entries").select("order_id,message").eq("order_id", order!.id).eq("guest_name", name).single();
    expect(saved.error).toBeNull();
    expect(saved.data?.message).toBe("QA: Semoga menjadi keluarga yang penuh kasih.");
    await expect(page.getByRole("article").filter({ hasText: name })).toBeVisible();
  } finally {
    for (const table of ["rsvps", "guestbook_entries"]) {
      const cleanup = await client.from(table).delete().eq("order_id", order!.id).eq("guest_name", name);
      expect(cleanup.error).toBeNull();
    }
  }
});
