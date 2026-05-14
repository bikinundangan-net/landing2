import Image from "next/image";
import { CalendarHeart, Gift, MapPin, MessageCircle, Music2 } from "lucide-react";
import { submitGuestbook, submitRsvp } from "@/app/[slug]/actions";
import { formatRupiah, getPackage, getTemplate } from "@/lib/admin/catalog";
import type { PublicInvitation } from "@/lib/admin/types";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function assetByType(invitation: PublicInvitation, type: string) {
  return invitation.order_assets.find((asset) => asset.asset_type === type);
}

export function PublicInvitationView({
  invitation,
}: {
  invitation: PublicInvitation;
}) {
  const template = getTemplate(invitation.template_slug);
  const selectedPackage = getPackage(invitation.package_slug);
  const firstEvent = invitation.order_events[0];
  const heroAsset = assetByType(invitation, "hero");
  const galleryAssets = invitation.order_assets.filter(
    (asset) => asset.asset_type === "gallery",
  );
  const isDark = invitation.template_slug === "gold-premium";

  return (
    <main
      className={`min-h-screen ${isDark ? "text-[#fff7de]" : "text-[var(--template-deep)]"}`}
      style={
        {
          "--template-bg": template.palette.background,
          "--template-accent": template.palette.accent,
          "--template-deep": template.palette.deep,
          "--template-soft": template.palette.soft,
          background:
            invitation.template_slug === "gold-premium"
              ? "radial-gradient(circle at 50% 0%, rgba(197,155,74,0.26), transparent 32rem), #111111"
              : `linear-gradient(180deg, ${template.palette.background}, #fffdf8 48%, ${template.palette.background})`,
        } as React.CSSProperties
      }
    >
      <section className="relative grid min-h-screen place-items-center overflow-hidden px-6 py-16 text-center">
        <div
          className="absolute inset-x-8 top-8 h-52 rounded-full opacity-25 blur-3xl"
          style={{ background: "var(--template-soft)" }}
        />
        {heroAsset ? (
          <Image
            src={heroAsset.public_url}
            alt={`Foto ${invitation.bride_name} dan ${invitation.groom_name}`}
            fill
            sizes="100vw"
            className="absolute inset-0 object-cover opacity-28"
          />
        ) : null}
        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="font-serif text-2xl italic opacity-80">The Wedding of</p>
          <h1 className="mt-6 font-serif text-6xl font-bold leading-tight sm:text-8xl">
            {invitation.bride_name}
            <span className="block text-[0.54em]">&</span>
            {invitation.groom_name}
          </h1>
          {firstEvent ? (
            <p className="mx-auto mt-7 max-w-xl text-lg font-semibold leading-8 opacity-78">
              {formatDate(firstEvent.event_date)} · {firstEvent.location_name}
            </p>
          ) : null}
          <a
            href="#detail"
            className="mt-9 inline-flex rounded-full px-7 py-4 text-sm font-black text-white shadow-soft"
            style={{ background: "var(--template-accent)" }}
          >
            Buka Undangan
          </a>
        </div>
      </section>

      <section id="detail" className="mx-auto grid max-w-6xl gap-8 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] opacity-55">
            Dengan hormat
          </p>
          <h2 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-6xl">
            Kami mengundang keluarga dan sahabat untuk hadir.
          </h2>
          <p className="mt-6 text-lg leading-8 opacity-70">
            {invitation.love_story ??
              "Menjadi sebuah kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu."}
          </p>
          {invitation.music_title ? (
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-current/15 px-4 py-2 text-sm font-bold">
              <Music2 className="size-4" aria-hidden="true" />
              {invitation.music_title}
            </p>
          ) : null}
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div
            className="absolute inset-8 rounded-full opacity-35 blur-3xl"
            style={{ background: "var(--template-soft)" }}
          />
          <div className="relative overflow-hidden rounded-[2rem] border border-current/10 bg-white/50 p-5 shadow-soft">
            <Image
              src={template.image}
              alt={template.name}
              width={520}
              height={1040}
              className="mx-auto h-[34rem] w-auto object-contain"
              sizes="360px"
              priority
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-4 md:grid-cols-2">
          {invitation.order_events.map((event) => (
            <article
              key={`${event.event_type}-${event.title}`}
              className="rounded-lg border border-current/10 bg-white/62 p-6 shadow-soft"
            >
              <CalendarHeart
                className="size-6"
                style={{ color: "var(--template-accent)" }}
                aria-hidden="true"
              />
              <h3 className="mt-5 font-serif text-3xl font-bold">{event.title}</h3>
              <p className="mt-3 text-lg font-black">
                {formatDate(event.event_date)}
              </p>
              <p className="mt-1 font-semibold opacity-68">
                {event.event_time ? `${event.event_time} WIB` : "Waktu menyusul"}
              </p>
              <p className="mt-5 leading-7 opacity-72">{event.location_name}</p>
              {event.maps_url ? (
                <a
                  href={event.maps_url}
                  className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-black text-white"
                  style={{ background: "var(--template-accent)" }}
                >
                  <MapPin className="size-4" aria-hidden="true" />
                  Buka Maps
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      {galleryAssets.length > 0 ? (
        <section className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-serif text-4xl font-bold">Galeri</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryAssets.slice(0, 6).map((asset) => (
              <Image
                key={asset.public_url}
                src={asset.public_url}
                alt={asset.file_name}
                width={720}
                height={900}
                className="aspect-[4/5] rounded-lg object-cover shadow-soft"
              />
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-16 lg:grid-cols-2">
        <form
          action={submitRsvp}
          className="rounded-lg border border-current/10 bg-white/68 p-6 shadow-soft"
        >
          <input type="hidden" name="orderId" value={invitation.id} />
          <input type="hidden" name="slug" value={invitation.public_slug} />
          <MessageCircle
            className="size-6"
            style={{ color: "var(--template-accent)" }}
            aria-hidden="true"
          />
          <h2 className="mt-5 font-serif text-4xl font-bold">Konfirmasi RSVP</h2>
          <div className="mt-6 grid gap-3">
            <input
              name="guestName"
              required
              placeholder="Nama tamu"
              className="h-12 rounded-lg border border-current/10 bg-white px-4 text-sm font-bold outline-none"
            />
            <select
              name="attendance"
              className="h-12 rounded-lg border border-current/10 bg-white px-4 text-sm font-bold outline-none"
              defaultValue="hadir"
            >
              <option value="hadir">Hadir</option>
              <option value="tidak_hadir">Tidak hadir</option>
              <option value="ragu">Masih ragu</option>
            </select>
            <input
              name="guestCount"
              type="number"
              min="1"
              max="10"
              defaultValue="1"
              className="h-12 rounded-lg border border-current/10 bg-white px-4 text-sm font-bold outline-none"
            />
            <textarea
              name="message"
              rows={3}
              placeholder="Ucapan singkat"
              className="rounded-lg border border-current/10 bg-white px-4 py-3 text-sm font-bold outline-none"
            />
            <button
              className="rounded-lg px-5 py-3 text-sm font-black text-white"
              style={{ background: "var(--template-accent)" }}
            >
              Kirim RSVP
            </button>
          </div>
        </form>

        <form
          action={submitGuestbook}
          className="rounded-lg border border-current/10 bg-white/68 p-6 shadow-soft"
        >
          <input type="hidden" name="orderId" value={invitation.id} />
          <input type="hidden" name="slug" value={invitation.public_slug} />
          <Gift
            className="size-6"
            style={{ color: "var(--template-accent)" }}
            aria-hidden="true"
          />
          <h2 className="mt-5 font-serif text-4xl font-bold">Buku Tamu</h2>
          {invitation.gift_account ? (
            <p className="mt-4 rounded-lg bg-white/72 p-4 text-sm font-bold leading-6 opacity-75">
              Amplop digital: {invitation.gift_account}
            </p>
          ) : null}
          <div className="mt-6 grid gap-3">
            <input
              name="guestName"
              required
              placeholder="Nama tamu"
              className="h-12 rounded-lg border border-current/10 bg-white px-4 text-sm font-bold outline-none"
            />
            <textarea
              name="message"
              rows={4}
              required
              placeholder="Tulis doa dan ucapan"
              className="rounded-lg border border-current/10 bg-white px-4 py-3 text-sm font-bold outline-none"
            />
            <button
              className="rounded-lg px-5 py-3 text-sm font-black text-white"
              style={{ background: "var(--template-accent)" }}
            >
              Kirim Ucapan
            </button>
          </div>

          {invitation.guestbook_entries?.length ? (
            <div className="mt-7 space-y-3">
              {invitation.guestbook_entries.slice(0, 3).map((entry) => (
                <div
                  key={`${entry.guest_name}-${entry.created_at}`}
                  className="rounded-lg bg-white/70 p-4"
                >
                  <p className="font-black">{entry.guest_name}</p>
                  <p className="mt-1 text-sm leading-6 opacity-66">{entry.message}</p>
                </div>
              ))}
            </div>
          ) : null}
        </form>
      </section>

      <footer className="mx-auto max-w-6xl px-6 pb-12 pt-4 text-center">
        <p className="font-serif text-3xl font-bold">
          {invitation.bride_name} & {invitation.groom_name}
        </p>
        <p className="mt-3 text-sm font-bold opacity-52">
          {selectedPackage.name} · {formatRupiah(invitation.total_price)} ·
          Dibuat dengan BikinUndangan.net
        </p>
      </footer>
    </main>
  );
}
