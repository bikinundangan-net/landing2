"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LockKeyhole, Mail } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");

    const supabase = createClient();

    if (!supabase) {
      setMessage("Supabase belum dikonfigurasi.");
      setIsLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setIsLoading(false);
      return;
    }

    router.refresh();
    router.push("/admin");
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#f6efe5] px-6">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-xl border border-maroon/10 bg-white shadow-soft md:grid-cols-[0.95fr_1.05fr]">
        <div className="relative hidden min-h-[36rem] overflow-hidden bg-maroon-dark md:block">
          <Image
            src="/images/hero-invitation-mockup.png"
            alt="Mockup undangan digital BikinUndangan.net"
            fill
            className="object-cover opacity-80"
            sizes="480px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark via-maroon-dark/72 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-cream">
            <p className="text-sm font-black uppercase tracking-[0.16em]">
              Admin workspace
            </p>
            <h1 className="mt-3 font-serif text-5xl font-bold leading-tight">
              BikinUndangan.net
            </h1>
            <p className="mt-4 max-w-sm leading-7 text-cream/76">
              Kelola pesanan, aset, status pengerjaan, dan link undangan dari
              satu ruang kerja.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 sm:p-12">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center overflow-hidden rounded-lg shadow-soft">
              <Image
                src="/logo.png"
                alt="Logo BikinUndangan.net"
                width={512}
                height={512}
                className="size-11 scale-[2.35] object-contain"
              />
            </span>
            <span className="font-serif text-2xl font-bold text-maroon-dark">
              BikinUndangan.net
            </span>
          </div>

          <h2 className="mt-12 font-serif text-4xl font-bold text-maroon-dark">
            Masuk admin
          </h2>
          <p className="mt-3 leading-7 text-ink/62">
            Gunakan email admin Supabase yang sudah diberi role admin.
          </p>

          <label className="mt-9 block text-sm font-black text-ink">
            Email admin
            <span className="mt-2 flex items-center gap-3 rounded-lg border border-maroon/10 bg-cream/45 px-4 py-3 text-ink/72">
              <Mail className="size-4 text-maroon" aria-hidden="true" />
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full bg-transparent text-sm outline-none placeholder:text-ink/34"
                placeholder="admin@bikinundangan.net"
              />
            </span>
          </label>

          <label className="mt-5 block text-sm font-black text-ink">
            Password
            <span className="mt-2 flex items-center gap-3 rounded-lg border border-maroon/10 bg-cream/45 px-4 py-3 text-ink/72">
              <LockKeyhole className="size-4 text-maroon" aria-hidden="true" />
              <input
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full bg-transparent text-sm outline-none placeholder:text-ink/34"
                placeholder="••••••••"
              />
            </span>
          </label>

          {message ? (
            <p className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {message}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-7 inline-flex w-full justify-center rounded-lg bg-maroon px-5 py-4 text-sm font-black !text-cream transition hover:bg-maroon-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Memproses..." : "Masuk Dashboard"}
          </button>
        </form>
      </section>
    </main>
  );
}
