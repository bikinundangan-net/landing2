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
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    let frame = 0;

    const updateActiveSection = () => {
      frame = 0;
      const activationLine = Math.min(window.innerHeight * 0.38, 320);
      let currentSection = "";

      for (const id of trackedSections) {
        const section = document.getElementById(id);
        if (!section) continue;

        const rect = section.getBoundingClientRect();

        if (rect.top <= activationLine && rect.bottom > activationLine) {
          currentSection = id;
          break;
        }

        if (rect.top > activationLine) {
          break;
        }
      }

      setActiveSection((previousSection) =>
        previousSection === currentSection ? previousSection : currentSection,
      );
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
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
