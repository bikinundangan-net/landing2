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
import type { TemplateSlug } from "@/lib/admin/catalog";
import type { InvitationTemplateProps } from "@/components/invitation/templates/shared";
import {
  CountdownStrip,
  formatDate,
  MusicPanel,
  RsvpGuestbookSection,
} from "@/components/invitation/templates/shared";
import {
  ModernMinimalCover,
  ThemedDemoForms,
  ThemedGallery,
  ThemedGiftCopy,
  ThemedReveal,
} from "@/components/invitation/templates/themed-invitation-client";
import { ReferenceThemedCover } from "@/components/invitation/templates/reference-covers-client";
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

type ThemedTemplateSlug = Exclude<
  TemplateSlug,
  "classic-rose" | "vintage-blue"
>;

export type ThemedInvitationConfig = {
  slug: ThemedTemplateSlug;
  variant: string;
  coverBackground: string;
  sectionBackground: string;
  demo: {
    monogram: string;
    day: string;
    date: string;
    longDate: string;
    time: string;
    locationLines: string[];
    receptionTime?: string;
    confirmationDate?: string;
    countdown?: Array<{ label: string; value: string }>;
    events?: Array<{ label: string; time: string }>;
  };
  kicker: string;
  welcomeEyebrow: string;
  welcomeTitle: string;
  coverNote: string;
  verse: string;
  verseSource: string;
  storyTitle: string;
  closingLine: string;
  palette: {
    bg: string;
    surface: string;
    ink: string;
    muted: string;
    accent: string;
    accentContrast: string;
    line: string;
  };
};

export const themedInvitationConfigs: Record<
  ThemedTemplateSlug,
  ThemedInvitationConfig
