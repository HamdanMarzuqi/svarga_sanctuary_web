# Development Rules & Coding Standards
# Svarga Sanctuary Homestay — Website

> File ini adalah panduan wajib bagi semua developer (termasuk AI coding assistant) yang bekerja pada proyek ini. Semua rules di bawah bersifat WAJIB kecuali ditandai [OPSIONAL].

---

## 1. Tech Stack Rules

### Framework & Language
- **WAJIB** menggunakan **Next.js 15 dengan App Router** — DILARANG menggunakan Pages Router
- **WAJIB** menggunakan **TypeScript** untuk semua file (tidak ada file `.js` kecuali config)
- Minimum TypeScript strict mode: `"strict": true` di `tsconfig.json`
- **DILARANG** menggunakan `any` type — gunakan proper typing atau `unknown`

### Styling
- **WAJIB** menggunakan **Tailwind CSS** untuk semua styling
- **DILARANG** menulis CSS inline di komponen kecuali untuk nilai dinamis yang tidak bisa di-cover Tailwind
- **DILARANG** menggunakan CSS-in-JS library (styled-components, emotion)
- Custom CSS hanya di `src/app/globals.css` untuk CSS variables dan base styles
- Gunakan design tokens dari `design.md` — JANGAN hardcode warna atau spacing

### Animation
- **WAJIB** menggunakan **Framer Motion** untuk semua animasi utama
- Animasi scroll-triggered menggunakan `whileInView` + `viewport={{ once: true }}`
- **WAJIB** implementasi `prefers-reduced-motion` media query untuk semua animasi:
  ```typescript
  import { useReducedMotion } from 'framer-motion';
  const shouldReduceMotion = useReducedMotion();
  ```
- DILARANG menggunakan animasi CSS keyframes untuk efek utama — gunakan Framer Motion
- Semua Framer Motion variants wajib didefinisikan di luar komponen (tidak inline di JSX)

---

## 2. Component Rules

### File Organization
```
src/components/
├── layout/      → Navbar, Footer, PageWrapper
├── ui/          → Atomic komponen reusable (Button, Card, Modal, dll)
├── home/        → Sections khusus homepage
├── rooms/       → Komponen halaman rooms
├── gallery/     → Komponen galeri
├── booking/     → Komponen form booking
├── blog/        → Komponen blog
└── common/      → Komponen yang digunakan di banyak halaman
```

### Naming Convention
- **File komponen:** PascalCase → `RoomCard.tsx`, `HeroSection.tsx`
- **File utilities:** camelCase → `whatsapp.ts`, `seo.ts`, `utils.ts`
- **File types:** camelCase → `room.ts`, `booking.ts`
- **Constants:** UPPER_SNAKE_CASE → `MAX_GUESTS`, `WHATSAPP_BASE_URL`
- **CSS classes (Tailwind):** Gunakan Tailwind utility classes langsung, tidak ada custom class names

### Component Rules
```typescript
// BENAR — Komponen dengan type-safe props
interface RoomCardProps {
  room: Room;
  locale: Locale;
  className?: string;
}

export function RoomCard({ room, locale, className }: RoomCardProps) {
  // ...
}

// SALAH — Hindari ini
export default function RoomCard(props: any) { // DILARANG
  // ...
}
```

- **WAJIB:** Semua komponen menggunakan named export (bukan default export), kecuali `page.tsx` dan `layout.tsx`
- **WAJIB:** Semua komponen wajib memiliki TypeScript interface untuk props
- **DILARANG:** Prop drilling lebih dari 2 level — gunakan Zustand store atau React Context
- Pisahkan Server Components dan Client Components dengan jelas
- Tandai Client Components dengan `'use client'` di baris pertama
- Gunakan Server Components sebisa mungkin untuk performa

### Server vs Client Component
```typescript
// SERVER COMPONENT (default) — tidak perlu 'use client'
// Cocok untuk: fetch data, static content, SEO-sensitive content
export async function RoomList() {
  const rooms = await getRooms(); // Server-side data fetch
  return <div>{rooms.map(...)}</div>;
}

// CLIENT COMPONENT — butuh 'use client'
// Cocok untuk: useState, useEffect, event handlers, animations, browser APIs
'use client';
export function AnimatedCard({ children }: { children: React.ReactNode }) {
  // Framer Motion butuh client-side
  return <motion.div whileHover={{ y: -8 }}>{children}</motion.div>;
}
```

---

## 3. Data & Content Rules

