"use client";

import Image from "next/image";
import { motion, useAnimate, useReducedMotion, useScroll, useTransform, type AnimationSequence, type TargetAndTransition, type Variants } from "framer-motion";
import { ArrowDown, ArrowUpRight, Check, Copy, Heart, LoaderCircle, MailOpen } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useActionState, useEffect, useId, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { LiveCountdownStrip } from "./countdown-strip";
import type { CountdownItem } from "./countdown";
import { submitIbnuRsvp, submitIbnuWish } from "@/app/[slug]/ibnu-dinata-actions";
import { initialInvitationFormState } from "@/lib/invitation-form-state";
import content from "@/lib/admin/ibnu-dinata.json";
import styles from "./ibnu-dinata.module.css";

function GuestName() {
  const params = useSearchParams();
  return <strong>{params.get("to")?.trim().slice(0, 120) || "Bapak/Ibu/Saudara/i"}</strong>;
}

export function FloralOrnament({ kind = "corner", className = "", priority = false }: { kind?: "arch" | "corner"; className?: string; priority?: boolean }) {
  return <Image src={`/images/invitations/ibnu-dinata/${kind === "arch" ? "floral-arch" : "corner-bouquet"}.webp`} width={kind === "arch" ? 1400 : 1000} height={kind === "arch" ? 700 : 1000} alt="" aria-hidden="true" className={`${styles.floralOrnament} ${className}`} preload={priority} sizes={kind === "arch" ? "(min-width: 620px) 720px, 120vw" : "(min-width: 620px) 320px, 60vw"} />;
}

// React ids contain characters that are awkward inside url(#…) references.
const useSvgId = () => useId().replace(/[^a-zA-Z0-9_-]/g, "");

function GoldGradient({ id }: { id: string }) {
  return <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stopColor="#f1e3b5" /><stop offset=".35" stopColor="#c9b27a" /><stop offset=".65" stopColor="#a88f55" /><stop offset="1" stopColor="#e2cf98" />
  </linearGradient>;
}

const point = (radius: number, degrees: number) => {
  const angle = (degrees - 90) * Math.PI / 180;
  return [(100 + radius * Math.cos(angle)).toFixed(2), (100 + radius * Math.sin(angle)).toFixed(2)];
};
// Two laurel sprigs curving up from the base of the medallion.
const laurel = [...Array.from({ length: 9 }, (_, i) => 196 + i * 15), ...Array.from({ length: 9 }, (_, i) => 164 - i * 15)].map((degrees, i) => {
  const [x, y] = point(i % 2 ? 58 : 64, degrees);
  return { x, y, rotate: (degrees + 90 + (i % 2 ? 35 : -35)).toFixed(1) };
});

