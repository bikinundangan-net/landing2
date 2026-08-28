import Image from "next/image";
import localFont from "next/font/local";
import { MapPin } from "lucide-react";
import { Suspense } from "react";
import { submitRsvp } from "@/app/[slug]/actions";
import type { InvitationTemplateProps } from "@/components/invitation/templates/shared";
import {
  CountdownStrip,
  formatDate,
} from "@/components/invitation/templates/shared";
import {
  GiftCopyButton,
  VintageBlueExperience,
  VintageBlueReveal,
} from "@/components/invitation/templates/vintage-blue-client";
import styles from "@/components/invitation/templates/vintage-blue.module.css";
import { siteUrl } from "@/lib/site";

const vintageScript = localFont({
  src: "../../../public/fonts/vintage-blue/aston-script.woff2",
  variable: "--font-vintage-blue-script",
  display: "swap",
});

const vintageSnell = localFont({
  src: "../../../public/fonts/vintage-blue/snellbt.woff2",
  variable: "--font-vintage-blue-snell",
  display: "swap",
});

const vintageTrajan = localFont({
  src: "../../../public/fonts/vintage-blue/trajan.woff2",
  variable: "--font-vintage-blue-trajan",
  display: "swap",
});

const vintageAlcantera = localFont({
  src: "../../../public/fonts/vintage-blue/alcantera-serif.woff2",
  variable: "--font-vintage-blue-alcantera",
  display: "swap",
});

const quranVerse =
  "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.";

function formatClock(value: string | null) {
  return value ? `${value.slice(0, 5).replace(":", ".")} WIB` : "Waktu menyusul";
}

