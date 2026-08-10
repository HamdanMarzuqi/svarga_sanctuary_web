# Database & Content Schema
# Svarga Sanctuary Homestay — Website

---

## Overview

Website Svarga Sanctuary Homestay v1.0 menggunakan **static data (TypeScript + MDX)** — tidak ada database eksternal. Semua data didefinisikan sebagai tipe TypeScript yang ketat dan diisi sebagai file statis. Skema ini menjadi kontrak data yang harus diikuti seluruh codebase.

---

## 1. Room Schema

### TypeScript Interface
```typescript
// src/types/room.ts

export type RoomType = 'standard' | 'deluxe' | 'suite';
export type BedType = 'Single' | 'Twin' | 'Queen Size' | 'King Size' | 'Super King';

export interface RoomImage {
  url: string;                    // Cloudinary URL atau path /public
  alt: string;                    // SEO alt text, deskriptif
  blurDataUrl?: string;           // Base64 blur placeholder (generated via plaiceholder)
  width: number;
  height: number;
  isPrimary?: boolean;            // Foto utama yang tampil di card
}

export interface RoomPrice {
  weekday: number;                // Harga malam Senin-Kamis (IDR)
  weekend: number;                // Harga malam Jumat-Minggu (IDR)
  peak?: number;                  // Harga hari raya/peak season (IDR)
  currency: 'IDR';
}

export interface RoomCapacity {
  adults: number;
  children: number;
  maxTotal: number;               // adults + children max
}

export interface LocalizedString {
  id: string;                     // Bahasa Indonesia
  en: string;                     // English
}

export interface Room {
  id: string;                     // Unique identifier: "room-standard-01"
  slug: string;                   // URL slug: "kamar-standard"
  type: RoomType;
  name: LocalizedString;
  shortDescription: LocalizedString;   // 1-2 kalimat untuk card
  fullDescription: LocalizedString;    // Deskripsi panjang untuk detail page
  price: RoomPrice;
  capacity: RoomCapacity;
  size: number;                   // Luas kamar dalam m²
  floor: number;                  // Lantai kamar
  bedType: BedType;
  images: RoomImage[];
  amenities: string[];            // Referensi ke AmenityKey
  highlights: LocalizedString[];  // 3-5 poin unggulan kamar
  isAvailable: boolean;
  sortOrder: number;              // Urutan tampil (1 = pertama)
}
```

