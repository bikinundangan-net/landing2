"use client";

import { motion } from "framer-motion";
import { steps } from "@/components/landing-data";
import { fadeInUp, stagger } from "@/components/sections/motion";

export function HowItWorksSection() {
  return (
    <section id="cara-kerja" className="py-20">
      <div className="section-shell">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <h2 className="font-serif text-4xl font-bold text-maroon-dark sm:text-5xl">
            Semudah 1-2-3
          </h2>
          <p className="mt-4 text-lg leading-8 text-ink/66">
            Dari pilih paket sampai link siap dibagikan, alurnya dibuat
            sederhana untuk pasangan yang sedang sibuk menyiapkan hari besar.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-5 md:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {steps.map((step, index) => (
            <motion.article
              key={step.title}
              variants={fadeInUp}
              className="relative rounded-[1.4rem] border border-maroon/10 bg-white/66 p-7 soft-shadow"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-serif text-5xl font-bold text-rose/42">
                  {index + 1}
                </span>
                <span className="grid size-12 place-items-center rounded-full bg-maroon text-cream">
                  <step.icon className="size-5" aria-hidden="true" />
                </span>
              </div>
              <h3 className="text-xl font-bold text-maroon-dark">
                {step.title}
              </h3>
              <p className="mt-3 leading-7 text-ink/66">{step.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
