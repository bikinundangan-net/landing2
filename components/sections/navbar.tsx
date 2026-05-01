"use client";

import { Heart, Menu } from "lucide-react";
import { navItems } from "@/components/landing-data";

export function Navbar({ activeSection }: { activeSection: string }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-maroon/10 bg-cream/78 backdrop-blur-xl">
      <nav className="section-shell flex h-[4.5rem] items-center justify-between gap-5">
        <a href="#home" className="flex items-center gap-3" aria-label="Beranda">
          <span className="grid size-10 place-items-center rounded-full bg-maroon text-cream shadow-soft">
            <Heart className="size-5 fill-current" aria-hidden="true" />
          </span>
          <span className="font-serif text-xl font-bold text-maroon-dark">
            BikinUndangan.net
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = activeSection === id;

            return (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm font-semibold transition ${
                  isActive ? "text-maroon" : "text-ink/68 hover:text-maroon"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        <a
          href="#harga"
          className="hidden rounded-full bg-maroon px-5 py-3 text-sm font-bold !text-cream shadow-soft transition hover:bg-maroon-dark md:inline-flex"
        >
          Buat Undangan Sekarang
        </a>

        <a
          href="#harga"
          className="grid size-10 place-items-center rounded-full border border-maroon/15 text-maroon md:hidden"
          aria-label="Buka harga"
        >
          <Menu className="size-5" aria-hidden="true" />
        </a>
      </nav>
    </header>
  );
}
