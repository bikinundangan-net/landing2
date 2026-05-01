import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { BlogCard, formatArticleDate } from "@/components/blog-card";
import { MarkdownContent } from "@/components/markdown-content";
import {
  getAllArticleSlugs,
  getArticleBySlug,
  getArticleUrl,
  getLatestArticles,
  siteUrl,
} from "@/lib/blog";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Artikel Tidak Ditemukan | BikinUndangan.net",
    };
  }

  const title = article.seoTitle || `${article.title} | BikinUndangan.net`;
  const description = article.seoDescription || article.excerpt;
  const url = getArticleUrl(article.slug);
  const images = article.coverImage?.url
    ? [
        {
          url: article.coverImage.url,
          width: article.coverImage.width || 1200,
          height: article.coverImage.height || 630,
          alt: article.coverImage.alternativeText || article.title,
        },
      ]
    : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: article.coverImage?.url ? [article.coverImage.url] : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = (await getLatestArticles(4))
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3);
  const articleUrl = getArticleUrl(article.slug);
  const coverImageUrl = article.coverImage?.url
    ? article.coverImage.url.startsWith("http")
      ? article.coverImage.url
      : `${siteUrl}${article.coverImage.url}`
    : undefined;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.seoDescription || article.excerpt,
    image: coverImageUrl ? [coverImageUrl] : undefined,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      "@type": "Organization",
      name: "BikinUndangan.net",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "BikinUndangan.net",
      url: siteUrl,
    },
    mainEntityOfPage: articleUrl,
  };

  return (
    <main className="min-h-screen bg-cream pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="border-b border-maroon/10 bg-cream/78 backdrop-blur-xl">
        <nav className="section-shell flex h-[4.5rem] items-center justify-between gap-5">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-black !text-maroon"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Blog
          </Link>
          <Link
            href="/#harga"
            className="rounded-full bg-maroon px-5 py-3 text-sm font-bold !text-cream"
          >
            Buat Undangan Sekarang
          </Link>
        </nav>
      </header>

      <article>
        <section className="section-shell pt-14">
          <div className="mx-auto max-w-3xl text-center">
            {article.category ? (
              <p className="text-sm font-black uppercase tracking-[0.16em] text-maroon">
                {article.category}
              </p>
            ) : null}
            <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-maroon-dark sm:text-6xl">
              {article.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-ink/66">
              {article.excerpt}
            </p>
            <p className="mt-5 text-sm font-bold text-ink/52">
              {formatArticleDate(article.publishedAt)}
            </p>
          </div>

          {article.coverImage?.url ? (
            <div className="relative mt-10 aspect-[1.85] overflow-hidden rounded-[2rem] border border-maroon/10 bg-cream-soft shadow-sm">
              <Image
                src={article.coverImage.url}
                alt={article.coverImage.alternativeText || article.title}
                fill
                priority
                className="object-cover"
                sizes="min(1180px, 100vw)"
              />
            </div>
          ) : null}
        </section>

        <section className="section-shell mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-start">
          <div className="rounded-[1.5rem] border border-maroon/10 bg-white/62 p-6 shadow-sm sm:p-9">
            <MarkdownContent markdown={article.content} />
          </div>

          <aside className="rounded-[1.5rem] border border-maroon/10 bg-white/62 p-6 lg:sticky lg:top-24">
            <p className="font-serif text-2xl font-bold text-maroon-dark">
              Siap buat undangan digital?
            </p>
            <p className="mt-3 leading-7 text-ink/64">
              Pilih template, isi data acara, lalu link undangan siap dibagikan
              via WhatsApp.
            </p>
            <a
              href="https://wa.me/6285155347714?text=Halo%20BikinUndangan.net%2C%20saya%20mau%20buat%20undangan%20digital%20setelah%20membaca%20artikel%20blog"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-maroon px-5 py-3 text-sm font-black !text-cream transition hover:bg-maroon-dark"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Konsultasi via WhatsApp
            </a>
          </aside>
        </section>
      </article>

      {relatedArticles.length > 0 ? (
        <section className="section-shell pt-16">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-serif text-3xl font-bold text-maroon-dark sm:text-4xl">
                Artikel Terkait
              </h2>
              <p className="mt-3 text-ink/62">
                Lanjutkan baca inspirasi undangan digital lainnya.
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex text-sm font-black !text-maroon hover:text-maroon-dark"
            >
              Lihat semua artikel
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {relatedArticles.map((item) => (
              <BlogCard key={item.slug} article={item} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