### Data File Example
```typescript
// src/data/rooms.ts
import { Room } from '@/types/room';

export const rooms: Room[] = [
  {
    id: 'room-standard-01',
    slug: 'kamar-standard',
    type: 'standard',
    name: {
      id: 'Kamar Standard',
      en: 'Standard Room',
    },
    shortDescription: {
      id: 'Kamar nyaman dengan sentuhan dekorasi tradisional Jawa dan pemandangan taman.',
      en: 'Comfortable room with traditional Javanese decor and garden view.',
    },
    fullDescription: {
      id: 'Kamar Standard Svarga Sanctuary dirancang untuk memberikan kenyamanan maksimal...',
      en: 'The Standard Room at Svarga Sanctuary is designed to provide maximum comfort...',
    },
    price: {
      weekday: 350000,
      weekend: 450000,
      peak: 550000,
      currency: 'IDR',
    },
    capacity: {
      adults: 2,
      children: 1,
      maxTotal: 2,
    },
    size: 22,
    floor: 1,
    bedType: 'Queen Size',
    images: [
      {
        url: 'https://res.cloudinary.com/svarga-sanctuary/image/upload/v1/rooms/standard/main.jpg',
        alt: 'Kamar Standard Svarga Sanctuary Homestay Yogyakarta - tempat tidur queen size',
        width: 1200,
        height: 800,
        isPrimary: true,
      },
    ],
    amenities: ['ac', 'wifi', 'private-bathroom', 'hot-water', 'tv', 'wardrobe', 'desk'],
    highlights: [
      { id: 'Dekorasi autentik Jawa', en: 'Authentic Javanese décor' },
      { id: 'Kamar mandi pribadi dengan air panas', en: 'Private bathroom with hot water' },
      { id: 'WiFi gratis', en: 'Free WiFi' },
    ],
    isAvailable: true,
    sortOrder: 1,
  },
  {
    id: 'room-deluxe-01',
    slug: 'kamar-deluxe',
    type: 'deluxe',
    name: {
      id: 'Kamar Deluxe Garden View',
      en: 'Deluxe Garden View Room',
    },
    shortDescription: {
      id: 'Kamar luas dengan teras pribadi menghadap taman tropis yang asri.',
      en: 'Spacious room with private terrace overlooking a lush tropical garden.',
    },
    fullDescription: {
      id: 'Kamar Deluxe kami menawarkan ruang yang lebih luas dengan teras pribadi...',
      en: 'Our Deluxe Room offers a more spacious layout with a private terrace...',
    },
    price: {
      weekday: 650000,
      weekend: 800000,
      peak: 950000,
      currency: 'IDR',
    },
    capacity: {
      adults: 2,
      children: 1,
      maxTotal: 3,
    },
    size: 32,
    floor: 1,
    bedType: 'King Size',
    images: [],
    amenities: ['ac', 'wifi', 'private-bathroom', 'hot-water', 'tv', 'wardrobe', 'desk', 'bathtub', 'private-terrace', 'minibar'],
    highlights: [
      { id: 'Teras pribadi menghadap taman', en: 'Private terrace with garden view' },
      { id: 'Bathtub premium', en: 'Premium bathtub' },
      { id: 'Minibar tersedia', en: 'Minibar available' },
    ],
    isAvailable: true,
    sortOrder: 2,
  },
  {
    id: 'room-suite-01',
    slug: 'kamar-suite',
    type: 'suite',
    name: {
      id: 'Suite Svarga Premium',
      en: 'Svarga Premium Suite',
    },
    shortDescription: {
      id: 'Pengalaman menginap paling mewah dengan ruang tamu terpisah dan pemandangan panoramik.',
      en: 'The most luxurious stay with separate living room and panoramic views.',
    },
    fullDescription: {
      id: 'Suite Svarga Premium adalah puncak pengalaman menginap di Svarga Sanctuary...',
      en: 'The Svarga Premium Suite is the pinnacle of your stay at Svarga Sanctuary...',
    },
    price: {
      weekday: 1200000,
      weekend: 1500000,
      peak: 1800000,
      currency: 'IDR',
    },
    capacity: {
      adults: 2,
      children: 2,
      maxTotal: 4,
    },
    size: 56,
    floor: 2,
    bedType: 'Super King',
    images: [],
    amenities: ['ac', 'wifi', 'private-bathroom', 'hot-water', 'smart-tv', 'wardrobe', 'desk', 'bathtub', 'private-terrace', 'minibar', 'living-room', 'nespresso', 'daily-breakfast'],
    highlights: [
      { id: 'Ruang tamu dan kamar tidur terpisah', en: 'Separate living room and bedroom' },
      { id: 'Sarapan harian included', en: 'Daily breakfast included' },
      { id: 'Pemandangan panoramik Yogyakarta', en: 'Panoramic view of Yogyakarta' },
    ],
    isAvailable: true,
    sortOrder: 3,
  },
];

export function getRoomBySlug(slug: string): Room | undefined {
  return rooms.find((r) => r.slug === slug);
}

export function getRoomsByType(type: RoomType): Room[] {
  return rooms.filter((r) => r.type === type && r.isAvailable);
}
```

---

## 2. Amenity Schema

