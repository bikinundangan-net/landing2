import Image from "next/image";
import {
  CalendarHeart,
  Gift,
  Heart,
  MapPin,
  MessageCircle,
  Music2,
  Video,
} from "lucide-react";
import { submitGuestbook, submitRsvp } from "@/app/[slug]/actions";
import { formatRupiah, getPackage, getTemplate } from "@/lib/admin/catalog";
import type { PublicInvitation } from "@/lib/admin/types";

type Template = ReturnType<typeof getTemplate>;
type Package = ReturnType<typeof getPackage>;
type OrderAsset = PublicInvitation["order_assets"][number];

export type InvitationRenderMode = "demo" | "live";

export type InvitationTemplateProps = {
  invitation: PublicInvitation;
  template: Template;
  selectedPackage: Package;
  renderMode: InvitationRenderMode;
  firstEvent: PublicInvitation["order_events"][number] | null;
  heroAsset: OrderAsset | null;
  galleryAssets: OrderAsset[];
  videoAsset: OrderAsset | null;
  musicAsset: OrderAsset | null;
  display: {
    names: string;
    initials: string;
    eventDay: string;
    eventDate: string;
    eventDateShort: string;
    eventTime: string;
    location: string;
    countdown: Array<{ label: string; value: string }>;
  };
};

export type InvitationTemplateComponent = (
  props: InvitationTemplateProps,
) => React.ReactElement;

const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"];
const videoExtensions = [".mp4", ".webm", ".mov", ".m4v"];
const audioExtensions = [".mp3", ".wav", ".m4a", ".ogg"];

function hasExtension(asset: OrderAsset, extensions: string[]) {
  const value = `${asset.file_name} ${asset.public_url}`.toLowerCase();
  return extensions.some((extension) => value.includes(extension));
}

function assetByType(invitation: PublicInvitation, type: string) {
  return invitation.order_assets.find((asset) => asset.asset_type === type);
}

function isImageAsset(asset: OrderAsset) {
  return asset.asset_type === "gallery"
    ? !hasExtension(asset, videoExtensions) && !hasExtension(asset, audioExtensions)
    : hasExtension(asset, imageExtensions);
}

function isVideoAsset(asset: OrderAsset) {
  return asset.asset_type === "video" || hasExtension(asset, videoExtensions);
}

function isAudioAsset(asset: OrderAsset) {
  return asset.asset_type === "music" || hasExtension(asset, audioExtensions);
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function formatDay(value?: string) {
  if (!value) {
    return "Hari bahagia";
  }

  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
  })
    .format(new Date(value))
    .toUpperCase();
}

