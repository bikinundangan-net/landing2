"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Clock3, PartyPopper, Rocket, Star } from "lucide-react";
import { fadeInUp, stagger } from "@/components/sections/motion";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative isolate min-h-[760px] overflow-hidden pt-28 sm:pt-32"
    >
      <div className="floral-corner right-6 top-24 size-40" aria-hidden="true" />
      <div
        className="floral-corner bottom-16 left-0 size-40 rotate-180"
        aria-hidden="true"
      />

      <motion.div
        className="section-shell grid items-center gap-10 pb-[4.5rem] lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.46fr)] lg:pb-24"
        variants={stagger}
        initial="show"
        animate="show"
      >
        <div className="max-w-[760px]">
          <motion.h1
            variants={fadeInUp}
            className="font-serif text-[2.45rem] font-bold leading-[1.04] tracking-normal text-maroon-dark sm:text-[3.45rem] lg:text-[4.1rem]"
          >
            Undangan Digital Elegan,{" "}
            <span className="text-maroon">Harga Mulai 49 Ribu</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="mt-7 max-w-2xl text-lg leading-8 text-ink/72 sm:text-xl"
          >
            Buat undangan pernikahan online dalam 5 menit. Tanpa ribet,
            tanpa desainer, langsung bisa dibagikan via WhatsApp.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-rose/30 bg-white/62 px-4 py-2 text-sm font-bold text-maroon shadow-sm"
          >
            <Rocket className="size-4" aria-hidden="true" />
            Sudah 2.347 undangan dibuat bulan ini
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#harga"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-maroon px-7 py-4 text-base font-bold !text-cream shadow-soft transition hover:-translate-y-0.5 hover:bg-maroon-dark sm:whitespace-nowrap"
            >
              Buat Sekarang — Mulai 49rb
              <ArrowRight className="size-5" aria-hidden="true" />
            </a>
            <a
              href="#design"
              className="inline-flex items-center justify-center rounded-full border border-maroon/18 bg-white/58 px-7 py-4 text-base font-bold !text-maroon transition hover:border-maroon/30 hover:bg-white sm:whitespace-nowrap"
            >
              Lihat Contoh Undangan
            </a>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mt-8 grid max-w-[720px] gap-3 text-sm font-semibold text-ink/70 sm:grid-cols-3"
          >
            <HeroProof icon={Star} text="4.9/5 dari 2.000+ pasangan" />
            <HeroProof icon={PartyPopper} text="10.000+ undangan dibuat" />
            <HeroProof icon={Clock3} text="Proses 5 menit" />
          </motion.div>
        </div>

        <motion.div
          variants={fadeInUp}
          className="relative mx-auto flex min-h-[520px] w-full max-w-[420px] items-center justify-center lg:ml-auto lg:mr-0 lg:min-h-[580px]"
        >
          <div
            className="absolute left-1/2 top-1/2 h-[82%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,139,115,0.22)_0%,rgba(255,248,238,0.68)_44%,rgba(255,248,238,0)_70%)] blur-xl"
            aria-hidden="true"
          />
          <div
            className="absolute right-8 top-[4.5rem] h-[10.5rem] w-[7.5rem] rotate-[-10deg] rounded-[2rem] border border-maroon/10 bg-white/24"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-16 left-8 h-32 w-24 rotate-[12deg] rounded-[1.6rem] border border-rose/20 bg-cream-soft/38"
            aria-hidden="true"
          />
          <Image
            src="/images/hero-phone-cutout.png"
            alt="Tampilan undangan digital elegan di ponsel"
            width={512}
            height={768}
            priority
            className="relative h-auto w-[76%] max-w-[370px] drop-shadow-[0_34px_42px_rgba(75,15,26,0.24)] sm:w-[68%] lg:w-[92%]"
            sizes="(min-width: 1024px) 370px, 76vw"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

function HeroProof({
  icon: Icon,
  text,
}: {
  icon: typeof Star;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-maroon/10 bg-white/54 px-4 py-3">
      <Icon className="size-4 shrink-0 text-maroon" aria-hidden="true" />
      <span>{text}</span>
    </div>
  );
}
