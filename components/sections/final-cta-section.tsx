"use client";

import { motion } from "framer-motion";
import { ArrowRight, LockKeyhole, MessageCircle, Zap } from "lucide-react";
import { fadeInUp, stagger } from "@/components/sections/motion";

export function FinalCtaSection() {
  return (
    <section className="py-20">
      <motion.div
        className="section-shell relative isolate overflow-hidden rounded-[2rem] px-6 py-16 text-center text-cream maroon-gradient sm:px-10 sm:py-20"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="floral-corner right-0 top-2 size-36 opacity-20" />
        <motion.h2
          variants={fadeInUp}
          className="mx-auto max-w-3xl font-serif text-4xl font-bold sm:text-6xl"
        >
          Mulai Buat Undanganmu Sekarang
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-cream/78"
        >
          Ribuan pasangan sudah membuat kenangan indah bersama kami. Giliranmu!
        </motion.p>
        <motion.div variants={fadeInUp} className="mt-8">
          <a
            href="https://wa.me/6281234567890?text=Halo%20BikinUndangan.net%2C%20saya%20mau%20buat%20undangan%20digital%20mulai%2049rb"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-cream px-8 py-4 text-base font-black !text-maroon transition hover:-translate-y-0.5 hover:bg-white"
          >
            Buat Undangan Sekarang — Mulai 49rb
            <ArrowRight className="size-5" aria-hidden="true" />
          </a>
        </motion.div>
        <motion.div
          variants={fadeInUp}
          className="mt-7 flex flex-wrap justify-center gap-3 text-sm font-bold text-cream/80"
        >
          <span className="inline-flex items-center gap-2">
            <LockKeyhole className="size-4" aria-hidden="true" />
            Pembayaran aman
          </span>
          <span className="inline-flex items-center gap-2">
            <Zap className="size-4" aria-hidden="true" />
            Proses cepat
          </span>
          <span className="inline-flex items-center gap-2">
            <MessageCircle className="size-4" aria-hidden="true" />
            Support via WhatsApp
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
