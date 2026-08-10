# Design System & UI/UX Specification
# Svarga Sanctuary Homestay — Website

---

## 1. Design Philosophy

**Estetika Utama:** *"Tropical Luxury Minimalism"*

Svarga Sanctuary harus terasa seperti menginap di resort butik premium — suasana Jawa yang autentik, dibalut desain modern yang bersih dan elegan. Tidak terlalu ramai, tidak terlalu kosong. Setiap elemen punya tujuan.

### Kata Kunci Desain
- **Warm** — Hangat, bersahabat, seperti disambut di rumah sendiri
- **Lush** — Rasa alam tropis yang subur dan hijau
- **Serene** — Tenang, mewah tanpa berlebihan
- **Cultural** — Sentuhan budaya Jawa yang halus dan bermartabat
- **Modern** — Bersih, typografi kuat, layout berani

---

## 2. Color Palette

### Primary Colors
```css
--color-primary-900: #1A0F00;   /* Deep Ebony — background gelap utama */
--color-primary-800: #2C1A00;   /* Dark Mahogany */
--color-primary-700: #3D2600;   /* Warm Espresso */
--color-primary-600: #4F3300;   /* Rich Brown */
```

### Accent Colors
```css
--color-accent-gold:    #C9A84C; /* Antique Gold — CTA utama, highlight */
--color-accent-gold-lt: #E8C878; /* Light Gold — hover state */
--color-accent-sage:    #7A9E7E; /* Sage Green — nuansa alam tropis */
--color-accent-cream:   #F5ECD7; /* Warm Cream — background section terang */
```

### Neutral Colors
```css
--color-neutral-50:  #FAFAF8;   /* Off-white — background terang */
--color-neutral-100: #F5F0E8;   /* Warm White */
--color-neutral-200: #E8E0D0;   /* Light Warm Gray */
--color-neutral-400: #A89B8A;   /* Warm Mid Gray */
--color-neutral-600: #6B5D4F;   /* Warm Dark Gray */
--color-neutral-800: #2E2520;   /* Near Black Warm */
--color-neutral-900: #1A1410;   /* True Dark */
```

### Semantic Colors
```css
--color-success: #4A7C59;   /* Forest Green */
--color-warning: #C9A84C;   /* Gold (sama dengan accent) */
--color-error:   #8B2C2C;   /* Deep Red */
--color-info:    #3A6B8A;   /* Deep Teal */
```

### Gradient Presets
```css
--gradient-hero:       linear-gradient(180deg, rgba(26,15,0,0) 0%, rgba(26,15,0,0.7) 60%, rgba(26,15,0,0.95) 100%);
--gradient-gold:       linear-gradient(135deg, #C9A84C 0%, #E8C878 50%, #C9A84C 100%);
--gradient-warm-dark:  linear-gradient(135deg, #1A0F00 0%, #2C1A00 100%);
--gradient-card-hover: linear-gradient(180deg, transparent 50%, rgba(26,15,0,0.85) 100%);
```

---

## 3. Typography

### Font Families
```css
/* Heading / Display — Elegan, berkelas */
--font-display: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;

/* Body — Bersih, mudah dibaca */
--font-body: 'DM Sans', 'Inter', system-ui, sans-serif;

/* Accent / Label — Modern, technical */
--font-mono: 'DM Mono', 'Fira Code', monospace;
```

### Font Scale
```css
--text-xs:   0.75rem;   /* 12px — label kecil, caption */
--text-sm:   0.875rem;  /* 14px — body kecil, helper text */
--text-base: 1rem;      /* 16px — body utama */
--text-lg:   1.125rem;  /* 18px — body besar */
--text-xl:   1.25rem;   /* 20px — sub-heading */
--text-2xl:  1.5rem;    /* 24px — section heading kecil */
--text-3xl:  1.875rem;  /* 30px — section heading */
--text-4xl:  2.25rem;   /* 36px — page title */
--text-5xl:  3rem;      /* 48px — hero subtitle */
--text-6xl:  3.75rem;   /* 60px — hero title desktop */
--text-7xl:  4.5rem;    /* 72px — hero title large */
--text-8xl:  6rem;      /* 96px — display / statement */
```

