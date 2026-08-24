import Image from "next/image";
import { Cormorant_Garamond, Playfair_Display } from "next/font/google";
import {
  CalendarDays,
  Clock3,
  Gift,
  Heart,
  MapPin,
  Music2,
  Quote,
} from "lucide-react";
import { Suspense, type CSSProperties } from "react";
import type { InvitationTemplateProps } from "@/components/invitation/templates/shared";
import {
  CountdownStrip,
  formatDate,
  RsvpGuestbookSection,
} from "@/components/invitation/templates/shared";
import {
  BackgroundMusicPlayer,
  ModernMinimalCover,
  ThemedGiftAddress,
  ThemedGiftAccountList,
  GentleThemedReveal as ThemedReveal,
} from "@/components/invitation/templates/themed-invitation-client";
import type { ThemedInvitationConfig } from "@/components/invitation/templates/themed-invitation";
import { siteUrl } from "@/lib/site";

const playfair = Playfair_Display({
  variable: "--font-themed-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-themed-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

function clockStyle(value: string) {
  return value.slice(0, 5).replace(":", ".");
}

function splitLocation(value: string) {
  return value
    .split(/,\s*|\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 3);
}

const loveStoryMoments = [
  {
    title: "Pertemuan yang tak direncanakan",
    photo: "/images/invitations/modern-minimal/hamsyah-yuyun-foto1.webp",
    alt: "Momen pertama Hamsyah dan Yuyun",
    paragraphs: [
      "Berawal dari sebuah pertemuan yang tak pernah direncanakan.",
      "Awal tahun 2024 menjadi awal dari sebuah cerita yang tak pernah kami sangka sebelumnya. Kami dipertemukan tanpa sengaja, dalam sebuah pertemuan sederhana yang perlahan membawa kami pada kisah yang begitu berarti.",
      "Seiring berjalannya waktu, rasa nyaman tumbuh menjadi rasa sayang. Kami mulai mengenal satu sama lain lebih dalam, berbagi cerita, melewati berbagai momen bersama, hingga akhirnya menyadari bahwa ada seseorang yang ingin kami jadikan tempat untuk pulang.",
    ],
  },
  {
    title: "Restu dua keluarga",
    photo: "/images/invitations/modern-minimal/hamsyah-yuyun-foto2.webp",
    alt: "Kedua keluarga Hamsyah dan Yuyun",
    paragraphs: [
      "Bukan hanya kami yang semakin dekat, tetapi juga kedua keluarga. Kehangatan, doa, dan dukungan dari orang-orang yang kami sayangi membuat hubungan ini semakin yakin untuk melangkah ke tahap berikutnya.",
      "Hingga akhirnya, dengan penuh rasa syukur dan keyakinan, kami memutuskan untuk menyatukan dua hati dalam sebuah ikatan pernikahan.",
    ],
  },
  {
    title: "Babak baru",
    photo: "/images/invitations/modern-minimal/hamsyah-yuyun-foto3.webp",
    alt: "Hamsyah dan Yuyun menuju hari bahagia",
    paragraphs: [
      "Dari sebuah pertemuan yang tak disengaja, tumbuh sebuah cinta yang kami pilih untuk dijaga selamanya.",
      "Dan kini, kami siap menulis babak baru dalam perjalanan cinta kami bersama, dalam satu ikatan, menuju selamanya. 🤍",
    ],
  },
];

const giftAccounts = [
  { owner: "Yuyun Istiqomah", bank: "BCA", number: "0601133562" },
  { owner: "Hamsyah", bank: "BCA", number: "8465510494" },
];

const giftDelivery = {
  recipient: "Hamsyah & Yuyun",
  address:
    "Jl. Monjali, Gemawang RT 02/43 No. 102, Sinduadi, Mlati, Sleman, Yogyakarta",
};

export function ThemedInvitationHamsyahYuyun({
  config,
  ...props
}: InvitationTemplateProps & { config: ThemedInvitationConfig }) {
  const { invitation, heroAsset, videoAsset, display } = props;
  const receptionEvent = invitation.order_events[1] ?? invitation.order_events[0];
  const firstDisplayName = invitation.groom_name;
  const secondDisplayName = "Yuyun";
  const coverCopy = {
    variant: config.variant,
    background: config.coverBackground,
    monogram: display.initials,
    kicker: config.kicker,
    brideName: firstDisplayName,
    groomName: secondDisplayName,
    eventDay: display.eventDay,
    eventTime: clockStyle(display.eventTime),
    eventDate: display.eventDateShort.replace(/\s*\.\s*/g, "."),
    locationLines: splitLocation(display.location),
    note: config.coverNote,
  };
  const portraitSource = heroAsset?.public_url ?? null;
  const themeStyle = {
    "--theme-bg": config.palette.bg,
    "--theme-surface": config.palette.surface,
    "--theme-ink": config.palette.ink,
    "--theme-muted": config.palette.muted,
    "--theme-accent": config.palette.accent,
    "--theme-accent-contrast": config.palette.accentContrast,
    "--theme-line": config.palette.line,
    "--theme-section-art": `url("${config.sectionBackground}")`,
    "--theme-cover-art": `url("${config.coverBackground}")`,
  } as CSSProperties;

  return (
    <main
      style={themeStyle}
      className={`${playfair.variable} ${cormorant.variable} themed-invitation themed-invitation--${config.variant} themed-invitation--hamsyah-yuyun mx-auto min-h-screen max-w-[30rem] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.22)]`}
    >
      <BackgroundMusicPlayer src="/song/pawestri.mp3" />
      <Suspense fallback={null}>
        <ModernMinimalCover
          motionPace="gentle"
          copy={{
            ...coverCopy,
            monogramDrawn: true,
            verse: config.verse,
            verseSource: config.verseSource,
            receptionLabel: (receptionEvent?.title ?? "Resepsi").toUpperCase(),
            receptionTime: receptionEvent?.event_time
              ? `${clockStyle(receptionEvent.event_time)} WIB`
              : "Waktu menyusul",
          }}
        />
      </Suspense>

      <div id="invitation-content" className="themed-paper">
        <section className="themed-section themed-welcome">
          <ThemedReveal>
            <p className="themed-eyebrow">{config.welcomeEyebrow}</p>
            <h2>{config.welcomeTitle}</h2>
            <div className="themed-ornament" aria-hidden="true">
              <span />
              <Heart className="size-3 fill-current" />
              <span />
            </div>
            <div className="themed-quote">
              <Quote className="size-5" aria-hidden="true" />
              <p>{config.verse}</p>
              <small>{config.verseSource}</small>
            </div>
          </ThemedReveal>

          <ThemedReveal className="themed-portrait" delay={0.08}>
            {portraitSource ? (
              <Image
                src={portraitSource}
                alt={`Foto ${firstDisplayName} dan ${secondDisplayName}`}
                fill
                sizes="(min-width: 1024px) 390px, 84vw"
                className="object-cover"
              />
            ) : (
              <div className="themed-portrait__fallback">
                <strong>{coverCopy.monogram}</strong>
                <span>Foto pasangan</span>
              </div>
            )}
          </ThemedReveal>

          <ThemedReveal className="themed-couple" delay={0.12}>
            <p className="themed-eyebrow">Kedua mempelai</p>
            <h3>
              {firstDisplayName}
              <span>&amp;</span>
              {secondDisplayName}
            </h3>
          </ThemedReveal>
        </section>

        <section className="themed-section themed-events">
          <ThemedReveal>
            <p className="themed-eyebrow">Menuju hari bahagia</p>
            <h2>Save the Date</h2>
            <p className="themed-section-copy">
              Simpan tanggalnya dan hadir menjadi bagian dari awal perjalanan
              kami.
            </p>
          </ThemedReveal>

          <ThemedReveal delay={0.06}>
            <CountdownStrip
              items={display.countdown}
              targetDate={display.countdownTarget}
              className="themed-countdown"
              itemClassName="themed-countdown__item"
            />
          </ThemedReveal>

          <div className="themed-event-list">
            {invitation.order_events.map((event, index) => (
              <ThemedReveal
                className="themed-event"
                delay={index * 0.05}
                key={`${event.event_type}-${event.title}`}
              >
                <div className="themed-event__icon" aria-hidden="true">
                  <CalendarDays className="size-5" />
                </div>
                <p className="themed-eyebrow">{event.event_type}</p>
                <h3>{event.title}</h3>
                <p className="themed-event__date">
                  {formatDate(event.event_date)}
                </p>
                <p className="themed-event__meta">
                  <Clock3 className="size-4" aria-hidden="true" />
                  {event.event_time
                    ? `${clockStyle(event.event_time)} WIB`
                    : "Waktu menyusul"}
                </p>
                <p className="themed-event__location">
                  {event.location_name}
                </p>
                {event.maps_url ? (
                  <a href={event.maps_url} className="themed-button">
                    <MapPin className="size-4" aria-hidden="true" />
                    Buka Maps
                  </a>
                ) : null}
              </ThemedReveal>
            ))}
          </div>
        </section>

        {videoAsset ? (
          <section className="themed-section themed-story">
            <ThemedReveal className="themed-video" delay={0.1}>
              <video
                src={videoAsset.public_url}
                controls
                preload="metadata"
                className="aspect-video w-full"
              />
            </ThemedReveal>
          </section>
        ) : null}

        <section className="themed-section themed-love-story">
          <ThemedReveal>
            <p className="themed-eyebrow">Our Love Story</p>
            <h2>Perjalanan cinta kami</h2>
          </ThemedReveal>

          <div className="themed-love-story__timeline">
            {loveStoryMoments.map((moment, index) => (
              <ThemedReveal
                key={moment.title}
                className="themed-love-story__item"
                delay={index * 0.08}
              >
                <div className="themed-love-story__marker" aria-hidden="true" />
                <span className="themed-love-story__index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="themed-love-story__photo">
                  <Image
                    src={moment.photo}
                    alt={moment.alt}
                    fill
                    sizes="(min-width: 1024px) 410px, 88vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="themed-love-story__title">{moment.title}</h3>
                {moment.paragraphs.map((paragraph, paragraphIndex) => (
                  <p
                    key={paragraphIndex}
                    className="themed-love-story__text"
                  >
                    {paragraph}
                  </p>
                ))}
              </ThemedReveal>
            ))}
          </div>
        </section>

        <section className="themed-section themed-gift">
          <ThemedReveal>
            <div className="themed-event__icon" aria-hidden="true">
              <Gift className="size-5" />
            </div>
            <p className="themed-eyebrow">Tanda kasih</p>
            <h2>Wedding Gift</h2>
            <p className="themed-section-copy">
              Doa restu Anda adalah hadiah terindah. Bagi yang berkenan,
              tanda kasih dapat disampaikan melalui salah satu pilihan berikut.
            </p>
            <div className="themed-gift__methods">
              <div className="themed-gift__bank">
                <div className="themed-gift__method-heading">
                  <span aria-hidden="true">01</span>
                  <div>
                    <p>Amplop digital</p>
                    <h3>Transfer Bank</h3>
                  </div>
                </div>
                <ThemedGiftAccountList accounts={giftAccounts} />
              </div>

              <ThemedGiftAddress
                recipient={giftDelivery.recipient}
                address={giftDelivery.address}
              />
            </div>
          </ThemedReveal>
        </section>

        <section className="themed-section themed-rsvp">
          <ThemedReveal>
            <p className="themed-eyebrow">Kami menanti kabar Anda</p>
            <h2>RSVP &amp; Ucapan</h2>
            <p className="themed-section-copy">
              Mohon konfirmasi kehadiran dan tinggalkan doa terbaik untuk kami.
            </p>
          </ThemedReveal>

          <ThemedReveal delay={0.06}>
            <RsvpGuestbookSection
              invitation={invitation}
              sectionClassName="themed-form-stack"
              panelClassName="themed-form"
              inputClassName="themed-input"
              buttonClassName="themed-button"
              iconClassName="themed-form-icon"
              commentsClassName="themed-comments"
              commentListClassName="themed-comments__list"
              commentItemClassName="themed-comments__item"
              showGiftAccount={false}
            />
          </ThemedReveal>
        </section>
      </div>

      <footer className="themed-closing">
        <div className="themed-closing__art" aria-hidden="true" />
        <ThemedReveal className="themed-closing__content">
          <Music2 className="mx-auto size-5" aria-hidden="true" />
          <p className="themed-eyebrow">Terima kasih</p>
          <h2>
            {firstDisplayName}
            <span>&amp;</span>
            {secondDisplayName}
          </h2>
          <p>{config.closingLine}</p>
          <div className="themed-ornament" aria-hidden="true">
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
        </ThemedReveal>
      </footer>
    </main>
  );
}
