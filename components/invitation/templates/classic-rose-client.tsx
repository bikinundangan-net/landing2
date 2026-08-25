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

type ClassicRoseCoverCopy = {
  initials: string;
  groomName: string;
  brideName: string;
  eventDay: string;
  eventDate: string;
  eventTime: string;
  locationLines: string[];
};

export function ClassicRoseCover({ copy }: { copy: ClassicRoseCoverCopy }) {
  const coverRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [isOpening, setIsOpening] = useState(false);
  const searchParams = useSearchParams();
  const guestName = searchParams.get("to")?.trim();
  const { scrollYProgress } = useScroll({
    target: coverRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "7%"]);

  function openInvitation() {
    setIsOpening(true);
    window.setTimeout(() => {
      const invitationContent = document.getElementById("invitation-content");

      if (!invitationContent) {
        return;
      }

      if (reduceMotion) {
        const root = document.documentElement;
        const previousBehavior = root.style.scrollBehavior;
        root.style.scrollBehavior = "auto";
        invitationContent.scrollIntoView();
        window.requestAnimationFrame(() => {
          root.style.scrollBehavior = previousBehavior;
        });
        return;
      }

      invitationContent.scrollIntoView({ behavior: "smooth" });
    }, reduceMotion ? 0 : 420);
  }

  return (
    <motion.section
      ref={coverRef}
      className="classic-rose-cover"
      initial={reduceMotion ? false : { opacity: 1 }}
      animate={{
        opacity: isOpening ? 0.94 : 1,
        scale: isOpening && !reduceMotion ? 0.992 : 1,
      }}
      transition={{ duration: isOpening ? 0.42 : 0.7, ease: "easeOut" }}
    >
      <motion.div
        className="classic-rose-cover__art"
        style={reduceMotion ? undefined : { y: backgroundY }}
        aria-hidden="true"
      >
        <Image
          src="/images/invitations/classic-rose/cover-background.webp"
          alt=""
          fill
          preload
          sizes="(min-width: 1024px) 480px, 100vw"
          className="object-cover"
        />
      </motion.div>

      <div className="classic-rose-cover__frame" aria-hidden="true">
        <span />
      </div>

      <motion.div
        className="classic-rose-cover__content"
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { delayChildren: 0.25, staggerChildren: 0.075 },
          },
        }}
      >
        {[
          <div className="classic-rose-monogram" key="monogram">
            <span>{copy.initials}</span>
          </div>,
          <p className="classic-rose-kicker" key="kicker">
            The Wedding of
          </p>,
          <h1 className="classic-rose-cover__names" key="names">
            <span>{copy.groomName}</span>
            <em>&amp;</em>
            <span>{copy.brideName}</span>
          </h1>,
          <p className="classic-rose-cover__kepada" key="kepada">
            Kepada: <strong>{guestName || "Tamu Undangan"}</strong>
          </p>,
          <div className="classic-rose-rule" key="rule" aria-hidden="true">
            <span />
            <Heart className="size-3 fill-current" />
            <span />
          </div>,
          <p className="classic-rose-cover__promise" key="promise">
            Kami akan menikah
          </p>,
          <div className="classic-rose-cover__date" key="date">
            <span>{copy.eventDay}</span>
            <strong>{copy.eventDate}</strong>
            <small>{copy.eventTime}</small>
          </div>,
          <div className="classic-rose-cover__location" key="location">
            <MapPin className="size-5 fill-current" aria-hidden="true" />
            {copy.locationLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>,
          <button
            type="button"
            className="classic-rose-primary-button"
            onClick={openInvitation}
            disabled={isOpening}
            key="button"
          >
            <span>{isOpening ? "Membuka..." : "Buka Undangan"}</span>
            <Heart className="size-4 fill-current" aria-hidden="true" />
          </button>,
          <p className="classic-rose-cover__note" key="note">
            Dengan penuh cinta,
            <br />
            kami mengundang Anda untuk
            <br />
            merayakan hari istimewa kami.
          </p>,
        ].map((item, index) => (
          <motion.div
            key={item.key ?? index}
            className="classic-rose-cover__item"
            variants={{
              hidden: { opacity: 1, y: 12 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.45, ease: "easeOut" },
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

export function ClassicRoseReveal({
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
      initial={reduceMotion ? false : { opacity: 1, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
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

export function ClassicRoseGallery({ images }: { images: GalleryImage[] }) {
  const reduceMotion = useReducedMotion();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (images.length === 0) {
    return null;
  }

  const shown = images.slice(0, 8);

  return (
    <>
      <div className="classic-rose-gallery-grid">
        {shown.map((image, index) => (
          <button
            type="button"
            key={`${image.src}-${index}`}
            className="classic-rose-gallery-grid__item"
            onClick={() => setLightboxIndex(index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 210px, 46vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null ? (
          <ClassicRoseLightbox
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

function ClassicRoseLightbox({
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
      className="classic-rose-lightbox"
      onClick={onClose}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduceMotion ? undefined : { opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <button
        type="button"
        className="classic-rose-lightbox__close"
        onClick={onClose}
        aria-label="Tutup galeri"
      >
        <X className="size-5" aria-hidden="true" />
      </button>

      <div
        className="classic-rose-lightbox__stage"
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
              className="classic-rose-lightbox__arrow classic-rose-lightbox__arrow--left"
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
              className="classic-rose-lightbox__arrow classic-rose-lightbox__arrow--right"
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

export function ClassicRoseGiftCopy({ account }: { account: string }) {
  const [copied, setCopied] = useState(false);

  async function copyAccount() {
    await navigator.clipboard.writeText(account);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      className="classic-rose-secondary-button"
      onClick={copyAccount}
    >
      {copied ? (
        <Check className="size-4" aria-hidden="true" />
      ) : (
        <Copy className="size-4" aria-hidden="true" />
      )}
      {copied ? "Berhasil disalin" : "Salin nomor rekening"}
    </button>
  );
}

export function ClassicRoseDemoForms() {
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
    <div className="classic-rose-form-stack">
      <form className="classic-rose-form" onSubmit={submitRsvpDemo}>
        <p className="classic-rose-eyebrow">Konfirmasi Kehadiran</p>
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
            placeholder="Jumlah tamu"
          />
        </label>
        <button type="submit" className="classic-rose-primary-button">
          <Send className="size-4" aria-hidden="true" />
          Kirim RSVP
        </button>
        <p className="classic-rose-form__status" aria-live="polite">
          {rsvpSent
            ? "Terima kasih. RSVP demo berhasil disimulasikan."
            : "Form demo tidak mengirim data ke server."}
        </p>
      </form>

      <form className="classic-rose-form" onSubmit={submitWishDemo}>
        <p className="classic-rose-eyebrow">Doa &amp; Ucapan</p>
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
        <button type="submit" className="classic-rose-primary-button">
          <Heart className="size-4 fill-current" aria-hidden="true" />
          Kirim Ucapan
        </button>
        <p className="classic-rose-form__status" aria-live="polite">
          {wishSent
            ? "Ucapan demo sudah ditampilkan secara lokal."
            : "Pesan tidak akan tersimpan pada mode demo."}
        </p>
      </form>

      <div className="classic-rose-comments">
        <h2 className="font-serif text-2xl font-bold">
          Ucapan &amp; Doa ({demoComments.length})
        </h2>
        <div className="classic-rose-comments__list">
          {demoComments.map((entry) => (
            <div key={entry.guest_name} className="classic-rose-comments__item">
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
