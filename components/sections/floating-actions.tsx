import { MessageCircle } from "lucide-react";

const whatsappUrl =
  "https://wa.me/6285155347714?text=Halo%20BikinUndangan.net%2C%20saya%20mau%20buat%20undangan%20digital%20mulai%2049rb";

export function FloatingActions() {
  return (
    <>
      <a
        href={whatsappUrl}
        className="fixed bottom-24 right-4 z-50 grid size-14 place-items-center rounded-full bg-[#1fae58] text-white shadow-[0_18px_38px_rgba(31,174,88,0.32)] transition hover:-translate-y-1 md:bottom-6"
        aria-label="Chat WhatsApp BikinUndangan.net"
      >
        <MessageCircle className="size-6" aria-hidden="true" />
      </a>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-maroon/10 bg-cream/92 p-3 backdrop-blur-xl md:hidden">
        <a
          href="#harga"
          className="flex h-[3.25rem] items-center justify-center rounded-full bg-maroon px-5 text-sm font-black !text-cream shadow-soft"
        >
          Buat Sekarang — Mulai 49rb
        </a>
      </div>
    </>
  );
}