### Static Data
- Semua data kamar, testimoni, dan amenitas didefinisikan di `src/data/` sebagai TypeScript files
- **WAJIB** mengikuti interface yang didefinisikan di `src/types/` dan `schema.md`
- **DILARANG** hardcode konten teks dalam bahasa Indonesia langsung di JSX — semua teks harus melalui i18n

### i18n Rules
- **WAJIB:** Semua teks UI harus menggunakan `useTranslations()` hook dari next-intl
- **WAJIB:** Semua halaman harus mendukung locale `id` dan `en`
- Struktur translation key menggunakan dot notation: `nav.bookNow`, `rooms.perNight`
- Konten blog: bisa dalam dua bahasa terpisah di MDX frontmatter

```typescript
// BENAR
import { useTranslations } from 'next-intl';
function Navbar() {
  const t = useTranslations('nav');
  return <button>{t('bookNow')}</button>;
}

// SALAH — hardcode teks
function Navbar() {
  return <button>Pesan Sekarang</button>; // DILARANG
}
```

---

## 4. Form & Validation Rules

- **WAJIB:** Semua form menggunakan `react-hook-form` + `Zod` untuk validasi
- **WAJIB:** Semua Zod schemas didefinisikan di `src/types/` dan diekspor
- **WAJIB:** Validasi dilakukan di client-side DAN server-side (API route)
- **WAJIB:** Semua form field memiliki error message yang jelas dan user-friendly (dalam bahasa yang dipilih user)
- Honeypot field wajib ada di semua form publik (contact, booking)

---

## 5. Image Rules

- **WAJIB:** Semua gambar menggunakan `next/image` (BUKAN `<img>` HTML tag biasa)
- **WAJIB:** Semua gambar memiliki `alt` attribute yang deskriptif dan informatif
- **WAJIB:** Gambar hero dan above-the-fold menggunakan `priority={true}`
- **WAJIB:** Sertakan `width` dan `height` untuk mencegah CLS
- **WAJIB:** Gambar dari Cloudinary menggunakan `sizes` attribute yang tepat
- **DILARANG:** Upload gambar ke folder `public/` untuk gambar produksi — gunakan Cloudinary
- Format gambar: WebP otomatis oleh Next.js Image + Cloudinary

```typescript
// BENAR
import Image from 'next/image';
<Image
  src="https://res.cloudinary.com/svarga-sanctuary/image/upload/v1/rooms/main.jpg"
  alt="Kamar Deluxe Svarga Sanctuary Homestay Yogyakarta dengan tempat tidur king size"
  width={1200}
  height={800}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="object-cover"
/>

// SALAH
<img src="/rooms/main.jpg" /> // DILARANG
```

---

## 6. SEO Rules

- **WAJIB:** Setiap `page.tsx` mengeksport `generateMetadata()` function
- **WAJIB:** Setiap halaman memiliki unique `title` (max 60 karakter) dan `description` (max 160 karakter)
- **WAJIB:** Setiap halaman memiliki Open Graph metadata lengkap
- **WAJIB:** Setiap halaman hanya memiliki **satu H1**
- **WAJIB:** Heading hierarchy benar: H1 → H2 → H3 (tidak melompat level)
- **WAJIB:** Semua konten penting ada dalam HTML (bukan hanya di JavaScript)
- **WAJIB:** Sertakan JSON-LD structured data di halaman yang relevan
- **WAJIB:** Gunakan semantic HTML5 elements (`<header>`, `<main>`, `<nav>`, `<article>`, `<section>`, `<footer>`)

---

## 7. Performance Rules

- **WAJIB:** Lighthouse Mobile score minimal 85 sebelum launch
- **WAJIB:** LCP < 2.5 detik, CLS < 0.1, FID < 100ms
- **WAJIB:** Gunakan `dynamic import` dengan `{ ssr: false }` untuk komponen berat yang tidak perlu SSR:
  ```typescript
  const Lightbox = dynamic(() => import('@/components/gallery/Lightbox'), {
    ssr: false,
    loading: () => <LightboxSkeleton />,
  });
  ```
- **WAJIB:** Animasi Framer Motion menggunakan GPU-accelerated properties ONLY: `transform`, `opacity`
- **DILARANG:** Menganimasikan `width`, `height`, `top`, `left`, `margin`, `padding` (menyebabkan reflow)
- **DILARANG:** Meng-import seluruh icon library — gunakan tree-shaking:
  ```typescript
  // BENAR
  import { Wifi, AirVent, Bath } from 'lucide-react';
  
  // SALAH
  import * as Icons from 'lucide-react'; // DILARANG
  ```

