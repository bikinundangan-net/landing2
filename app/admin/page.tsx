import { redirect } from "next/navigation";
import { AdminDashboard } from "@/app/admin/components/admin-dashboard";
import { getAdminOrders, getAdminSession } from "@/lib/admin/queries";
import { demoOrders } from "@/lib/admin/demo-data";

export const metadata = {
  title: "Admin Dashboard | BikinUndangan.net",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getAdminSession();

  if (!session.configured) {
    return <AdminDashboard mode="setup" orders={demoOrders} />;
  }

  if (!session.user) {
    redirect("/admin/login");
  }

  if (!session.isAdmin) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f6efe5] px-6">
        <section className="max-w-md rounded-lg border border-maroon/10 bg-white p-8 text-center shadow-soft">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-maroon">
            Akses ditolak
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold text-maroon-dark">
            Akun ini belum admin
          </h1>
          <p className="mt-4 leading-7 text-ink/62">
            Tambahkan user ini ke tabel admin_profiles dengan role admin untuk
            membuka dashboard.
          </p>
        </section>
      </main>
    );
  }

  const orders = await getAdminOrders();

  return (
    <AdminDashboard
      mode="live"
      orders={orders}
      adminName={session.profile?.display_name ?? session.user.email ?? "Admin"}
    />
  );
}
