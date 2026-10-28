import Image from "next/image";
import { Cormorant_Garamond, Playfair_Display } from "next/font/google";
import { ArrowUpRight, CalendarDays, CalendarHeart, Clock3, Gift, House, MapPin, MessageCircleHeart, Users } from "lucide-react";
import type { CSSProperties } from "react";
import type { InvitationTemplateProps } from "./shared";
import { FloralOrnament, GiftCopy, GoldDivider, GuestForms, IbnuDinataLogo, InvitationCountdown, InvitationGate, Parallax, Reveal, RevealGroup, RevealItem, ScrollCue, Sparkles } from "./ibnu-dinata-client";
import { ThemedGallery } from "./themed-invitation-client";
import content from "@/lib/admin/ibnu-dinata.json";
import { siteUrl } from "@/lib/site";
import styles from "./ibnu-dinata.module.css";

const displayFont = Playfair_Display({ variable: "--font-id-display", subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });
const bodyFont = Cormorant_Garamond({ variable: "--font-id-body", subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });

function CornerFlourishes() {
  return <>{(["tl", "tr", "bl", "br"] as const).map(corner => <svg key={corner} className={`${styles.cornerFlourish} ${styles[corner]}`} viewBox="0 0 60 60" aria-hidden="true">
    <path d="M2 58V20C2 10 10 2 20 2h38M8 58V24c0-9 7-16 16-16h34" fill="none" stroke="currentColor" strokeWidth="1.2" />
    <path d="M20 20c8 0 10 8 4 10s-8-6-2-8" fill="none" stroke="currentColor" strokeWidth="1" />
    <circle cx="14" cy="14" r="2.2" fill="currentColor" />
  </svg>)}</>;
}

function SplitName({ text, offset = 0 }: { text: string; offset?: number }) {
  return <>{Array.from(text).map((letter, index) => <span key={index} className={styles.heroLetter} style={{ "--i": offset + index } as CSSProperties} aria-hidden="true">{letter === " " ? " " : letter}</span>)}</>;
}

const navItems = [
  { href: "#beranda", label: "Beranda", Icon: House },
  { href: "#mempelai", label: "Mempelai", Icon: Users },
  { href: "#acara", label: "Acara", Icon: CalendarHeart },
  { href: "#hadiah", label: "Hadiah", Icon: Gift },
  { href: "#rsvp", label: "Ucapan", Icon: MessageCircleHeart },
];