```typescript
// src/types/amenity.ts

export type AmenityCategory = 'comfort' | 'bathroom' | 'technology' | 'food' | 'outdoor' | 'service';

export interface Amenity {
  key: string;                    // Unique key: "ac", "wifi", "bathtub"
  label: LocalizedString;         // Label untuk tampil di UI
  icon: string;                   // Lucide React icon name: "AirVent", "Wifi"
  category: AmenityCategory;
}

// src/data/amenities.ts
export const amenities: Amenity[] = [
  { key: 'ac',              label: { id: 'AC',               en: 'Air Conditioning'   }, icon: 'AirVent',     category: 'comfort'    },
  { key: 'wifi',            label: { id: 'WiFi Gratis',      en: 'Free WiFi'          }, icon: 'Wifi',         category: 'technology' },
  { key: 'private-bathroom',label: { id: 'Kamar Mandi Pribadi', en: 'Private Bathroom' }, icon: 'Bath',        category: 'bathroom'   },
  { key: 'hot-water',       label: { id: 'Air Panas',        en: 'Hot Water'          }, icon: 'Droplets',     category: 'bathroom'   },
  { key: 'bathtub',         label: { id: 'Bathtub',          en: 'Bathtub'            }, icon: 'Bath',         category: 'bathroom'   },
  { key: 'tv',              label: { id: 'TV',               en: 'Television'         }, icon: 'Tv',           category: 'technology' },
  { key: 'smart-tv',        label: { id: 'Smart TV',         en: 'Smart TV'           }, icon: 'Tv2',          category: 'technology' },
  { key: 'wardrobe',        label: { id: 'Lemari Pakaian',   en: 'Wardrobe'           }, icon: 'AlignJustify', category: 'comfort'    },
  { key: 'desk',            label: { id: 'Meja Kerja',       en: 'Work Desk'          }, icon: 'Monitor',      category: 'comfort'    },
  { key: 'private-terrace', label: { id: 'Teras Pribadi',    en: 'Private Terrace'    }, icon: 'Trees',        category: 'outdoor'    },
  { key: 'minibar',         label: { id: 'Minibar',          en: 'Minibar'            }, icon: 'Wine',         category: 'food'       },
  { key: 'nespresso',       label: { id: 'Mesin Kopi',       en: 'Nespresso Machine'  }, icon: 'Coffee',       category: 'food'       },
  { key: 'daily-breakfast', label: { id: 'Sarapan Harian',   en: 'Daily Breakfast'    }, icon: 'UtensilsCrossed', category: 'food'   },
  { key: 'living-room',     label: { id: 'Ruang Tamu',       en: 'Living Room'        }, icon: 'Sofa',         category: 'comfort'    },
];
```

---

## 3. Testimonial Schema

```typescript
// src/types/testimonial.ts

export interface Testimonial {
  id: string;
  guestName: string;
  origin: string;                  // "Jakarta, Indonesia" | "Sydney, Australia"
  rating: 1 | 2 | 3 | 4 | 5;
  quote: LocalizedString;
  roomType?: RoomType;
  stayMonth: string;               // "Februari 2026"
  avatarUrl?: string;
  initials: string;                // "AR" untuk "Andi Raharjo"
  isHighlighted?: boolean;         // Tampil di homepage
}

// src/data/testimonials.ts (contoh data)
export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-01',
    guestName: 'Reza & Dina',
    origin: 'Jakarta, Indonesia',
    rating: 5,
    quote: {
      id: 'Pengalaman honeymoon yang tidak akan terlupakan. Suasana tenang, kamar sangat bersih, dan staff sangat ramah. Kami pasti akan kembali!',
      en: 'An unforgettable honeymoon experience. Peaceful atmosphere, very clean rooms, and incredibly friendly staff. We will definitely return!',
    },
    roomType: 'suite',
    stayMonth: 'Maret 2026',
    initials: 'RD',
    isHighlighted: true,
  },
  {
    id: 'testimonial-02',
    guestName: 'Sarah M.',
    origin: 'Melbourne, Australia',
    rating: 5,
    quote: {
      id: 'Tempat yang luar biasa! Lokasi sempurna, sarapannya enak sekali, dan suasana Jawa yang autentik membuat kami merasa seperti di rumah sendiri.',
      en: 'An amazing place! Perfect location, delicious breakfast, and the authentic Javanese atmosphere made us feel right at home.',
    },
    roomType: 'deluxe',
    stayMonth: 'April 2026',
    initials: 'SM',
    isHighlighted: true,
  },
];
```

