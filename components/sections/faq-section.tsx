"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/components/landing-data";
import { fadeInUp, stagger } from "@/components/sections/motion";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-20">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <h2 className="font-serif text-4xl font-bold text-maroon-dark sm:text-5xl">
            Pertanyaan yang Sering Ditanya
          </h2>
          <p className="mt-5 text-lg leading-8 text-ink/66">
            Jawaban cepat sebelum kamu mulai. Untuk detail lain, tim kami siap
            bantu lewat WhatsApp.
          </p>
          <a
            href="https://wa.me/6281234567890?text=Halo%20BikinUndangan.net%2C%20saya%20mau%20tanya%20paket%20undangan%20mulai%2049rb"
            className="mt-8 inline-flex rounded-full bg-maroon px-6 py-4 text-sm font-black !text-cream transition hover:bg-maroon-dark"
          >
            Tanya via WhatsApp
          </a>
        </motion.div>

        <motion.div
          className="space-y-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={faq.question}
                variants={fadeInUp}
                className="overflow-hidden rounded-[1.2rem] border border-maroon/10 bg-white/64"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left font-black text-maroon-dark"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`size-5 shrink-0 text-maroon transition ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 leading-8 text-ink/66">
                    {faq.answer}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
