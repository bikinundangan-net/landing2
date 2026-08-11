import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";
import {
  CalendarDays,
  Clock3,
  Gift,
  Heart,
  MapPin,
} from "lucide-react";
import { Suspense } from "react";
import type { InvitationTemplateProps } from "@/components/invitation/templates/shared";
import {
  CountdownStrip,
  formatDate,
  MusicPanel,
  RsvpGuestbookSection,
} from "@/components/invitation/templates/shared";
import {
  ClassicRoseCover,
  ClassicRoseDemoForms,
  ClassicRoseGallery,
  ClassicRoseGiftCopy,
  ClassicRoseReveal,
} from "@/components/invitation/templates/classic-rose-client";
import { siteUrl } from "@/lib/site";

const cormorant = Cormorant_Garamond({
  variable: "--font-classic-rose",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

function compactDate(value: string) {
  return value.replace(/\s*\.\s*/g, ".");
}

function clockStyle(value: string) {
  return value.replace(":", ".");
}

function locationLines(value: string) {
  return value
    .split(/,\s*|\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 3);
}

export function ClassicRose(props: InvitationTemplateProps) {
  const {
    invitation,
    renderMode,
    heroAsset,
    galleryAssets,
    videoAsset,
    musicAsset,
    display,
  } = props;

  const isDemo = renderMode === "demo";
  const coverCopy = {
    initials: isDemo
      ? "R | A"
      : `${invitation.groom_name[0] ?? "G"} | ${
          invitation.bride_name[0] ?? "B"
        }`.toUpperCase(),
    groomName: isDemo ? "Rizki" : invitation.groom_name,
    brideName: isDemo ? "Ayu" : invitation.bride_name,
    eventDay: isDemo ? "SABTU" : display.eventDay,
    eventDate: isDemo ? "12.10.2026" : compactDate(display.eventDateShort),
    eventTime: isDemo ? "10.00 WIB" : clockStyle(display.eventTime),
    locationLines: isDemo
      ? ["GEDUNG SERBA GUNA", "Jl. Bahagia No. 123", "Jakarta Selatan"]
      : locationLines(display.location),
  };
  const portraitSource = heroAsset?.public_url ?? null;
  const galleryImages = galleryAssets.map((asset, index) => ({
    src: asset.public_url,
    alt: asset.file_name || `Foto kenangan ${index + 1}`,
  }));

  return (
    <main
      className={`${cormorant.variable} classic-rose-shell mx-auto min-h-screen max-w-[30rem] overflow-hidden bg-[#fff8f3] text-[#4b2023] shadow-[0_0_80px_rgba(0,0,0,0.22)]`}
    >
      <Suspense fallback={null}>
        <ClassicRoseCover copy={coverCopy} />
      </Suspense>

      <div
        id="invitation-content"
        className="classic-rose-paper relative overflow-hidden"
      >
        <section className="classic-rose-section classic-rose-welcome">
          <ClassicRoseReveal>
            <p className="classic-rose-eyebrow">Dengan penuh cinta</p>
            <h2>Hari yang kami nantikan akhirnya tiba.</h2>
            <div className="classic-rose-ornament" aria-hidden="true">
              <span />
              <Heart className="size-3 fill-current" />
              <span />
            </div>
            <p className="classic-rose-copy">
              Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
              pasangan-pasangan untukmu dari jenismu sendiri.
            </p>
            <p className="classic-rose-verse">QS. Ar-Rum : 21</p>
          </ClassicRoseReveal>

          <ClassicRoseReveal className="classic-rose-portrait-wrap" delay={0.08}>
            {portraitSource ? (
              <Image
                src={portraitSource}
                alt={`Foto ${invitation.groom_name} dan ${invitation.bride_name}`}
                fill
                sizes="(min-width: 1024px) 400px, 88vw"
                className="object-cover"
                preload={isDemo}
              />
            ) : (
              <div className="classic-rose-portrait-fallback">
                <span>{coverCopy.initials}</span>
                <small>Foto pasangan</small>
              </div>
            )}
          </ClassicRoseReveal>

          <ClassicRoseReveal className="text-center" delay={0.12}>
            <p className="classic-rose-script">Mempelai</p>
            <h3 className="classic-rose-couple-names">
              {invitation.groom_name}
              <span>&amp;</span>
              {invitation.bride_name}
            </h3>
            <p className="classic-rose-copy">
              {invitation.love_story ??
                "Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu."}
            </p>
            <MusicPanel
              invitation={invitation}
              musicAsset={musicAsset}
              className="classic-rose-music"
            />
          </ClassicRoseReveal>
        </section>

        <div className="classic-rose-floral-divider" aria-hidden="true">
          <Image
            src="/images/invitations/classic-rose/floral-divider.webp"
            alt=""
            fill
            sizes="480px"
            className="object-cover"
          />
        </div>

        <section className="classic-rose-section classic-rose-events">
          <ClassicRoseReveal>
            <p className="classic-rose-eyebrow">Menuju hari bahagia</p>
            <h2>Save the Date</h2>
            <p className="classic-rose-copy">
              Kami berharap Anda dapat menjadi bagian dari momen yang penuh
              syukur ini.
            </p>
          </ClassicRoseReveal>

          <ClassicRoseReveal delay={0.08}>
            <CountdownStrip
              items={display.countdown}
              className="classic-rose-countdown"
              itemClassName="classic-rose-countdown__item"
            />
          </ClassicRoseReveal>

          <div className="classic-rose-event-list">
            {invitation.order_events.map((event, index) => (
              <ClassicRoseReveal
                key={`${event.event_type}-${event.title}`}
                className="classic-rose-event"
                delay={index * 0.06}
              >
                <div className="classic-rose-event__icon" aria-hidden="true">
                  <CalendarDays className="size-6" />
                </div>
                <p className="classic-rose-eyebrow">{event.event_type}</p>
                <h3>{event.title}</h3>
                <p className="classic-rose-event__date">
                  {isDemo
                    ? `Sabtu, 12 Oktober 2026`
                    : formatDate(event.event_date)}
                </p>
                <p className="classic-rose-event__meta">
                  <Clock3 className="size-4" aria-hidden="true" />
                  {event.event_time
                    ? `${clockStyle(event.event_time)} WIB`
                    : "Waktu menyusul"}
                </p>
                <p className="classic-rose-event__location">
                  {event.location_name}
                </p>
                {event.maps_url ? (
                  <a
                    href={event.maps_url}
                    className="classic-rose-secondary-button"
                  >
                    <MapPin className="size-4" aria-hidden="true" />
                    Buka Maps
                  </a>
                ) : null}
              </ClassicRoseReveal>
            ))}
          </div>
        </section>

        <section className="classic-rose-section classic-rose-story">
          <ClassicRoseReveal>
            <p className="classic-rose-eyebrow">Cerita kami</p>
            <h2>Di setiap langkah, kami menemukan rumah.</h2>
            <p className="classic-rose-copy">
              {invitation.love_story ??
                "Pertemuan sederhana membawa kami pada perjalanan yang penuh makna. Kini kami memilih berjalan bersama, dalam suka maupun duka."}
            </p>
          </ClassicRoseReveal>

          {galleryImages.length > 0 ? (
            <ClassicRoseReveal delay={0.08}>
              <p className="classic-rose-script text-center">
                Galeri Kenangan
              </p>
              <ClassicRoseGallery images={galleryImages} />
            </ClassicRoseReveal>
          ) : null}

          {videoAsset ? (
            <ClassicRoseReveal className="classic-rose-video" delay={0.12}>
              <video
                src={videoAsset.public_url}
                controls
                preload="metadata"
                className="aspect-video w-full"
              />
            </ClassicRoseReveal>
          ) : null}
        </section>

        {invitation.gift_account ? (
          <section className="classic-rose-section classic-rose-gift">
            <ClassicRoseReveal>
              <div className="classic-rose-gift__icon" aria-hidden="true">
                <Gift className="size-7" />
              </div>
              <p className="classic-rose-eyebrow">Tanda kasih</p>
              <h2>Amplop Digital</h2>
              <p className="classic-rose-copy">
                Doa restu Anda adalah hadiah terindah bagi kami. Bagi yang
                berkenan, tanda kasih dapat disampaikan melalui:
              </p>
              <div className="classic-rose-account">
                <span>Rekening tujuan</span>
                <strong>{invitation.gift_account}</strong>
              </div>
              <ClassicRoseGiftCopy account={invitation.gift_account} />
            </ClassicRoseReveal>
          </section>
        ) : null}

        <section className="classic-rose-section classic-rose-rsvp">
          <ClassicRoseReveal>
            <p className="classic-rose-eyebrow">Kami menanti kabar Anda</p>
            <h2>RSVP &amp; Ucapan</h2>
            <p className="classic-rose-copy">
              Mohon konfirmasi kehadiran dan tinggalkan doa terbaik untuk
              langkah baru kami.
            </p>
          </ClassicRoseReveal>

          <ClassicRoseReveal delay={0.08}>
            {isDemo ? (
              <ClassicRoseDemoForms />
            ) : (
              <RsvpGuestbookSection
                invitation={invitation}
                sectionClassName="classic-rose-form-stack"
                panelClassName="classic-rose-form"
                inputClassName="classic-rose-input"
                buttonClassName="classic-rose-primary-button"
                iconClassName="classic-rose-form-icon"
                commentsClassName="classic-rose-comments"
                commentListClassName="classic-rose-comments__list"
                commentItemClassName="classic-rose-comments__item"
                showGiftAccount={false}
              />
            )}
          </ClassicRoseReveal>
        </section>
      </div>

      <footer className="classic-rose-closing">
        <Image
          src="/images/invitations/classic-rose/closing-background.webp"
          alt=""
          fill
          sizes="480px"
          className="object-cover"
        />
        <ClassicRoseReveal className="classic-rose-closing__content">
          <p className="classic-rose-eyebrow">Terima kasih</p>
          <h2>
            {invitation.groom_name}
            <span>&amp;</span>
            {invitation.bride_name}
          </h2>
          <p>
            Merupakan kebahagiaan bagi kami apabila Anda berkenan hadir dan
            memberikan doa restu.
          </p>
          <div className="classic-rose-ornament" aria-hidden="true">
            <span />
            <Heart className="size-3 fill-current" />
            <span />
          </div>
          <small>
            Dibuat dengan{" "}
            <a href={siteUrl} target="_blank" rel="noopener noreferrer">
              BikinUndangan.net
            </a>
          </small>
        </ClassicRoseReveal>
      </footer>
    </main>
  );
}