---

## 8. Accessibility Rules

- **WAJIB:** Semua gambar memiliki `alt` text
- **WAJIB:** Semua form input memiliki `<label>` yang terhubung via `htmlFor`
- **WAJIB:** Semua tombol dan link memiliki accessible name yang jelas
- **WAJIB:** Focus ring yang visible untuk keyboard navigation
- **WAJIB:** Kontras warna minimum WCAG AA (4.5:1 untuk teks normal, 3:1 untuk teks besar)
- **WAJIB:** Skip-to-main-content link di awal `layout.tsx`
- **WAJIB:** Modal/dialog memiliki focus trap dan bisa ditutup dengan Escape key
- **WAJIB:** Semua elemen interaktif dapat diakses via keyboard (Tab, Enter, Escape)
- Gunakan ARIA attributes hanya jika HTML semantik tidak cukup

```typescript
// WAJIB ada di root layout.tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded"
>
  Skip to main content
</a>
```

---

## 9. WhatsApp Integration Rules

- Nomor WA **selalu** dari environment variable: `process.env.NEXT_PUBLIC_WHATSAPP_NUMBER`
- Pesan WA **selalu** di-encode dengan `encodeURIComponent()` sebelum dijadikan URL parameter
- URL WhatsApp format: `https://wa.me/{number}?text={encoded_message}`
- Buka WA di tab baru: `window.open(url, '_blank', 'noopener,noreferrer')`
- Pesan WA harus tersedia dalam **Bahasa Indonesia DAN English** sesuai locale aktif

---

## 10. Code Quality Rules

### ESLint & TypeScript
- Semua linting rules harus pass sebelum commit (`next lint` clean)
- TypeScript compiler tidak boleh ada error (`tsc --noEmit` clean)
- Gunakan ESLint plugin: `eslint-plugin-jsx-a11y` untuk accessibility linting

### Git Conventions
```
# Format commit message
<type>(<scope>): <description>

# Types:
feat:     Fitur baru
fix:      Bug fix
style:    Perubahan styling (UI)
refactor: Refactor kode
perf:     Improvement performa
docs:     Perubahan dokumentasi
chore:    Update dependencies, config

# Contoh:
feat(rooms): add room detail page with lightbox gallery
fix(booking): fix date validation allowing past dates
style(navbar): add glassmorphism effect on scroll
```

### Folder Import Order (wajib konsisten)
```typescript
// 1. React/Next.js built-ins
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 2. Third-party libraries
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

// 3. Internal types
import type { Room } from '@/types/room';

// 4. Internal utilities & data
import { getRoomBySlug } from '@/data/rooms';
import { fadeUpVariant } from '@/lib/animations';

// 5. Internal components
import { Button } from '@/components/ui/Button';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
```

---

## 11. Design System Compliance

- **WAJIB:** Gunakan hanya warna dari `design.md` color palette — TIDAK BOLEH hardcode hex/rgb colors
- **WAJIB:** Gunakan font families dari `design.md` (Cormorant Garamond + DM Sans) — tidak boleh tambah font lain tanpa approval
- **WAJIB:** Gunakan spacing values dari Tailwind config yang sesuai `design.md`
- **WAJIB:** Gunakan Framer Motion variants yang sudah didefinisikan di `src/lib/animations.ts` — buat file tersebut sebagai single source of truth untuk animasi
- **DILARANG:** Membuat warna, komponen, atau pola animasi baru yang tidak ada di `design.md` tanpa mendokumentasikannya

---

## 12. Responsive Design Rules

- **WAJIB:** Mobile-first approach — semua styling dimulai dari mobile, di-override untuk screen lebih besar
- **WAJIB:** Test di breakpoints: 375px (iPhone SE), 768px (tablet), 1280px (desktop), 1536px (wide)
- **WAJIB:** Touch targets minimum 44x44px untuk semua elemen interaktif di mobile
- **WAJIB:** Carousel/slider di mobile harus mendukung swipe gesture
- **WAJIB:** Navbar memiliki hamburger menu yang berfungsi di mobile
- Font size minimum: 14px — tidak ada teks yang lebih kecil dari itu

---

## 13. Pre-Commit Checklist

Sebelum commit, pastikan:
- [ ] `npm run lint` — tidak ada error atau warning
- [ ] `npx tsc --noEmit` — tidak ada TypeScript error
- [ ] `npm run build` — build sukses tanpa error
- [ ] Semua gambar baru menggunakan next/image dengan alt text
- [ ] Semua teks menggunakan i18n (tidak hardcode)
- [ ] Tidak ada `console.log` yang tertinggal di production code
- [ ] Tidak ada API key atau secret yang ter-hardcode
- [ ] Animasi menggunakan `prefers-reduced-motion` check