---

## 4. Blog Post Schema (MDX Frontmatter)

```typescript
// src/types/blog.ts

export type BlogCategory = 'wisata' | 'tips' | 'budaya' | 'kuliner';

export interface BlogPost {
  slug: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  coverImage: string;
  coverImageAlt: string;
  publishedAt: string;             // ISO 8601: "2026-01-15"
  updatedAt?: string;
  author: string;
  authorAvatar?: string;
  category: BlogCategory;
  tags: string[];
  readingTime: number;             // dalam menit
  isFeatured?: boolean;
}
```

### MDX File Format
```mdx
---
slug: "panduan-wisata-malioboro"
title:
  id: "Panduan Lengkap Wisata di Malioboro: Tips dari Lokal"
  en: "Complete Guide to Malioboro: Tips from a Local"
excerpt:
  id: "Temukan tips terbaik untuk menikmati Malioboro seperti orang lokal — dari waktu terbaik berkunjung hingga kuliner tersembunyi."
  en: "Discover the best tips to enjoy Malioboro like a local — from best visiting times to hidden culinary gems."
coverImage: "https://res.cloudinary.com/svarga-sanctuary/image/upload/v1/blog/malioboro-cover.jpg"
coverImageAlt: "Suasana sore hari di Jalan Malioboro Yogyakarta yang ramai"
publishedAt: "2026-03-10"
author: "Tim Svarga Sanctuary"
category: "wisata"
tags: ["malioboro", "yogyakarta", "belanja", "wisata"]
readingTime: 7
isFeatured: true
---

Konten artikel dalam Markdown...
```

---

## 5. Booking Form Schema (Zod Validation)

```typescript
// src/types/booking.ts
import { z } from 'zod';

export const bookingSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Nama minimal 2 karakter' })
    .max(100),

  whatsappNumber: z
    .string()
    .regex(/^(\+62|62|0)8[1-9][0-9]{7,10}$/, {
      message: 'Format nomor WhatsApp tidak valid (contoh: 08123456789)',
    }),

  email: z
    .string()
    .email({ message: 'Format email tidak valid' })
    .optional()
    .or(z.literal('')),

  roomType: z.enum(['standard', 'deluxe', 'suite'], {
    required_error: 'Pilih tipe kamar',
  }),

  checkIn: z
    .date({ required_error: 'Pilih tanggal check-in' })
    .min(new Date(), { message: 'Check-in tidak boleh di masa lalu' }),

  checkOut: z
    .date({ required_error: 'Pilih tanggal check-out' }),

  adults: z
    .number()
    .min(1, { message: 'Minimal 1 tamu dewasa' })
    .max(4),

  children: z
    .number()
    .min(0)
    .max(4),

  specialRequests: z
    .string()
    .max(500)
    .optional(),

}).refine((data) => data.checkOut > data.checkIn, {
  message: 'Check-out harus setelah check-in',
  path: ['checkOut'],
});

export type BookingFormData = z.infer<typeof bookingSchema>;
```

---

## 6. Contact Form Schema

```typescript
// src/types/contact.ts
import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(5).max(200),
  message: z.string().min(20).max(2000),
});

export type ContactFormData = z.infer<typeof contactSchema>;
```

---

## 7. Translation Schema (i18n)

