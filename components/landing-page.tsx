"use client";

import { useEffect, useState } from "react";
import type { ArticleSummary } from "@/lib/blog";
import { BlogPreviewSection } from "@/components/sections/blog-preview-section";
import { DesignShowcaseSection } from "@/components/sections/design-showcase-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { FloatingActions } from "@/components/sections/floating-actions";
import { Footer } from "@/components/sections/footer";
import { FaqSection } from "@/components/sections/faq-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { Navbar } from "@/components/sections/navbar";
import { PricingSection } from "@/components/sections/pricing-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";

const trackedSections = ["design", "fitur", "harga", "testimoni", "faq"];

export function LandingPage({
  latestArticles = [],
}: {
  latestArticles?: ArticleSummary[];
}) {
  const [activeSection, setActiveSection] = useState("fitur");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: "-28% 0px -58% 0px",
        threshold: [0.18, 0.36, 0.58],
      },
    );

    trackedSections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative overflow-hidden">
      <Navbar activeSection={activeSection} />
      <HeroSection />
      <HowItWorksSection />
      <DesignShowcaseSection />
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
      <FaqSection />
      <FinalCtaSection />
      <Footer />
      <FloatingActions />
    </main>
  );
}
