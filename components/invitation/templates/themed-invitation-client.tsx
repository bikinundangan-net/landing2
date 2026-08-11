"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Heart,
  MapPin,
  Send,
  X,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import {
  type FormEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

export type ThemedCoverCopy = {
  variant: string;
  background: string;
  monogram: string;
  kicker: string;
  brideName: string;
  groomName: string;
  eventDay: string;
  eventDate: string;
  eventTime: string;
  locationLines: string[];
  note: string;
};

export type ModernMinimalCoverCopy = ThemedCoverCopy & {
  verse: string;
  verseSource: string;
  receptionLabel: string;
  receptionTime: string;
};

export function ModernMinimalCover({
  copy,
}: {
  copy: ModernMinimalCoverCopy;
}) {
  const coverRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [isOpening, setIsOpening] = useState(false);
  const searchParams = useSearchParams();
  const guestName = searchParams.get("to")?.trim();
  const { scrollYProgress } = useScroll({
    target: coverRef,
    offset: ["start start", "end start"],
  });
  const artY = useTransform(scrollYProgress, [0, 1], ["0%", "4%"]);

  function openInvitation() {
    setIsOpening(true);
    window.setTimeout(() => {
      document.getElementById("invitation-content")?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
      });
    }, reduceMotion ? 0 : 320);
  }

  return (
    <motion.section
      ref={coverRef}
      className="modern-minimal-cover"
      animate={{
        opacity: isOpening ? 0.94 : 1,
        scale: isOpening && !reduceMotion ? 0.994 : 1,
      }}
      transition={{ duration: 0.36, ease: "easeOut" }}
    >
      <motion.div
        className="modern-minimal-cover__art"
        style={reduceMotion ? undefined : { y: artY }}
        aria-hidden="true"
      >
        <Image
          src={copy.background}
          alt=""
          fill
          preload
          sizes="(min-width: 1024px) 480px, 100vw"
          className="object-cover"
        />
      </motion.div>

      <motion.div
        className="modern-minimal-cover__content"
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { delayChildren: 0.12, staggerChildren: 0.055 },
          },
        }}
      >
        <div className="modern-minimal-cover__identity">
          <motion.div
            className="modern-minimal-cover__monogram"
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            aria-label={`Monogram ${copy.monogram}`}
          >
            <span>{copy.monogram.slice(0, 1)}</span>
            <span>{copy.monogram.slice(-1)}</span>
          </motion.div>

          <motion.p
            className="modern-minimal-cover__kicker"
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            {copy.kicker}
          </motion.p>

          <motion.h1
            className="modern-minimal-cover__names"
            variants={{
              hidden: { opacity: 0, y: 14 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.58 } },
            }}
          >
            <span>{copy.brideName}</span>
            <em>&amp;</em>
            <span>{copy.groomName}</span>
          </motion.h1>

          <motion.div
            className="modern-minimal-rule"
            variants={{
              hidden: { opacity: 0, scaleX: 0.7 },
              visible: { opacity: 1, scaleX: 1, transition: { duration: 0.52 } },
            }}
            aria-hidden="true"
          >
            <span />
            <i />
            <span />
          </motion.div>
        </div>

        <div className="modern-minimal-cover__schedule">
          <motion.blockquote
            className="modern-minimal-cover__verse"
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            <p>{copy.verse}</p>
            <cite>{copy.verseSource}</cite>
          </motion.blockquote>

          <motion.div
            className="modern-minimal-cover__date"
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            <span>{copy.eventDay}</span>
            <strong>{copy.eventDate.replaceAll(".", " . ")}</strong>
            <small>{copy.eventTime}</small>
          </motion.div>

          <motion.div
            className="modern-minimal-cover__details"
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            <div className="modern-minimal-cover__venue">
              <MapPin aria-hidden="true" />
              {copy.locationLines.map((line, index) =>
                index === 0 ? <strong key={line}>{line}</strong> : <span key={line}>{line}</span>,
              )}
            </div>
            <div className="modern-minimal-cover__reception">
              <strong>{copy.receptionLabel}</strong>
              <span>{copy.receptionTime}</span>
            </div>
          </motion.div>
        </div>

        <div className="modern-minimal-cover__invitation">
          <motion.div
            className="modern-minimal-rule modern-minimal-rule--lower"
            variants={{
              hidden: { opacity: 0, scaleX: 0.7 },
              visible: { opacity: 1, scaleX: 1, transition: { duration: 0.52 } },
            }}
            aria-hidden="true"
          >
            <span />
            <i />
            <span />
          </motion.div>

          <motion.p
            className="modern-minimal-cover__recipient"
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            <span>Kepada Yth.</span>
            <strong>{guestName || "Tamu Undangan"}</strong>
          </motion.p>

          <motion.button
            type="button"
            className="modern-minimal-cover__button"
            onClick={openInvitation}
            disabled={isOpening}
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            whileHover={reduceMotion ? undefined : { y: -2 }}
            whileTap={reduceMotion ? undefined : { scale: 0.985 }}
          >
            <span>{isOpening ? "Membuka..." : "Buka Undangan"}</span>
            <i aria-hidden="true">
              <b />
              <b />
            </i>
          </motion.button>

          <motion.div
            className="modern-minimal-cover__heart"
            variants={{
              hidden: { opacity: 0, y: 8 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            aria-hidden="true"
          >
            <Heart />
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}

export function ThemedCover({ copy }: { copy: ThemedCoverCopy }) {
  const coverRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [isOpening, setIsOpening] = useState(false);
  const { scrollYProgress } = useScroll({
    target: coverRef,
    offset: ["start start", "end start"],
  });
  const artY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

  function openInvitation() {
    setIsOpening(true);
    window.setTimeout(() => {
      const content = document.getElementById("invitation-content");

      if (!content) {
        return;
      }

      content.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    }, reduceMotion ? 0 : 360);
  }

  const items = [
    <div className="themed-cover__monogram" key="monogram">
      {copy.monogram}
    </div>,
    <p className="themed-cover__kicker" key="kicker">
      {copy.kicker}
    </p>,
    <h1 className="themed-cover__names" key="names">
      <span>{copy.brideName}</span>
      <em>&amp;</em>
      <span>{copy.groomName}</span>
    </h1>,
    <div className="themed-cover__date" key="date">
      <span>{copy.eventDay}</span>
      <strong>{copy.eventDate}</strong>
      <small>{copy.eventTime}</small>
    </div>,
    <div className="themed-cover__location" key="location">
      {copy.locationLines.map((line) => (
        <span key={line}>{line}</span>
      ))}
    </div>,
    <button
      type="button"
      className="themed-button themed-cover__button"
      onClick={openInvitation}
      disabled={isOpening}
      key="button"
    >
      {isOpening ? "Membuka..." : "Buka Undangan"}
      <Heart className="size-4 fill-current" aria-hidden="true" />
    </button>,
    <p className="themed-cover__note" key="note">
      {copy.note}
    </p>,
  ];

  return (
    <motion.section
      ref={coverRef}
      className={`themed-cover themed-cover--${copy.variant}`}
      animate={{
        opacity: isOpening ? 0.94 : 1,
        scale: isOpening && !reduceMotion ? 0.993 : 1,
      }}
      transition={{ duration: 0.38, ease: "easeOut" }}
    >
      <motion.div
        className="themed-cover__art"
        style={reduceMotion ? undefined : { y: artY }}
        aria-hidden="true"
      >
        <Image
          src={copy.background}
          alt=""
          fill
          preload
          sizes="(min-width: 1024px) 480px, 100vw"
          className="object-cover"
        />
      </motion.div>

      <motion.div
        className="themed-cover__content"
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { delayChildren: 0.18, staggerChildren: 0.07 },
          },
        }}
      >
        {items.map((item, index) => (
          <motion.div
            className="themed-cover__item"
            key={item.key ?? index}
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {item}
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}

export function ThemedReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

type GalleryImage = {
  src: string;
  alt: string;
};

export function ThemedGallery({ images }: { images: GalleryImage[] }) {
  const reduceMotion = useReducedMotion();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (images.length === 0) {
    return null;
  }

  const shown = images.slice(0, 8);

  return (
    <>
      <div className="themed-gallery-grid">
        {shown.map((image, index) => (
          <button
            type="button"
            key={`${image.src}-${index}`}
            className="themed-gallery-grid__item"
            onClick={() => setLightboxIndex(index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 200px, 46vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null ? (
          <ThemedLightbox
            images={shown}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onIndexChange={setLightboxIndex}
            reduceMotion={!!reduceMotion}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}

function ThemedLightbox({
  images,
  index,
  onClose,
  onIndexChange,
  reduceMotion,
}: {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
  reduceMotion: boolean;
}) {
  const activeImage = images[index];

  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowLeft") {
        onIndexChange((index - 1 + images.length) % images.length);
      } else if (event.key === "ArrowRight") {
        onIndexChange((index + 1) % images.length);
      }
    }

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [index, images.length, onClose, onIndexChange]);

  return (
    <motion.div
      className="themed-lightbox"
      onClick={onClose}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduceMotion ? undefined : { opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <button
        type="button"
        className="themed-lightbox__close"
        onClick={onClose}
        aria-label="Tutup galeri"
      >
        <X className="size-5" aria-hidden="true" />
      </button>

      <div
        className="themed-lightbox__stage"
        onClick={(event) => event.stopPropagation()}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={`${activeImage.src}-${index}`}
            className="absolute inset-0"
            initial={reduceMotion ? false : { opacity: 0, scale: 1.025 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              sizes="92vw"
              className="object-contain"
            />
          </motion.div>
        </AnimatePresence>

        {images.length > 1 ? (
          <>
            <button
              type="button"
              className="themed-lightbox__arrow themed-lightbox__arrow--left"
              onClick={(event) => {
                event.stopPropagation();
                onIndexChange((index - 1 + images.length) % images.length);
              }}
              aria-label="Foto sebelumnya"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="themed-lightbox__arrow themed-lightbox__arrow--right"
              onClick={(event) => {
                event.stopPropagation();
                onIndexChange((index + 1) % images.length);
              }}
              aria-label="Foto berikutnya"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </>
        ) : null}
      </div>
    </motion.div>
  );
}

export function ThemedGiftCopy({ account }: { account: string }) {
  const [copied, setCopied] = useState(false);

  async function copyAccount() {
    await navigator.clipboard.writeText(account);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button type="button" className="themed-button" onClick={copyAccount}>
      {copied ? (
        <Check className="size-4" aria-hidden="true" />
      ) : (
        <Copy className="size-4" aria-hidden="true" />
      )}
      {copied ? "Berhasil disalin" : "Salin rekening"}
    </button>
  );
}

export function ThemedDemoForms() {
  const [rsvpSent, setRsvpSent] = useState(false);
  const [wishSent, setWishSent] = useState(false);

  function submitRsvpDemo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    setRsvpSent(true);
  }

  function submitWishDemo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    setWishSent(true);
  }

  return (
    <div className="themed-form-stack">
      <form className="themed-form" onSubmit={submitRsvpDemo}>
        <p className="themed-eyebrow">Konfirmasi Kehadiran</p>
        <h3>Apakah Anda akan hadir?</h3>
        <label>
          Nama tamu
          <input name="guestName" required placeholder="Nama lengkap" />
        </label>
        <label>
          Kehadiran
          <select name="attendance" defaultValue="hadir">
            <option value="hadir">Hadir</option>
            <option value="tidak_hadir">Tidak hadir</option>
            <option value="ragu">Masih ragu</option>
          </select>
        </label>
        <label>
          Jumlah tamu
          <input
            name="guestCount"
            type="number"
            min="1"
            max="10"
            defaultValue="1"
          />
        </label>
        <button type="submit" className="themed-button">
          <Send className="size-4" aria-hidden="true" />
          Kirim RSVP
        </button>
        <p className="themed-form__status" aria-live="polite">
          {rsvpSent
            ? "Terima kasih. RSVP demo berhasil disimulasikan."
            : "Form demo tidak mengirim data ke server."}
        </p>
      </form>

      <form className="themed-form" onSubmit={submitWishDemo}>
        <p className="themed-eyebrow">Doa &amp; Ucapan</p>
        <h3>Tinggalkan pesan hangat</h3>
        <label>
          Nama
          <input name="guestName" required placeholder="Nama Anda" />
        </label>
        <label>
          Ucapan
          <textarea
            name="message"
            rows={4}
            required
            placeholder="Tulis doa dan ucapan"
          />
        </label>
        <button type="submit" className="themed-button">
          <Heart className="size-4 fill-current" aria-hidden="true" />
          Kirim Ucapan
        </button>
        <p className="themed-form__status" aria-live="polite">
          {wishSent
            ? "Ucapan demo sudah ditampilkan secara lokal."
            : "Pesan tidak akan tersimpan pada mode demo."}
        </p>
      </form>

      <div className="themed-comments">
        <h2 className="font-serif text-2xl font-bold">
          Ucapan &amp; Doa ({demoComments.length})
        </h2>
        <div className="themed-comments__list">
          {demoComments.map((entry) => (
            <div key={entry.guest_name} className="themed-comments__item">
              <p className="font-black">{entry.guest_name}</p>
              <p className="mt-1 text-sm leading-6 opacity-70">{entry.message}</p>
              <p className="mt-2 text-xs opacity-50">{entry.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const demoComments = [
  {
    guest_name: "Sarah & Budi",
    message: "Selamat menempuh hidup baru. Semoga selalu bahagia dan langgeng sampai kakek nenek!",
    time: "2 hari lalu",
  },
  {
    guest_name: "Mia Anggraini",
    message: "Barakallahu laka, lancar sampai hari H ya. Happy for you both!",
    time: "3 hari lalu",
  },
  {
    guest_name: "Dimas & Keluarga",
    message: "Selamat berbahagia. Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.",
    time: "5 hari lalu",
  },
  {
    guest_name: "Tante Rina",
    message: "Congratulations! Doain sehat-sehat terus dan cepat dikasih momongan ya.",
    time: "1 minggu lalu",
  },
];
