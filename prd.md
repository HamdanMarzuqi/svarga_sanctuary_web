# Product Requirements Document (PRD)
# Svarga Sanctuary Homestay — Website

---

## 1. Project Overview

**Product Name:** Svarga Sanctuary Homestay Website  
**Version:** 1.0.0  
**Last Updated:** 2026-08-09  
**Owner:** Svarga Sanctuary Homestay  
**Location:** Yogyakarta, Indonesia  
**Tech Stack:** Next.js 15 + TypeScript + Tailwind CSS + Framer Motion  

### Vision
Membangun website homestay premium yang secara visual memukau, terasa modern dan hidup, serta mampu mengkonversi pengunjung menjadi tamu yang melakukan booking — baik dari pasar lokal Indonesia maupun wisatawan internasional.

### Mission
Website ini bukan sekadar profil digital. Ini adalah pengalaman pertama tamu sebelum menginap. Setiap scroll, setiap animasi, setiap foto harus membuat pengunjung berkata: *"Saya ingin menginap di sini."*

---

## 2. Target Market

### Pasar Lokal (Indonesia)
- Wisatawan domestik yang mencari pengalaman menginap autentik di Yogyakarta
- Pasangan (honeymoon, anniversary), keluarga kecil, solo traveler
- Profesional muda (25–40 tahun) yang menghargai estetika dan kenyamanan
- Pengguna dominan mobile (smartphone)

### Pasar Internasional
- Wisatawan mancanegara yang mengunjungi Yogyakarta (Eropa, Asia, Australia)
- Pencari pengalaman budaya lokal yang autentik (cultural immersion)
- Traveler yang mencari alternatif hotel — lebih personal, lebih berjiwa
- Pengguna desktop/tablet lebih tinggi dibanding pasar lokal

### Bahasa
- **Bahasa Indonesia** (default untuk pengguna lokal)
- **English** (toggle/switch bahasa, untuk pengguna internasional)

---

## 3. Core Goals & Success Metrics

| Goal | KPI | Target |
|---|---|---|
| Konversi Booking via WhatsApp | Klik tombol "Book Now" → WhatsApp | > 5% dari total pengunjung |
| Bounce Rate Rendah | Waktu di halaman | < 40% bounce rate |
| SEO Organik | Ranking Google untuk keyword target | Top 10 untuk "homestay Yogyakarta" |
| Mobile Performance | Lighthouse Mobile Score | > 85 |
| Page Load Speed | LCP (Largest Contentful Paint) | < 2.5 detik |
| Engagement | Halaman per sesi | > 3 halaman/sesi |

---

## 4. Pages & Sitemap

### Struktur Halaman (Multi-Page)

```
/ (Home)
├── /rooms              → Daftar semua tipe kamar
│   ├── /rooms/standard
│   ├── /rooms/deluxe
│   └── /rooms/suite
├── /gallery            → Galeri foto & video
├── /booking            → Form booking + redirect WhatsApp
├── /about              → Tentang Svarga Sanctuary
├── /blog               → Artikel wisata Yogyakarta
│   └── /blog/[slug]    → Detail artikel
└── /contact            → Kontak & peta lokasi
```

---

## 5. Feature Requirements

### 5.1 Navigation (Navbar)
- **Sticky/fixed** navbar dengan efek blur glassmorphism saat di-scroll
- Logo Svarga Sanctuary di kiri
- Menu: Home, Rooms, Gallery, Blog, About, Contact
- Tombol **"Book Now"** di kanan (accent color, CTA utama)
- **Language toggle** EN / ID
- Hamburger menu yang smooth untuk mobile
- Animasi: fade-in + slide-down saat halaman pertama load

### 5.2 Home Page (/)

#### Hero Section
- Full-screen video background atau gambar parallax scroll dari suasana homestay Yogyakarta (alam, sawah, budaya)
- Overlay gradient gelap untuk readability
- Headline besar: *"Your Sanctuary in the Heart of Yogyakarta"*
- Sub-headline singkat (EN/ID)
- 2 CTA button: **"Explore Rooms"** dan **"Book Now via WhatsApp"**
- Scroll indicator animasi (panah atau teks "Scroll Down" yang bouncing)
- Animasi: text reveal on load (stagger animation), parallax scroll effect

