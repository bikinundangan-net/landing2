import { Camera, Heart, MessageCircle, Music2 } from "lucide-react";

const footerLinks = [
  "Fitur",
  "Harga",
  "Contoh Undangan",
  "Blog",
  "FAQ",
  "Kontak",
];

export function Footer() {
  return (
    <footer className="border-t border-maroon/10 bg-white/42 py-12 pb-28 md:pb-12">
      <div className="section-shell flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-sm">
          <a href="#home" className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-maroon text-cream">
              <Heart className="size-5 fill-current" aria-hidden="true" />
            </span>
            <span className="font-serif text-xl font-bold text-maroon-dark">
              BikinUndangan.net
            </span>
          </a>
          <p className="mt-4 leading-7 text-ink/62">
            Undangan digital elegan, praktis, dan terjangkau untuk pasangan
            Indonesia.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-[1fr_auto] lg:gap-12">
          <div>
            <p className="font-black text-maroon-dark">Navigasi</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold text-ink/62">
              {footerLinks.map((link) => (
                <a
                  key={link}
                  href={link.toLowerCase()}
                  className="hover:text-maroon"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-black text-maroon-dark">Sosial</p>
            <div className="mt-4 flex gap-3">
              <Social href="#" label="Instagram" icon={Camera} />
              <Social href="#" label="TikTok" icon={Music2} />
              <Social
                href="https://wa.me/6281234567890?text=Halo%20BikinUndangan.net%2C%20saya%20mau%20buat%20undangan%20digital%20mulai%2049rb"
                label="WhatsApp"
                icon={MessageCircle}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="section-shell mt-10 flex flex-col gap-2 border-t border-maroon/10 pt-6 text-sm text-ink/52 sm:flex-row sm:items-center sm:justify-between">
        <p>Copyright © 2025 BikinUndangan.net</p>
        <p>Dibuat dengan hati untuk pasangan Indonesia</p>
      </div>
    </footer>
  );
}

function Social({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: typeof Camera;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="grid size-10 place-items-center rounded-full border border-maroon/12 bg-cream text-maroon transition hover:bg-maroon hover:text-cream"
    >
      <Icon className="size-5" aria-hidden="true" />
    </a>
  );
}
