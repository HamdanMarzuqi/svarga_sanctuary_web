# Architecture Documentation
# Svarga Sanctuary Homestay — Website

---

## 1. System Overview

Website Svarga Sanctuary Homestay adalah **static-first web application** yang dibangun dengan Next.js 15, mengutamakan performa, SEO, dan pengalaman pengguna yang mulus. Backend ringan — tidak ada database custom, sistem booking terintegrasi via WhatsApp.

```
┌─────────────────────────────────────────────────────┐
│                    CLIENT BROWSER                   │
│         (React + Framer Motion + Tailwind)          │
└───────────────────────┬─────────────────────────────┘
                        │ HTTP/HTTPS
┌───────────────────────▼─────────────────────────────┐
│                   NEXT.JS 15 APP                    │
│         (App Router + TypeScript + RSC)             │
│                                                     │
│   Pages (RSC)    │  API Routes   │  Middleware      │
│  ─────────────   │  ────────────  │  ─────────────  │
│  /               │  /api/contact  │  i18n routing   │
│  /rooms/[slug]   │               │  redirect rules  │
│  /gallery        │               │                  │
│  /booking        │               │                  │
│  /blog/[slug]    │               │                  │
│  /about          │               │                  │
│  /contact        │               │                  │
└───────┬──────────┴───────────────┴──────────────────┘
        │
┌───────▼──────────────────────────────────────────────┐
│              EXTERNAL SERVICES                       │
│                                                      │
│  Vercel (Hosting)  │  WhatsApp API  │  Google Maps  │
│  Cloudinary (CDN)  │  Resend (Email)│  Analytics    │
└──────────────────────────────────────────────────────┘
```

---

## 2. Tech Stack

### Core Framework
| Layer | Technology | Version | Alasan |
|---|---|---|---|
| Framework | Next.js | 15.x | App Router, RSC, built-in SEO, image optimization |
| Language | TypeScript | 5.x | Type safety, better DX, IDE support lebih kuat |
| Styling | Tailwind CSS | 4.x | Utility-first, purged CSS, design system terintegrasi |
| Animation | Framer Motion | 11.x | Deklaratif, performan, viewport scroll, gestures |
| State | Zustand | 4.x | Lightweight, simple, untuk language toggle & UI state |
| Forms | React Hook Form + Zod | latest | Performa form, validasi type-safe |
| i18n | next-intl | 3.x | Multilingual ID/EN, SEO-friendly URL routing |

### UI Libraries
| Library | Fungsi |
|---|---|
| Lucide React | Icon library — bersih, consistent |
| Swiper.js | Carousel/slider dengan touch support |
| yet-another-react-lightbox | Fullscreen lightbox galeri |
| react-masonry-css | Masonry grid layout galeri |
| date-fns | Date manipulation untuk booking form |
| react-day-picker | Date picker UI yang clean |

### Media & Performa
| Tool | Fungsi |
|---|---|
| Next.js Image (next/image) | Automatic WebP, lazy load, blur placeholder |
| Cloudinary | CDN + image transformation (resize, crop, optimize) |
| plaiceholder | Generate blur data URL untuk image placeholder |

### SEO & Analytics
| Tool | Fungsi |
|---|---|
| next-sitemap | Auto-generate sitemap.xml |
| Schema.org JSON-LD | Structured data (LodgingBusiness, Room, Blog) |
| Google Analytics 4 | User analytics, konversi tracking |
| Vercel Analytics | Core Web Vitals monitoring |
| Vercel Speed Insights | Real User Monitoring (RUM) |

### Deployment
| Service | Fungsi |
|---|---|
| Vercel | Hosting utama, auto-deploy dari GitHub, edge CDN |
| GitHub | Version control, CI/CD pipeline |
| Cloudinary | Media hosting & CDN untuk gambar |

---

## 3. Project Directory Structure