### Font Weight
```css
--font-light:    300;
--font-regular:  400;
--font-medium:   500;
--font-semibold: 600;
--font-bold:     700;
--font-black:    900;
```

### Line Height
```css
--leading-tight:   1.1;  /* Display text */
--leading-snug:    1.2;  /* Heading */
--leading-normal:  1.5;  /* Body */
--leading-relaxed: 1.7;  /* Long-form reading */
--leading-loose:   2.0;  /* Blog article */
```

### Typography Usage
- **Display / Hero:** Cormorant Garamond, 6xl–8xl, font-light, letter-spacing -0.02em
- **Section Heading H2:** Cormorant Garamond, 4xl–5xl, font-regular
- **Sub-heading H3:** DM Sans, 2xl, font-semibold
- **Body text:** DM Sans, base–lg, font-regular, leading-relaxed
- **Label / Tag / Button:** DM Sans, sm–base, font-medium, letter-spacing 0.05em uppercase
- **Price:** Cormorant Garamond, 3xl, font-semibold, color: accent-gold

---

## 4. Spacing System

```css
--space-1:  4px;
--space-2:  8px;
--space-3:  12px;
--space-4:  16px;
--space-5:  20px;
--space-6:  24px;
--space-8:  32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
--space-32: 128px;
--space-40: 160px;
--space-48: 192px;
```

### Section Padding
- **Mobile:** padding-y: 64px (space-16)
- **Tablet:** padding-y: 96px (space-24)
- **Desktop:** padding-y: 128px (space-32)

---

## 5. Border Radius

```css
--radius-none:  0px;
--radius-sm:    4px;
--radius-md:    8px;
--radius-lg:    12px;
--radius-xl:    16px;
--radius-2xl:   24px;
--radius-3xl:   32px;
--radius-full:  9999px; /* Pill shape */
```

---

## 6. Shadow System

```css
--shadow-sm:  0 1px 3px rgba(26,15,0,0.12), 0 1px 2px rgba(26,15,0,0.08);
--shadow-md:  0 4px 16px rgba(26,15,0,0.15), 0 2px 8px rgba(26,15,0,0.10);
--shadow-lg:  0 8px 32px rgba(26,15,0,0.18), 0 4px 16px rgba(26,15,0,0.12);
--shadow-xl:  0 16px 64px rgba(26,15,0,0.22), 0 8px 32px rgba(26,15,0,0.15);
--shadow-gold: 0 4px 24px rgba(201,168,76,0.35);
--shadow-inner: inset 0 2px 8px rgba(26,15,0,0.12);
```

---

## 7. Animation & Motion

### Core Principles
- **Purposeful:** Animasi harus memiliki fungsi — memandu perhatian, memberikan feedback, membuat transisi terasa natural
- **Smooth:** Gunakan easing curves yang terasa organik, bukan mekanik
- **Performance-first:** Hanya animate properties yang GPU-accelerated: `transform`, `opacity`
- **Respek preferensi pengguna:** Implementasi `prefers-reduced-motion` media query

### Easing Functions
```css
--ease-out-expo:   cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1);
--ease-spring:     cubic-bezier(0.34, 1.56, 0.64, 1); /* Slight overshoot */
--ease-smooth:     cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

### Duration Tokens
```css
--duration-instant:  100ms;  /* Feedback segera (active states) */
--duration-fast:     200ms;  /* Hover transitions */
--duration-normal:   350ms;  /* Kebanyakan animasi */
--duration-slow:     500ms;  /* Modal, overlay */
--duration-slower:   700ms;  /* Page transitions, hero */
--duration-slowest: 1000ms;  /* Dramatic reveals */
```

### Framer Motion Variants (Template)

#### Fade Up (scroll reveal)
```typescript
const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  }
};
```

#### Stagger Container
```typescript
const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};
```

#### Scale In (card entrance)
```typescript
const scaleInVariant = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
};
```

#### Slide From Left
```typescript
const slideLeftVariant = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};
```

### Scroll-Triggered Animations (via useInView)
- Semua section menggunakan `whileInView` + `viewport={{ once: true, margin: "-100px" }}`
- Heading section: fade + slide up
- Card grid: stagger entrance (0.12s antar card)
- Gambar: scale in + fade
- Nomor statistik: counter animation saat masuk viewport

### Hover Effects
```css
/* Card hover */
.card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  transition: all var(--duration-normal) var(--ease-out-expo);
}

