import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { BlogCard } from "@/components/blog-card";
import { getArticles, siteUrl } from "@/lib/blog";

type BlogPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export const metadata: Metadata = {
  title: "Blog Undangan Digital Pernikahan | BikinUndangan.net",
  description:
    "Tips undangan digital, inspirasi kata-kata undangan, checklist pernikahan, dan panduan membagikan undangan online.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog Undangan Digital Pernikahan | BikinUndangan.net",
    description:
      "Inspirasi dan panduan praktis membuat undangan pernikahan digital yang elegan.",
    url: `${siteUrl}/blog`,
    type: "website",
  },
};

function getPageNumber(value?: string) {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < 1) {
    return 1;
  }

  return parsed;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page: rawPage } = await searchParams;
  const page = getPageNumber(rawPage);
  const { articles, pagination } = await getArticles({ page, pageSize: 9 });
  const hasPrevious = pagination.page > 1;
  const hasNext = pagination.page < pagination.pageCount;

  return (
    <main className="min-h-screen bg-cream pb-20">
      <header className="border-b border-maroon/10 bg-cream/78 backdrop-blur-xl">
        <nav className="section-shell flex h-[4.5rem] items-center justify-between gap-5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-black !text-maroon"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Kembali
          </Link>
          <Link
            href="/#harga"
            className="rounded-full bg-maroon px-5 py-3 text-sm font-bold !text-cream"
          >
            Buat Undangan Sekarang
          </Link>
        </nav>
      </header>

      <section className="section-shell pt-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto grid size-12 place-items-center rounded-full bg-maroon text-cream shadow-soft">
            <BookOpen className="size-5" aria-hidden="true" />
          </div>
          <h1 className="mt-5 font-serif text-4xl font-bold leading-tight text-maroon-dark sm:text-6xl">
            Blog Undangan Digital Pernikahan
          </h1>
          <p className="mt-5 text-lg leading-8 text-ink/66">
            Kumpulan tips, inspirasi, dan panduan praktis agar undangan
            pernikahan digitalmu terlihat elegan dan mudah dibagikan.
          </p>
        </div>

        {articles.length > 0 ? (
          <>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, index) => (
                <BlogCard
                  key={article.slug}
                  article={article}
                  priority={index < 3}
                />
              ))}
            </div>

            {pagination.pageCount > 1 ? (
              <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-[1.25rem] border border-maroon/10 bg-white/58 p-4 sm:flex-row">
                <p className="text-sm font-bold text-ink/62">
                  Halaman {pagination.page} dari {pagination.pageCount}
                </p>
                <div className="flex gap-3">
                  <PaginationLink page={pagination.page - 1} disabled={!hasPrevious}>
                    <ArrowLeft className="size-4" aria-hidden="true" />
                    Sebelumnya
                  </PaginationLink>
                  <PaginationLink page={pagination.page + 1} disabled={!hasNext}>
                    Berikutnya
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </PaginationLink>
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <div className="mx-auto mt-12 max-w-2xl rounded-[1.5rem] border border-maroon/10 bg-white/62 p-8 text-center shadow-sm">
            <h2 className="font-serif text-3xl font-bold text-maroon-dark">
              Artikel Sedang Disiapkan
            </h2>
            <p className="mt-4 leading-8 text-ink/66">
              Tambahkan metadata artikel di JSON dan isi artikel di Markdown,
              lalu katalog blog akan tampil otomatis di halaman ini.
            </p>
            <Link
              href="/"
              className="mt-7 inline-flex items-center justify-center rounded-full bg-maroon px-6 py-3 text-sm font-black !text-cream transition hover:bg-maroon-dark"
            >
              Kembali ke Beranda
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}

function PaginationLink({
  page,
  disabled,
  children,
}: {
  page: number;
  disabled: boolean;
  children: React.ReactNode;
}) {
  if (disabled) {
    return (
      <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-maroon/10 bg-white/42 px-4 py-2 text-sm font-black text-ink/35">
        {children}
      </span>
    );
  }

  return (
    <Link
      href={`/blog?page=${page}`}
      className="inline-flex items-center gap-2 rounded-full border border-maroon/15 bg-white/72 px-4 py-2 text-sm font-black !text-maroon transition hover:bg-white"
    >
      {children}
    </Link>
  );
}