> = {
  "modern-minimal": {
    slug: "modern-minimal",
    variant: "modern",
    coverBackground:
      "/images/invitations/modern-minimal/cover-background.webp",
    sectionBackground:
      "/images/invitations/modern-minimal/cover-background.webp",
    demo: {
      monogram: "NY",
      day: "SABTU",
      date: "08.08.2026",
      longDate: "Sabtu, 8 Agustus 2026",
      time: "10.00 WIB",
      locationLines: [
        "GEDUNG SERBA GUNA",
        "Jl. Bahagia No. 123",
        "Jakarta Selatan",
      ],
      receptionTime: "11.30 - 14.00 WIB",
    },
    kicker: "The Wedding of",
    welcomeEyebrow: "A quiet celebration",
    welcomeTitle: "Dua cerita, satu masa depan.",
    coverNote: "An intimate celebration of love and a lifetime together.",
    verse:
      "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri.",
    verseSource: "QS. Ar-Rum : 21",
    storyTitle: "A love shaped by quiet moments.",
    closingLine: "With love, always.",
    palette: {
      bg: "#f8f5ef",
      surface: "#fffdf9",
      ink: "#171512",
      muted: "#6f685e",
      accent: "#171512",
      accentContrast: "#ffffff",
      line: "#c8bba8",
    },
  },
  "garden-sage": {
    slug: "garden-sage",
    variant: "garden",
    coverBackground: "/images/invitations/garden-sage/cover-background.webp",
    sectionBackground:
      "/images/invitations/garden-sage/section-background.webp",
    demo: {
      monogram: "D & A",
      day: "SENIN",
      date: "21.09.2026",
      longDate: "Senin, 21 September 2026",
      time: "10.00 WIB",
      locationLines: [
        "GEDUNG SERBA GUNA",
        "Jl. Kebahagiaan No. 88",
        "Bandung",
      ],
      confirmationDate: "1 September 2026",
    },
    kicker: "The Wedding of",
    welcomeEyebrow: "Together with nature",
    welcomeTitle: "Cinta yang tumbuh, hari demi hari.",
    coverNote: "Dengan sukacita, kami mengundang Anda ke taman kebahagiaan kami.",
    verse:
      "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri.",
    verseSource: "QS. Ar-Rum : 21",
    storyTitle: "Berakar dalam doa, tumbuh dalam cinta.",
    closingLine: "Let love grow.",
    palette: {
      bg: "#f3f1e7",
      surface: "#fbfaf3",
      ink: "#34453a",
      muted: "#687468",
      accent: "#667b66",
      accentContrast: "#ffffff",
      line: "#aab6a1",
    },
  },
  "luxury-maroon": {
    slug: "luxury-maroon",
    variant: "maroon",
    coverBackground:
      "/images/invitations/luxury-maroon/cover-background.webp",
    sectionBackground:
      "/images/invitations/luxury-maroon/section-background.webp",
    demo: {
      monogram: "S & B",
      day: "SELASA",
      date: "17.11.2026",
      longDate: "Selasa, 17 November 2026",
      time: "19.00 WIB",
      locationLines: [
        "GEDUNG SERBA GUNA",
        "Jl. Kebahagiaan No. 88",
        "Jakarta Selatan",
      ],
      countdown: [
        { label: "Hari", value: "30" },
        { label: "Jam", value: "14" },
        { label: "Menit", value: "23" },
        { label: "Detik", value: "48" },
      ],
    },
    kicker: "A Royal Celebration",
    welcomeEyebrow: "An evening of love",
    welcomeTitle: "Satu malam, kenangan untuk selamanya.",
    coverNote: "You are cordially invited to celebrate our beginning.",
    verse:
      "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri.",
    verseSource: "QS. Ar-Rum : 21",
    storyTitle: "Every great love deserves a grand beginning.",
    closingLine: "A timeless celebration.",
    palette: {
      bg: "#2b070b",
      surface: "#3d0c12",
      ink: "#fff5e8",
      muted: "#d5bba6",
      accent: "#c99a4a",
      accentContrast: "#26070a",
      line: "#875f35",
    },
  },
  "gold-premium": {
    slug: "gold-premium",
    variant: "gold",
    coverBackground:
      "/images/invitations/gold-premium/cover-background.webp",
    sectionBackground:
      "/images/invitations/gold-premium/section-background.webp",
    demo: {
      monogram: "R & D",
      day: "RABU",
      date: "30.12.2026",
      longDate: "Rabu, 30 Desember 2026",
      time: "19.00 WIB",
      locationLines: [
        "GEDUNG SERBA GUNA",
        "Jl. Kebahagiaan No. 88",
        "Jakarta Selatan",
      ],
      confirmationDate: "15 Desember 2026",
      events: [
        { label: "Akad Nikah", time: "16.00 WIB" },
        { label: "Resepsi", time: "18.00 WIB" },
      ],
    },
    kicker: "The Wedding Celebration",
    welcomeEyebrow: "Black tie affair",
    welcomeTitle: "A golden chapter begins.",
    coverNote: "Join us for an elegant evening of vows, joy, and celebration.",
    verse:
      "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri.",
    verseSource: "QS. Ar-Rum : 21",
    storyTitle: "Written in love, sealed in gold.",
    closingLine: "Elegance meets eternity.",
    palette: {
      bg: "#0d0d0c",
      surface: "#171614",
      ink: "#fbf2dc",
      muted: "#b9aa8b",
      accent: "#caa253",
      accentContrast: "#14120e",
      line: "#665331",
    },
  },
  "rustic-cream": {
    slug: "rustic-cream",
    variant: "rustic",
    coverBackground:
      "/images/invitations/rustic-cream/cover-background.webp",
    sectionBackground:
      "/images/invitations/rustic-cream/section-background.webp",
    demo: {
      monogram: "L & H",
      day: "SENIN",
      date: "14.07.2026",
      longDate: "Senin, 14 Juli 2026",
      time: "10.00 WIB",
      locationLines: [
        "GEDUNG SERBA GUNA",
        "Jl. Raya Sukamaju No. 25",
        "Bandung",
      ],
    },
    kicker: "Our Wedding Day",
    welcomeEyebrow: "Made with love",
    welcomeTitle: "Kehangatan yang membawa kami pulang.",
    coverNote: "Mari merayakan cinta, tawa, dan awal perjalanan kami.",
    verse:
      "Rumah bukan sekadar tempat. Rumah adalah hati yang selalu menerima kita kembali.",
    verseSource: "OUR HOME",
    storyTitle: "A simple love, a beautiful life.",
    closingLine: "Warm hearts, one home.",
    palette: {
      bg: "#eee0ca",
      surface: "#f8edda",
      ink: "#553a2b",
      muted: "#806754",
      accent: "#a95e3d",
      accentContrast: "#fffaf2",
      line: "#c7a986",
    },
  },
  "pastel-floral": {
    slug: "pastel-floral",
    variant: "pastel",
    coverBackground:
      "/images/invitations/pastel-floral/cover-background.webp",
    sectionBackground:
      "/images/invitations/pastel-floral/section-background.webp",
    demo: {
      monogram: "M & R",
      day: "SENIN",
      date: "23.06.2026",
      longDate: "Senin, 23 Juni 2026",
      time: "16.00 WIB",
      locationLines: [
        "GEDUNG SERBA GUNA",
        "Jl. Bahagia No. 88",
        "Surabaya",
      ],
    },
    kicker: "The Wedding of",
    welcomeEyebrow: "Blooming together",
    welcomeTitle: "Hari ketika semua warna menjadi cinta.",
    coverNote: "A soft celebration filled with flowers, laughter, and love.",
    verse:
      "Cinta mekar dalam keberanian untuk saling memilih, berulang kali, setiap hari.",
    verseSource: "IN FULL BLOOM",
    storyTitle: "Our favorite story is the one we share.",
    closingLine: "Love in full bloom.",
    palette: {
      bg: "#fbecf1",
      surface: "#fff6f8",
      ink: "#6c405c",
      muted: "#8d7184",
      accent: "#cc6f83",
      accentContrast: "#ffffff",
      line: "#d9b8cc",
    },
  },
  "islamic-elegant": {
    slug: "islamic-elegant",
    variant: "islamic",
    coverBackground:
      "/images/invitations/islamic-elegant/cover-background.webp",
    sectionBackground:
      "/images/invitations/islamic-elegant/section-background.webp",
    demo: {
      monogram: "A & F",
      day: "SABTU",
      date: "05.12.2026",
      longDate: "Sabtu, 5 Desember 2026",
      time: "10.00 WIB",
      locationLines: [
        "GEDUNG SERBA GUNA",
        "Jl. Cendrawasih No. 45",
        "Bandung",
      ],
      confirmationDate: "20 November 2026",
      events: [
        { label: "Akad Nikah", time: "08.00 WIB" },
        { label: "Resepsi", time: "11.00 WIB" },
      ],
    },
    kicker: "Walimatul 'Urs",
    welcomeEyebrow: "Bismillahirrahmanirrahim",
    welcomeTitle: "Dalam kasih-Nya, dua hati dipersatukan.",
    coverNote: "Mohon doa restu untuk langkah ibadah terpanjang kami.",
    verse:
      "Dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu terdapat tanda-tanda.",
    verseSource: "QS. AR-RUM : 21",
    storyTitle: "Berjalan bersama menuju rida-Nya.",
    closingLine: "Barakallahu lakuma.",
    palette: {
      bg: "#efe7d7",
      surface: "#fff8e9",
      ink: "#18344b",
      muted: "#607181",
      accent: "#12676f",
      accentContrast: "#ffffff",
      line: "#b79b5c",
    },
  },
  "hamsyah-yuyun-edition": {
    slug: "hamsyah-yuyun-edition",
    variant: "modern",
    coverBackground:
      "/images/invitations/modern-minimal/cover-background.webp",
    sectionBackground:
      "/images/invitations/modern-minimal/cover-background.webp",
    demo: {
      monogram: "HY",
      day: "MINGGU",
      date: "25.10.2026",
      longDate: "Minggu, 25 Oktober 2026",
      time: "08.00 WIB",
      locationLines: ["JOGLO NDALIJAN", "Jl. Kabupaten No. Km. 2.5", "Sleman, Yogyakarta"],
      receptionTime: "10.30 - 12.30 WIB",
    },
    kicker: "The Wedding of",
    welcomeEyebrow: "A quiet celebration",
    welcomeTitle: "Dua cerita, satu masa depan.",
    coverNote: "An intimate celebration of love and a lifetime together.",
    verse:
      "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri.",
    verseSource: "QS. Ar-Rum : 21",
    storyTitle: "A love shaped by quiet moments.",
    closingLine: "With love, always.",
    palette: {
      bg: "#f8f5ef",
      surface: "#fffdf9",
      ink: "#171512",
      muted: "#6f685e",
      accent: "#171512",
      accentContrast: "#ffffff",
      line: "#c8bba8",
    },
  },
};