#### Why Choose Us Section
- 4 icon card: Lokasi Strategis, Kamar Premium, Suasana Budaya, Layanan Personal
- Animasi: fade-in-up saat masuk viewport (Intersection Observer via Framer Motion)

#### Featured Rooms Section
- Carousel/slider 3 tipe kamar: Standard, Deluxe, Suite
- Setiap card: foto, nama kamar, harga per malam, fasilitas utama, tombol "Lihat Detail"
- Animasi: horizontal scroll snap atau smooth carousel dengan swipe gesture

#### Gallery Preview Section
- Masonry grid atau bento grid layout (6–9 foto terpilih)
- Hover effect: zoom + overlay dengan icon expand
- Tombol "Lihat Semua" → /gallery
- Animasi: staggered fade-in

#### Testimonials Section
- Auto-rotating carousel testimoni tamu
- Nama, asal kota/negara, rating bintang, kutipan
- Foto avatar tamu (atau initial avatar)
- Animasi: smooth slide horizontal

#### Location Teaser Section
- Peta Google Maps embed
- Jarak ke landmark penting (Malioboro: 15 menit, Prambanan: 20 menit, Merapi: 45 menit)
- Animasi: fade-in dari kiri

#### Latest Blog Section
- 3 artikel terbaru dengan thumbnail, judul, excerpt, dan tombol "Baca Selengkapnya"
- Animasi: card hover lift effect

#### Footer
- Logo + tagline
- Link navigasi
- Info kontak (WhatsApp, Email, Alamat)
- Social media icons (Instagram, TikTok, Facebook)
- Copyright
- Bahasa toggle

### 5.3 Rooms Page (/rooms)

#### Room List
- Header section dengan foto dan judul halaman
- Filter/tab: All / Standard / Deluxe / Suite
- Card setiap kamar:
  - Foto carousel (multiple foto)
  - Nama kamar
  - Harga per malam (Rp dan USD)
  - Daftar fasilitas (ikon: AC, WiFi, bathtub, breakfast, dll)
  - Tombol "Lihat Detail" dan "Book Now"
- Animasi: staggered card entrance

#### Room Detail Page (/rooms/[slug])
- Full-width foto carousel (swipeable, smooth transition)
- Lightbox gallery saat foto diklik
- Deskripsi kamar panjang
- Fasilitas lengkap dalam grid
- Harga dengan breakdown (weekday vs weekend)
- Availability note (bisa cek via WhatsApp)
- Floating "Book via WhatsApp" sticky button di mobile
- Animasi: parallax pada foto header, fade-in pada konten

### 5.4 Gallery Page (/gallery)

- Filter kategori: Semua / Kamar / Area Umum / Kuliner / Sekitar Homestay
- Masonry grid layout responsif
- Klik foto → fullscreen lightbox dengan navigasi prev/next
- Lazy loading dengan skeleton placeholder
- Animasi: masonry entrance stagger, lightbox fade+scale

### 5.5 Booking Page (/booking)

- Judul: "Pesan Kamar Anda"
- Form sederhana:
  - Nama lengkap
  - Nomor WhatsApp
  - Email (opsional)
  - Tipe kamar (dropdown: Standard / Deluxe / Suite)
  - Check-in date picker
  - Check-out date picker (auto hitung durasi dan estimasi total)
  - Jumlah tamu (dewasa + anak)
  - Pesan tambahan (textarea)
- Tombol submit → generate pesan WhatsApp otomatis dan buka wa.me/[nomor]
- Tampilkan ringkasan pesanan sebelum kirim
- Info: "Tim kami akan membalas dalam 1x24 jam"
- Animasi: form field animation on focus, button ripple effect

### 5.6 About Page (/about)

- Hero foto homestay dengan overlay teks
- Cerita singkat Svarga Sanctuary (filosofi nama "Svarga" = surga dalam bahasa Sanskerta)
- Tim / pengelola (foto + nama + peran)
- Nilai-nilai: Keautentikan, Kehangatan, Ketenangan, Keberlanjutan
- Penghargaan atau media coverage (jika ada)
- Animasi: timeline scroll reveal, fade-in sections

### 5.7 Blog Page (/blog)

- Grid artikel dengan thumbnail, kategori tag, judul, excerpt, tanggal, author
- Filter kategori: Wisata Jogja / Tips Perjalanan / Budaya / Kuliner
- Pagination atau infinite scroll
- Search artikel
- Animasi: card hover elevation

