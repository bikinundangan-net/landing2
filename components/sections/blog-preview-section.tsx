"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Newspaper } from "lucide-react";
import { BlogCard } from "@/components/blog-card";
import type { ArticleSummary } from "@/lib/blog";
import { fadeInUp, stagger } from "@/components/sections/motion";

export function BlogPreviewSection({
  articles,
}: {
  articles: ArticleSummary[];
}) {
  return (
    <section id="blog" className="py-20">
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
              Inspirasi Undangan Digital untuk Hari Spesialmu
            </h2>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <p className="text-lg leading-8 text-ink/66">
              Baca tips memilih template, menyusun kata-kata undangan, sampai
              cara membagikan link undangan agar lebih rapi dan personal.
            </p>
            <Link
              href="/blog"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-maroon/15 bg-white/58 px-5 py-3 text-sm font-black !text-maroon transition hover:bg-white"
            >
              <Newspaper className="size-4" aria-hidden="true" />
              Lihat Semua Artikel
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </motion.div>

        {articles.length > 0 ? (
          <motion.div
            className="mt-12 grid gap-5 md:grid-cols-3"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            {articles.map((article, index) => (
              <motion.div key={article.slug} variants={fadeInUp}>
                <BlogCard article={article} priority={index === 0} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="mt-12 rounded-[1.5rem] border border-maroon/10 bg-white/58 p-8 text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <p className="text-lg font-semibold text-ink/66">
              Artikel inspirasi sedang disiapkan. Setelah file blog lokal
              ditambahkan, tiga artikel terbaru akan tampil otomatis di sini.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