```
svarga-sanctuary/
├── public/
│   ├── favicon.ico
│   ├── og-image.jpg               # Open Graph default image
│   ├── robots.txt
│   └── fonts/                     # Self-hosted fonts (opsional)
│
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── [locale]/              # i18n root layout
│   │   │   ├── layout.tsx         # Root layout dengan metadata
│   │   │   ├── page.tsx           # Home page
│   │   │   ├── rooms/
│   │   │   │   ├── page.tsx       # Room list page
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx   # Room detail page
│   │   │   ├── gallery/
│   │   │   │   └── page.tsx
│   │   │   ├── booking/
│   │   │   │   └── page.tsx
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx       # Blog list
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx   # Blog detail
│   │   │   └── contact/
│   │   │       └── page.tsx
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts       # Contact form handler (kirim ke email)
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── PageWrapper.tsx    # Framer Motion page transition wrapper
│   │   ├── ui/                    # Reusable atomic UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   └── AnimatedSection.tsx  # Scroll-reveal wrapper
│   │   ├── home/                  # Home page sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── WhyChooseUs.tsx
│   │   │   ├── FeaturedRooms.tsx
│   │   │   ├── GalleryPreview.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── LocationTeaser.tsx
│   │   │   └── LatestBlog.tsx
│   │   ├── rooms/
│   │   │   ├── RoomCard.tsx
│   │   │   ├── RoomFilter.tsx
│   │   │   ├── RoomGallery.tsx
│   │   │   └── RoomAmenities.tsx
│   │   ├── gallery/
│   │   │   ├── MasonryGrid.tsx
│   │   │   ├── GalleryFilter.tsx
│   │   │   └── Lightbox.tsx
│   │   ├── booking/
│   │   │   ├── BookingForm.tsx
│   │   │   └── BookingSummary.tsx
│   │   ├── blog/
│   │   │   ├── BlogCard.tsx
│   │   │   ├── BlogContent.tsx
│   │   │   └── RelatedPosts.tsx
│   │   └── common/
│   │       ├── WhatsAppButton.tsx  # Floating WA button
│   │       ├── ScrollProgress.tsx  # Top progress bar
│   │       └── LanguageToggle.tsx
│   │
│   ├── lib/
│   │   ├── whatsapp.ts            # Generate WA message helper
│   │   ├── analytics.ts           # GA4 event helpers
│   │   ├── seo.ts                 # Metadata generation helpers
│   │   └── utils.ts               # General utilities
│   │
│   ├── data/                      # Static content (MDX atau TypeScript)
│   │   ├── rooms.ts               # Data kamar (nama, harga, fasilitas, foto)
│   │   ├── testimonials.ts        # Data testimoni tamu
│   │   ├── amenities.ts           # Master list fasilitas
│   │   └── blog/                  # MDX blog posts
│   │       ├── wisata-malioboro.mdx
│   │       ├── tips-liburan-jogja.mdx
│   │       └── prambanan-guide.mdx
│   │
│   ├── hooks/
│   │   ├── useScrolled.ts         # Detect scroll untuk navbar
│   │   ├── useInView.ts           # Scroll reveal trigger
│   │   └── useWhatsApp.ts         # WA message generator
│   │
│   ├── store/
│   │   └── uiStore.ts             # Zustand store (language, modal state)
│   │
│   ├── styles/
│   │   └── globals.css            # Global styles, CSS variables
│   │
│   ├── types/
│   │   ├── room.ts                # Room type definitions
│   │   ├── blog.ts                # Blog post types
│   │   ├── booking.ts             # Booking form types
│   │   └── testimonial.ts
│   │
│   └── i18n/
│       ├── routing.ts             # next-intl routing config
│       └── messages/
│           ├── id.json            # Terjemahan Bahasa Indonesia
│           └── en.json            # English translations
│
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── next-sitemap.config.js
├── .env.local                     # Environment variables (tidak di-commit)
├── .env.example                   # Template env variables
└── package.json
```

---

## 4. Data Architecture

### Room Data Model
```typescript
interface Room {
  id: string;
  slug: string;              // URL-friendly: "deluxe-garden-view"
  type: 'standard' | 'deluxe' | 'suite';
  name: {
    id: string;              // "Kamar Deluxe Garden View"
    en: string;              // "Deluxe Garden View Room"
  };
  description: {
    id: string;
    en: string;
  };
  pricePerNight: {
    weekday: number;         // dalam IDR
    weekend: number;
    currency: 'IDR';
  };
  capacity: {
    adults: number;
    children: number;
  };
  size: number;              // dalam m²
  bedType: string;           // "King Size" | "Twin" | "Queen"
  images: {
    url: string;
    alt: string;
    blurDataUrl?: string;    // Base64 blur placeholder
  }[];
  amenities: string[];       // Referensi ke amenities.ts
  highlights: string[];      // 3-4 poin unggulan kamar
  isAvailable: boolean;
}
```

