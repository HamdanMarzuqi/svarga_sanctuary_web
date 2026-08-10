import type { Metadata } from "next";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { JsonLd, roomSchema } from "@/components/jsonld";
import { WhatsappLogo } from "@/components/ui/icons";
import { rooms } from "@/data/content";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types/content";

export const generateStaticParams = () =>
  rooms.flatMap(room => [
    { slug: room.slug, locale: "id" },
    { slug: room.slug, locale: "en" },
  ]);

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const lang: Locale = locale === "en" ? "en" : "id";
  const room = rooms.find(r => r.slug === slug) || rooms[0];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://svargasanctuary.com";
  return {
    title: `${room.name[lang]} — Svarga Sanctuary`,
    description: room.shortDescription[lang],
    alternates: {
      canonical: `${siteUrl}/${locale}/rooms/${slug}`,
      languages: { "id-ID": `${siteUrl}/id/rooms/${slug}`, "en-US": `${siteUrl}/en/rooms/${slug}` },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const lang: Locale = locale === "en" ? "en" : "id";
  const room = rooms.find(x => x.slug === slug) || rooms[0];
  const t = await getTranslations({ locale, namespace: "roomDetail" });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://svargasanctuary.com";
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "628xxxxxxxxxx";

  return (
    <main className="bg-ink">
      <JsonLd
        data={roomSchema(room.name[lang], room.shortDescription[lang], room.price.weekday, `${siteUrl}/${locale}/rooms/${slug}`)}
      />
      <section className="relative min-h-[70dvh] pt-28">
        <Image src={room.image} alt={room.imageAlt[lang]} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,15,0,.15),rgba(26,15,0,.95))]" />
        <div className="container relative flex min-h-[70dvh] items-end pb-16">
          <div>
            <Link href="/rooms" className="mb-8 inline-flex items-center gap-2 text-sm text-cream/70">
              <ArrowLeft size={16} /> {t("back")}
            </Link>
            <h1 className="font-display text-6xl font-light md:text-8xl">{room.name[lang]}</h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-cream/75">{room.fullDescription[lang]}</p>
          </div>
        </div>
      </section>
      <section className="section-pad">
        <div className="container grid gap-12 lg:grid-cols-[1fr_.7fr]">
          <div>
            <h2 className="font-display text-5xl font-light">{t("details")}</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {room.highlights.map(x => (
                <div key={x.id} className="flex gap-3 border-t border-cream/15 pt-4 text-sm text-cream/75">
                  <Check size={19} className="shrink-0 text-gold" />
                  {x[lang]}
                </div>
              ))}
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 border-y border-cream/15 py-6 text-sm">
              <div>
                <span className="block text-muted">{t("size")}</span>
                <strong className="mt-2 block text-cream">{room.size} m²</strong>
              </div>
              <div>
                <span className="block text-muted">{t("floor")}</span>
                <strong className="mt-2 block text-cream">{room.floor}</strong>
              </div>
              <div>
                <span className="block text-muted">{t("capacity")}</span>
                <strong className="mt-2 block text-cream">
                  {room.capacity.adults} {t("adults")}
                  {room.capacity.children > 0 ? `, ${room.capacity.children} ${t("children")}` : ""}
                </strong>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="mb-4 text-sm uppercase tracking-[.16em] text-gold">{t("amenities")}</h3>
              <div className="flex flex-wrap gap-2">
                {room.amenities.map(a => (
                  <span key={a} className="rounded-full border border-cream/15 px-3 py-1.5 text-xs text-cream/70">{a}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-[var(--radius-card)] bg-ink-soft p-8">
            <h3 className="font-display text-4xl font-light">{t("pricePerNight")}</h3>
            <div className="mt-6 grid gap-3 text-sm">
              <div className="flex justify-between border-b border-cream/10 pb-3">
                <span className="text-muted">{t("weekday")}</span>
                <span className="font-display text-2xl text-gold">Rp {room.price.weekday.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between border-b border-cream/10 pb-3">
                <span className="text-muted">{t("weekend")}</span>
                <span className="font-display text-2xl text-gold">Rp {room.price.weekend.toLocaleString("id-ID")}</span>
              </div>
            </div>
            <a
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                lang === "id"
                  ? `Halo Svarga Sanctuary, saya ingin menanyakan ketersediaan ${room.name.id}.`
                  : `Hello Svarga Sanctuary, I would like to ask about availability for ${room.name.en}.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-gold py-4 font-semibold text-ink transition-transform hover:-translate-y-0.5"
            >
              <WhatsappLogo size={20} />
              {t("checkAvailability")}
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
