import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "gallery" });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://svargasanctuary.com";
  return {
    title: t("pageTitle"),
    description: t("pageSubtitle"),
    alternates: {
      canonical: `${siteUrl}/${locale}/gallery`,
      languages: { "id-ID": `${siteUrl}/id/gallery`, "en-US": `${siteUrl}/en/gallery` },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("gallery");
  return (
    <div className="min-h-screen bg-ink pt-36 sm:pt-44 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header — matching antigravity reference */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            PORTFOLIO VIRTUAL
          </span>
          <h1 className="font-display text-4xl font-light text-cream sm:text-6xl">
            {t("pageTitle")}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            {t("pageSubtitle")}
          </p>
          <div className="mx-auto mt-6 h-[2px] w-16 bg-gold" />
        </div>

        <GalleryGrid />
      </div>
    </div>
  );
}
