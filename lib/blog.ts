import { readFile } from "node:fs/promises";
import path from "node:path";

export type BlogMedia = {
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
};

export type ArticleSummary = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: BlogMedia;
  category?: string;
  publishedAt?: string;
  updatedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
  meta_description?: string;
  thumbnail_prompt?: string;
  faq?: {
    question: string;
    answer: string;
  }[];
  seo_keywords?: string[];
};

export type ArticleDetail = ArticleSummary & {
  content: string;
};

export type PaginatedArticles = {
  articles: ArticleSummary[];
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

type ArticleRecord = ArticleSummary & {
  markdownFile: string;
};

const FALLBACK_SITE_URL = "https://bikinundangan.net";
const CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const INDEX_FILE = path.join(CONTENT_DIR, "articles.json");

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL
).replace(/\/$/, "");

function sortByPublishedDate(a: ArticleRecord, b: ArticleRecord) {
  return (
    new Date(b.publishedAt || 0).getTime() -
    new Date(a.publishedAt || 0).getTime()
  );
}

async function getArticleRecords() {
  try {
    const file = await readFile(INDEX_FILE, "utf8");
    const records = JSON.parse(file) as ArticleRecord[];

    return records
      .filter((article) => article.slug && article.title && article.markdownFile)
      .sort(sortByPublishedDate);
  } catch (error) {
    console.warn("Local blog index could not be read:", error);
    return [];
  }
}

function toSummary(article: ArticleRecord): ArticleSummary {
  return {
    id: article.id,
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    coverImage: article.coverImage,
    category: article.category,
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
    seoTitle: article.seoTitle,
    seoDescription: article.seoDescription || article.meta_description,
    meta_description: article.meta_description,
    thumbnail_prompt: article.thumbnail_prompt,
    faq: article.faq,
    seo_keywords: article.seo_keywords,
  };
}

export async function getArticles({
  page = 1,
  pageSize = 9,
}: {
  page?: number;
  pageSize?: number;
} = {}): Promise<PaginatedArticles> {
  const records = await getArticleRecords();
  const pageCount = Math.max(1, Math.ceil(records.length / pageSize));
  const currentPage = Math.min(Math.max(page, 1), pageCount);
  const start = (currentPage - 1) * pageSize;
  const paginatedRecords = records.slice(start, start + pageSize);

  return {
    articles: paginatedRecords.map(toSummary),
    pagination: {
      page: currentPage,
      pageSize,
      pageCount,
      total: records.length,
    },
  };
}

export async function getLatestArticles(limit = 3) {
  const records = await getArticleRecords();

  return records.slice(0, limit).map(toSummary);
}

export async function getArticleBySlug(slug: string) {
  const records = await getArticleRecords();
  const record = records.find((article) => article.slug === slug);

  if (!record) {
    return null;
  }

  try {
    const content = await readFile(
      path.join(CONTENT_DIR, record.markdownFile),
      "utf8",
    );

    return {
      ...toSummary(record),
      content,
    } satisfies ArticleDetail;
  } catch (error) {
    console.warn(`Markdown file for ${slug} could not be read:`, error);
    return {
      ...toSummary(record),
      content: "",
    } satisfies ArticleDetail;
  }
}

export async function getAllArticleSlugs() {
  const records = await getArticleRecords();

  return records.map((article) => article.slug);
}

export function getArticleUrl(slug: string) {
  return `${siteUrl}/blog/${slug}`;
}
