import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/app/admin/components/admin-login-form";
import { getAdminSession } from "@/lib/admin/queries";

export const metadata = {
  title: "Login Admin | BikinUndangan.net",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const session = await getAdminSession();

  if (!session.configured) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f6efe5] px-6">
        <section className="w-full max-w-lg rounded-lg border border-maroon/10 bg-white p-8 shadow-soft">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-maroon">
            Setup Supabase
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold text-maroon-dark">
            Credential belum tersedia
          </h1>
          <p className="mt-4 leading-7 text-ink/62">
            Tambahkan NEXT_PUBLIC_SUPABASE_URL dan
            NEXT_PUBLIC_SUPABASE_ANON_KEY ke environment, lalu jalankan
            migration Supabase sebelum login.
          </p>
        </section>
      </main>
    );
  }

  if (session.user && session.isAdmin) {
    redirect("/admin");
  }

  return <AdminLoginForm />;
}
