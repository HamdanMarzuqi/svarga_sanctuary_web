# Security Documentation
# Svarga Sanctuary Homestay — Website

---

## 1. Security Overview

Website Svarga Sanctuary Homestay adalah aplikasi **static-first, read-heavy** dengan minimal surface attack. Tidak ada sistem autentikasi, tidak ada database eksternal, tidak ada payment gateway di v1.0. Meski demikian, praktik keamanan tetap diterapkan secara menyeluruh.

### Threat Model
| Ancaman | Likelihood | Impact | Mitigasi |
|---|---|---|---|
| XSS (Cross-Site Scripting) | Medium | High | CSP headers, React built-in escaping |
| Form spam / bot submission | High | Medium | Rate limiting, honeypot field |
| Exposed API keys | High | High | Env vars, server-only secrets |
| Content injection | Low | Medium | Input sanitization via Zod |
| DDoS | Low | High | Vercel Edge Network + rate limiting |
| Phishing (domain spoofing) | Low | Medium | HSTS, proper HTTPS |
| Clickjacking | Low | Medium | X-Frame-Options header |

---

## 2. HTTP Security Headers

Semua security headers dikonfigurasi di `next.config.ts` via `headers()` function:

```typescript
// next.config.ts
const securityHeaders = [
  // Cegah clickjacking
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  // Cegah MIME type sniffing
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // Referrer policy
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // Permissions Policy (batasi akses ke browser APIs)
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()',
  },
  // HSTS — force HTTPS
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // Content Security Policy
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https://res.cloudinary.com https://maps.googleapis.com",
      "frame-src https://www.google.com/maps/",
      "connect-src 'self' https://www.google-analytics.com https://vitals.vercel-insights.com",
    ].join('; '),
  },
];

const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};
```

---

## 3. Environment Variables Security

### Klasifikasi Variabel
```
NEXT_PUBLIC_*   → Aman untuk browser, tidak boleh simpan secret
Non-NEXT_PUBLIC → Server-only, TIDAK pernah terekspos ke browser
```

### Rules
- **WAJIB:** Semua API keys dan secrets harus di `.env.local` (tidak di-commit ke Git)
- **WAJIB:** `.env.local` tercantum di `.gitignore`
- **WAJIB:** Selalu sediakan `.env.example` tanpa nilai real sebagai template
- **DILARANG:** Hardcode API keys, nomor WA, atau data sensitif di dalam kode
- **DILARANG:** Log nilai dari environment variables ke console di production

### Sensitive Variables yang TIDAK boleh di-NEXT_PUBLIC
```bash
# Server-only — jangan pernah prefix dengan NEXT_PUBLIC_
RESEND_API_KEY=re_xxx           # Email service API key
CONTACT_EMAIL=info@domain.com   # Internal email
```

### Non-Sensitive yang boleh NEXT_PUBLIC
```bash
# Ini OK untuk di-expose ke browser
NEXT_PUBLIC_WHATSAPP_NUMBER=628xxx   # Nomor WA sudah publik
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXX # GA ID bukan rahasia
NEXT_PUBLIC_SITE_URL=https://...    # URL publik
```

---

## 4. Form Security

### 4.1 Input Validation & Sanitization
- **Wajib:** Semua form input divalidasi menggunakan **Zod schema** sebelum diproses
- **Wajib:** Validasi dilakukan di **client-side** (UX) DAN **server-side** (API route)
- **Dilarang:** Trust input mentah dari user tanpa validasi

```typescript
// Contoh validasi di API route
// src/app/api/contact/route.ts
import { contactSchema } from '@/types/contact';

export async function POST(request: Request) {
  const body = await request.json();

  // Validasi dengan Zod
  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return Response.json(
      { error: 'Invalid input', details: result.error.flatten() },
      { status: 400 }
    );
  }

  // Proses data yang sudah divalidasi
  const { name, email, subject, message } = result.data;
  // ...
}
```

### 4.2 Anti-Spam (Honeypot Field)
Tambahkan field tersembunyi yang manusia tidak akan isi, tapi bot akan mengisi:

```typescript
// Di BookingForm.tsx
// Field hidden dari user tapi visible ke bot
<input
  type="text"
  name="honeypot"
  aria-hidden="true"
  tabIndex={-1}
  style={{ display: 'none' }}
  {...register('honeypot')}
/>

// Di validasi / API:
if (data.honeypot) {
  // Bot detected — silent ignore
  return Response.json({ success: true }); // Fake success agar bot tidak retry
}
```

### 4.3 Rate Limiting (API Contact Form)
```typescript
// src/app/api/contact/route.ts
// Gunakan Vercel KV atau simple in-memory store untuk rate limiting
// Batas: max 5 request per IP per 10 menit

import { Ratelimit } from '@upstash/ratelimit';

const ratelimit = new Ratelimit({
  limiter: Ratelimit.fixedWindow(5, '10 m'),
});

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'anonymous';
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return Response.json(
      { error: 'Terlalu banyak permintaan. Coba lagi dalam beberapa menit.' },
      { status: 429 }
    );
  }
  // ...lanjut proses
}
```

### 4.4 CSRF Protection
Next.js App Router dengan Server Actions secara default terlindungi dari CSRF. Untuk API routes:
- Gunakan `SameSite=Lax` untuk cookies
- Verifikasi `Origin` header untuk API yang sensitif

---

## 5. Dependency Security

### Aturan
- **Audit rutin:** Jalankan `npm audit` setiap push ke main branch via CI
- **Update berkala:** Gunakan `npm outdated` dan update dependencies minor setiap bulan
- **Trusted sources:** Hanya install packages dari npm registry resmi
- **Minimalism:** Hanya install dependency yang benar-benar diperlukan