export function IbnuDinataLogo({ className = "", animated = false, decorative = false }: { className?: string; animated?: boolean; decorative?: boolean }) {
  const id = useSvgId();
  const gold = `${id}-gold`;
  return <svg viewBox="0 0 200 200" className={`${styles.logo} ${animated ? styles.logoAnimated : ""} ${className}`} {...decorative ? { "aria-hidden": true } : { role: "img", "aria-label": "Logo Ibnu & Dinata" }}>
    <defs>
      <GoldGradient id={gold} />
      <radialGradient id={`${id}-disc`} cx=".4" cy=".35" r=".75"><stop offset="0" stopColor="#fffdf4" /><stop offset=".7" stopColor="#f6f1df" /><stop offset="1" stopColor="#e9e5cf" /></radialGradient>
      <linearGradient id={`${id}-shine`} x1="0" x2="1"><stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset=".5" stopColor="#fff" stopOpacity=".75" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
      <clipPath id={`${id}-clip`}><circle cx="100" cy="100" r="98" /></clipPath>
      <path id={`${id}-ring`} d="M100 100m-82 0a82 82 0 1 1 164 0a82 82 0 1 1-164 0" />
    </defs>
    <circle cx="100" cy="100" r="97" fill={`url(#${id}-disc)`} stroke={`url(#${gold})`} strokeWidth="3" />
    <circle cx="100" cy="100" r="91.5" fill="none" stroke={`url(#${gold})`} strokeWidth=".8" />
    <g className={styles.logoRing}>
      <text fill="#8f7a45" fontSize="9.4" letterSpacing="3.4" style={{ fontFamily: "var(--font-id-body), Georgia, serif", fontWeight: 600 }}>
        <textPath href={`#${id}-ring`} startOffset="0">IBNU HARDANI ✦ PEBRIANI DINATA ✦ 08 · 11 · 2026 ✦</textPath>
      </text>
    </g>
    <circle cx="100" cy="100" r="72" fill="none" stroke={`url(#${gold})`} strokeWidth="1.4" />
    <circle cx="100" cy="100" r="68.5" fill="none" stroke="#c9b27a" strokeWidth=".5" strokeDasharray="1.5 3" />
    <g fill="#8fa083" opacity=".9">
      {laurel.map((leaf, index) => <ellipse key={index} cx={leaf.x} cy={leaf.y} rx="2.6" ry="6.6" transform={`rotate(${leaf.rotate} ${leaf.x} ${leaf.y})`} fill={index % 3 === 1 ? `url(#${gold})` : undefined} />)}
    </g>
    <path d="M100 38l4 6-4 6-4-6z" fill={`url(#${gold})`} />
    <text x="72" y="116" textAnchor="middle" fontSize="46" fill="#314635" style={{ fontFamily: "var(--font-id-display), Georgia, serif" }}>I</text>
    <text x="128" y="116" textAnchor="middle" fontSize="46" fill="#314635" style={{ fontFamily: "var(--font-id-display), Georgia, serif" }}>D</text>
    <text x="100" y="112" textAnchor="middle" fontSize="28" fontStyle="italic" fill={`url(#${gold})`} style={{ fontFamily: "var(--font-id-body), Georgia, serif" }}>&amp;</text>
    <text x="100" y="140" textAnchor="middle" fontSize="7.5" letterSpacing="2.4" fill="#677060" style={{ fontFamily: "var(--font-id-body), Georgia, serif", fontWeight: 600 }}>08.11.26</text>
    {animated && <g clipPath={`url(#${id}-clip)`}><rect className={styles.logoShine} x="-80" y="-20" width="60" height="240" fill={`url(#${id}-shine)`} transform="rotate(20 100 100)" /></g>}
  </svg>;
}

export function Sparkles({ count, className = "" }: { count: number; className?: string }) {
  return <div className={`${styles.sparkles} ${className}`} aria-hidden="true">
    {Array.from({ length: count }, (_, index) => <i key={index} style={{ "--x": `${(index * 37 + 11) % 96}%`, "--y": `${(index * 53 + 7) % 92}%`, "--s": `${7 + index % 4 * 3}px`, "--d": `${(index % 5) * 0.55}s` } as CSSProperties} />)}
  </div>;
}

export function AmbientPetals({ count, className = "" }: { count: number; className?: string }) {
  return <div className={`${styles.ambient} ${className}`} aria-hidden="true">
    {Array.from({ length: count }, (_, index) => <span key={index} className={styles.ambientPetal} style={{ "--x": `${(index * 41 + 5) % 100}%`, "--drift": `${(index % 2 ? -1 : 1) * (30 + index % 3 * 20)}px`, "--d": `${(9 + index % 5 * 2.2).toFixed(1)}s`, "--delay": `${-((index * 1.7) % 12).toFixed(1)}s`, "--w": `${8 + index % 4 * 3}px` } as CSSProperties} />)}
  </div>;
}

function OpeningPetals() {
  return <div className={styles.petals} aria-hidden="true" data-testid="opening-petals">
    {Array.from({ length: 30 }, (_, index) => (
      <motion.span
        key={index}
        className={styles.petal}
        data-testid="opening-petal"
        style={{ left: `${index % 2 === 0 ? 2 + (index * 7) % 25 : 73 + (index * 3) % 24}%`, width: 9 + index % 4 * 3, height: 15 + index % 3 * 4 }}
        initial={{ y: "-12vh", x: index % 2 === 0 ? -30 : 30, rotate: index * 31, opacity: 0 }}
        animate={{ y: "110vh", x: [index % 2 === 0 ? -30 : 30, index % 2 === 0 ? 45 : -45, index % 2 === 0 ? 10 : -10], rotate: index * 31 + (index % 2 === 0 ? 330 : -300), opacity: [0, 0.95, 0.85, 0] }}
        transition={{ duration: 2.1 + index % 4 * 0.15, delay: 0.8 + index % 6 * 0.1, ease: "easeInOut" }}
      />
    ))}
  </div>;
}