function compactDate(value: string) {
  return value.replace(/\s*\.\s*/g, ".");
}

function clockStyle(value: string) {
  return value.replace(":", ".");
}

function splitLocation(value: string) {
  return value
    .split(/,\s*|\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 3);
}

export function ThemedInvitation({
  config,
  ...props
}: InvitationTemplateProps & { config: ThemedInvitationConfig }) {
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
  const receptionEvent = invitation.order_events[1] ?? invitation.order_events[0];
  const coverCopy = {
    variant: config.variant,
    background: config.coverBackground,
    monogram: isDemo ? config.demo.monogram : display.initials,
    kicker: config.kicker,
    brideName: invitation.bride_name,
    groomName: invitation.groom_name,
    eventDay: isDemo ? config.demo.day : display.eventDay,
    eventDate: isDemo ? config.demo.date : compactDate(display.eventDateShort),
    eventTime: isDemo ? config.demo.time : clockStyle(display.eventTime),
    locationLines: isDemo
      ? config.demo.locationLines
      : splitLocation(display.location),
    note: config.coverNote,
  };
  const portraitSource = heroAsset?.public_url ?? null;
  const galleryImages = galleryAssets.map((asset, index) => ({
    src: asset.public_url,
    alt: asset.file_name || `Foto kenangan ${index + 1}`,
  }));
  const coverEvents =
    isDemo && config.demo.events
      ? config.demo.events
      : invitation.order_events.map((event) => ({
          label: event.title,
          time: event.event_time
            ? `${clockStyle(event.event_time)} WIB`
            : "Waktu menyusul",
        }));
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
      className={`${playfair.variable} ${cormorant.variable} themed-invitation themed-invitation--${config.variant} mx-auto min-h-screen max-w-[30rem] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.22)]`}
    >
      <Suspense fallback={null}>
        {config.variant === "modern" ? (
          <ModernMinimalCover
            copy={{
              ...coverCopy,
              verse: config.verse,
              verseSource: config.verseSource,
              receptionLabel: (receptionEvent?.title ?? "Resepsi").toUpperCase(),
              receptionTime: isDemo
                ? (config.demo.receptionTime ?? config.demo.time)
                : receptionEvent?.event_time
                  ? `${clockStyle(receptionEvent.event_time)} WIB`
                  : "Waktu menyusul",
            }}
          />
        ) : (
          <ReferenceThemedCover
            copy={{
              ...coverCopy,
              verse: config.verse,
              verseSource: config.verseSource,
              countdown:
                isDemo && config.demo.countdown
                  ? config.demo.countdown
                  : display.countdown,
              events: coverEvents,
              galleryImages,
              confirmationDate:
                isDemo && config.demo.confirmationDate
                  ? config.demo.confirmationDate
                  : display.eventDate,
            }}
          />
        )}
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
                alt={`Foto ${invitation.bride_name} dan ${invitation.groom_name}`}
                fill
                preload={isDemo}
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
              {invitation.bride_name}
              <span>&amp;</span>
              {invitation.groom_name}
            </h3>
            <p>
              {invitation.love_story ??
                "Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu."}
            </p>
            <MusicPanel
              invitation={invitation}
              musicAsset={musicAsset}
              className="themed-music"
            />
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
                  {isDemo ? config.demo.longDate : formatDate(event.event_date)}
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

        <section className="themed-section themed-story">
          <ThemedReveal>
            <p className="themed-eyebrow">Cerita kami</p>
            <h2>{config.storyTitle}</h2>
            <p className="themed-section-copy">
              {invitation.love_story ??
                "Pertemuan sederhana membawa kami pada perjalanan yang penuh makna. Kini kami memilih berjalan bersama."}
            </p>
          </ThemedReveal>

          {galleryImages.length > 0 ? (
            <ThemedReveal delay={0.08}>
              <p className="themed-script">Galeri Kenangan</p>
              <ThemedGallery images={galleryImages} />
            </ThemedReveal>
          ) : null}

          {videoAsset ? (
            <ThemedReveal className="themed-video" delay={0.1}>
              <video
                src={videoAsset.public_url}
                controls
                preload="metadata"
                className="aspect-video w-full"
              />
            </ThemedReveal>
          ) : null}
        </section>

        {invitation.gift_account ? (
          <section className="themed-section themed-gift">
            <ThemedReveal>
              <div className="themed-event__icon" aria-hidden="true">
                <Gift className="size-5" />
              </div>
              <p className="themed-eyebrow">Tanda kasih</p>
              <h2>Amplop Digital</h2>
              <p className="themed-section-copy">
                Doa restu Anda adalah hadiah terindah. Bagi yang berkenan,
                tanda kasih dapat disampaikan melalui:
              </p>
              <div className="themed-account">
                <span>Rekening tujuan</span>
                <strong>{invitation.gift_account}</strong>
              </div>
              <ThemedGiftCopy account={invitation.gift_account} />
            </ThemedReveal>
          </section>
        ) : null}

        <section className="themed-section themed-rsvp">
          <ThemedReveal>
            <p className="themed-eyebrow">Kami menanti kabar Anda</p>
            <h2>RSVP &amp; Ucapan</h2>
            <p className="themed-section-copy">
              Mohon konfirmasi kehadiran dan tinggalkan doa terbaik untuk kami.
            </p>
          </ThemedReveal>

          <ThemedReveal delay={0.06}>
            {isDemo ? (
              <ThemedDemoForms />
            ) : (
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
            )}
          </ThemedReveal>
        </section>
      </div>

      <footer className="themed-closing">
        <div className="themed-closing__art" aria-hidden="true" />
        <ThemedReveal className="themed-closing__content">
          <Music2 className="mx-auto size-5" aria-hidden="true" />
          <p className="themed-eyebrow">Terima kasih</p>
          <h2>
            {invitation.bride_name}
            <span>&amp;</span>
            {invitation.groom_name}
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
