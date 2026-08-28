"use client";

import Image from "next/image";
import { Copy, Pause, Play } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { useSearchParams } from "next/navigation";
import {
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "@/components/invitation/templates/vintage-blue.module.css";

type CoverCopy = {
  groomName: string;
  brideName: string;
  eventDate: string;
};

type VintageBlueExperienceProps = {
  cover: CoverCopy;
  audioSrc: string;
  children: ReactNode;
};

const ease = [0.16, 1, 0.3, 1] as const;

export function VintageBlueExperience({
  cover,
  audioSrc,
  children,
}: VintageBlueExperienceProps) {
  const searchParams = useSearchParams();
  const reduceMotion = useReducedMotion();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const guestName = searchParams.get("to")?.trim() || "Nama Tamu";

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);

    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);

    return () => {
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
    };
  }, []);

  function openInvitation() {
    setIsOpened(true);
    audioRef.current?.play().catch(() => setIsPlaying(false));
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }

  function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(() => setIsPlaying(false));
      return;
    }

    audio.pause();
  }

  return (
    <main className={styles.experience} data-opened={isOpened}>
      <audio ref={audioRef} src={audioSrc} preload="none" loop />

      <aside className={styles.scenicPanel} aria-hidden="true">
        <div className={styles.scenicShade} />
        <div className={styles.scenicCopy}>
          <span>The Wedding of</span>
          <strong>
            {cover.groomName} &amp; {cover.brideName}
          </strong>
          <small>{cover.eventDate}</small>
        </div>
      </aside>

      <div className={styles.invitationColumn}>
        <AnimatePresence mode="wait" initial={false}>
          {!isOpened ? (
            <motion.section
              key="cover"
              className={styles.cover}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 1.015 }}
              transition={{ duration: 0.8, ease }}
            >
              <Image
                src="/images/invitations/vintage-blue/navy/cover.png"
                alt=""
                fill
                priority
                sizes="(min-width: 1025px) 500px, 100vw"
                className={styles.coverImage}
              />
              <div className={styles.coverOverlay} />
              <motion.div
                className={styles.coverContent}
                initial={reduceMotion ? false : "hidden"}
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: { delayChildren: 0.25, staggerChildren: 0.16 },
                  },
                }}
              >
                <CoverItem>
                  <p className={styles.coverKicker}>The Wedding of</p>
                </CoverItem>
                <CoverItem>
                  <h1 className={styles.coverNames}>
                    {cover.groomName} &amp; {cover.brideName}
                  </h1>
                </CoverItem>
                <CoverItem>
                  <p className={styles.recipientLabel}>
                    Kepada Bapak/Ibu/Saudara/i
                  </p>
                  <p className={styles.recipientName}>{guestName}</p>
                </CoverItem>
                <CoverItem>
                  <button
                    type="button"
                    className={styles.openButton}
                    onClick={openInvitation}
                  >
                    Buka Undangan
                  </button>
                </CoverItem>
              </motion.div>
            </motion.section>
          ) : (
            <motion.div
              key="invitation"
              className={styles.openedContent}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, ease }}
            >
              <VintageBlueIntro cover={cover} />
              {children}
            </motion.div>
          )}
        </AnimatePresence>

        {isOpened ? (
          <motion.button
            type="button"
            className={styles.musicButton}
            onClick={toggleMusic}
            aria-label={isPlaying ? "Jeda musik" : "Putar musik"}
            aria-pressed={isPlaying}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={reduceMotion ? undefined : { scale: 1.06 }}
            whileTap={reduceMotion ? undefined : { scale: 0.96 }}
          >
            {isPlaying ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
          </motion.button>
        ) : null}
      </div>
    </main>
  );
}

function CoverItem({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 18 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.9, ease },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

function VintageBlueIntro({ cover }: { cover: CoverCopy }) {
  const reduceMotion = useReducedMotion();
  const [introReady, setIntroReady] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;

    const timeout = window.setTimeout(() => setIntroReady(true), 12_500);
    return () => window.clearTimeout(timeout);
  }, [reduceMotion]);

  const showIntroCopy = Boolean(reduceMotion) || introReady;

  return (
    <section className={styles.intro} id="invitation-content">
      {reduceMotion ? (
        <Image
          src="/images/invitations/vintage-blue/navy/intro-poster.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 1025px) 500px, 100vw"
          className={styles.introMedia}
        />
      ) : (
        <video
          className={styles.introMedia}
          poster="/images/invitations/vintage-blue/navy/intro-poster.jpg"
          muted
          autoPlay
          playsInline
          preload="metadata"
          onEnded={() => setIntroReady(true)}
        >
          <source
            src="/images/invitations/vintage-blue/navy/intro.mp4"
            type="video/mp4"
          />
        </video>
      )}
      <motion.div
        className={styles.introCopy}
        initial={false}
        animate={
          showIntroCopy
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 16, scale: 0.98 }
        }
        transition={{ duration: reduceMotion ? 0 : 1.5, ease }}
      >
        <span>The Wedding of</span>
        <h2>
          {cover.groomName}
          <br />&amp; {cover.brideName}
        </h2>
        <p>{cover.eventDate}</p>
        <a href="#verse">Save The Date</a>
      </motion.div>
    </section>
  );
}

export function VintageBlueReveal({
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
      initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.985 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 1.1, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function GiftCopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function copyGift() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button type="button" className={styles.copyButton} onClick={copyGift}>
      <Copy aria-hidden="true" />
      {copied ? "Berhasil disalin" : "Salin rekening"}
    </button>
  );
}