function GateDoor({ side }: { side: "left" | "right" }) {
  const id = useSvgId();
  const gold = `url(#${id}-gold)`;
  const shape = "M5 556V206C5 118 82 58 197 44V556Z";
  return <div className={`${styles.gateDoor} ${side === "left" ? styles.gateDoorLeft : styles.gateDoorRight}`} data-testid={`gate-${side}`}>
    <svg viewBox="0 0 200 560" preserveAspectRatio="none" aria-hidden="true">
      <defs><GoldGradient id={`${id}-gold`} /><clipPath id={`${id}-clip`}><path d={shape} /></clipPath></defs>
      <path d={shape} fill="#fffbea" opacity=".16" />
      <g clipPath={`url(#${id}-clip)`} stroke={gold} fill="none">
        {Array.from({ length: 8 }, (_, i) => <path key={i} d={`M${24 + i * 22} 30V556`} stroke="#c2a96e" strokeWidth="3.2" />)}
        <path d="M0 300H200M0 472H200" stroke="#bea567" strokeWidth="5" />
        <path d="M0 290H200M0 482H200M0 540H200" stroke="#c2a96e" strokeWidth="1.6" />
        {[30, 70, 110, 150, 190].map(x => <circle key={x} cx={x} cy="511" r="13" strokeWidth="2.6" />)}
        {[50, 90, 130, 170].map(x => <circle key={x} cx={x} cy="511" r="4.5" strokeWidth="2" />)}
        <path d="M100 460C58 430 34 382 66 350C88 330 112 350 98 372M100 460C142 430 166 382 134 350C112 330 88 350 102 372" strokeWidth="3.4" />
        <path d="M100 340c-8-14-26-14-28 0M100 340c8-14 26-14 28 0" strokeWidth="2.2" />
        <path d="M12 268C64 262 100 230 84 196C74 176 46 184 52 204M188 268C150 256 132 222 150 200C162 186 180 196 174 212" strokeWidth="3" />
        <path d="M20 156C46 120 96 92 150 78" strokeWidth="2" strokeDasharray="1 7" strokeLinecap="round" />
      </g>
      <path d={shape} fill="none" stroke={gold} strokeWidth="7" />
      <path d="M17 546V210C17 130 88 76 186 62V546Z" fill="none" stroke={gold} strokeWidth="1.6" />
      {[300, 472].map(y => <circle key={y} cx="197" cy={y} r="6" fill={gold} />)}
    </svg>
    <div className={styles.doorFlowers}><FloralOrnament priority /></div>
    <div className={styles.gateLogoHalf} data-logo-half={side}><IbnuDinataLogo animated decorative /></div>
  </div>;
}

function GatePillar({ side }: { side: "left" | "right" }) {
  const id = useSvgId();
  return <div className={`${styles.gatePillar} ${side === "left" ? styles.gatePillarLeft : styles.gatePillarRight}`} data-gate-side={side} aria-hidden="true">
    <svg viewBox="0 0 60 520" preserveAspectRatio="none">
      <defs>
        <GoldGradient id={`${id}-gold`} />
        <linearGradient id={`${id}-stone`} x1="0" x2="1"><stop offset="0" stopColor="#e5e3d1" /><stop offset=".45" stopColor="#fffdf3" /><stop offset="1" stopColor="#d9d8c1" /></linearGradient>
      </defs>
      <rect x="9" y="58" width="42" height="420" fill={`url(#${id}-stone)`} />
      <path d="M19 70V466M30 70V466M41 70V466" stroke="#cfcbb1" strokeWidth="1.2" />
      <rect x="2" y="40" width="56" height="20" rx="2" fill={`url(#${id}-gold)`} />
      <rect x="6" y="30" width="48" height="10" rx="2" fill={`url(#${id}-gold)`} opacity=".8" />
      <ellipse cx="30" cy="18" rx="11" ry="12" fill={`url(#${id}-gold)`} />
      <rect x="2" y="476" width="56" height="44" rx="2" fill={`url(#${id}-gold)`} />
      <rect x="8" y="484" width="44" height="28" fill="none" stroke="#f5e9c4" strokeWidth="1" />
    </svg>
  </div>;
}

