import type { Metadata } from "next";
import { LegalList, LegalPage, LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service | BikinUndangan.net",
  description:
    "Syarat dan ketentuan penggunaan layanan undangan digital BikinUndangan.net.",
  alternates: {
    canonical: "/terms-of-service",
  },
};

export default function TermsOfServicePage() {
  return (
    <LegalPage
      title="Terms of Service"
      description="Syarat ini mengatur penggunaan layanan BikinUndangan.net, termasuk pembuatan undangan digital, pengelolaan konten, fitur tambahan, dan integrasi pihak ketiga."
    >
      <LegalSection title="Ruang Lingkup Layanan">
        <p>
          BikinUndangan.net menyediakan layanan pembuatan dan pengelolaan
          undangan digital, termasuk template desain, halaman undangan, galeri,
          RSVP, buku tamu, amplop digital, Google Maps, musik, dan fitur
          tambahan lain sesuai paket atau add-on yang dipilih.
        </p>
        <p>
          Fitur, harga, estimasi pengerjaan, masa aktif, dan kuota revisi dapat
          berbeda untuk setiap paket. Informasi yang tampil di website atau
          komunikasi resmi kami menjadi acuan layanan pada saat pemesanan.
        </p>
      </LegalSection>

      <LegalSection title="Kewajiban Customer">
        <LegalList
          items={[
            "Memberikan data yang benar, lengkap, dan memiliki izin untuk digunakan dalam undangan.",
            "Memastikan foto, video, musik, teks, rekening, lokasi, dan data tamu yang dikirim tidak melanggar hak pihak lain.",
            "Memeriksa preview undangan dan meminta revisi dalam batas paket yang dipilih.",
            "Menjaga link undangan, akses akun, dan informasi sensitif yang diberikan kepada kami.",
            "Tidak memakai layanan untuk konten ilegal, menipu, melecehkan, melanggar hak cipta, atau merugikan pihak lain.",
          ]}
        />
      </LegalSection>

      <LegalSection title="Integrasi Facebook dan Instagram">
        <p>
          Jika Anda menghubungkan Facebook Page, Instagram Business account,
          atau akun Meta lain, Anda menyatakan bahwa Anda memiliki hak untuk
          memberikan akses tersebut. Kami hanya akan menggunakan akses yang Anda
          setujui untuk menjalankan fitur yang Anda minta, seperti membantu
          publikasi konten atau materi terkait undangan.
        </p>
        <p>
          Anda bertanggung jawab atas konten, caption, media, jadwal, dan akun
          tujuan yang dipilih untuk publikasi. Penggunaan fitur yang terkait
          Meta juga tunduk pada ketentuan dan kebijakan Meta, Facebook, dan
          Instagram yang berlaku.
        </p>
      </LegalSection>

      <LegalSection title="Pembayaran, Revisi, dan Refund">
        <LegalList
          items={[
            "Pesanan diproses setelah data dan pembayaran yang diperlukan diterima atau sesuai kesepakatan tertulis.",
            "Revisi mengikuti ketentuan paket, selama tidak mengubah lingkup pekerjaan secara besar atau meminta desain baru dari awal.",
            "Biaya add-on, domain, layanan pihak ketiga, atau pekerjaan yang sudah dimulai dapat bersifat tidak dapat dikembalikan.",
            "Refund, pembatalan, atau perubahan pesanan akan ditinjau kasus per kasus berdasarkan status pengerjaan dan kesepakatan layanan.",
          ]}
        />
      </LegalSection>

      <LegalSection title="Konten dan Hak Penggunaan">
        <p>
          Customer tetap memiliki hak atas konten yang dikirimkan, sejauh
          customer memang memiliki hak tersebut. Dengan mengirim konten kepada
          kami, customer memberi BikinUndangan.net izin untuk menggunakan,
          menyimpan, mengedit, menampilkan, dan mempublikasikan konten tersebut
          sebatas untuk menyediakan layanan undangan digital dan fitur terkait.
        </p>
        <p>
          Kami dapat menolak atau menghapus konten yang menurut penilaian kami
          melanggar hukum, melanggar hak pihak lain, mengandung materi
          berbahaya, atau tidak sesuai dengan kebijakan layanan.
        </p>
      </LegalSection>

      <LegalSection title="Ketersediaan Layanan">
        <p>
          Kami berupaya menjaga layanan tetap tersedia, tetapi tidak menjamin
          layanan selalu bebas gangguan. Gangguan dapat terjadi karena
          pemeliharaan, masalah jaringan, layanan pihak ketiga, force majeure,
          perubahan platform, atau alasan teknis lain di luar kendali kami.
        </p>
      </LegalSection>

      <LegalSection title="Batas Tanggung Jawab">
        <p>
          Sepanjang diizinkan hukum, tanggung jawab BikinUndangan.net terbatas
          pada layanan yang dipesan dan biaya yang dibayarkan untuk pesanan
          terkait. Kami tidak bertanggung jawab atas kerugian tidak langsung,
          kehilangan peluang, kesalahan data dari customer, pelanggaran hak
          pihak ketiga oleh konten customer, atau gangguan dari platform pihak
          ketiga.
        </p>
      </LegalSection>

      <LegalSection title="Perubahan Ketentuan">
        <p>
          Kami dapat memperbarui syarat ini dari waktu ke waktu. Perubahan akan
          berlaku setelah dipublikasikan di halaman ini. Jika Anda terus
          menggunakan layanan setelah perubahan berlaku, Anda dianggap menerima
          ketentuan terbaru.
        </p>
      </LegalSection>

      <LegalSection title="Kontak">
        <p>
          Untuk pertanyaan tentang syarat layanan, pesanan, atau dukungan,
          hubungi BikinUndangan.net melalui WhatsApp resmi: +62 851-5534-7714.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
