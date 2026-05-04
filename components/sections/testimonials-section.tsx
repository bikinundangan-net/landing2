"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/components/landing-data";
import { fadeInUp, stagger } from "@/components/sections/motion";

export function TestimonialsSection() {
  return (
    <section id="testimoni" className="scroll-mt-24 py-20">
      <div className="section-shell">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <h2 className="font-serif text-4xl font-bold text-maroon-dark sm:text-5xl">
            Ribuan Pasangan Sudah Mempercayai Kami
          </h2>
          <p className="mt-4 text-lg leading-8 text-ink/66">
            Cerita kecil dari pasangan yang sudah membagikan momen bahagianya
            lewat BikinUndangan.net.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {testimonials.map((item, index) => (
            <motion.article
              key={item.name}
              variants={fadeInUp}
              className={`mb-5 break-inside-avoid rounded-[1.4rem] border border-maroon/10 bg-white/66 p-6 soft-shadow ${
                index % 3 === 1 ? "lg:mt-8" : ""
              }`}
            >
              <div className="flex gap-1 text-rose" aria-label="Bintang 5">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    className="size-4 fill-current"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="mt-5 leading-8 text-ink/72">&ldquo;{item.text}&rdquo;</p>
              <div className="mt-6 border-t border-maroon/10 pt-4">
                <p className="font-black text-maroon-dark">{item.name}</p>
                <p className="text-sm font-semibold text-ink/52">
                  {item.city}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