function GateCrest() {
  const id = useSvgId();
  const gold = `url(#${id}-gold)`;
  return <svg className={styles.gateCrestArt} viewBox="0 0 400 240" preserveAspectRatio="none" aria-hidden="true">
    <defs><GoldGradient id={`${id}-gold`} /></defs>
    <g stroke={gold} fill="none">
      <path d="M200 236V70M200 236L120 96M200 236L280 96M200 236L80 150M200 236L320 150" stroke="#c2a96e" strokeWidth="1.2" opacity=".55" />
      <path d="M24 240C34 108 120 22 200 16C280 22 366 108 376 240" strokeWidth="7" />
      <path d="M50 240C60 128 136 52 200 48C264 52 340 128 350 240" strokeWidth="2.4" />
      {[-60, -40, -20, 0, 20, 40, 60].map(offset => <circle key={offset} cx={200 + offset * 1.9} cy={33 + Math.abs(offset) * 0.62 + (Math.abs(offset) > 40 ? 10 : 0)} r="6" strokeWidth="2" />)}
      <path d="M200 48c-16 18-46 18-56 4M200 48c16 18 46 18 56 4" strokeWidth="2.4" />
    </g>
    <path d="M200 -4l10 14-10 14-10-14z" fill={gold} />
    <circle cx="200" cy="16" r="5" fill="#fffbea" stroke={gold} strokeWidth="1.6" />
  </svg>;
}