---

## 14. AI Assistant — Panduan untuk GPT-5.6 Luna

> Bagian ini secara khusus ditujukan untuk GPT-5.6 Luna yang bekerja pada proyek ini.
> GPT-5.6 Luna adalah model yang cepat dan efisien. Agar hasil maksimal, ikuti pola kerja di bawah ini dengan ketat.

---

### ⚠️ CARA KERJA WAJIB — Baca Sebelum Menulis Kode Apapun

**SEBELUM menulis satu baris kode pun, AI WAJIB:**
1. Nyatakan file mana yang akan dibuat/dimodifikasi
2. Nyatakan komponen/interface mana yang akan digunakan dari `schema.md`
3. Nyatakan design tokens mana (warna, font, animasi) yang akan dipakai dari `design.md`
4. Konfirmasi apakah halaman ini butuh `generateMetadata()` dan JSON-LD
5. Baru kemudian mulai menulis kode

**Jika tidak melakukan langkah di atas, output cenderung tidak konsisten.**

---

### 📌 Referensi Wajib Per Tugas

#### Saat membuat/modifikasi KOMPONEN UI:
- Warna → gunakan CSS variables dari `design.md` section 2 (Color Palette), BUKAN hardcode hex
- Font → `font-display` untuk heading, `font-body` untuk paragraf (lihat `design.md` section 3)
- Animasi → salin persis Framer Motion variants dari `design.md` section 7, jangan buat sendiri
- Spacing → gunakan Tailwind spacing dari `design.md` section 4
- Border radius → gunakan `design.md` section 5

#### Saat membuat HALAMAN BARU:
```typescript
// Template wajib untuk setiap page.tsx — SALIN DAN SESUAIKAN
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return {
    title: '[JUDUL HALAMAN] | Svarga Sanctuary Homestay Yogyakarta',
    description: '[DESKRIPSI 150-160 KARAKTER]',
    openGraph: {
      title: '[JUDUL]',
      description: '[DESKRIPSI]',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
      locale: params.locale,
      type: 'website',
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${params.locale}/[PATH]`,
      languages: {
        'id': `${process.env.NEXT_PUBLIC_SITE_URL}/id/[PATH]`,
        'en': `${process.env.NEXT_PUBLIC_SITE_URL}/en/[PATH]`,
      }
    }
  };
}
```

#### Saat membuat FORM:
- Selalu gunakan `react-hook-form` + `zodResolver`
- Selalu import Zod schema dari `src/types/` (lihat `schema.md`)
- Selalu tambah honeypot field (lihat `security.md` section 4.2)
- Selalu tampilkan error message dalam bahasa aktif (ID/EN)

#### Saat integrasi WHATSAPP:
- SELALU ambil nomor dari `process.env.NEXT_PUBLIC_WHATSAPP_NUMBER`
- SELALU encode pesan dengan `encodeURIComponent()`
- SELALU buka di tab baru: `window.open(url, '_blank', 'noopener,noreferrer')`

---

### 🎨 Design Token Quick Reference (untuk GPT-5.6 Luna)

Karena Luna cenderung lupa token dari file lain, berikut ringkasan token yang PALING SERING digunakan:

```css
/* WARNA — gunakan sebagai Tailwind arbitrary values atau CSS var */
Background gelap utama  : #1A0F00   → bg-[#1A0F00]
Gold accent (CTA)       : #C9A84C   → text-[#C9A84C] / bg-[#C9A84C]
Warm cream (bg terang)  : #F5ECD7   → bg-[#F5ECD7]
Text utama gelap        : #F5ECD7   → text-[#F5ECD7]
Text sekunder           : #A89B8A   → text-[#A89B8A]
```

```typescript
/* ANIMASI — salin persis, jangan modifikasi */
const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};
```

```typescript
/* PENGGUNAAN whileInView — salin persis */
<motion.div
  variants={fadeUpVariant}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
>
```

---

### 🔴 Larangan Khusus untuk GPT-5.6 Luna

Berdasarkan karakteristik Luna, hal berikut SANGAT SERING terjadi dan harus dihindari:

```typescript
// DILARANG — hardcode warna
className="bg-amber-500"          // SALAH
className="bg-[#C9A84C]"         // BENAR

// DILARANG — gunakan any type
const data: any = ...             // SALAH
const data: Room = ...            // BENAR