export function VintageBlue(props: InvitationTemplateProps) {
  const {
    invitation,
    display,
    galleryAssets,
    videoAsset,
    musicAsset,
  } = props;
  const groomName = invitation.groom_name;
  const brideName = invitation.bride_name;
  const storyParagraphs = (invitation.love_story ||
    "Berawal dari pertemuan sederhana, kami saling mengenal dan mulai berbagi banyak cerita. Kini kami menanti hari istimewa untuk memulai perjalanan baru bersama.")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const audioSrc =
    musicAsset?.public_url ?? "/song/vintage-blue/kusuma-wijaya.mp3";

  return (
    <div
      className={`${vintageScript.variable} ${vintageSnell.variable} ${vintageTrajan.variable} ${vintageAlcantera.variable}`}
    >
      <Suspense fallback={null}>
        <VintageBlueExperience
          audioSrc={audioSrc}
          cover={{
            groomName,
            brideName,
            eventDate: display.eventDateShort,
          }}
        >
          <section className={`${styles.section} ${styles.verseSection}`} id="verse">
            <VintageBlueReveal>
              <div className={styles.couplePortrait}>
                <Image
                  src="/images/invitations/vintage-blue/navy/couple.png"
                  alt={`Ilustrasi ${groomName} dan ${brideName}`}
                  fill
                  sizes="(min-width: 1025px) 304px, 78vw"
                />
              </div>
              <blockquote className={styles.verse}>
                <p>&ldquo;{quranVerse}&rdquo;</p>
                <cite>(QS. Ar-Rum : 21)</cite>
              </blockquote>
            </VintageBlueReveal>
          </section>

          <section className={`${styles.section} ${styles.profilesSection}`}>
            <VintageBlueReveal className={styles.profilePanel}>
              <p className={styles.sectionEyebrow}>Bride Groom</p>
              <p className={styles.sectionCopy}>
                Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i
                serta kerabat sekalian untuk menghadiri acara pernikahan kami.
              </p>

              <article className={styles.profile}>
                <div className={styles.profileImage}>
                  <Image
                    src="/images/invitations/vintage-blue/navy/groom.png"
                    alt={`Ilustrasi mempelai pria ${groomName}`}
                    fill
                    sizes="(min-width: 1025px) 208px, 55vw"
                  />
                </div>
                <h3>{groomName}</h3>
                <p>Mempelai Pria</p>
              </article>

              <span className={styles.profileSeparator}>dan</span>

              <article className={styles.profile}>
                <div className={styles.profileImage}>
                  <Image
                    src="/images/invitations/vintage-blue/navy/bride.png"
                    alt={`Ilustrasi mempelai wanita ${brideName}`}
                    fill
                    sizes="(min-width: 1025px) 208px, 55vw"
                  />
                </div>
                <h3>{brideName}</h3>
                <p>Mempelai Wanita</p>
              </article>
            </VintageBlueReveal>
          </section>

          <section className={`${styles.section} ${styles.countdownSection}`}>
            <div className={styles.countdownCouple} aria-hidden="true">
              <Image
                src="/images/invitations/vintage-blue/navy/couple.png"
                alt=""
                fill
                sizes="(min-width: 1025px) 500px, 100vw"
              />
            </div>
            <VintageBlueReveal>
              <p className={styles.sectionEyebrow}>Save The Date</p>
              <h2 className={styles.sectionTitle}>Menuju Hari Bahagia</h2>
              <CountdownStrip
                items={display.countdown}
                targetDate={display.countdownTarget}
                className={styles.countdown}
                itemClassName={styles.countdownItem}
              />
              <p className={styles.sectionCopy}>
                Dan kami bersyukur, dipertemukan Allah di waktu terbaik. Kini
                kami menanti hari istimewa kami.
              </p>
            </VintageBlueReveal>
          </section>

          <section className={`${styles.section} ${styles.eventsSection}`}>
            <div className={styles.eventList}>
              {invitation.order_events.map((event, index) => (
                <VintageBlueReveal
                  key={`${event.event_type}-${event.title}`}
                  delay={index * 0.08}
                >
                  <article className={styles.eventCard}>
                    <h3>{event.title}</h3>
                    <p className={styles.eventDate}>{formatDate(event.event_date)}</p>
                    <p className={styles.eventMeta}>Pukul : {formatClock(event.event_time)}</p>
                    <p className={styles.eventLocation}>
                      Tempat : {event.location_name}
                    </p>
                    {event.maps_url ? (
                      <a href={event.maps_url} className={styles.eventButton}>
                        <MapPin aria-hidden="true" />
                        Lihat Lokasi
                      </a>
                    ) : null}
                  </article>
                </VintageBlueReveal>
              ))}
            </div>
          </section>

          <section className={`${styles.section} ${styles.storySection}`}>
            <VintageBlueReveal>
              <div className={styles.storyOrnament} aria-hidden="true">
                <Image
                  src="/images/invitations/vintage-blue/navy/ornament.png"
                  alt=""
                  fill
                  sizes="64px"
                />
              </div>
              <h2 className={styles.sectionTitle}>Love Story</h2>
              <div className={styles.storyBody}>
                {storyParagraphs.map((paragraph, index) => (
                  <p key={`${paragraph.slice(0, 24)}-${index}`}>{paragraph}</p>
                ))}
              </div>
            </VintageBlueReveal>
          </section>

          {galleryAssets.length > 0 || videoAsset ? (
            <section className={`${styles.section} ${styles.mediaSection}`}>
              <VintageBlueReveal>
                <p className={styles.sectionEyebrow}>Our Memories</p>
                <h2 className={styles.sectionTitle}>Galeri Kenangan</h2>
                {galleryAssets.length > 0 ? (
                  <div className={styles.galleryGrid}>
                    {galleryAssets.slice(0, 8).map((asset) => (
                      <div className={styles.galleryItem} key={asset.public_url}>
                        <Image
                          src={asset.public_url}
                          alt={asset.file_name}
                          fill
                          sizes="(min-width: 1025px) 210px, 44vw"
                        />
                      </div>
                    ))}
                  </div>
                ) : null}
                {videoAsset ? (
                  <div className={styles.videoFrame}>
                    <video src={videoAsset.public_url} controls preload="metadata" />
                  </div>
                ) : null}
              </VintageBlueReveal>
            </section>
          ) : null}

          {invitation.gift_account ? (
            <section className={`${styles.section} ${styles.giftSection}`}>
              <VintageBlueReveal className={styles.giftCard}>
                <h2>Amplop Digital</h2>
                <p className={styles.sectionCopy}>
                  Doa restu Anda merupakan karunia yang sangat berarti bagi kami.
                  Jika memberi adalah ungkapan tanda kasih, Anda dapat memberi
                  kado secara cashless.
                </p>
                <p className={styles.giftValue}>{invitation.gift_account}</p>
                <GiftCopyButton value={invitation.gift_account} />
              </VintageBlueReveal>
            </section>
          ) : null}

          <section className={`${styles.section} ${styles.rsvpSection}`}>
            <VintageBlueReveal className={styles.rsvpCard}>
              <h2>Ucapkan Sesuatu</h2>
              <p className={styles.rsvpLead}>Berikan Ucapan &amp; Doa Restu</p>
              <form action={submitRsvp} className={styles.formGrid}>
                <input type="hidden" name="orderId" value={invitation.id} />
                <input type="hidden" name="slug" value={invitation.public_slug} />
                <input
                  className={styles.formControl}
                  name="guestName"
                  required
                  placeholder="Nama Kamu"
                />
                <textarea
                  className={styles.formControl}
                  name="message"
                  rows={4}
                  placeholder="Berikan Ucapan & Doa"
                />
                <input
                  className={styles.formControl}
                  name="guestCount"
                  type="number"
                  min="1"
                  max="10"
                  defaultValue="1"
                  aria-label="Jumlah tamu"
                />
                <p className={styles.attendanceLabel}>Konfirmasi Kehadiran?</p>
                <div className={styles.attendanceOptions}>
                  <label className={styles.attendanceOption}>
                    <input
                      type="radio"
                      name="attendance"
                      value="hadir"
                      defaultChecked
                    />
                    <span>Hadir</span>
                  </label>
                  <label className={styles.attendanceOption}>
                    <input type="radio" name="attendance" value="tidak_hadir" />
                    <span>Tidak Hadir</span>
                  </label>
                </div>
                <button type="submit" className={styles.submitButton}>
                  Kirim
                </button>
              </form>

              {invitation.guestbook_entries?.length ? (
                <div className={styles.comments}>
                  {invitation.guestbook_entries.slice(0, 3).map((entry) => (
                    <article
                      className={styles.comment}
                      key={`${entry.guest_name}-${entry.created_at}`}
                    >
                      <strong>{entry.guest_name}</strong>
                      <p>{entry.message}</p>
                    </article>
                  ))}
                </div>
              ) : null}
            </VintageBlueReveal>
          </section>

          <footer className={styles.closing}>
            <div className={styles.closingBackground} aria-hidden="true" />
            <div className={styles.closingCouple} aria-hidden="true">
              <Image
                src="/images/invitations/vintage-blue/navy/closing-couple.png"
                alt=""
                fill
                sizes="(min-width: 1025px) 352px, 88vw"
              />
            </div>
            <VintageBlueReveal className={styles.closingContent}>
              <p>
                Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
                Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
              </p>
              <h2>
                {groomName} &amp; {brideName}
              </h2>
              <small>
                Dibuat dengan{" "}
                <a href={siteUrl} target="_blank" rel="noopener noreferrer">
                  BikinUndangan.net
                </a>
              </small>
            </VintageBlueReveal>
          </footer>
        </VintageBlueExperience>
      </Suspense>
    </div>
  );
}
