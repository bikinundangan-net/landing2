"use client";

import { useActionState, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  CreditCard,
  FileImage,
  Gauge,
  Globe2,
  LayoutDashboard,
  ListChecks,
  LogOut,
  MessageCircle,
  Palette,
  Plus,
  Search,
  Settings,
  Sparkles,
  UploadCloud,
  UsersRound,
} from "lucide-react";
import {
  createInvitationOrder,
  signOutAdmin,
  type CreateOrderState,
} from "@/app/admin/actions";
import {
  addonCatalog,
  calculateOrderTotal,
  formatRupiah,
  packageCatalog,
  paymentStatuses,
  templateCatalog,
  workStatuses,
} from "@/lib/admin/catalog";
import type { AdminOrderSummary } from "@/lib/admin/types";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Pesanan", icon: ListChecks },
  { label: "Buat Undangan", icon: Plus, active: true },
  { label: "Template", icon: Palette },
  { label: "Tamu", icon: UsersRound },
  { label: "Pembayaran", icon: CreditCard },
  { label: "Pengaturan", icon: Settings },
];

const wizardSteps = [
  "Data Customer",
  "Data Mempelai",
  "Detail Acara",
  "Paket & Add-on",
  "Upload Aset",
  "Review & Publish",
];

const initialOrderState: CreateOrderState = {
  ok: false,
  message: "",
};

const statusLabels: Record<string, string> = {
  baru: "Baru",
  data_lengkap: "Data Lengkap",
  dikerjakan: "Dikerjakan",
  review: "Review",
  selesai: "Selesai",
  belum_bayar: "Belum Bayar",
  menunggu: "Menunggu",
  lunas: "Lunas",
  refund: "Refund",
};

type AdminDashboardProps = {
  mode: "setup" | "live";
  orders: AdminOrderSummary[];
  adminName?: string;
};

function byStatus(orders: AdminOrderSummary[], status: string) {
  return orders.filter((order) => order.work_status === status).length;
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  defaultValue,
  required,
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-xs font-black text-ink/72">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="mt-2 h-11 w-full rounded-lg border border-maroon/10 bg-white px-3 text-sm font-semibold text-ink outline-none transition placeholder:text-ink/30 focus:border-maroon/45"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  children,
  defaultValue,
}: {
  label: string;
  name: string;
  children: React.ReactNode;
  defaultValue?: string;
}) {
  return (
    <label className="block text-xs font-black text-ink/72">
      {label}
      <select
        name={name}
        defaultValue={defaultValue}
        className="mt-2 h-11 w-full rounded-lg border border-maroon/10 bg-white px-3 text-sm font-semibold text-ink outline-none transition focus:border-maroon/45"
      >
        {children}
      </select>
    </label>
  );
}

