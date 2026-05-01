"use client";

import { motion } from "framer-motion";
import { features } from "@/components/landing-data";
import { fadeInUp, stagger } from "@/components/sections/motion";

export function FeaturesSection() {
  return (
    <section id="fitur" className="py-20">
      <div className="section-shell">
        <motion.div
          className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeInUp}>
            <h2 className="font-serif text-4xl font-bold leading-tight text-maroon-dark sm:text-5xl">
              Semua yang Kamu Butuhkan, Ada di Sini
            </h2>
          </motion.div>
          <motion.p variants={fadeInUp} className="text-lg leading-8 text-ink/66">
            Satu link bisa menampung informasi acara, konfirmasi tamu,
            kenangan prewedding, sampai amplop digital. Tetap cantik, tetap
            praktis.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {features.map((feature) => (
            <motion.article
              key={feature.title}
              variants={fadeInUp}
              className="rounded-3xl border border-maroon/10 bg-white/58 p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-soft"
            >
              <div className="mb-5 grid size-11 place-items-center rounded-full bg-cream-soft text-maroon">
                <feature.icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-maroon-dark">
                {feature.title}
              </h3>
              <p className="mt-2 leading-7 text-ink/64">{feature.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