```typescript
// src/i18n/messages/id.json (struktur)
{
  "nav": {
    "home": "Beranda",
    "rooms": "Kamar",
    "gallery": "Galeri",
    "blog": "Blog",
    "about": "Tentang Kami",
    "contact": "Kontak",
    "bookNow": "Pesan Sekarang"
  },
  "hero": {
    "tagline": "Yogyakarta, Indonesia",
    "headline": "Tempat Pelarian Sempurna di Jantung Yogyakarta",
    "subline": "Rasakan ketenangan sejati di antara alam dan budaya Jawa yang kaya",
    "ctaExplore": "Jelajahi Kamar",
    "ctaBook": "Pesan via WhatsApp"
  },
  "rooms": {
    "title": "Pilih Kamar Anda",
    "subtitle": "Setiap kamar dirancang untuk memberikan pengalaman menginap yang tak terlupakan",
    "filterAll": "Semua",
    "perNight": "/malam",
    "viewDetail": "Lihat Detail",
    "bookNow": "Pesan Sekarang",
    "amenities": "Fasilitas",
    "capacity": "Kapasitas",
    "size": "Luas Kamar"
  },
  "booking": {
    "title": "Pesan Kamar Anda",
    "subtitle": "Isi formulir berikut dan kami akan segera menghubungi Anda",
    "fullName": "Nama Lengkap",
    "whatsapp": "Nomor WhatsApp",
    "email": "Email (Opsional)",
    "roomType": "Tipe Kamar",
    "checkIn": "Check-in",
    "checkOut": "Check-out",
    "adults": "Tamu Dewasa",
    "children": "Anak-anak",
    "specialRequests": "Permintaan Khusus",
    "submit": "Konfirmasi & Kirim via WhatsApp",
    "disclaimer": "Tim kami akan membalas dalam 1x24 jam"
  },
  "gallery": {
    "title": "Galeri",
    "subtitle": "Lihat keindahan Svarga Sanctuary",
    "filterAll": "Semua",
    "filterRooms": "Kamar",
    "filterCommon": "Area Umum",
    "filterFood": "Kuliner",
    "filterAround": "Sekitar Homestay"
  },
  "footer": {
    "tagline": "Surga kecil di tengah Yogyakarta",
    "copyright": "© 2026 Svarga Sanctuary Homestay. Semua hak dilindungi.",
    "address": "Alamat: [Alamat Lengkap Homestay], Yogyakarta, Indonesia"
  }
}
```

---

## 8. Environment Variables Schema

```typescript
// src/types/env.d.ts (untuk type-safety env vars)
declare namespace NodeJS {
  interface ProcessEnv {
    // Public (exposed to browser)
    NEXT_PUBLIC_WHATSAPP_NUMBER: string;
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: string;
    NEXT_PUBLIC_GA_MEASUREMENT_ID: string;
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: string;
    NEXT_PUBLIC_SITE_URL: string;

    // Server-only (not exposed)
    RESEND_API_KEY: string;
    CONTACT_EMAIL: string;
  }
}
```

### .env.example
```bash
# Public Variables
NEXT_PUBLIC_WHATSAPP_NUMBER=628xxxxxxxxxx
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=svarga-sanctuary
NEXT_PUBLIC_SITE_URL=https://svargaranctuary.com

# Server-Only Variables
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL=info@svargaranctuary.com
```

---

## 9. Image Asset Schema (Cloudinary)

### Folder Structure di Cloudinary
```
svarga-sanctuary/
├── hero/
│   ├── hero-1.jpg          # Full-screen hero
│   ├── hero-2.jpg
│   └── hero-3.jpg
├── rooms/
│   ├── standard/
│   │   ├── main.jpg        # Foto utama (untuk card)
│   │   ├── bathroom.jpg
│   │   ├── detail-1.jpg
│   │   ├── detail-2.jpg
│   │   └── detail-3.jpg
│   ├── deluxe/
│   └── suite/
├── gallery/
│   ├── rooms/
│   ├── common-area/
│   ├── food/
│   └── surroundings/
├── blog/
│   └── [slug]/
└── team/
```

### Cloudinary URL Convention
```
Base URL: https://res.cloudinary.com/{cloud_name}/image/upload/
Transform: /q_auto,f_auto,w_{width}/   (auto quality, auto format, set width)
Full URL: https://res.cloudinary.com/svarga-sanctuary/image/upload/q_auto,f_auto,w_1200/rooms/standard/main.jpg
```