### GitHub Actions — Security Check
```yaml
# .github/workflows/security.yml
name: Security Audit
on:
  push:
    branches: [main]
  schedule:
    - cron: '0 9 * * 1'  # Setiap Senin jam 9 pagi

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm audit --audit-level=high
```

---

## 6. Media & Upload Security

Website v1.0 tidak memiliki fitur upload dari user. Semua gambar di-host di Cloudinary dan di-serve melalui CDN Cloudinary. Tidak ada user-generated content.

### Cloudinary Security Rules
- Cloudinary upload hanya via server-side (server-to-Cloudinary), tidak langsung dari browser
- Gunakan **signed uploads** jika ada future upload feature
- Folder diorganisir dengan ketat (lihat schema.md)
- Aktifkan **restricted access** untuk folder sensitif (jika ada)

---

## 7. Privacy & Compliance

### Data yang Dikumpulkan
| Data | Dikumpulkan? | Disimpan? | Tujuan |
|---|---|---|---|
| Nama + No. WA dari booking form | Ya | Tidak (langsung dikirim ke WA) | Booking |
| Email dari contact form | Ya | Tidak (langsung dikirim via Resend) | Kontak |
| IP Address | Ya (sementara, oleh Vercel) | Tidak (log Vercel, bukan kita) | Security/rate limiting |
| Analytics (GA4) | Ya | Di Google (anonymized) | Analisis traffic |
| Cookies | Minimal (GA4 analytics) | Di browser user | Analytics |

### GDPR / UU PDP (Indonesia) Considerations
- Tampilkan **cookie consent banner** untuk pengguna dari EU/EEA
- Sediakan link **Privacy Policy** di footer
- GA4 dikonfigurasi dengan IP anonymization aktif
- Tidak ada penjualan data ke pihak ketiga

### Google Analytics 4 — Privacy Configuration
```typescript
// src/lib/analytics.ts
// Anonymize IP address
gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
  anonymize_ip: true,
  cookie_flags: 'SameSite=None;Secure',
});
```

---

## 8. HTTPS & SSL/TLS

- **Vercel:** Otomatis menyediakan SSL certificate via Let's Encrypt untuk semua custom domains
- **HSTS header:** Dikonfigurasi (lihat bagian 2)
- **Mixed content:** Pastikan semua resource (gambar, script, font) dimuat via HTTPS
- **Redirect:** Vercel otomatis redirect HTTP → HTTPS

---

## 9. Monitoring & Incident Response

### Error Monitoring
- Gunakan **Vercel Error Monitoring** (built-in) untuk menangkap runtime errors
- Pertimbangkan integrasi **Sentry** untuk error tracking lebih detail di v2.0

### Uptime Monitoring
- Daftarkan site ke **UptimeRobot** (free) untuk monitoring setiap 5 menit
- Alert via email jika site down

### Incident Response Plan
1. **Deteksi:** Alert otomatis dari UptimeRobot atau Vercel
2. **Triage:** Cek Vercel dashboard dan error logs
3. **Isolasi:** Jika ada compromise, segera rotasi semua API keys
4. **Komunikasi:** Update status ke pemilik homestay
5. **Recovery:** Deploy hotfix atau rollback ke versi sebelumnya via Vercel
6. **Post-mortem:** Dokumentasikan penyebab dan langkah pencegahan

---

## 10. Code Security Best Practices

### Prinsip yang Harus Diikuti Developer
```typescript
// BENAR — Gunakan env var
const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

// SALAH — Jangan hardcode
const waNumber = '628123456789'; // DILARANG

// BENAR — Validate & sanitize input
const validated = bookingSchema.parse(formData);

// SALAH — Trust raw input
const message = `Booking dari: ${req.body.name}`; // DILARANG tanpa validasi

// BENAR — Gunakan Next.js Image untuk gambar external
import Image from 'next/image';
<Image src={room.image.url} alt={room.image.alt} width={800} height={600} />

// SALAH — Jangan gunakan img tag dengan src dari user input
<img src={userInput} /> // DILARANG — potensial XSS

// BENAR — Encode URL sebelum kirim ke WhatsApp
const encoded = encodeURIComponent(message);
window.open(`https://wa.me/${number}?text=${encoded}`);

// SALAH — Jangan inject raw string ke URL
window.open(`https://wa.me/${number}?text=${message}`); // DILARANG
```

### Daftar Larangan (Never Do)
- **JANGAN** commit `.env.local` atau file yang berisi secrets ke Git
- **JANGAN** log data pribadi pengguna (nama, nomor WA, email) ke console production
- **JANGAN** gunakan `dangerouslySetInnerHTML` dengan data dari user
- **JANGAN** disable `eslint-plugin-security` rules
- **JANGAN** install packages tanpa memeriksa keamanannya terlebih dahulu
- **JANGAN** expose internal error messages ke response API (gunakan generic message)

---

## 11. Security Checklist (Pre-Launch)

- [ ] Semua security headers terkonfigurasi di next.config.ts
- [ ] .env.local tidak ter-commit (ada di .gitignore)
- [ ] .env.example tersedia tanpa nilai nyata
- [ ] npm audit tidak ada vulnerability high/critical
- [ ] Form booking memiliki honeypot field
- [ ] API route /api/contact memiliki rate limiting
- [ ] Input validasi via Zod di semua form
- [ ] Google Analytics 4 IP anonymization aktif
- [ ] Cookie consent banner aktif (untuk compliance EU)
- [ ] Privacy Policy halaman tersedia dan terhubung di footer
- [ ] HTTPS redirect aktif di Vercel
- [ ] HSTS header aktif
- [ ] Semua gambar dimuat via HTTPS
- [ ] CSP header tidak ada unsafe-eval
- [ ] UptimeRobot monitoring aktif
- [ ] Error monitoring aktif (Vercel built-in)