### Blog Post (MDX Frontmatter)
```typescript
interface BlogPost {
  title: {
    id: string;
    en: string;
  };
  slug: string;
  excerpt: {
    id: string;
    en: string;
  };
  coverImage: string;
  publishedAt: string;       // ISO 8601
  author: string;
  category: 'wisata' | 'tips' | 'budaya' | 'kuliner';
  tags: string[];
  readingTime: number;       // dalam menit
}
```

### Testimonial Model
```typescript
interface Testimonial {
  id: string;
  guestName: string;
  origin: string;            // "Jakarta, Indonesia" | "Melbourne, Australia"
  rating: 1 | 2 | 3 | 4 | 5;
  quote: {
    id: string;
    en: string;
  };
  roomType?: string;
  stayDate: string;          // "Januari 2026"
  avatarUrl?: string;
  initials: string;          // Fallback: "JS" untuk "John Smith"
}
```

### Booking Form State
```typescript
interface BookingFormData {
  fullName: string;
  whatsappNumber: string;
  email?: string;
  roomType: 'standard' | 'deluxe' | 'suite';
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children: number;
  specialRequests?: string;
}
```

---

## 5. Routing & URL Structure

### i18n URL Routing (next-intl)
```
/              → redirect ke /id (default)
/id            → Home (Bahasa Indonesia)
/en            → Home (English)
/id/rooms      → Daftar kamar (ID)
/en/rooms      → Room list (EN)
/id/rooms/[slug]  → Detail kamar (ID)
/en/rooms/[slug]  → Room detail (EN)
/id/gallery    → Galeri
/en/gallery    → Gallery
/id/booking    → Form booking (ID)
/en/booking    → Booking form (EN)
/id/about      → Tentang kami
/en/about      → About us
/id/blog       → Blog
/en/blog       → Blog
/id/blog/[slug]  → Artikel
/en/blog/[slug]  → Article
/id/contact    → Kontak
/en/contact    → Contact
```

### API Routes
```
POST /api/contact    → Handle contact form, kirim email via Resend
```

---

## 6. SEO Architecture

### Metadata Generation Pattern
```typescript
// Setiap page.tsx mengeksport generateMetadata()
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `[Judul Halaman] | Svarga Sanctuary Homestay Yogyakarta`,
    description: `[Deskripsi unik 150-160 karakter]`,
    openGraph: {
      title: `...`,
      description: `...`,
      images: [{ url: `...`, width: 1200, height: 630 }],
      locale: params.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
    },
    alternates: {
      canonical: `https://svargaranctuary.com/${params.locale}/[path]`,
      languages: {
        'id': `https://svargaranctuary.com/id/[path]`,
        'en': `https://svargaranctuary.com/en/[path]`,
      }
    }
  };
}
```

### JSON-LD Structured Data
```typescript
// Komponen JsonLd.tsx di root layout
const lodgingBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "name": "Svarga Sanctuary Homestay",
  "description": "...",
  "url": "https://svargaranctuary.com",
  "telephone": "+62-xxx-xxxx-xxxx",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "...",
    "addressLocality": "Yogyakarta",
    "addressRegion": "DIY",
    "postalCode": "55...",
    "addressCountry": "ID"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -7.xxxx,
    "longitude": 110.xxxx
  },
  "priceRange": "Rp 350.000 - Rp 1.500.000",
  "currenciesAccepted": "IDR",
  "paymentAccepted": "Cash, Bank Transfer"
};
```

---

## 7. WhatsApp Integration

### Environment Variable
```
NEXT_PUBLIC_WHATSAPP_NUMBER=628xxxxxxxxxx
```

### Message Generator (lib/whatsapp.ts)
```typescript
export function generateBookingMessage(data: BookingFormData, locale: 'id' | 'en'): string {
  const nights = differenceInDays(data.checkOut, data.checkIn);
  const room = getRoomByType(data.roomType);
  const price = room.pricePerNight.weekday * nights;

  if (locale === 'id') {
    return encodeURIComponent(
      `Halo Svarga Sanctuary! Saya ingin memesan kamar:\n\n` +
      `📛 Nama: ${data.fullName}\n` +
      `🛏️ Tipe Kamar: ${room.name.id}\n` +
      `📅 Check-in: ${format(data.checkIn, 'dd MMMM yyyy', { locale: id })}\n` +
      `📅 Check-out: ${format(data.checkOut, 'dd MMMM yyyy', { locale: id })}\n` +
      `🌙 Durasi: ${nights} malam\n` +
      `👥 Tamu: ${data.adults} dewasa${data.children > 0 ? `, ${data.children} anak` : ''}\n` +
      `💰 Estimasi Total: Rp ${price.toLocaleString('id-ID')}\n` +
      `${data.specialRequests ? `📝 Catatan: ${data.specialRequests}\n` : ''}` +
      `\nMohon konfirmasi ketersediaan kamar. Terima kasih!`
    );
  }
  // English version...
}