/* Image zoom on hover */
.card-image:hover img {
  transform: scale(1.08);
  transition: transform var(--duration-slow) var(--ease-smooth);
}

/* Button hover */
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-gold);
}
```

### Page Transitions
- Menggunakan Framer Motion `AnimatePresence`
- Transition antar halaman: fade-out 200ms → route change → fade-in 400ms
- Atau: slide dari kanan (untuk navigasi forward) / slide dari kiri (back)

---

## 8. Component Design Specifications

### 8.1 Button

#### Primary Button (CTA Utama)
```
Background: gradient-gold
Text: primary-900 (gelap), font-medium, uppercase, letter-spacing 0.08em
Padding: 16px 32px (desktop), 14px 24px (mobile)
Border-radius: radius-full (pill)
Shadow: shadow-gold
Hover: translateY(-2px) + shadow lebih kuat
Active: translateY(0px) + scale(0.98)
```

#### Secondary Button (Outline)
```
Background: transparent
Border: 1.5px solid accent-gold
Text: accent-gold, font-medium
Padding: 14px 30px
Border-radius: radius-full
Hover: background: accent-gold (10% opacity)
```

#### WhatsApp Button
```
Background: #25D366 (WhatsApp green)
Icon: WhatsApp icon putih di kiri
Text: putih, font-semibold
Padding: 16px 32px
Border-radius: radius-full
Hover: background lebih terang + shadow hijau
```

### 8.2 Room Card
```
Container: rounded-2xl, overflow-hidden, shadow-md
Image: aspect-ratio 4/3, object-cover, hover zoom effect
Content area: padding 24px
  - Tag kategori: small, uppercase, accent-gold
  - Nama kamar: text-2xl, font-display
  - Fasilitas: icon + text, text-sm, neutral-600
  - Harga: text-3xl, font-display, accent-gold + "/malam"
  - CTA buttons: flex row, gap-12px
Background: neutral-50 (terang) atau primary-800 (gelap — dark card variant)
```

### 8.3 Navbar
```
Position: fixed, top-0, full width, z-50
Default state: background transparent, text putih
Scrolled state: background blur(20px) + rgba(26,15,0,0.85) + border-bottom accent-gold 1px
Height: 72px (desktop), 64px (mobile)
Logo: kiri — font-display, text-xl, color putih/gold
Nav links: center — font-body, text-sm, uppercase, letter-spacing 0.1em
Language toggle: kanan area kiri — "ID | EN" pill toggle
Book Now button: kanan — primary button kecil
```

### 8.4 Gallery Masonry Grid
```
Layout: CSS columns atau Masonry JS library
Columns: 1 (mobile) → 2 (tablet) → 3 (desktop) → 4 (desktop-xl)
Gap: 12px
Item: rounded-xl, overflow-hidden
Hover: overlay gradient + icon expand + scale(1.02)
Transition: 300ms ease
```

### 8.5 Testimonial Card
```
Background: primary-800
Border: 1px solid rgba(201,168,76,0.2)
Padding: 32px
Border-radius: radius-2xl
Kutipan marks: font-display, text-8xl, color accent-gold, opacity 0.3
Rating stars: accent-gold
Avatar: circular, 48px
Nama: font-semibold, neutral-50
Asal: text-sm, neutral-400
```

### 8.6 Hero Section
```
Height: 100vh (minimum 600px)
Video/Image: object-cover, position: absolute, inset: 0
Overlay: gradient-hero
Content: absolute, bottom: 15%, left: 0, right: 0, padding horizontal 80px (desktop)
Tag line: text-sm uppercase, letter-spacing 0.15em, accent-gold, margin-bottom 16px
Headline: font-display, text-6xl–8xl (responsive), color neutral-50, leading-tight
Subline: font-body, text-xl, neutral-200, margin-top 16px, max-width 560px
CTA row: margin-top 40px, flex gap 16px
Scroll indicator: absolute bottom 32px center, animate bounce
```

---

## 9. Iconography

- **Library:** Lucide React (clean, consistent, tree-shakeable)
- **Size defaults:** 16px (small), 20px (medium), 24px (large), 32px (feature icons)
- **Stroke width:** 1.5px (default), 1px (large/hero icons)
- **Fasilitas kamar:** AC, Wifi, Bath, Bed, Coffee, Tv, Users, MapPin
- **UI actions:** ChevronRight, ArrowRight, X, Menu, Search, Globe, Phone, Mail

---

## 10. Layout & Grid

### Container
```css
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px; /* mobile */
}