export function InvitationGate({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<"closed" | "opening" | "open">("closed");
  const reduceMotion = useReducedMotion();
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const bodyRef = useRef<HTMLDivElement>(null);
  const opening = useRef(false);

  useEffect(() => {
    if (phase === "open") {
      // React has committed removal of inert before focus moves into the page.
      bodyRef.current?.focus({ preventScroll: true });
      return;
    }
    const originalBody = document.body.style.overflow;
    const originalHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalBody;
      document.documentElement.style.overflow = originalHtml;
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "opening") return;
    let cancelled = false;
    const door = [0.4, 0, 0.2, 1] as const;
    const sequence: AnimationSequence = [
      ["[data-gate-copy]", { opacity: [1, 0], y: [0, 18] }, { at: 0, duration: 0.5 }],
      ["[data-logo-half]", { scale: [1, 1.12, 1.04] }, { at: 0, duration: 0.6 }],
      ["[data-gate-burst]", { opacity: [0, 1, 0], scale: [0.5, 1.7] }, { at: 0.1, duration: 1.1 }],
      // Push in toward the logo before the doors move, then keep walking through.
      ["[data-gate-scene]", { scale: [1, 1.3, 2] }, { at: 0, duration: 3.2, times: [0, 0.3, 1], ease: [0.45, 0, 0.25, 1] }],
      ["[data-testid='gate-left']", { rotateY: [0, -105], x: [0, -6] }, { at: 0.75, duration: 2.4, ease: door }],
      ["[data-testid='gate-right']", { rotateY: [0, 105], x: [0, 6] }, { at: 0.75, duration: 2.4, ease: door }],
      ["[data-logo-half]", { opacity: [1, 0] }, { at: 1.6, duration: 0.7 }],
      ["[data-gate-glow]", { scale: [1, 2.2], opacity: [0.75, 1, 0.7] }, { at: 0.8, duration: 2.3 }],
      ["[data-gate-arch]", { y: [0, -90], opacity: [1, 0] }, { at: 1.1, duration: 2 }],
      ["[data-gate-side='left']", { x: [0, -130], opacity: [1, 0] }, { at: 0.9, duration: 2.2 }],
      ["[data-gate-side='right']", { x: [0, 130], opacity: [1, 0] }, { at: 0.9, duration: 2.2 }],
      ["#invitation-content > section:first-child", { scale: [0.94, 1] }, { at: 2.85, duration: 1, ease: [0.2, 0.6, 0.3, 1] }],
      ["[data-testid='opening-cover']", { opacity: [1, 0] }, { at: 2.85, duration: 1 }],
    ];
    const playback = animate(sequence);
    void playback.then(() => {
      if (cancelled) return;
      const hero = bodyRef.current?.querySelector<HTMLElement>("section:first-child");
      if (hero) hero.style.removeProperty("transform");
      setPhase("open");
    });
    return () => {
      cancelled = true;
      playback.stop();
    };
  }, [phase, animate]);

  function open() {
    if (opening.current) return;
    opening.current = true;
    window.scrollTo({ top: 0, behavior: "instant" });
    setPhase(reduceMotion ? "open" : "opening");
  }

  const isOpening = phase === "opening";
  return (
    <div ref={scope} className={styles.invitationStage}>
      {phase !== "open" && (
        <section className={styles.gateCover} aria-label="Sampul undangan Ibnu dan Dinata" data-testid="opening-cover" data-phase={phase}>
          <div className={styles.coverBackdrop} aria-hidden="true"><div className={styles.coverRays} /><AmbientPetals count={14} /></div>
          <div className={styles.coverFlorals} aria-hidden="true">
            {(["topLeft", "topRight", "bottomLeft", "bottomRight"] as const).map((corner, index) => (
              <div key={corner} className={`${styles.coverCorner} ${styles[corner]}`} data-gate-side={index % 2 === 0 ? "left" : "right"}><div className={styles.sway}><FloralOrnament priority /></div></div>
            ))}
          </div>
          <div className={styles.gateCopy}>
            <div className={styles.gateHeading} data-gate-copy>
              <p className={styles.eyebrow}>UNDANGAN PERNIKAHAN</p>
              <h1 className={styles.coverNames}>Ibnu <em>&amp;</em> Dinata</h1>
            </div>
            <div className={styles.gateScene} data-gate-scene data-testid="invitation-gate">
              <div className={styles.gateGlow} data-gate-glow aria-hidden="true" />
              <div className={styles.gateDoors}><GateDoor side="left" /><GateDoor side="right" /></div>
              <GatePillar side="left" /><GatePillar side="right" />
              <div className={styles.gateCrest} data-gate-arch aria-hidden="true"><GateCrest /><div className={styles.sway}><FloralOrnament kind="arch" priority className={styles.gateGarland} /></div></div>
              {(["left", "right"] as const).map(side => <div key={side} className={`${styles.gateBouquet} ${side === "left" ? styles.gateBouquetLeft : styles.gateBouquetRight}`} data-gate-side={side} aria-hidden="true"><div className={styles.sway}><FloralOrnament priority /></div></div>)}
              <Sparkles count={12} className={styles.gateSparkles} />
              <div className={styles.gateBurst} data-gate-burst aria-hidden="true">{Array.from({ length: 12 }, (_, index) => <i key={index} style={{ "--a": `${index * 30}deg` } as CSSProperties} />)}</div>
            </div>
            <div className={styles.gateInvitation} data-gate-copy>
              <div className={styles.guest}>
                <span>Kepada Yth.</span>
                <Suspense fallback={<strong>Bapak/Ibu/Saudara/i</strong>}><GuestName /></Suspense>
              </div>
              <button className={`${styles.button} ${styles.pulseButton}`} type="button" onClick={open} disabled={phase !== "closed"} aria-controls="invitation-content">
                <MailOpen size={16} aria-hidden="true" />{isOpening ? "Membuka undangan…" : "Buka Undangan"}
              </button>
              <p className={styles.coverFootnote}>Dengan cinta, kami mengundang Anda.</p>
            </div>
          </div>
          {isOpening && <OpeningPetals />}
        </section>
      )}
      <div ref={bodyRef} id="invitation-content" tabIndex={-1} inert={phase !== "open"} className={styles.content} data-open={phase === "open"} data-revealed={phase !== "closed"}>
        {children}
      </div>
      {phase === "open" && <AmbientPetals count={10} className={styles.pageAmbient} />}
      <noscript><style>{`#invitation-content { visibility: visible !important; } #invitation-content[inert] { display: none; }`}</style><p className={styles.noScript}>Aktifkan JavaScript untuk membuka undangan dan mengirim konfirmasi kehadiran.</p></noscript>
    </div>
  );
}

