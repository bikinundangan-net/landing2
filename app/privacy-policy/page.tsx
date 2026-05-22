import type { Metadata } from "next";
import { LegalList, LegalPage, LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy | BikinUndangan.net",
  description:
    "Kebijakan privasi BikinUndangan.net tentang data pesanan, undangan digital, RSVP, buku tamu, dan integrasi Facebook atau Instagram Page.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="Kebijakan ini menjelaskan bagaimana BikinUndangan.net mengumpulkan, menggunakan, menyimpan, dan melindungi data saat Anda memakai layanan undangan digital kami."
    >
      <LegalSection title="Data yang Kami Kumpulkan">
        <p>
          Kami mengumpulkan data yang diperlukan untuk membuat, mengelola, dan
          menayangkan undangan digital. Data tersebut dapat meliputi:
        </p>
        <LegalList
          items={[
            "Data customer dan pesanan, seperti nama, nomor WhatsApp, email opsional, nama mempelai, detail acara, lokasi, pilihan paket, status pembayaran, catatan pesanan, musik, love story, dan rekening amplop digital jika diberikan.",
            "Konten undangan, seperti foto, video, file desain, teks undangan, galeri, dan aset lain yang dikirimkan untuk ditampilkan di undangan.",
            "Data tamu, seperti nama tamu, konfirmasi RSVP, jumlah tamu, dan pesan buku tamu yang diisi melalui halaman undangan.",
            "Data admin dan autentikasi, seperti akun admin, sesi login, dan cookie autentikasi yang digunakan untuk menjaga akses dashboard tetap aman.",
            "Data teknis dasar, seperti alamat IP, informasi perangkat, browser, waktu akses, dan log sistem yang dibutuhkan untuk keamanan, pemeliharaan, dan pencegahan penyalahgunaan.",
          ]}
        />
      </LegalSection>

      <LegalSection title="Data dari Facebook dan Instagram">
        <p>
          Jika Anda menghubungkan akun, Facebook Page, atau Instagram Business
          account dengan layanan kami, kami hanya mengakses data yang Anda
          setujui melalui izin platform Meta. Data ini dapat meliputi identitas
          akun atau Page, permission yang diberikan, konten atau media yang Anda
          pilih untuk dipublikasikan, caption, status publikasi, dan metadata
          teknis yang diperlukan agar integrasi berjalan.
        </p>
        <p>
          Kami menggunakan data dari Facebook atau Instagram untuk menjalankan
          fitur yang Anda minta, misalnya membantu publikasi konten undangan,
          materi promosi, atau konten terkait acara ke Page atau akun yang Anda
          pilih. Kami tidak menjual data dari Meta dan tidak menggunakannya
          untuk tujuan yang tidak berhubungan dengan layanan BikinUndangan.net.
        </p>
      </LegalSection>

      <LegalSection title="Cara Kami Menggunakan Data">
        <LegalList
          items={[
            "Membuat, menampilkan, dan memperbarui halaman undangan digital.",
            "Mengelola pesanan, pembayaran, revisi, masa aktif, dan dukungan pelanggan.",
            "Menampilkan fitur RSVP, buku tamu, galeri, Google Maps, amplop digital, musik, dan fitur lain yang dipilih customer.",
            "Mengirim atau menerima komunikasi layanan melalui WhatsApp, email, atau kanal dukungan lain.",
            "Menjaga keamanan layanan, mencegah spam, memperbaiki bug, dan meningkatkan kualitas produk.",
            "Memenuhi kewajiban hukum, pembukuan, penyelesaian sengketa, atau permintaan resmi yang sah.",
          ]}
        />
      </LegalSection>

      <LegalSection title="Pihak Ketiga yang Digunakan">
        <p>
          Untuk menjalankan layanan, kami dapat menggunakan penyedia teknologi
          pihak ketiga. Setiap penyedia hanya digunakan sesuai kebutuhan
          layanan.
        </p>
        <LegalList
          items={[
            "Supabase untuk database, penyimpanan aset, autentikasi admin, dan infrastruktur backend.",
            "WhatsApp untuk komunikasi customer dan dukungan layanan.",
            "Meta, Facebook, dan Instagram untuk integrasi akun, Page, publikasi konten, atau fitur lain yang Anda aktifkan.",
            "Google Maps untuk menampilkan atau membuka lokasi acara.",
            "Penyedia hosting, domain, email, atau layanan teknis lain yang membantu operasional BikinUndangan.net.",
          ]}
        />
      </LegalSection>

      <LegalSection title="Publikasi Data di Undangan">
        <p>
          Data yang Anda minta untuk ditampilkan di undangan, seperti nama
          mempelai, foto, tanggal acara, lokasi, galeri, love story, rekening
          amplop digital, RSVP tertentu, dan pesan buku tamu, dapat terlihat
          oleh orang yang membuka link undangan. Pastikan Anda hanya mengirimkan
          data dan konten yang memang boleh dipublikasikan.
        </p>
      </LegalSection>

      <LegalSection title="Retensi dan Penghapusan">
        <p>
          Kami menyimpan data selama diperlukan untuk menyediakan layanan,
          menjaga riwayat pesanan, memenuhi kewajiban hukum, menyelesaikan
          sengketa, atau menjalankan kepentingan bisnis yang wajar. Data
          undangan dapat tetap tersimpan selama masa aktif paket dan periode
          operasional yang dibutuhkan setelahnya.
        </p>
        <p>
          Anda dapat meminta akses, koreksi, pembatasan, atau penghapusan data
          dengan menghubungi WhatsApp resmi kami di +62 851-5534-7714. Kami akan
          memproses permintaan secara wajar sesuai hukum yang berlaku, kecuali
          jika data tertentu perlu tetap disimpan untuk kewajiban hukum,
          transaksi, keamanan, atau penyelesaian sengketa.
        </p>
      </LegalSection>

      <LegalSection title="Keamanan">
        <p>
          Kami menerapkan langkah keamanan teknis dan operasional yang wajar,
          termasuk pembatasan akses admin, autentikasi, dan pengaturan izin
          database. Namun, tidak ada sistem online yang sepenuhnya bebas risiko.
          Anda juga bertanggung jawab menjaga keamanan akun, perangkat, dan
          akses yang Anda berikan.
        </p>
      </LegalSection>

      <LegalSection title="Kontak">
        <p>
          Untuk pertanyaan privasi, koreksi data, atau permintaan penghapusan
          data, hubungi BikinUndangan.net melalui WhatsApp resmi:
          +62 851-5534-7714.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
