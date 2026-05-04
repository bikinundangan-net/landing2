"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { DesignTemplateCard } from "@/components/design-template-card";
import { invitationDesigns } from "@/components/landing-data";
import { fadeInUp, stagger } from "@/components/sections/motion";

export function DesignShowcaseSection() {
  return (
    <section id="design" className="scroll-mt-24 py-20">
      <div className="section-shell">
        <motion.div
          className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeInUp}>
            <h2 className="font-serif text-4xl font-bold leading-tight text-maroon-dark sm:text-5xl">
              Pilih Design Undangan yang Paling Kamu Banget
            </h2>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <p className="text-lg leading-8 text-ink/66">
              Lihat contoh template siap pakai dalam mockup mobile. Setiap
              design bisa langsung dipakai atau dibuka demo-nya dulu.
            </p>
            <Link
              href="/design"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-maroon/15 bg-white/58 px-5 py-3 text-sm font-black !text-maroon transition hover:bg-white"
            >
              <Sparkles className="size-4" aria-hidden="true" />
              Lihat Semua Design Undangan
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {invitationDesigns.slice(0, 8).map((design, index) => (
            <motion.div key={design.slug} variants={fadeInUp}>
              <DesignTemplateCard design={design} priority={index < 2} compact />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