type RevealVariant = "up" | "zoom" | "left" | "right" | "blur";
const hiddenStates: Record<RevealVariant, TargetAndTransition> = {
  up: { opacity: 0, y: 28 },
  zoom: { opacity: 0, scale: 0.88 },
  left: { opacity: 0, x: -40 },
  right: { opacity: 0, x: 40 },
  blur: { opacity: 0, y: 12, filter: "blur(8px)" },
};
const shownStates: Record<RevealVariant, TargetAndTransition> = {
  up: { opacity: 1, y: 0 },
  zoom: { opacity: 1, scale: 1 },
  left: { opacity: 1, x: 0 },
  right: { opacity: 1, x: 0 },
  blur: { opacity: 1, y: 0, filter: "blur(0px)" },
};
const ease = [0.2, 0.65, 0.3, 1] as const;

export function Reveal({ children, className = "", variant = "up", delay = 0 }: { children: ReactNode; className?: string; variant?: RevealVariant; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={hiddenStates[variant]} whileInView={shownStates[variant]} viewport={{ once: true, amount: 0.12 }} transition={{ duration: reduced ? 0 : 0.85, delay: reduced ? 0 : delay, ease }}>{children}</motion.div>;
}

const groupVariants: Variants = { hidden: {}, shown: { transition: { staggerChildren: 0.14 } } };

export function RevealGroup({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <motion.div className={className} variants={groupVariants} initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.15 }}>{children}</motion.div>;
}

export function RevealItem({ children, className = "", variant = "up", as = "div" }: { children: ReactNode; className?: string; variant?: RevealVariant; as?: "div" | "article" }) {
  const reduced = useReducedMotion();
  const variants: Variants = { hidden: hiddenStates[variant], shown: { ...shownStates[variant], transition: { duration: reduced ? 0 : 0.8, ease } } };
  const Component = as === "article" ? motion.article : motion.div;
  return <Component className={className} variants={variants}>{children}</Component>;
}

export function Parallax({ children, className = "", offset = 70 }: { children: ReactNode; className?: string; offset?: number }) {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, reduced ? 0 : offset]);
  return <motion.div className={className} style={{ y }} aria-hidden="true">{children}</motion.div>;
}

export function GoldDivider() {
  const reduced = useReducedMotion();
  const line = { initial: { scaleX: 0 }, whileInView: { scaleX: 1 }, viewport: { once: true }, transition: { duration: reduced ? 0 : 1.1, ease } };
  return <div className={styles.floralDivider} aria-hidden="true">
    <FloralOrnament kind="arch" />
    <div className={styles.divider}><motion.span {...line} style={{ originX: 1 }} /><Heart size={13} strokeWidth={1} className={styles.heartbeat} /><motion.span {...line} style={{ originX: 0 }} /></div>
  </div>;
}

export function ScrollCue() {
  return <a className={styles.scrollCue} href="#salam">Gulir untuk membaca <ArrowDown size={14} aria-hidden="true" /></a>;
}

const subscribeToHydration = () => () => {};
const clientHydrated = () => true;
const serverHydrated = () => false;

