import type { Metadata } from "next";
import { LegalList, LegalPage, LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Data Deletion Instructions | BikinUndangan.net",
  description:
    "Instruksi penghapusan data untuk pengguna BikinUndangan.net, termasuk koneksi Facebook atau Instagram.",
  alternates: {
    canonical: "/data-deletion",
  },
};

export default function DataDeletionPage() {
  return (
    <LegalPage
      title="Data Deletion Instructions"
      description="Halaman ini menjelaskan cara meminta penghapusan data dari BikinUndangan.net, termasuk data yang terkait dengan koneksi Facebook atau Instagram."
    >
      <LegalSection title="Menghapus Koneksi dari Facebook">
        <p>
          Jika Anda pernah menghubungkan aplikasi atau layanan kami dengan akun
          Facebook, Anda dapat menghapus koneksi tersebut melalui pengaturan
          Facebook.
        </p>
        <ol className="list-decimal space-y-3 pl-6">
          <li>Buka Facebook dan masuk ke akun Anda.</li>
          <li>Pilih Settings & privacy, lalu pilih Settings.</li>
          <li>Buka menu Apps and Websites.</li>
          <li>Cari aplikasi atau layanan yang terkait dengan BikinUndangan.net.</li>
          <li>Pilih Remove untuk mencabut akses aplikasi.</li>
        </ol>
        <p>
          Penghapusan koneksi dari Facebook akan mencabut akses yang sebelumnya
          diberikan. Jika Anda juga ingin menghapus data yang tersimpan di
          sistem BikinUndangan.net, ikuti instruksi permintaan penghapusan di
          bawah ini.
        </p>
      </LegalSection>

      <LegalSection title="Meminta Penghapusan Data dari Kami">
        <p>
          Kirim permintaan penghapusan data ke WhatsApp resmi BikinUndangan.net
          di +62 851-5534-7714 dengan subjek atau pesan awal
          &quot;Permintaan Hapus Data&quot;.
        </p>
        <p>Untuk membantu verifikasi, sertakan informasi berikut:</p>
        <LegalList
          items={[
            "Nama lengkap atau nama customer yang terkait dengan pesanan.",
            "Nomor WhatsApp atau email yang digunakan saat pemesanan.",
            "Nama undangan, slug/link undangan, atau nomor/order detail jika tersedia.",
            "Jenis data yang ingin dihapus, misalnya data pesanan, aset undangan, RSVP, buku tamu, atau koneksi Facebook/Instagram.",
            "App-scoped ID dari Facebook jika tersedia.",
          ]}
        />
      </LegalSection>

      <LegalSection title="Proses dan Estimasi Waktu">
        <p>
          Kami akan meninjau dan memproses permintaan penghapusan secara manual
          dalam waktu yang wajar, umumnya sampai 30 hari setelah permintaan dan
          data verifikasi diterima lengkap. Kami dapat menghubungi Anda untuk
          memastikan kepemilikan data sebelum penghapusan dilakukan.
        </p>
        <p>
          Setelah penghapusan diproses, data terkait tidak lagi digunakan untuk
          layanan aktif, kecuali data tertentu yang wajib atau sah untuk tetap
          disimpan demi kewajiban hukum, catatan transaksi, keamanan,
          penyelesaian sengketa, atau pencegahan penyalahgunaan.
        </p>
      </LegalSection>

      <LegalSection title="Data yang Dapat Dihapus">
        <LegalList
          items={[
            "Data customer dan pesanan yang tidak lagi diperlukan untuk layanan aktif.",
            "Foto, video, file, galeri, dan aset undangan yang tersimpan di layanan kami.",
            "Data RSVP, jumlah tamu, dan pesan buku tamu yang terkait dengan undangan.",
            "Data koneksi Facebook atau Instagram yang tersimpan untuk integrasi layanan.",
          ]}
        />
      </LegalSection>

      <LegalSection title="Catatan Penting">
        <p>
          Menghapus data dari BikinUndangan.net tidak otomatis menghapus konten
          yang sudah dipublikasikan atau dibagikan di layanan pihak ketiga,
          termasuk Facebook, Instagram, WhatsApp, Google, atau platform lain.
          Untuk konten di platform pihak ketiga, gunakan pengaturan atau fitur
          penghapusan dari platform terkait.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