#### Blog Detail (/blog/[slug])
- Full article dengan typography yang nyaman dibaca
- Estimated reading time
- Share buttons (WhatsApp, Facebook, Twitter, Copy Link)
- Related articles di bawah
- Sidebar: artikel populer, kategori

### 5.8 Contact Page (/contact)

- Peta Google Maps embed (full width)
- Info kontak: Alamat lengkap, WhatsApp, Email
- Jam operasional
- Form kontak sederhana (nama, email, pesan)
- Social media links
- Animasi: map zoom-in entrance, form slide-up

---

## 6. Multilingual Requirements

- **Implementasi:** next-intl
- **Default locale:** id (Bahasa Indonesia)
- **Supported locales:** id, en
- **URL structure:** /en/rooms, /id/rooms atau path prefix
- Toggle bahasa: tombol di navbar dan footer
- **Yang perlu ditranslasi:** Semua konten UI (label, tombol, navigasi), konten halaman statis
- **Yang TIDAK perlu ditranslasi:** Nama properti, nama kamar, nama tempat wisata

---

## 7. SEO Requirements

- **Setiap halaman wajib memiliki:**
  - title unik dan deskriptif (max 60 karakter)
  - meta name="description" (max 160 karakter)
  - meta property og:* untuk social sharing
  - link rel="canonical"
  - Heading hierarchy yang benar (satu H1 per halaman)
  - Semantic HTML5 (header, main, article, section, footer)
- **Structured Data (JSON-LD):**
  - LodgingBusiness schema untuk data homestay
  - Room schema untuk setiap tipe kamar
  - BlogPosting schema untuk artikel
  - BreadcrumbList schema untuk navigasi
- **Keywords Target:**
  - "homestay Yogyakarta" (ID)
  - "penginapan murah Yogyakarta" (ID)
  - "Yogyakarta boutique homestay" (EN)
  - "authentic Javanese homestay" (EN)
  - "homestay near Malioboro" (EN/ID)
- **Sitemap:** Auto-generated via next-sitemap
- **robots.txt:** Configured properly
- **Image SEO:** Alt text deskriptif untuk semua gambar, WebP format, lazy loading

---

## 8. Booking Flow (WhatsApp Integration)

```
User mengisi form booking
        ↓
Sistem generate pesan WhatsApp terformat:
"Halo Svarga Sanctuary! Saya ingin memesan:
- Nama: [nama]
- Tipe Kamar: [tipe]
- Check-in: [tanggal]
- Check-out: [tanggal]
- Jumlah Tamu: [jumlah]
- Pesan: [pesan]"
        ↓
Tombol "Konfirmasi & Kirim via WhatsApp"
        ↓
Buka wa.me/[nomor_homestay]?text=[pesan_encoded]
        ↓
Tim homestay membalas manual
```

**Nomor WhatsApp:** Dikonfigurasi di environment variable NEXT_PUBLIC_WHATSAPP_NUMBER

---

## 9. Content Requirements

### Foto yang Dibutuhkan (minimal)
- **Hero:** 3–5 foto/video berkualitas tinggi (suasana homestay, alam Jogja)
- **Kamar Standard:** minimal 5 foto
- **Kamar Deluxe:** minimal 5 foto
- **Kamar Suite:** minimal 5 foto
- **Area Umum:** 8–10 foto (lobby, taman, kolam, dapur, dll)
- **Sekitar Homestay:** 5–8 foto (Malioboro, Kraton, Prambanan, dll)

### Konten Teks
- Deskripsi homestay (ID + EN)
- Deskripsi setiap kamar (ID + EN)
- Minimal 3 artikel blog awal
- 5–8 testimoni tamu

---

## 10. Accessibility

- Semua gambar wajib memiliki alt text
- Semua form input wajib memiliki label
- Fokus keyboard yang jelas (visible focus rings)
- Kontras warna minimum WCAG AA (4.5:1 untuk teks normal)
- ARIA labels untuk elemen interaktif
- Skip-to-main-content link

---

## 11. Out of Scope (v1.0)

- Payment gateway (Midtrans/Xendit) — ditambahkan di v2.0
- Sistem manajemen booking real-time / calendar availability
- Dashboard admin
- Push notification
- Customer account / login
- Review system terintegrasi (Tripadvisor, Google Reviews embed)
