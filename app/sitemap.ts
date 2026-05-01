import type { MetadataRoute } from "next";
import { invitationDesigns } from "@/components/landing-data";
import { getAllArticleSlugs, getArticles, siteUrl } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogSlugs, latestArticles] = await Promise.all([
    getAllArticleSlugs(),
    getArticles({ page: 1, pageSize: 100 }),
  ]);
  const now = new Date();
  const articleUpdatedAt = new Map(
    latestArticles.articles.map((article) => [
      article.slug,
      article.updatedAt || article.publishedAt,
    ]),
  );

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/design`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...invitationDesigns.map((design) => ({
      url: `${siteUrl}/design/${design.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${siteUrl}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...blogSlugs.map((slug) => ({
      url: `${siteUrl}/blog/${slug}`,
      lastModified: articleUpdatedAt.get(slug)
        ? new Date(articleUpdatedAt.get(slug) as string)
        : now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
