"use client";

import Image from "next/image";
import {
  BookOpen,
  Camera,
  Heart,
  MapPin,
  MessageCircle,
  UtensilsCrossed,
} from "lucide-react";
import {
  motion,
  type Variants,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { type ReactNode, useRef, useState } from "react";
import type { ThemedCoverCopy } from "@/components/invitation/templates/themed-invitation-client";

export type ReferenceCoverEvent = {
  label: string;
  time: string;
};

export type ReferenceCoverImage = {
  src: string;
  alt: string;
};

export type ReferenceCoverCopy = ThemedCoverCopy & {
  verse: string;
  verseSource: string;
  countdown: Array<{ label: string; value: string }>;
  events: ReferenceCoverEvent[];
  galleryImages: ReferenceCoverImage[];
  confirmationDate: string;
};

const itemVariants = {
  hidden: { opacity: 0, y: 13 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
  },
} satisfies Variants;

function CoverItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

function initials(monogram: string) {
  const letters = monogram.match(/[A-Za-z]/g) ?? ["B", "G"];
  return [letters[0] ?? "B", letters.at(-1) ?? "G"];
}

function spacedDate(value: string) {
  return value.replaceAll(".", " . ");
}

function CoverButton({
  isOpening,
  onClick,
  ornate = false,
}: {
  isOpening: boolean;
  onClick: () => void;
  ornate?: boolean;
}) {
  return (
    <motion.button
      type="button"
      className={`reference-cover__button${ornate ? " reference-cover__button--ornate" : ""}`}
      onClick={onClick}
      disabled={isOpening}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
      variants={itemVariants}
    >
      <span>{isOpening ? "Membuka..." : "Buka Undangan"}</span>
      {!ornate ? <Heart aria-hidden="true" /> : null}
    </motion.button>
  );
}

function Monogram({ copy }: { copy: ReferenceCoverCopy }) {
  const [first, second] = initials(copy.monogram);

  return (
    <div className="reference-cover__monogram" aria-label={`Monogram ${first} dan ${second}`}>
      <span>{first}</span>
      <i />
      <span>{second}</span>
    </div>
  );
}

function Names({ copy }: { copy: ReferenceCoverCopy }) {
  return (
    <h1 className="reference-cover__names">
      <span>{copy.brideName}</span>
      <em>&amp;</em>
      <span>{copy.groomName}</span>
    </h1>
  );
}

function Location({ copy }: { copy: ReferenceCoverCopy }) {
  return (
    <div className="reference-cover__location">
      <MapPin aria-hidden="true" />
      {copy.locationLines.map((line, index) =>
        index === 0 ? <strong key={line}>{line}</strong> : <span key={line}>{line}</span>,
      )}
    </div>
  );
}

function GardenCover({
  copy,
  isOpening,
  openInvitation,
}: {
  copy: ReferenceCoverCopy;
  isOpening: boolean;
  openInvitation: () => void;
}) {
  return (
    <>
      <CoverItem><Monogram copy={copy} /></CoverItem>
      <CoverItem><p className="reference-cover__kicker">The Wedding of</p></CoverItem>
      <CoverItem><Names copy={copy} /></CoverItem>
      <CoverItem className="reference-cover__leaf-rule">
        <span />
        <b>❧</b>
        <span />
      </CoverItem>
      <CoverItem><p className="reference-cover__promise">Kami akan menikah</p></CoverItem>
      <CoverItem>
        <div className="reference-cover__date reference-cover__date--stacked">
          <span>{copy.eventDay}</span>
          <strong>{spacedDate(copy.eventDate)}</strong>
          <small>{copy.eventTime}</small>
        </div>
      </CoverItem>
      <CoverItem><Location copy={copy} /></CoverItem>
      <CoverButton isOpening={isOpening} onClick={openInvitation} />
      <CoverItem>
        <blockquote className="reference-cover__verse">
          <p>{copy.verse}</p>
          <cite>{copy.verseSource}</cite>
        </blockquote>
      </CoverItem>
      <CoverItem>
        <div className="reference-cover__confirmation reference-cover__confirmation--garden">
          <strong>Konfirmasi Kehadiran</strong>
          <span>Mohon konfirmasi sebelum {copy.confirmationDate}</span>
          <div>
            <button type="button" onClick={openInvitation}>Hadir</button>
            <button type="button" onClick={openInvitation}>Tidak Hadir</button>
          </div>
        </div>
      </CoverItem>
    </>
  );
}

function PastelCover({
  copy,
  isOpening,
  openInvitation,
}: {
  copy: ReferenceCoverCopy;
  isOpening: boolean;
  openInvitation: () => void;
}) {
  const images = copy.galleryImages.slice(0, 3);

  return (
    <>
      <CoverItem><Monogram copy={copy} /></CoverItem>
      <CoverItem><p className="reference-cover__kicker">The Wedding of</p></CoverItem>
      <CoverItem><Names copy={copy} /></CoverItem>
      <CoverItem className="reference-cover__heart-rule">
        <span /><Heart /><span />
      </CoverItem>
      <CoverItem><p className="reference-cover__promise">Kami akan menikah</p></CoverItem>
      <CoverItem>
        <div className="reference-cover__date reference-cover__date--stacked">
          <span>{copy.eventDay}</span>
          <strong>{spacedDate(copy.eventDate)}</strong>
          <small>{copy.eventTime}</small>
        </div>
      </CoverItem>
      <CoverItem><Location copy={copy} /></CoverItem>
      {images.length > 0 ? (
        <CoverItem>
          <div className="reference-cover__mini-gallery">
            <p><span>❧</span> Galeri Foto <span>❧</span></p>
            <div>
              {images.map((image) => (
                <span key={image.src}>
                  <Image src={image.src} alt={image.alt} fill sizes="96px" className="object-cover" />
                </span>
              ))}
            </div>
            <i aria-hidden="true"><b /><b /><b /><b /></i>
          </div>
        </CoverItem>
      ) : null}
      <CoverButton isOpening={isOpening} onClick={openInvitation} />
      <CoverItem><p className="reference-cover__note">Dengan penuh cinta, kami mengundang Anda untuk merayakan hari istimewa kami.</p></CoverItem>
    </>
  );
}

function OrnateRule() {
  return <div className="reference-cover__ornate-rule" aria-hidden="true"><span /><b>◇</b><span /></div>;
}

function Countdown({ copy }: { copy: ReferenceCoverCopy }) {
  return (
    <div className="reference-cover__countdown">
      <p>Countdown Menuju Hari Bahagia</p>
      <div>
        {copy.countdown.map((item) => (
          <span key={item.label}>
            <strong>{item.value}</strong>
            <small>{item.label}</small>
          </span>
        ))}
      </div>
    </div>
  );
}

function EventAgenda({ copy, islamic = false }: { copy: ReferenceCoverCopy; islamic?: boolean }) {
  const primary = copy.events[0] ?? { label: "Akad Nikah", time: copy.eventTime };
  const secondary = copy.events[1] ?? { label: "Resepsi", time: copy.eventTime };
  const items = islamic
    ? [
        { icon: Heart, label: primary.label, time: primary.time },
        { icon: BookOpen, label: secondary.label, time: secondary.time },
        { icon: Camera, label: "Foto Bersama", time: "13.00 WIB" },
        { icon: UtensilsCrossed, label: "Makan Siang", time: "13.30 WIB" },
      ]
    : [
        { icon: Heart, label: primary.label, time: primary.time },
        { icon: UtensilsCrossed, label: secondary.label, time: secondary.time },
        { icon: Camera, label: "Foto Bersama", time: "19.30 WIB" },
        { icon: MessageCircle, label: "Ramah Tamah", time: "20.00 WIB" },
      ];

  return (
    <div className="reference-cover__agenda">
      <p>Rangkaian Acara</p>
      <div>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <span key={item.label}>
              <Icon aria-hidden="true" />
              <strong>{item.label}</strong>
              <small>{item.time}</small>
            </span>
          );
        })}
      </div>
    </div>
  );
}

