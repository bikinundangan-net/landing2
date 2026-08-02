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
} from "lucide-react";
import {
  type FormEvent,
  type ReactNode,
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
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return null;
  }

  const activeImage = images[activeIndex];

  function showPrevious() {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  }

  function showNext() {
    setActiveIndex((current) => (current + 1) % images.length);
  }

  return (
    <div className="classic-rose-gallery">
      <div className="classic-rose-gallery__stage">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeImage.src}
            initial={reduceMotion ? false : { opacity: 1, scale: 1.025 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              sizes="(min-width: 1024px) 430px, 92vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        {images.length > 1 ? (
          <>
            <button
              type="button"
              onClick={showPrevious}
              className="classic-rose-gallery__arrow classic-rose-gallery__arrow--left"
              aria-label="Foto sebelumnya"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={showNext}
              className="classic-rose-gallery__arrow classic-rose-gallery__arrow--right"
              aria-label="Foto berikutnya"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </>
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="classic-rose-gallery__dots" aria-label="Pilih foto">
          {images.map((image, index) => (
            <button
              type="button"
              key={image.src}
              onClick={() => setActiveIndex(index)}
              aria-label={`Tampilkan foto ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>
      ) : null}
    </div>
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
            defaultValue="1"
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
    </div>
  );
}
