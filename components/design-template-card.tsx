import Image from "next/image";
import Link from "next/link";
import { Eye, MessageCircle } from "lucide-react";
import type { invitationDesigns } from "@/components/landing-data";

type InvitationDesign = (typeof invitationDesigns)[number];

const whatsappBase = "https://wa.me/6281234567890";

export function getDesignWhatsAppUrl(templateName: string) {
  const text = `Halo BikinUndangan.net, saya mau pakai template ${templateName} untuk undangan digital mulai 49rb`;

  return `${whatsappBase}?text=${encodeURIComponent(text)}`;
}

export function DesignTemplateCard({
  design,
  priority = false,
  compact = false,
}: {
  design: InvitationDesign;
  priority?: boolean;
  compact?: boolean;
}) {
  return (
    <article className="group overflow-hidden rounded-[1.4rem] border border-maroon/10 bg-white/68 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <div
        className={`relative isolate flex items-end justify-center overflow-hidden ${
          compact ? "h-[23rem]" : "h-[25.5rem]"
        }`}
        style={{ background: design.background }}
      >
        <div
          className="absolute inset-x-10 bottom-6 top-10 rounded-full bg-white/18 blur-3xl"
          aria-hidden="true"
        />
        <Image
          src={design.image}
          alt={design.alt}
          width={360}
          height={720}
          priority={priority}
          className="relative z-10 h-[92%] w-auto object-contain drop-shadow-[0_24px_38px_rgba(47,21,23,0.24)] transition duration-300 group-hover:scale-[1.035]"
          sizes="(min-width: 1024px) 260px, (min-width: 640px) 42vw, 82vw"
        />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-black text-maroon-dark">
              {design.name}
            </h3>
            <p className="mt-1 text-sm font-semibold text-ink/56">
              {design.theme}
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <a
            href={getDesignWhatsAppUrl(design.name)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-maroon px-4 py-3 text-sm font-black !text-cream transition hover:bg-maroon-dark"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            Pakai
          </a>
          <Link
            href={`/design/${design.slug}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-maroon/15 bg-white/58 px-4 py-3 text-sm font-black !text-maroon transition hover:bg-white"
          >
            <Eye className="size-4" aria-hidden="true" />
            Demo
          </Link>
        </div>
      </div>
    </article>
  );
}
