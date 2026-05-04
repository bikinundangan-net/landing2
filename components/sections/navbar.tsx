"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { navItems } from "@/components/landing-data";

export function Navbar({ activeSection }: { activeSection: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-maroon/10 bg-cream/78 backdrop-blur-xl">
      <nav className="section-shell flex h-[4.5rem] items-center justify-between gap-5">
        <a
          href="#home"
          className="flex items-center gap-3"
          aria-label="Beranda"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span className="grid size-10 place-items-center overflow-hidden rounded-[0.8rem] shadow-soft">
            <Image
              src="/logo.png"
              alt="logo BikinUndangan.net"
              width={512}
              height={512}
              className="size-10 scale-[2.35] object-contain"
              priority
            />
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

        <button
          type="button"
          className="grid size-10 place-items-center rounded-full border border-maroon/15 text-maroon md:hidden"
          aria-controls="mobile-menu"
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? "Tutup menu" : "Buka menu"}
          onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`section-shell overflow-hidden transition-[max-height,opacity,padding] duration-300 md:hidden ${
          isMobileMenuOpen
            ? "max-h-[30rem] pb-4 opacity-100"
            : "max-h-0 pb-0 opacity-0"
        }`}
      >
        <div className="rounded-[1.25rem] border border-maroon/10 bg-white/88 p-3">
          {navItems.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = activeSection === id;

            return (
              <a
                key={item.href}
                href={item.href}
                className={`flex rounded-[0.9rem] px-4 py-3 text-sm font-bold transition ${
                  isActive
                    ? "bg-cream-soft text-maroon"
                    : "text-ink/68 hover:bg-cream-soft/60 hover:text-maroon"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            );
          })}

          <a
            href="#harga"
            className="mt-2 flex justify-center rounded-full bg-maroon px-5 py-3 text-sm font-black !text-cream shadow-soft transition hover:bg-maroon-dark"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Buat Undangan Sekarang
          </a>
        </div>
      </div>
    </header>
  );
}