export function IbnuDinataInvitation({ invitation, firstEvent, display, galleryAssets, heroAsset }: InvitationTemplateProps) {
  const event = firstEvent ?? content.event;
  const clock = (time: string) => time.slice(0, 5).replace(":", ".");
  const eventTime = `${clock(event.event_time || content.event.event_time)}–${clock(event.event_end_time || content.event.event_end_time)} WIB`;
  const date = new Intl.DateTimeFormat("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Jakarta" }).format(new Date(`${event.event_date}T12:00:00+07:00`));
  const entries = invitation.guestbook_entries ?? [];
  const realGallery = galleryAssets.filter(asset => !asset.public_url.includes("couple-illustration"));
  const hero = heroAsset?.public_url || content.illustration;

  return <main className={`${styles.shell} ${displayFont.variable} ${bodyFont.variable}`}>
    <div className={styles.paper}>
      <InvitationGate>
        <section className={styles.hero} id="beranda" aria-label="Pernikahan Ibnu dan Dinata">
          <Parallax className={styles.heroFlorals} offset={90}><FloralOrnament kind="arch" className={`${styles.heroGarland} ${styles.sway}`} /><FloralOrnament className={`${styles.heroFlowersLeft} ${styles.swayBottom}`} /><FloralOrnament className={`${styles.heroFlowersRight} ${styles.swayBottom}`} /></Parallax>
          <Sparkles count={10} className={styles.heroSparkles} />
          <div className={styles.heroHeading}>
            <IbnuDinataLogo animated className={styles.heroLogo} />
            <p className={styles.eyebrow}>BISMILLAHIRRAHMANIRRAHIM</p>
            <h2 className={styles.heroNames} aria-label="Ibnu & Dinata"><SplitName text="Ibnu" /> <em><SplitName text="&" offset={5} /></em> <SplitName text="Dinata" offset={7} /></h2>
            <p className={styles.heroDate}>MINGGU, 8 NOVEMBER 2026</p>
          </div>
          <div className={styles.portraitWrap}>
            <div className={styles.portrait}><Image src={hero} alt={hero === content.illustration ? "Ilustrasi pasangan pengantin Muslim tanpa wajah di taman bunga putih" : "Ibnu Hardani dan Pebriani Dinata"} width={1024} height={1536} preload sizes="(min-width: 620px) 440px, 82vw" /></div>
            <Sparkles count={6} className={styles.portraitSparkles} />
          </div>
          <ScrollCue />
        </section>

        <section id="salam" className={`${styles.section} ${styles.verseSection} ${styles.patterned}`}>
          <FloralOrnament className={`${styles.verseFlowers} ${styles.swayBottom}`} /><FloralOrnament className={`${styles.verseFlowersLeft} ${styles.swayBottom}`} />
          <Reveal variant="blur">
            <p className={styles.eyebrow}>DENGAN RAHMAT DAN RIDA ALLAH SWT.</p>
            <h2 className={styles.sectionTitle}>Dua hati,<br /><em>satu janji.</em></h2>
          </Reveal>
          <Reveal variant="zoom" delay={0.1} className={styles.verseCard}>
            <CornerFlourishes />
            <blockquote className={styles.verse}><p>“{content.verse}”</p><cite>{content.verseSource}</cite></blockquote>
          </Reveal>
        </section>

        <section id="mempelai" className={`${styles.section} ${styles.coupleSection}`}>
          <FloralOrnament className={`${styles.coupleFlowers} ${styles.swayBottom}`} /><FloralOrnament className={`${styles.coupleFlowersLeft} ${styles.swayBottom}`} />
          <Reveal>
            <p className={styles.arabic} lang="ar" dir="rtl">السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ</p>
            <p className={styles.intro}>Dengan memohon rahmat dan rida Allah SWT., kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada pernikahan kami.</p>
          </Reveal>
          <RevealGroup className={styles.fullNames}>
            <RevealItem variant="left" className={styles.personCard}><FloralOrnament kind="arch" className={styles.personGarland} /><p>MEMPELAI PRIA</p><h2>{invitation.groom_name}</h2></RevealItem>
            <RevealItem variant="zoom" className={styles.ampersand}><span aria-hidden="true">&amp;</span></RevealItem>
            <RevealItem variant="right" className={styles.personCard}><FloralOrnament kind="arch" className={styles.personGarland} /><p>MEMPELAI WANITA</p><h2>{invitation.bride_name}</h2></RevealItem>
          </RevealGroup>
        </section>

        <section className={`${styles.section} ${styles.eventSection} ${styles.patterned}`} id="acara">
          <Reveal>
            <p className={styles.eyebrow}>SEBUAH AWAL, UNTUK SELAMANYA</p>
            <h2 className={styles.sectionTitle}>Hari Bahagia</h2>
          </Reveal>
          <Reveal variant="zoom"><InvitationCountdown items={display.countdown} targetDate={display.countdownTarget} /></Reveal>
          <Reveal variant="up" delay={0.1} className={styles.event}>
            <CornerFlourishes />
            <CalendarDays size={26} strokeWidth={1} aria-hidden="true" />
            <h3>{event.title}</h3>
            <p className={styles.eventDate}>{date}</p>
            <p className={styles.eventTime}><Clock3 size={15} aria-hidden="true" />{eventTime}</p>
            <div className={styles.eventLocation}><MapPin size={18} strokeWidth={1.4} aria-hidden="true" className={styles.pin} /><p>{event.location_name}</p></div>
            <a href={event.maps_url || content.event.maps_url} target="_blank" rel="noopener noreferrer" className={`${styles.button} ${styles.shineButton}`}>Petunjuk lokasi<ArrowUpRight size={16} aria-hidden="true" /></a>
          </Reveal>
          <FloralOrnament className={`${styles.eventFlowers} ${styles.swayBottom}`} /><FloralOrnament className={`${styles.eventFlowersTop} ${styles.swayBottom}`} />
        </section>

        <section className={`${styles.section} ${styles.storySection}`}>
          <Reveal variant="blur"><p className={styles.eyebrow}>SEPENGGAL CERITA KAMI</p><h2 className={styles.sectionTitle}>Berawal dari<br /><em>sebuah pertemuan.</em></h2></Reveal>
          <Reveal variant="zoom" className={styles.storyCard}><div className={styles.storyYear}>2020</div><p className={styles.story}>{invitation.love_story || content.story}</p></Reveal>
          {realGallery.length > 0 && <Reveal className={styles.gallery}><h3>Galeri Kenangan</h3><ThemedGallery images={realGallery.map(asset => ({ src: asset.public_url, alt: asset.file_name }))} /></Reveal>}
        </section>

        <section id="hadiah" className={`${styles.section} ${styles.giftSection}`}>
          <FloralOrnament className={`${styles.giftFlowers} ${styles.swayBottom}`} />
          <Reveal><p className={styles.eyebrow}>TANDA KASIH</p><h2 className={styles.sectionTitle}>Amplop Digital</h2><p className={styles.intro}>Doa restu Anda adalah hadiah terindah bagi kami. Bagi yang berkenan berbagi tanda kasih:</p></Reveal>
          <Reveal variant="zoom" delay={0.1}>
            <div className={styles.bankCard}><div className={styles.bankHeader}><strong>{content.bank}</strong><span>WEDDING GIFT</span></div><i className={styles.bankChip} aria-hidden="true" /><p className={styles.accountNumber}>{content.accountDisplay}</p><p className={styles.accountHolder}>{content.accountHolder}</p><GiftCopy /></div>
          </Reveal>
        </section>

        <section className={`${styles.section} ${styles.rsvpSection}`} id="rsvp">
          <FloralOrnament kind="arch" className={styles.rsvpGarland} />
          <Reveal><p className={styles.eyebrow}>KEHADIRAN ANDA BERARTI</p><h2 className={styles.sectionTitle}>Doa &amp; Kehadiran</h2><p className={styles.intro}>Kabarkan kehadiran Anda dan titipkan doa untuk langkah baru kami.</p></Reveal>
          <Reveal variant="up" delay={0.1} className={styles.formCard}><GuestForms /></Reveal>
          <div className={styles.guestbook} aria-label="Ucapan dan doa tamu">
            <h3>Ucapan &amp; Doa {entries.length > 0 && <span>({entries.length})</span>}</h3>
            {entries.length ? <RevealGroup className={styles.guestbookList}><div tabIndex={0} role="region" aria-label="Daftar ucapan tamu" className={styles.guestbookScroll}>{entries.map((entry, index) => <RevealItem as="article" variant="up" className={styles.wish} key={`${entry.created_at}-${index}`}><strong>{entry.guest_name}</strong><p>{entry.message}</p><time dateTime={entry.created_at}>{new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Jakarta" }).format(new Date(entry.created_at))}</time></RevealItem>)}</div></RevealGroup> : <p className={styles.emptyWishes}>Jadilah yang pertama menitipkan doa untuk kami.</p>}
          </div>
        </section>

        <footer className={styles.closing}>
          <div className={`${styles.closingGarland} ${styles.sway}`}><FloralOrnament kind="arch" /></div><FloralOrnament className={`${styles.closingFlowersLeft} ${styles.swayBottom}`} /><FloralOrnament className={`${styles.closingFlowersRight} ${styles.swayBottom}`} />
          <Sparkles count={10} className={styles.closingSparkles} />
          <Reveal variant="zoom"><IbnuDinataLogo animated className={styles.closingLogo} /></Reveal>
          <Reveal variant="blur"><p className={styles.closingQuote}>“{content.closing}”</p></Reveal>
          <Reveal className={styles.closingSignoff}><p className={styles.eyebrow}>DENGAN CINTA DAN RASA SYUKUR</p><h2>Ibnu <em>&amp;</em> Dinata</h2><p className={styles.thankyou}>Terima kasih atas doa dan restu Anda.</p></Reveal>
          <a href={siteUrl} target="_blank" rel="noopener noreferrer" className={styles.credit}>Dibuat dengan cinta oleh <strong>BikinUndangan.net</strong></a>
        </footer>

        <nav className={styles.bottomNav} aria-label="Navigasi undangan">
          {navItems.map(({ href, label, Icon }) => <a key={href} href={href}><Icon size={18} strokeWidth={1.5} aria-hidden="true" /><span>{label}</span></a>)}
        </nav>
      </InvitationGate>
    </div>
  </main>;
}
