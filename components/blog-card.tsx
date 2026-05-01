import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import type { ArticleSummary } from "@/lib/blog";

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formatArticleDate(date?: string) {
  if (!date) {
    return "Artikel terbaru";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Artikel terbaru";
  }

  return dateFormatter.format(parsedDate);
}

export function BlogCard({
  article,
  priority = false,
}: {
  article: ArticleSummary;
  priority?: boolean;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-maroon/10 bg-white/64 shadow-sm transition hover:-translate-y-1 hover:bg-white hover:shadow-soft">
      <Link
        href={`/blog/${article.slug}`}
        className="relative block aspect-[1.48] overflow-hidden bg-cream-soft"
        aria-label={`Baca artikel ${article.title}`}
      >
        {article.coverImage?.url ? (
          <Image
            src={article.coverImage.url}
            alt={article.coverImage.alternativeText || article.title}
            fill
            priority={priority}
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 46vw, 92vw"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(201,139,115,0.28),transparent_18rem),linear-gradient(135deg,#fff8ee,#f9ead8)]" />
        )}
        {article.category ? (
          <span className="absolute left-4 top-4 rounded-full bg-white/82 px-3 py-1 text-xs font-black text-maroon shadow-sm backdrop-blur">
            {article.category}
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-ink/54">
          <CalendarDays className="size-4 text-maroon" aria-hidden="true" />
          {formatArticleDate(article.publishedAt)}
        </div>
        <h3 className="mt-3 text-xl font-black leading-snug text-maroon-dark">
          <Link href={`/blog/${article.slug}`} className="hover:text-maroon">
            {article.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 leading-7 text-ink/64">
          {article.excerpt}
        </p>
        <Link
          href={`/blog/${article.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-black !text-maroon"
        >
          Baca Artikel
          <ArrowRight
            className="size-4 transition group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}
