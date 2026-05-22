import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function LegalPage({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-cream pb-20">
      <header className="border-b border-maroon/10 bg-cream/78 backdrop-blur-xl">
        <nav className="section-shell flex h-[4.5rem] items-center justify-between gap-5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-black !text-maroon"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Beranda
          </Link>
          <Link
            href="/#harga"
            className="rounded-full bg-maroon px-5 py-3 text-sm font-black !text-cream"
          >
            Buat Undangan
          </Link>
        </nav>
      </header>

      <article className="section-shell pt-14">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-maroon">
            BikinUndangan.net
          </p>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-maroon-dark sm:text-6xl">
            {title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-ink/66">{description}</p>
          <p className="mt-5 text-sm font-bold text-ink/52">
            Terakhir diperbarui: 22 Mei 2026
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-[1.5rem] border border-maroon/10 bg-white/62 p-6 leading-8 text-ink/70 shadow-sm sm:p-9">
          {children}
        </div>
      </article>
    </main>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="font-serif text-3xl font-bold text-maroon-dark">
        {title}
      </h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-3 pl-6">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