export function openWhatsApp(message: string): void {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  window.open(`https://wa.me/${number}?text=${message}`, '_blank');
}
```

---

## 8. Performance Strategy

### Image Optimization
- **Format:** WebP otomatis via Next.js Image + Cloudinary
- **Sizes attribute:** Dikonfigurasi per komponen sesuai breakpoint
- **Priority:** Hanya gambar above-the-fold (hero) yang menggunakan `priority={true}`
- **Lazy loading:** Semua gambar lain menggunakan lazy loading default
- **Blur placeholder:** `blurDataURL` untuk gambar hero dan kamar

### Code Splitting
- Setiap halaman di-bundle terpisah (otomatis oleh Next.js App Router)
- Dynamic import untuk komponen berat: Lightbox, Map, Swiper
- Route-based code splitting otomatis

### Font Loading
- Google Fonts via `next/font/google` (otomatis di-host oleh Vercel, zero layout shift)
- `display: 'swap'` untuk semua font
- Preload font wajib (Cormorant Garamond, DM Sans)

### Caching Strategy
```typescript
// next.config.ts
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
    formats: ['image/avif', 'image/webp'],
  },
  headers: async () => [
    {
      source: '/(.*)\\.(jpg|jpeg|png|webp|avif|svg|ico)',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
    },
    {
      source: '/_next/static/(.*)',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
    }
  ]
};
```

### Core Web Vitals Targets
| Metric | Target | Strategi |
|---|---|---|
| LCP | < 2.5s | Priority image hero, preload fonts |
| CLS | < 0.1 | Explicit image dimensions, font display swap |
| FID/INP | < 100ms | Minimal JS, defer non-critical scripts |
| TTFB | < 800ms | Vercel Edge Network, static generation |

---

## 9. Deployment Pipeline

```
Developer push ke GitHub (main branch)
        ↓
GitHub Actions: lint + type-check + build check
        ↓
Vercel auto-deploy ke preview URL
        ↓
Manual review + approve
        ↓
Merge ke main → Vercel deploy ke production
        ↓
Post-deploy: Sitemap ping ke Google Search Console
```

### Environment Variables
```bash
# .env.local (jangan commit ke GitHub)
NEXT_PUBLIC_WHATSAPP_NUMBER=628xxxxxxxxxx
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIza...
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=svarga-sanctuary
RESEND_API_KEY=re_...
CONTACT_EMAIL=info@svargaranctuary.com
```

---

## 10. Content Management

Untuk v1.0, konten dikelola sebagai **static data files** (TypeScript) dan **MDX files** untuk blog:

- **Kamar & harga:** Edit file `src/data/rooms.ts`
- **Testimoni:** Edit file `src/data/testimonials.ts`
- **Blog:** Tambah file `.mdx` baru di `src/data/blog/`
- **Terjemahan:** Edit `src/i18n/messages/id.json` dan `en.json`

Untuk v2.0 dapat dipertimbangkan: **Sanity.io** atau **Contentlayer** sebagai CMS.

---

## 11. Third-Party Services Summary

| Service | Tier | Kegunaan | Estimasi Biaya |
|---|---|---|---|
| Vercel | Hobby/Pro | Hosting + deploy | Free (Hobby) |
| Cloudinary | Free | CDN + image optimization | Free (25GB) |
| Google Maps | Standard | Embed peta | Free (quota cukup) |
| Google Analytics 4 | Free | Analytics | Free |
| Resend | Free | Contact form email | Free (100/day) |
| WhatsApp Business | Free | Booking communication | Free |