// DILARANG — gunakan img biasa
<img src="..." alt="..." />       // SALAH
<Image src="..." alt="..." width={} height={} /> // BENAR

// DILARANG — hardcode teks bahasa
<button>Pesan Sekarang</button>   // SALAH
<button>{t('nav.bookNow')}</button> // BENAR

// DILARANG — animasi inline (membuat kode tidak konsisten)
<motion.div animate={{ y: -8 }} /> // SALAH jika ada di variants
<motion.div variants={fadeUpVariant} /> // BENAR

// DILARANG — inline style untuk nilai statis
style={{ color: '#C9A84C' }}      // SALAH
className="text-[#C9A84C]"       // BENAR
```

---

### 📦 Strategi Kerja Per Sesi (PENTING untuk Luna)

Luna bekerja terbaik dalam **tugas-tugas kecil yang fokus**. Jangan minta Luna membuat seluruh halaman sekaligus — pecah menjadi:

#### Urutan yang Direkomendasikan:
```
Sesi 1: Setup project + tailwind.config.ts + globals.css + design tokens
Sesi 2: Layout — Navbar.tsx
Sesi 3: Layout — Footer.tsx
Sesi 4: UI Atoms — Button.tsx, Badge.tsx, AnimatedSection.tsx
Sesi 5: Home — HeroSection.tsx
Sesi 6: Home — WhyChooseUs.tsx + FeaturedRooms.tsx
Sesi 7: Home — Testimonials.tsx + GalleryPreview.tsx
Sesi 8: Home — LocationTeaser.tsx + LatestBlog.tsx
Sesi 9: Rooms — page.tsx + RoomCard.tsx
Sesi 10: Rooms — [slug]/page.tsx + RoomGallery.tsx
Sesi 11: Gallery — page.tsx + MasonryGrid.tsx + Lightbox.tsx
Sesi 12: Booking — page.tsx + BookingForm.tsx
Sesi 13: About — page.tsx
Sesi 14: Blog — page.tsx + BlogCard.tsx
Sesi 15: Blog — [slug]/page.tsx
Sesi 16: Contact — page.tsx
Sesi 17: i18n setup + semua translation files
Sesi 18: SEO — generateMetadata() + JSON-LD untuk semua halaman
Sesi 19: Performance audit + Lighthouse fixes
Sesi 20: Final review + pre-launch checklist
```

#### Template Prompt yang Efektif untuk Luna:
```
Konteks proyek: Svarga Sanctuary Homestay Yogyakarta
Tech stack: Next.js 15 + TypeScript + Tailwind CSS + Framer Motion
Rules: Lihat rules.md
Design tokens: Lihat design.md
Schema: Lihat schema.md

TUGAS SESI INI: [Satu tugas spesifik]

Yang harus digunakan:
- Warna: [sebutkan dari design.md]
- Komponen: [sebutkan yang dibutuhkan]
- Animasi: [fadeUpVariant / staggerContainer / dll]
- Data type: [Room / Testimonial / dll]

Output yang diharapkan:
- File: src/components/[nama]/[NamaKomponen].tsx
- Fully typed TypeScript, tidak ada any
- Responsive (mobile-first)
- Mendukung i18n ID/EN
```

---

### ✅ Checklist Per Komponen (Luna Version)

Sebelum menganggap satu komponen selesai, periksa:
- [ ] Tidak ada hardcode hex color (semua dari CSS var atau Tailwind arbitrary yang sesuai design.md)
- [ ] Tidak ada `any` type
- [ ] Semua gambar menggunakan `next/image` dengan alt text
- [ ] Semua teks menggunakan `useTranslations()` / `t()`
- [ ] Animasi menggunakan variants dari `src/lib/animations.ts`
- [ ] Ada `prefers-reduced-motion` check di animasi utama
- [ ] Responsive di mobile (375px) dan desktop (1280px)
- [ ] Accessible: alt text, aria labels, keyboard navigable
- [ ] Tidak ada `console.log` yang tertinggal

---

### 🏆 Prioritas saat ada konflik:
1. **Accessibility > Animation** — animasi bisa dimatikan, accessibility tidak
2. **Performance > Visual Complexity** — hapus animasi jika drop Lighthouse score
3. **Security > Convenience** — jangan shortcut security untuk kemudahan
4. **Type Safety > Brevity** — jangan gunakan `any` meski kode jadi lebih pendek
5. **Konsistensi > Kreativitas** — ikuti design.md, jangan improvisasi warna/font