function OrnateCover({
  copy,
  isOpening,
  openInvitation,
}: {
  copy: ReferenceCoverCopy;
  isOpening: boolean;
  openInvitation: () => void;
}) {
  const isGold = copy.variant === "gold";

  return (
    <>
      <CoverItem><Monogram copy={copy} /></CoverItem>
      <CoverItem><p className="reference-cover__kicker">The Wedding of</p></CoverItem>
      <CoverItem><Names copy={copy} /></CoverItem>
      <CoverItem><OrnateRule /></CoverItem>
      <CoverItem>
        <blockquote className="reference-cover__verse">
          <p>{copy.verse}</p>
          <cite>{copy.verseSource}</cite>
        </blockquote>
      </CoverItem>
      <CoverItem>
        <div className="reference-cover__date reference-cover__date--stacked">
          <span>{copy.eventDay}</span>
          <strong>{spacedDate(copy.eventDate)}</strong>
          <small>{copy.eventTime}</small>
        </div>
      </CoverItem>
      <CoverItem><Location copy={copy} /></CoverItem>
      <CoverItem>{isGold ? <EventAgenda copy={copy} /> : <Countdown copy={copy} />}</CoverItem>
      {isGold ? (
        <CoverItem>
          <div className="reference-cover__confirmation reference-cover__confirmation--ornate">
            <strong>Konfirmasi Kehadiran</strong>
            <span>Mohon konfirmasi sebelum {copy.confirmationDate}</span>
            <button type="button" onClick={openInvitation}>
              <MessageCircle aria-hidden="true" /> 0812-3456-7890
            </button>
          </div>
        </CoverItem>
      ) : null}
      <CoverButton isOpening={isOpening} onClick={openInvitation} ornate />
    </>
  );
}