function formatShortDate(value?: string) {
  if (!value) {
    return "Tanggal menyusul";
  }

  const date = new Date(value);
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
    .format(date)
    .replace(/\//g, " . ");
}

function formatTime(value?: string | null) {
  if (!value) {
    return "Waktu menyusul";
  }

  return `${value} WIB`;
}

function getInitials(invitation: PublicInvitation) {
  return `${invitation.bride_name[0] ?? "B"} | ${
    invitation.groom_name[0] ?? "G"
  }`.toUpperCase();
}

function buildCountdown(eventDate?: string) {
  if (!eventDate) {
    return [
      { label: "Hari", value: "--" },
      { label: "Jam", value: "--" },
      { label: "Menit", value: "--" },
      { label: "Detik", value: "--" },
    ];
  }

  const target = new Date(`${eventDate}T00:00:00`);
  const today = new Date();
  const milliseconds = Math.max(target.getTime() - today.getTime(), 0);
  const totalDays = Math.ceil(milliseconds / 86_400_000);

  return [
    { label: "Hari", value: String(totalDays).padStart(2, "0") },
    { label: "Jam", value: "00" },
    { label: "Menit", value: "00" },
    { label: "Detik", value: "00" },
  ];
}

export function buildTemplateContext(
  invitation: PublicInvitation,
  template: Template,
  selectedPackage: Package,
  renderMode: InvitationRenderMode = "live",
): InvitationTemplateProps {
  const firstEvent = invitation.order_events[0] ?? null;
  const heroAsset = assetByType(invitation, "hero") ?? null;
  const galleryAssets = invitation.order_assets.filter(
    (asset) => asset.asset_type === "gallery" && isImageAsset(asset),
  );
  const videoAsset = invitation.order_assets.find(isVideoAsset) ?? null;
  const musicAsset = invitation.order_assets.find(isAudioAsset) ?? null;

  return {
    invitation,
    template,
    selectedPackage,
    renderMode,
    firstEvent,
    heroAsset,
    galleryAssets,
    videoAsset,
    musicAsset,
    display: {
      names: `${invitation.bride_name} & ${invitation.groom_name}`,
      initials: getInitials(invitation),
      eventDay: formatDay(firstEvent?.event_date),
      eventDate: firstEvent ? formatDate(firstEvent.event_date) : "Tanggal menyusul",
      eventDateShort: formatShortDate(firstEvent?.event_date),
      eventTime: formatTime(firstEvent?.event_time),
      location: firstEvent?.location_name ?? "Lokasi menyusul",
      countdown: buildCountdown(firstEvent?.event_date),
    },
  };
}

export function OpeningButton({
  className,
  label = "Buka Undangan",
}: {
  className: string;
  label?: string;
}) {
  return (
    <a href="#invitation-content" className={className}>
      {label}
      <Heart className="size-4 fill-current" aria-hidden="true" />
    </a>
  );
}

export function CoupleMonogram({
  initials,
  className,
}: {
  initials: string;
  className: string;
}) {
  return (
    <div className={className} aria-hidden="true">
      {initials}
    </div>
  );
}

export function HeroImage({
  asset,
  alt,
  className,
  overlayClassName,
}: {
  asset: OrderAsset | null;
  alt: string;
  className: string;
  overlayClassName?: string;
}) {
  if (!asset) {
    return null;
  }

  return (
    <div className={className} aria-hidden="true">
      <Image
        src={asset.public_url}
        alt={alt}
        fill
        sizes="100vw"
        className="object-cover"
        preload
      />
      {overlayClassName ? <div className={overlayClassName} /> : null}
    </div>
  );
}

export function CountdownStrip({
  items,
  className,
  itemClassName,
}: {
  items: InvitationTemplateProps["display"]["countdown"];
  className: string;
  itemClassName: string;
}) {
  return (
    <div className={className}>
      {items.map((item) => (
        <div key={item.label} className={itemClassName}>
          <span className="block font-serif text-2xl font-bold leading-none sm:text-3xl">
            {item.value}
          </span>
          <span className="mt-1 block text-[0.62rem] font-black uppercase tracking-[0.18em] opacity-70">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export function EventList({
  invitation,
  className,
  itemClassName,
  iconClassName,
  buttonClassName,
}: {
  invitation: PublicInvitation;
  className: string;
  itemClassName: string;
  iconClassName: string;
  buttonClassName: string;
}) {
  return (
    <div className={className}>
      {invitation.order_events.map((event) => (
        <article key={`${event.event_type}-${event.title}`} className={itemClassName}>
          <CalendarHeart className={iconClassName} aria-hidden="true" />
          <h3 className="mt-4 font-serif text-3xl font-bold">{event.title}</h3>
          <p className="mt-3 text-base font-black">{formatDate(event.event_date)}</p>
          <p className="mt-1 text-sm font-semibold opacity-70">
            {formatTime(event.event_time)}
          </p>
          <p className="mt-4 text-sm leading-6 opacity-76">{event.location_name}</p>
          {event.maps_url ? (
            <a href={event.maps_url} className={buttonClassName}>
              <MapPin className="size-4" aria-hidden="true" />
              Buka Maps
            </a>
          ) : null}
        </article>
      ))}
    </div>
  );
}

export function GallerySection({
  assets,
  videoAsset,
  titleClassName,
  gridClassName,
  imageClassName,
  sectionClassName,
}: {
  assets: OrderAsset[];
  videoAsset: OrderAsset | null;
  titleClassName: string;
  gridClassName: string;
  imageClassName: string;
  sectionClassName: string;
}) {
  if (assets.length === 0 && !videoAsset) {
    return null;
  }

  return (
    <section className={sectionClassName}>
      <h2 className={titleClassName}>Galeri Kenangan</h2>
      {assets.length > 0 ? (
        <div className={gridClassName}>
          {assets.slice(0, 8).map((asset) => (
            <Image
              key={asset.public_url}
              src={asset.public_url}
              alt={asset.file_name}
              width={720}
              height={900}
              className={imageClassName}
              sizes="(min-width: 1024px) 28vw, 82vw"
            />
          ))}
        </div>
      ) : null}
      {videoAsset ? (
        <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-current/10 bg-black/10">
          <video
            src={videoAsset.public_url}
            controls
            className="aspect-video w-full"
            preload="metadata"
          />
        </div>
      ) : null}
    </section>
  );
}

export function MusicPanel({
  invitation,
  musicAsset,
  className,
}: {
  invitation: PublicInvitation;
  musicAsset: OrderAsset | null;
  className: string;
}) {
  if (!invitation.music_title && !musicAsset) {
    return null;
  }

  return (
    <div className={className}>
      <Music2 className="size-4" aria-hidden="true" />
      <span>{invitation.music_title ?? "Musik undangan"}</span>
      {musicAsset ? (
        <audio src={musicAsset.public_url} controls preload="none" className="h-8 w-full" />
      ) : null}
    </div>
  );
}

export function RsvpGuestbookSection({
  invitation,
  sectionClassName,
  panelClassName,
  inputClassName,
  buttonClassName,
  iconClassName,
  showGiftAccount = true,
}: {
  invitation: PublicInvitation;
  sectionClassName: string;
  panelClassName: string;
  inputClassName: string;
  buttonClassName: string;
  iconClassName: string;
  showGiftAccount?: boolean;
}) {
  return (
    <section className={sectionClassName}>
      <form action={submitRsvp} className={panelClassName}>
        <input type="hidden" name="orderId" value={invitation.id} />
        <input type="hidden" name="slug" value={invitation.public_slug} />
        <MessageCircle className={iconClassName} aria-hidden="true" />
        <h2 className="mt-4 font-serif text-3xl font-bold">Konfirmasi RSVP</h2>
        <div className="mt-5 grid gap-3">
          <input
            name="guestName"
            required
            placeholder="Nama tamu"
            className={inputClassName}
          />
          <select name="attendance" className={inputClassName} defaultValue="hadir">
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
            className={inputClassName}
          />
          <textarea
            name="message"
            rows={3}
            placeholder="Ucapan singkat"
            className={inputClassName}
          />
          <button className={buttonClassName}>Kirim RSVP</button>
        </div>
      </form>

      <form action={submitGuestbook} className={panelClassName}>
        <input type="hidden" name="orderId" value={invitation.id} />
        <input type="hidden" name="slug" value={invitation.public_slug} />
        <Gift className={iconClassName} aria-hidden="true" />
        <h2 className="mt-4 font-serif text-3xl font-bold">Buku Tamu</h2>
        {showGiftAccount && invitation.gift_account ? (
          <p className="mt-4 rounded-2xl bg-current/5 p-4 text-sm font-bold leading-6">
            Amplop digital: {invitation.gift_account}
          </p>
        ) : null}
        <div className="mt-5 grid gap-3">
          <input
            name="guestName"
            required
            placeholder="Nama tamu"
            className={inputClassName}
          />
          <textarea
            name="message"
            rows={4}
            required
            placeholder="Tulis doa dan ucapan"
            className={inputClassName}
          />
          <button className={buttonClassName}>Kirim Ucapan</button>
        </div>

        {invitation.guestbook_entries?.length ? (
          <div className="mt-6 space-y-3">
            {invitation.guestbook_entries.slice(0, 3).map((entry) => (
              <div key={`${entry.guest_name}-${entry.created_at}`} className="rounded-2xl bg-current/5 p-4">
                <p className="font-black">{entry.guest_name}</p>
                <p className="mt-1 text-sm leading-6 opacity-70">{entry.message}</p>
              </div>
            ))}
          </div>
        ) : null}
      </form>
    </section>
  );
}

export function ClosingCredit({
  invitation,
  selectedPackage,
  className,
}: {
  invitation: PublicInvitation;
  selectedPackage: Package;
  className: string;
}) {
  return (
    <footer className={className}>
      <p className="font-serif text-3xl font-bold">
        {invitation.bride_name} & {invitation.groom_name}
      </p>
      <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] opacity-56">
        {selectedPackage.name} · {formatRupiah(invitation.total_price)} ·
        Dibuat dengan BikinUndangan.net
      </p>
    </footer>
  );
}

export function TemplatePreviewImage({
  template,
  className,
}: {
  template: Template;
  className: string;
}) {
  return (
    <Image
      src={template.image}
      alt={template.name}
      width={520}
      height={1040}
      className={className}
      sizes="(min-width: 1024px) 320px, 72vw"
    />
  );
}

export function VideoHighlight({
  videoAsset,
  className,
}: {
  videoAsset: OrderAsset | null;
  className: string;
}) {
  if (!videoAsset) {
    return null;
  }

  return (
    <div className={className}>
      <div className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em]">
        <Video className="size-4" aria-hidden="true" />
        Video
      </div>
      <video src={videoAsset.public_url} controls className="aspect-video w-full" preload="metadata" />
    </div>
  );
}
