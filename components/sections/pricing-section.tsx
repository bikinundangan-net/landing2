"use client";

import { motion } from "framer-motion";
import { Check, ShieldCheck } from "lucide-react";
import { addOns, packages, trustBadges } from "@/components/landing-data";
import { fadeInUp, stagger } from "@/components/sections/motion";

export function PricingSection() {
  return (
    <section id="harga" className="scroll-mt-24 py-[5.5rem]">
      <div className="section-shell">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <h2 className="font-serif text-4xl font-bold text-maroon-dark sm:text-5xl">
            Pilih Paket Sesuai Kebutuhanmu
          </h2>
          <p className="mt-4 text-lg leading-8 text-ink/66">
            Harga terjangkau, kualitas premium. Tidak ada biaya tersembunyi.
          </p>
        </motion.div>

        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {trustBadges.slice(0, 3).map((badge) => (
            <motion.div
              key={badge.label}
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full border border-maroon/10 bg-white/60 px-4 py-2 text-sm font-bold text-maroon-dark"
            >
              <badge.icon className="size-4 text-maroon" aria-hidden="true" />
              {badge.label}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 grid gap-5 lg:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {packages.map((item) => (
            <motion.article
              key={item.name}
              variants={fadeInUp}
              className={`relative flex flex-col rounded-[1.6rem] border p-7 ${
                item.popular
                  ? "border-maroon bg-maroon text-cream shadow-soft lg:-mt-5"
                  : "border-maroon/10 bg-white/70 text-ink"
              }`}
            >
              {item.popular ? (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-cream px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-maroon">
                  Paling Populer
                </div>
              ) : null}

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-black">{item.name}</h3>
                  <p
                    className={`mt-2 min-h-12 leading-7 ${
                      item.popular ? "text-cream/78" : "text-ink/62"
                    }`}
                  >
                    {item.note}
                  </p>
                </div>
                <ShieldCheck
                  className={`size-6 ${
                    item.popular ? "text-cream" : "text-maroon"
                  }`}
                  aria-hidden="true"
                />
              </div>

              <div className="mt-8">
                <p className="font-serif text-5xl font-bold">{item.price}</p>
                <p
                  className={`mt-2 text-sm font-semibold ${
                    item.popular ? "text-cream/72" : "text-ink/52"
                  }`}
                >
                  Sekali bayar, link aktif sesuai paket
                </p>
              </div>

              <ul className="mt-8 space-y-3">
                {item.benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-3 leading-7">
                    <Check
                      className={`mt-1 size-4 shrink-0 ${
                        item.popular ? "text-cream" : "text-maroon"
                      }`}
                      aria-hidden="true"
                    />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://wa.me/6285155347714?text=Halo%20BikinUndangan.net%2C%20saya%20mau%20buat%20undangan%20digital%20mulai%2049rb"
                className={`mt-8 inline-flex justify-center rounded-full px-5 py-4 text-center text-sm font-black transition ${
                  item.popular
                    ? "bg-cream text-maroon hover:bg-white"
                    : "bg-maroon !text-cream hover:bg-maroon-dark"
                }`}
              >
                {item.cta}
              </a>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="mt-8 overflow-hidden rounded-[1.5rem] border border-maroon/10 bg-white/68"
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="flex flex-col gap-2 border-b border-maroon/10 px-6 py-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xl font-black text-maroon-dark">
                Add-on opsional
              </p>
              <p className="mt-1 text-sm leading-6 text-ink/58">
                Tambahkan hanya kalau kamu butuh fitur ekstra.
              </p>
            </div>
            <p className="text-sm font-bold text-maroon">
              Bisa dipilih setelah paket utama
            </p>
          </div>

          <div className="grid divide-y divide-maroon/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {addOns.map((addOn) => (
              <article
                key={addOn.title}
                className="flex min-h-44 flex-col justify-between gap-6 p-6 transition hover:bg-cream-soft/55"
              >
                <div>
                  <div className="mb-5 grid size-11 place-items-center rounded-full bg-cream-soft text-maroon">
                    <addOn.icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-black text-maroon-dark">
                    {addOn.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-ink/58">
                    {addOn.text}
                  </p>
                </div>
                <p className="font-serif text-2xl font-bold text-maroon">
                  {addOn.price}
                </p>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
