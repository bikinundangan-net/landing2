import { LandingPage } from "@/components/landing-page";
import { getLatestArticles } from "@/lib/blog";

export default async function Home() {
  const latestArticles = await getLatestArticles(3);

  return <LandingPage latestArticles={latestArticles} />;
}
