# Local Blog Content Setup

Blog sekarang memakai file lokal di repo Next.js, tanpa Strapi.

## Struktur File

Metadata artikel disimpan di:

```txt
content/blog/articles.json
```

Isi artikel disimpan sebagai Markdown di folder yang sama:

```txt
content/blog/nama-artikel.md
```

## Menambah Artikel Baru

1. Buat file Markdown baru di `content/blog/`.
2. Tambahkan item baru ke `content/blog/articles.json`.
3. Pastikan `slug` unik dan `markdownFile` sesuai nama file.

Contoh item JSON:

```json
{
  "id": "artikel-baru",
  "title": "Judul Artikel Baru",
  "slug": "judul-artikel-baru",
  "excerpt": "Ringkasan pendek artikel untuk card dan meta description.",
  "category": "Tips",
  "publishedAt": "2026-05-01",
  "updatedAt": "2026-05-01",
  "seoTitle": "Judul SEO Artikel Baru",
  "seoDescription": "Deskripsi SEO artikel baru.",
  "coverImage": {
    "url": "/images/hero-invitation-mockup.png",
    "alternativeText": "Deskripsi gambar cover",
    "width": 1448,
    "height": 1086
  },
  "markdownFile": "judul-artikel-baru.md"
}
```

## Format Markdown yang Didukung

- Heading: `##`, `###`, `####`
- Paragraf
- Bold: `**teks**`
- Link: `[label](https://example.com)`
- Quote: `> teks`
- List bullet dan list angka
- Image: `![alt](/images/example.png)`
- Code block dengan triple backtick

Artikel otomatis diurutkan dari `publishedAt` terbaru.