function StatusPill({ status }: { status: string }) {
  const isDone = status === "selesai" || status === "lunas";
  const isProgress =
    status === "data_lengkap" || status === "dikerjakan" || status === "review";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[0.68rem] font-black ${
        isDone
          ? "bg-sage/12 text-sage"
          : isProgress
            ? "bg-maroon/10 text-maroon"
            : "bg-rose/14 text-[#9a614d]"
      }`}
    >
      {statusLabels[status] ?? status}
    </span>
  );
}

export function AdminDashboard({
  mode,
  orders,
  adminName = "Admin Demo",
}: AdminDashboardProps) {
  const [state, formAction, isPending] = useActionState(
    createInvitationOrder,
    initialOrderState,
  );
  const [stepIndex, setStepIndex] = useState(0);
  const [packageSlug, setPackageSlug] = useState("premium");
  const [templateSlug, setTemplateSlug] = useState("luxury-maroon");
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["express"]);
  const [workStatus, setWorkStatus] = useState("data_lengkap");

  const totals = useMemo(
    () => calculateOrderTotal(packageSlug, selectedAddons),
    [packageSlug, selectedAddons],
  );

  const revenueToday = orders.reduce((total, order) => total + order.total_price, 0);
  const waitingAssets = orders.filter((order) => order.work_status === "baru").length;
  const priorityOrders = orders.filter(
    (order) => order.package_slug === "premium" || order.package_slug === "exclusive",
  ).length;

  function toggleAddon(slug: string) {
    setSelectedAddons((current) =>
      current.includes(slug)
        ? current.filter((item) => item !== slug)
        : [...current, slug],
    );
  }

  return (
    <main className="min-h-screen bg-[#f6efe5] text-ink">
      <div className="grid min-h-screen lg:grid-cols-[17rem_1fr]">
        <aside className="hidden border-r border-maroon/10 bg-[#fbf7ef] px-4 py-5 lg:block">
          <Link href="/" className="flex items-center gap-3 px-2">
            <span className="grid size-10 place-items-center overflow-hidden rounded-lg shadow-soft">
              <Image
                src="/logo.png"
                alt="Logo BikinUndangan.net"
                width={512}
                height={512}
                className="size-10 scale-[2.35] object-contain"
              />
            </span>
            <span>
              <span className="block font-serif text-xl font-bold text-maroon-dark">
                BikinUndangan
              </span>
              <span className="block text-xs font-bold text-ink/48">
                Admin wedding ops
              </span>
            </span>
          </Link>

          <nav className="mt-9 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-black transition ${
                  item.active
                    ? "bg-maroon text-cream"
                    : "text-ink/62 hover:bg-white hover:text-maroon"
                }`}
              >
                <item.icon className="size-4" aria-hidden="true" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-8 rounded-lg border border-maroon/10 bg-white p-4">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-maroon">
              Status sistem
            </p>
            <p className="mt-3 text-sm font-bold leading-6 text-ink/62">
              {mode === "live"
                ? "Terhubung ke Supabase. Auth, order, dan storage aktif."
                : "Demo visual aktif. Tambahkan env Supabase untuk menyimpan pesanan."}
            </p>
          </div>
        </aside>

        <section className="min-w-0">
          <header className="sticky top-0 z-30 border-b border-maroon/10 bg-[#f6efe5]/86 backdrop-blur-xl">
            <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
              <div className="min-w-0">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-maroon">
                  Admin / Pesanan / Baru
                </p>
                <h1 className="truncate font-serif text-2xl font-bold text-maroon-dark">
                  Buat Pesanan Undangan
                </h1>
              </div>

              <div className="hidden min-w-0 flex-1 justify-center md:flex">
                <label className="flex h-10 w-full max-w-md items-center gap-3 rounded-lg border border-maroon/10 bg-white px-3 text-ink/48">
                  <Search className="size-4" aria-hidden="true" />
                  <input
                    className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-ink/35"
                    placeholder="Cari order, pasangan, WhatsApp..."
                  />
                </label>
              </div>

              <div className="flex items-center gap-2">
                <button className="grid size-10 place-items-center rounded-lg border border-maroon/10 bg-white text-ink/58">
                  <Bell className="size-4" aria-hidden="true" />
                </button>
                {mode === "live" ? (
                  <form action={signOutAdmin}>
                    <button className="grid size-10 place-items-center rounded-lg border border-maroon/10 bg-white text-maroon">
                      <LogOut className="size-4" aria-hidden="true" />
                    </button>
                  </form>
                ) : null}
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-black text-ink">{adminName}</p>
                  <p className="text-xs font-bold text-ink/45">
                    {mode === "live" ? "Admin aktif" : "Preview mode"}
                  </p>
                </div>
              </div>
            </div>
          </header>

          <div className="grid gap-5 p-4 sm:p-6 xl:grid-cols-[1fr_22rem]">
            <div className="min-w-0 space-y-5">
              {mode === "setup" ? (
                <div className="rounded-lg border border-maroon/15 bg-white px-5 py-4">
                  <p className="text-sm font-black text-maroon">
                    Supabase belum dikonfigurasi
                  </p>
                  <p className="mt-1 text-sm leading-6 text-ink/62">
                    Dashboard ini menampilkan data demo. Setelah env Supabase
                    dan migration aktif, form akan menyimpan pesanan, aset, dan
                    link publik sungguhan.
                  </p>
                </div>
              ) : null}

              <motion.section
                className="grid gap-3 md:grid-cols-4"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                {[
                  {
                    label: "Order hari ini",
                    value: orders.length,
                    icon: Gauge,
                    note: "pipeline aktif",
                  },
                  {
                    label: "Menunggu aset",
                    value: waitingAssets,
                    icon: FileImage,
                    note: "perlu follow-up",
                  },
                  {
                    label: "Prioritas",
                    value: priorityOrders,
                    icon: Sparkles,
                    note: "Premium/Exclusive",
                  },
                  {
                    label: "Revenue",
                    value: formatRupiah(revenueToday),
                    icon: CreditCard,
                    note: "sample hari ini",
                  },
                ].map((metric) => (
                  <article
                    key={metric.label}
                    className="rounded-lg border border-maroon/10 bg-white p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-black uppercase tracking-[0.12em] text-ink/45">
                        {metric.label}
                      </p>
                      <metric.icon className="size-4 text-maroon" aria-hidden="true" />
                    </div>
                    <p className="mt-3 text-2xl font-black text-maroon-dark">
                      {metric.value}
                    </p>
                    <p className="mt-1 text-xs font-bold text-ink/45">
                      {metric.note}
                    </p>
                  </article>
                ))}
              </motion.section>

              <section className="rounded-lg border border-maroon/10 bg-white">
                <div className="flex flex-col gap-3 border-b border-maroon/10 px-5 py-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-lg font-black text-maroon-dark">
                      Pipeline pesanan
                    </h2>
                    <p className="mt-1 text-sm font-semibold text-ink/52">
                      Pantau status kerja sebelum membuat order baru.
                    </p>
                  </div>
                  <a
                    href="#create-order"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-maroon px-4 py-2.5 text-sm font-black !text-cream"
                  >
                    <Plus className="size-4" aria-hidden="true" />
                    Buat Pesanan
                  </a>
                </div>

                <div className="grid divide-y divide-maroon/10 md:grid-cols-5 md:divide-x md:divide-y-0">
                  {workStatuses.map((status) => (
                    <div key={status} className="min-h-28 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-black text-ink">
                          {statusLabels[status]}
                        </p>
                        <span className="grid size-7 place-items-center rounded-full bg-cream text-xs font-black text-maroon">
                          {byStatus(orders, status)}
                        </span>
                      </div>
                      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-cream">
                        <div
                          className="h-full rounded-full bg-maroon"
                          style={{
                            width: `${Math.min(byStatus(orders, status) * 24 + 18, 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <form
                id="create-order"
                action={formAction}
                className="rounded-lg border border-maroon/10 bg-white"
              >
                <div className="border-b border-maroon/10 px-5 py-4">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <h2 className="text-lg font-black text-maroon-dark">
                        Wizard Buat Pesanan
                      </h2>
                      <p className="mt-1 text-sm font-semibold text-ink/52">
                        Input data customer sampai publish link undangan.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {wizardSteps.map((step, index) => (
                        <button
                          key={step}
                          type="button"
                          onClick={() => setStepIndex(index)}
                          className={`rounded-lg px-3 py-2 text-xs font-black transition ${
                            stepIndex === index
                              ? "bg-maroon text-cream"
                              : "bg-cream text-ink/55 hover:text-maroon"
                          }`}
                        >
                          {index + 1}. {step}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  {stepIndex === 0 ? (
                    <div className="grid gap-4 md:grid-cols-3">
                      <Field
                        label="Nama customer"
                        name="customerName"
                        defaultValue="Rina Paramita"
                        required
                      />
                      <Field
                        label="WhatsApp"
                        name="customerWhatsapp"
                        defaultValue="+6281211101048"
                        required
                      />
                      <Field
                        label="Email opsional"
                        name="customerEmail"
                        type="email"
                        placeholder="customer@email.com"
                      />
                    </div>
                  ) : null}

                  {stepIndex === 1 ? (
                    <div className="grid gap-4 md:grid-cols-3">
                      <Field
                        label="Nama mempelai pria"
                        name="groomName"
                        defaultValue="Fajar"
                        required
                      />
                      <Field
                        label="Nama mempelai wanita"
                        name="brideName"
                        defaultValue="Rina"
                        required
                      />
                      <Field
                        label="Slug root link"
                        name="slug"
                        defaultValue="rina-fajar"
                        required
                      />
                    </div>
                  ) : (
                    <>
                      <input type="hidden" name="groomName" value="Fajar" />
                      <input type="hidden" name="brideName" value="Rina" />
                      <input type="hidden" name="slug" value="rina-fajar" />
                    </>
                  )}

                  {stepIndex === 0 ? null : (
                    <>
                      <input type="hidden" name="customerName" value="Rina Paramita" />
                      <input
                        type="hidden"
                        name="customerWhatsapp"
                        value="+6281211101048"
                      />
                      <input type="hidden" name="customerEmail" value="" />
                    </>
                  )}

                  {stepIndex === 2 ? (
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field
                        label="Tanggal pernikahan"
                        name="weddingDate"
                        type="date"
                        defaultValue="2026-08-22"
                        required
                      />
                      <Field
                        label="Jam akad"
                        name="akadTime"
                        type="time"
                        defaultValue="09:00"
                      />
                      <Field
                        label="Lokasi akad"
                        name="akadLocation"
                        defaultValue="Masjid Agung Bandung"
                        required
                      />
                      <Field
                        label="Jam resepsi"
                        name="receptionTime"
                        type="time"
                        defaultValue="12:00"
                      />
                      <Field
                        label="Lokasi resepsi"
                        name="receptionLocation"
                        defaultValue="The Trans Luxury Hotel Bandung"
                      />
                      <Field
                        label="Google Maps URL"
                        name="mapsUrl"
                        type="url"
                        defaultValue="https://maps.google.com"
                      />
                    </div>
                  ) : (
                    <>
                      <input type="hidden" name="weddingDate" value="2026-08-22" />
                      <input type="hidden" name="akadTime" value="09:00" />
                      <input
                        type="hidden"
                        name="akadLocation"
                        value="Masjid Agung Bandung"
                      />
                      <input type="hidden" name="receptionTime" value="12:00" />
                      <input
                        type="hidden"
                        name="receptionLocation"
                        value="The Trans Luxury Hotel Bandung"
                      />
                      <input type="hidden" name="mapsUrl" value="https://maps.google.com" />
                    </>
                  )}

                  {stepIndex === 3 ? (
                    <div className="space-y-6">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.12em] text-ink/45">
                          Pilih paket
                        </p>
                        <div className="mt-3 grid gap-3 md:grid-cols-3">
                          {packageCatalog.map((item) => (
                            <label
                              key={item.slug}
                              className={`relative cursor-pointer rounded-lg border p-4 transition ${
                                packageSlug === item.slug
                                  ? "border-maroon bg-maroon text-cream"
                                  : "border-maroon/10 bg-cream/34 text-ink hover:border-maroon/25"
                              }`}
                            >
                              <input
                                type="radio"
                                name="packageSlug"
                                value={item.slug}
                                checked={packageSlug === item.slug}
                                onChange={() => setPackageSlug(item.slug)}
                                className="sr-only"
                              />
                              {item.popular ? (
                                <span className="absolute right-3 top-3 rounded-full bg-cream px-2 py-1 text-[0.62rem] font-black text-maroon">
                                  MOST POPULAR
                                </span>
                              ) : null}
                              <span className="block text-sm font-black">{item.name}</span>
                              <span className="mt-3 block font-serif text-3xl font-bold">
                                {formatRupiah(item.price)}
                              </span>
                              <span
                                className={`mt-2 block text-xs font-bold ${
                                  packageSlug === item.slug ? "text-cream/72" : "text-ink/48"
                                }`}
                              >
                                {item.durationMonths} bulan aktif
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.12em] text-ink/45">
                          Add-on
                        </p>
                        <div className="mt-3 grid gap-2 md:grid-cols-3">
                          {addonCatalog.map((addon) => (
                            <label
                              key={addon.slug}
                              className="flex cursor-pointer items-center gap-3 rounded-lg border border-maroon/10 bg-cream/34 p-3 text-sm font-bold text-ink transition hover:border-maroon/25"
                            >
                              <input
                                type="checkbox"
                                name="addons"
                                value={addon.slug}
                                checked={selectedAddons.includes(addon.slug)}
                                onChange={() => toggleAddon(addon.slug)}
                                className="size-4 accent-maroon"
                              />
                              <span className="min-w-0 flex-1">
                                {addon.name}
                                <span className="block text-xs text-maroon">
                                  +{formatRupiah(addon.price)}
                                </span>
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <input type="hidden" name="packageSlug" value={packageSlug} />
                      {selectedAddons.map((slug) => (
                        <input key={slug} type="hidden" name="addons" value={slug} />
                      ))}
                    </>
                  )}

                  {stepIndex === 4 ? (
                    <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
                      <label className="rounded-lg border border-dashed border-maroon/25 bg-cream/34 p-5 text-sm font-bold text-ink/62">
                        <UploadCloud className="mb-3 size-6 text-maroon" aria-hidden="true" />
                        Upload galeri / aset undangan
                        <input
                          type="file"
                          name="galleryFiles"
                          multiple
                          accept="image/*,video/*,audio/*"
                          className="mt-4 block w-full text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-maroon file:px-4 file:py-2 file:text-sm file:font-black file:text-cream"
                        />
                      </label>
                      <div className="grid gap-4">
                        <Field
                          label="Judul musik"
                          name="musicTitle"
                          defaultValue="Perfect - Ed Sheeran"
                        />
                        <Field
                          label="Rekening amplop digital"
                          name="giftAccount"
                          defaultValue="BCA 1234567890 a.n. Rina Paramita"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <input
                        type="hidden"
                        name="musicTitle"
                        value="Perfect - Ed Sheeran"
                      />
                      <input
                        type="hidden"
                        name="giftAccount"
                        value="BCA 1234567890 a.n. Rina Paramita"
                      />
                    </>
                  )}

                  {stepIndex === 5 ? (
                    <div className="grid gap-4 md:grid-cols-2">
                      <SelectField
                        label="Status pembayaran"
                        name="paymentStatus"
                        defaultValue="lunas"
                      >
                        {paymentStatuses.map((status) => (
                          <option key={status} value={status}>
                            {statusLabels[status]}
                          </option>
                        ))}
                      </SelectField>
                      <SelectField
                        label="Status pekerjaan"
                        name="workStatus"
                        defaultValue={workStatus}
                      >
                        {workStatuses.map((status) => (
                          <option key={status} value={status}>
                            {statusLabels[status]}
                          </option>
                        ))}
                      </SelectField>
                      <label className="block text-xs font-black text-ink/72 md:col-span-2">
                        Love story
                        <textarea
                          name="loveStory"
                          rows={4}
                          defaultValue="Berawal dari pertemuan sederhana, kami belajar bahwa rumah adalah seseorang yang membuat hari terasa tenang."
                          className="mt-2 w-full rounded-lg border border-maroon/10 bg-white px-3 py-3 text-sm font-semibold text-ink outline-none transition focus:border-maroon/45"
                        />
                      </label>
                      <label className="block text-xs font-black text-ink/72 md:col-span-2">
                        Catatan produksi
                        <textarea
                          name="notes"
                          rows={3}
                          placeholder="Catatan admin, revisi, preferensi warna, atau request khusus."
                          className="mt-2 w-full rounded-lg border border-maroon/10 bg-white px-3 py-3 text-sm font-semibold text-ink outline-none transition focus:border-maroon/45"
                        />
                      </label>
                    </div>
                  ) : (
                    <>
                      <input type="hidden" name="paymentStatus" value="lunas" />
                      <input type="hidden" name="workStatus" value={workStatus} />
                      <input
                        type="hidden"
                        name="loveStory"
                        value="Berawal dari pertemuan sederhana, kami belajar bahwa rumah adalah seseorang yang membuat hari terasa tenang."
                      />
                      <input type="hidden" name="notes" value="" />
                    </>
                  )}

                  <input type="hidden" name="templateSlug" value={templateSlug} />

                  <div className="mt-6 border-t border-maroon/10 pt-5">
                    <p className="mb-3 text-xs font-black uppercase tracking-[0.12em] text-ink/45">
                      Template
                    </p>
                    <div className="grid gap-3 md:grid-cols-4">
                      {templateCatalog.map((template) => (
                        <button
                          key={template.slug}
                          type="button"
                          onClick={() => setTemplateSlug(template.slug)}
                          className={`flex items-center gap-3 rounded-lg border p-2 text-left transition ${
                            templateSlug === template.slug
                              ? "border-maroon bg-cream"
                              : "border-maroon/10 bg-white hover:border-maroon/25"
                          }`}
                        >
                          <span className="relative h-14 w-10 shrink-0 overflow-hidden rounded-md bg-cream">
                            <Image
                              src={template.image}
                              alt={template.name}
                              fill
                              sizes="40px"
                              className="object-cover"
                            />
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-black text-ink">
                              {template.name}
                            </span>
                            <span className="block truncate text-xs font-bold text-ink/45">
                              {template.theme}
                            </span>
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {state.message ? (
                    <div
                      className={`mt-5 rounded-lg border px-4 py-3 text-sm font-bold ${
                        state.ok
                          ? "border-sage/20 bg-sage/10 text-sage"
                          : "border-red-200 bg-red-50 text-red-700"
                      }`}
                    >
                      {state.message}
                      {state.publicUrl ? (
                        <Link
                          href={state.publicUrl}
                          className="ml-2 inline-flex !text-maroon underline"
                        >
                          Buka {state.publicUrl}
                        </Link>
                      ) : null}
                    </div>
                  ) : null}

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        disabled={stepIndex === 0}
                        onClick={() => setStepIndex((index) => Math.max(index - 1, 0))}
                        className="rounded-lg border border-maroon/10 bg-white px-4 py-2.5 text-sm font-black text-ink/62 disabled:opacity-40"
                      >
                        Kembali
                      </button>
                      <button
                        type="button"
                        disabled={stepIndex === wizardSteps.length - 1}
                        onClick={() =>
                          setStepIndex((index) =>
                            Math.min(index + 1, wizardSteps.length - 1),
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-lg border border-maroon/10 bg-cream px-4 py-2.5 text-sm font-black text-maroon disabled:opacity-40"
                      >
                        Lanjut
                        <ChevronRight className="size-4" aria-hidden="true" />
                      </button>
                    </div>
                    <button
                      type="submit"
                      disabled={isPending}
                      className="rounded-lg bg-maroon px-5 py-3 text-sm font-black !text-cream transition hover:bg-maroon-dark disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isPending ? "Menyimpan..." : "Buat Pesanan"}
                    </button>
                  </div>
                </div>
              </form>

              <section className="overflow-hidden rounded-lg border border-maroon/10 bg-white">
                <div className="border-b border-maroon/10 px-5 py-4">
                  <h2 className="text-lg font-black text-maroon-dark">
                    Pesanan terbaru
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] text-left text-sm">
                    <thead className="bg-cream/60 text-xs font-black uppercase tracking-[0.12em] text-ink/45">
                      <tr>
                        <th className="px-5 py-3">Order</th>
                        <th className="px-5 py-3">Pasangan</th>
                        <th className="px-5 py-3">Paket</th>
                        <th className="px-5 py-3">Bayar</th>
                        <th className="px-5 py-3">Status</th>
                        <th className="px-5 py-3">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-maroon/10">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-cream/36">
                          <td className="px-5 py-4 font-black text-maroon">
                            #{order.id}
                          </td>
                          <td className="px-5 py-4">
                            <p className="font-black text-ink">
                              {order.bride_name} & {order.groom_name}
                            </p>
                            <p className="mt-1 text-xs font-bold text-ink/45">
                              /{order.public_slug}
                            </p>
                          </td>
                          <td className="px-5 py-4 font-bold capitalize">
                            {order.package_slug}
                          </td>
                          <td className="px-5 py-4">
                            <StatusPill status={order.payment_status} />
                          </td>
                          <td className="px-5 py-4">
                            <StatusPill status={order.work_status} />
                          </td>
                          <td className="px-5 py-4 font-black text-maroon-dark">
                            {formatRupiah(order.total_price)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            <aside className="space-y-5 xl:sticky xl:top-20 xl:self-start">
              <section className="rounded-lg border border-maroon/10 bg-white p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.12em] text-maroon">
                      Ringkasan invoice
                    </p>
                    <h2 className="mt-2 text-xl font-black text-maroon-dark">
                      {formatRupiah(totals.grandTotal)}
                    </h2>
                  </div>
                  <div className="grid size-11 place-items-center rounded-lg bg-maroon text-cream">
                    <CreditCard className="size-5" aria-hidden="true" />
                  </div>
                </div>

                <div className="mt-5 space-y-3 text-sm font-bold">
                  <div className="flex justify-between gap-4">
                    <span className="text-ink/55">Paket</span>
                    <span>{formatRupiah(totals.packageTotal)}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-ink/55">Add-on</span>
                    <span>{formatRupiah(totals.addonTotal)}</span>
                  </div>
                  <div className="flex justify-between gap-4 border-t border-maroon/10 pt-3 text-maroon">
                    <span>Total</span>
                    <span>{formatRupiah(totals.grandTotal)}</span>
                  </div>
                </div>
              </section>

              <section className="rounded-lg border border-maroon/10 bg-white p-5">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-ink/45">
                  Checklist publikasi
                </p>
                <div className="mt-4 space-y-3">
                  {[
                    "Data customer",
                    "Data mempelai",
                    "Detail acara",
                    "Paket & add-on",
                    "Aset foto",
                    "Pembayaran",
                    "Preview link",
                  ].map((item, index) => (
                    <div key={item} className="flex items-center gap-3 text-sm font-bold">
                      <span
                        className={`grid size-6 place-items-center rounded-full ${
                          index <= stepIndex ? "bg-maroon text-cream" : "bg-cream text-ink/35"
                        }`}
                      >
                        <Check className="size-3.5" aria-hidden="true" />
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-lg border border-maroon/10 bg-white p-5">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-ink/45">
                  Timeline status
                </p>
                <div className="mt-4 space-y-3">
                  {workStatuses.map((status) => {
                    const active = status === workStatus;
                    return (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setWorkStatus(status)}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-black transition ${
                          active
                            ? "bg-maroon text-cream"
                            : "bg-cream/70 text-ink/58 hover:text-maroon"
                        }`}
                      >
                        {statusLabels[status]}
                        {active ? <Check className="size-4" aria-hidden="true" /> : null}
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="rounded-lg border border-maroon/10 bg-white p-5">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-ink/45">
                  Handoff
                </p>
                <div className="mt-4 grid gap-2">
                  <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-maroon/10 bg-cream px-4 py-2.5 text-sm font-black text-maroon">
                    <Globe2 className="size-4" aria-hidden="true" />
                    Preview /rina-fajar
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1f9d5b] px-4 py-2.5 text-sm font-black text-white">
                    <MessageCircle className="size-4" aria-hidden="true" />
                    Kirim ke WhatsApp
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-maroon/10 bg-white px-4 py-2.5 text-sm font-black text-ink/62">
                    <CalendarDays className="size-4" aria-hidden="true" />
                    SLA prioritas
                  </button>
                </div>
              </section>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