@media (min-width: 768px) {
  .container { padding: 0 40px; }
}

@media (min-width: 1280px) {
  .container { padding: 0 80px; }
}
```

### Breakpoints (Tailwind CSS)
```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

### Grid System
- Rooms grid: 1 col (mobile) → 2 col (tablet) → 3 col (desktop)
- Gallery masonry: 1 → 2 → 3 → 4 col
- Blog grid: 1 → 2 → 3 col
- Footer: 1 → 2 → 4 col

---

## 11. Dark / Light Mode

Website ini menggunakan **dark mode sebagai default** (sesuai estetika homestay premium dengan warna gelap hangat). Light mode tersedia sebagai opsional.

```css
/* Dark mode (default) */
:root {
  --bg-primary:   #1A0F00;
  --bg-secondary: #2C1A00;
  --text-primary: #F5ECD7;
  --text-secondary: #A89B8A;
}

/* Light mode */
[data-theme="light"] {
  --bg-primary:   #FAFAF8;
  --bg-secondary: #F5F0E8;
  --text-primary: #1A1410;
  --text-secondary: #6B5D4F;
}
```

---

## 12. Loading States & Skeleton

- Skeleton loader untuk semua gambar (animated pulse, warm gray)
- Spinner untuk form submission (gold color, 24px)
- Lazy loading: `loading="lazy"` + Next.js Image component
- Blur placeholder: base64 blur hash untuk gambar utama

---

## 13. Responsive Design Rules

- **Mobile First:** Semua komponen dirancang mobile-first
- **Touch targets:** Minimum 44x44px untuk semua elemen interaktif di mobile
- **Text size:** Tidak ada teks di bawah 14px
- **Image:** Gunakan Next.js Image dengan sizes attribute yang tepat
- **Carousel/Swiper di mobile:** Touch-friendly, snap-to-center, momentum scroll

---

## 14. Cultural Design Elements (Jawa/Yogyakarta)

Sentuhan budaya yang halus dan premium, tidak berlebihan:

- **Motif Batik:** Digunakan sebagai texture/pattern halus di background section tertentu (opacity sangat rendah, 5-10%)
- **Wayang silhouette:** Sebagai decorative element di About page atau section budaya
- **Warna Kraton:** Deep gold (#C9A84C), Hijau Jade, Merah Maroon — sudah terintegrasi di palette
- **Aksara Jawa:** Gunakan satu atau dua kata sebagai decorative type element di hero atau about (bukan untuk dibaca, tapi estetika)
- **Foto kontekstual:** Selalu sertakan elemen alam Yogyakarta — Merapi, sawah, pohon pisang, arsitektur Jawa

---

## 15. Referensi Inspirasi Desain

### Website dengan Estetika Serupa
- **Amanjiwo Resort** (amanjiwo.com) — kemewahan Jawa, konten gelap, foto-foto dramatis
- **Capella Ubud** (capellahotels.com/ubud) — luxury eco, foto autentik, animasi scroll premium
- **The Datai Langkawi** — tropical luxury, typography kuat

### Style References
- Warna: Warm dark tones seperti Aesop cosmetics
- Typography: Serif display + sans body seperti editorial fashion magazine
- Layout: Asymmetric sections, full-bleed imagery, generous whitespace

---

## 16. Deliverables Checklist

- [ ] Design tokens di Tailwind config
- [ ] Global CSS custom properties
- [ ] Shared Framer Motion variants file
- [ ] Reusable component library
- [ ] Responsive di semua breakpoint
- [ ] Dark mode default, light mode opsional
- [ ] Lighthouse score > 85 mobile
- [ ] Web Vitals: LCP < 2.5s, CLS < 0.1, FID < 100ms