function IslamicCover({
  copy,
  isOpening,
  openInvitation,
}: {
  copy: ReferenceCoverCopy;
  isOpening: boolean;
  openInvitation: () => void;
}) {
  return (
    <>
      <CoverItem>
        <blockquote className="reference-cover__arabic">
          <p lang="ar" dir="rtl">وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا</p>
          <cite>( QS. Ar-Rum : 21 )</cite>
        </blockquote>
      </CoverItem>
      <CoverItem><p className="reference-cover__kicker">The Wedding of</p></CoverItem>
      <CoverItem><Names copy={copy} /></CoverItem>
      <CoverItem><OrnateRule /></CoverItem>
      <CoverItem><p className="reference-cover__note">Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami.</p></CoverItem>
      <CoverItem>
        <div className="reference-cover__date reference-cover__date--stacked">
          <span>{copy.eventDay}</span>
          <strong>{spacedDate(copy.eventDate)}</strong>
          <small>{copy.eventTime}</small>
        </div>
      </CoverItem>
      <CoverItem><Location copy={copy} /></CoverItem>
      <CoverItem><EventAgenda copy={copy} islamic /></CoverItem>
      <CoverItem>
        <div className="reference-cover__confirmation reference-cover__confirmation--islamic">
          <strong>Konfirmasi Kehadiran</strong>
          <span>Mohon konfirmasi sebelum {copy.confirmationDate}</span>
          <button type="button" onClick={openInvitation}><MessageCircle aria-hidden="true" /> Konfirmasi</button>
        </div>
      </CoverItem>
      <CoverButton isOpening={isOpening} onClick={openInvitation} />
    </>
  );
}

function RusticMap({ openInvitation }: { openInvitation: () => void }) {
  return (
    <div className="reference-cover__map">
      <p><span>❧</span> Lokasi <span>❧</span></p>
      <button type="button" onClick={openInvitation} aria-label="Buka lokasi acara">
        <i /><i /><i /><i /><i /><i />
        <MapPin aria-hidden="true" />
      </button>
      <span>Klik peta untuk membuka lokasi</span>
    </div>
  );
}

function RusticCover({
  copy,
  isOpening,
  openInvitation,
}: {
  copy: ReferenceCoverCopy;
  isOpening: boolean;
  openInvitation: () => void;
}) {
  return (
    <>
      <CoverItem><Monogram copy={copy} /></CoverItem>
      <CoverItem><p className="reference-cover__kicker">The Wedding of</p></CoverItem>
      <CoverItem><Names copy={copy} /></CoverItem>
      <CoverItem className="reference-cover__leaf-rule"><b>❧</b></CoverItem>
      <CoverItem><p className="reference-cover__note">Dengan penuh cinta, kami mengundang Anda untuk merayakan hari istimewa kami.</p></CoverItem>
      <CoverItem>
        <div className="reference-cover__date reference-cover__date--stacked">
          <span>{copy.eventDay}</span>
          <strong>{spacedDate(copy.eventDate)}</strong>
          <small>{copy.eventTime}</small>
        </div>
      </CoverItem>
      <CoverItem><Location copy={copy} /></CoverItem>
      <CoverItem><RusticMap openInvitation={openInvitation} /></CoverItem>
      <CoverButton isOpening={isOpening} onClick={openInvitation} />
      <CoverItem><p className="reference-cover__thanks"><em>Terima kasih</em><span>atas doa dan kehadirannya.</span></p></CoverItem>
    </>
  );
}

export function ReferenceThemedCover({ copy }: { copy: ReferenceCoverCopy }) {
  const coverRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [isOpening, setIsOpening] = useState(false);
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

  let content: ReactNode;

  if (copy.variant === "garden") {
    content = <GardenCover copy={copy} isOpening={isOpening} openInvitation={openInvitation} />;
  } else if (copy.variant === "pastel") {
    content = <PastelCover copy={copy} isOpening={isOpening} openInvitation={openInvitation} />;
  } else if (copy.variant === "maroon" || copy.variant === "gold") {
    content = <OrnateCover copy={copy} isOpening={isOpening} openInvitation={openInvitation} />;
  } else if (copy.variant === "islamic") {
    content = <IslamicCover copy={copy} isOpening={isOpening} openInvitation={openInvitation} />;
  } else {
    content = <RusticCover copy={copy} isOpening={isOpening} openInvitation={openInvitation} />;
  }

  return (
    <motion.section
      ref={coverRef}
      className={`reference-cover reference-cover--${copy.variant}`}
      animate={{ opacity: isOpening ? 0.95 : 1, scale: isOpening && !reduceMotion ? 0.994 : 1 }}
      transition={{ duration: 0.36, ease: "easeOut" }}
    >
      <motion.div
        className="reference-cover__art"
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
        className="reference-cover__content"
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { delayChildren: 0.12, staggerChildren: 0.045 } },
        }}
      >
        {content}
      </motion.div>
    </motion.section>
  );
}
