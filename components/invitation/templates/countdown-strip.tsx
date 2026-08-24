"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  calculateCountdown,
  type CountdownItem,
} from "@/components/invitation/templates/countdown";

export function LiveCountdownStrip({
  initialItems,
  targetDate,
  className,
  itemClassName,
}: {
  initialItems: CountdownItem[];
  targetDate: string | null;
  className: string;
  itemClassName: string;
}) {
  const reduceMotion = useReducedMotion();
  const [now, setNow] = useState<number | null>(null);
  const items =
    now === null ? initialItems : calculateCountdown(targetDate, now);

  useEffect(() => {
    if (!targetDate) {
      return;
    }

    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 1_000);

    return () => window.clearInterval(timer);
  }, [targetDate]);

  return (
    <div className={className} role="timer" aria-live="off">
      {items.map((item) => (
        <div key={item.label} className={itemClassName}>
          <span className="relative block h-[1em] overflow-hidden font-serif text-2xl font-bold leading-none sm:text-3xl">
            {reduceMotion ? (
              <span className="block tabular-nums">{item.value}</span>
            ) : (
              <AnimatePresence initial={false} mode="popLayout">
                <motion.span
                  key={`${item.label}-${item.value}`}
                  className="block tabular-nums"
                  initial={{ opacity: 0, y: "-0.3em", filter: "blur(2px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: "0.3em", filter: "blur(2px)" }}
                  transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
                >
                  {item.value}
                </motion.span>
              </AnimatePresence>
            )}
          </span>
          <span className="mt-1 block text-xs font-black uppercase tracking-[0.18em] opacity-70">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