export function InvitationCountdown({ items, targetDate }: { items: CountdownItem[]; targetDate: string | null }) {
  const hydrated = useSyncExternalStore(subscribeToHydration, clientHydrated, serverHydrated);
  if (hydrated) {
    return <LiveCountdownStrip initialItems={items} targetDate={targetDate} className={styles.countdown} itemClassName={styles.countdownItem} />;
  }
  // Keep the server snapshot stable until browser motion preferences are available.
  return <div className={styles.countdown} role="timer" aria-live="off">
    {items.map(item => <div key={item.label} className={styles.countdownItem}>
      <span className="relative block h-[1em] overflow-hidden font-serif text-2xl font-bold leading-none sm:text-3xl"><span className="block tabular-nums">{item.value}</span></span>
      <span className="mt-1 block text-xs font-black uppercase tracking-[0.18em] opacity-70">{item.label}</span>
    </div>)}
  </div>;
}

export function GiftCopy() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  async function copy() {
    try {
      await navigator.clipboard.writeText(content.accountNumber);
      setStatus("success");
    } catch { setStatus("error"); }
  }
  return <>
    <button type="button" className={styles.copyButton} onClick={copy}>{status === "success" ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}{status === "success" ? "Nomor tersalin" : "Salin nomor rekening"}</button>
    <p className={styles.copyStatus} role="status">{status === "error" ? "Belum dapat menyalin. Salin manual nomor 8666011215." : status === "success" ? "8666011215 berhasil disalin." : ""}</p>
  </>;
}

function ResponseForm({ kind }: { kind: "rsvp" | "wish" }) {
  const isRsvp = kind === "rsvp";
  const [state, action, pending] = useActionState(async (previous: typeof initialInvitationFormState, data: FormData) => {
    try {
      return await (isRsvp ? submitIbnuRsvp : submitIbnuWish)(previous, data);
    } catch {
      return { status: "error" as const, message: "Koneksi terputus. Silakan periksa koneksi dan coba kembali." };
    }
  }, initialInvitationFormState);
  return <form action={action} className={styles.form} aria-label={isRsvp ? "Konfirmasi kehadiran" : "Kirim doa dan ucapan"}>
    <fieldset disabled={pending}>
      <label htmlFor={`${kind}-name`}>Nama Anda</label>
      <input id={`${kind}-name`} name="guestName" autoComplete="name" placeholder="Nama lengkap" required minLength={2} maxLength={100} />
      {isRsvp ? <>
        <label htmlFor="attendance">Konfirmasi kehadiran</label>
        <select id="attendance" name="attendance" defaultValue="hadir"><option value="hadir">Insyaallah, hadir</option><option value="tidak_hadir">Maaf, belum bisa hadir</option><option value="ragu">Masih menyesuaikan jadwal</option></select>
        <label htmlFor="guest-count">Jumlah tamu</label>
        <input id="guest-count" name="guestCount" type="number" min={1} max={10} defaultValue={1} required />
      </> : <>
        <label htmlFor="wish-message">Doa &amp; ucapan</label>
        <textarea id="wish-message" name="message" placeholder="Tuliskan doa terbaik untuk kedua mempelai…" rows={4} required minLength={2} maxLength={2000} />
      </>}
      <button type="submit" className={styles.button} disabled={pending}>{pending ? <LoaderCircle size={16} className={styles.spinner} aria-hidden="true" /> : <ArrowUpRight size={16} aria-hidden="true" />}{pending ? "Menyimpan…" : isRsvp ? "Kirim konfirmasi" : "Kirim ucapan"}</button>
    </fieldset>
    <p className={styles.formStatus} data-status={state.status} role={state.status === "error" ? "alert" : "status"}>{state.message}</p>
  </form>;
}

export function GuestForms() {
  const [tab, setTab] = useState<"rsvp" | "wish">("rsvp");
  return <div className={styles.forms}>
    <div className={styles.formSwitch} role="group" aria-label="Pilih formulir">
      <button type="button" aria-pressed={tab === "rsvp"} aria-controls="rsvp-panel" onClick={() => setTab("rsvp")}>Kehadiran</button>
      <button type="button" aria-pressed={tab === "wish"} aria-controls="wish-panel" onClick={() => setTab("wish")}>Doa &amp; ucapan</button>
    </div>
    <div id="rsvp-panel" hidden={tab !== "rsvp"}><ResponseForm kind="rsvp" /></div>
    <div id="wish-panel" hidden={tab !== "wish"}><ResponseForm kind="wish" /></div>
  </div>;
}
