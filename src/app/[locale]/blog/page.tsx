import type { Metadata } from "next";
import { BlogList } from "@/components/blog/blog-list";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types/content";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://svargasanctuary.com";
  const lang: Locale = locale === "en" ? "en" : "id";
  const t = await getTranslations({ locale, namespace: "blog" });
  const pageDesc = lang === "en"
    ? "Travel guides, cultural insights, and local tips for exploring Yogyakarta."
    : "Panduan wisata, wawasan budaya, dan tips lokal untuk menjelajahi Yogyakarta.";
  return {
    title: t("pageTitle"),
    description: pageDesc,
    alternates: {
      canonical: `${siteUrl}/${locale}/blog`,
      languages: { "id-ID": `${siteUrl}/id/blog`, "en-US": `${siteUrl}/en/blog` },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang: Locale = locale === "en" ? "en" : "id";
  const t = await getTranslations("blog");
  return (
    <main className="bg-ink">
      <section className="bg-ink-soft pt-36 pb-20">
        <div className="container">
          <p className="text-sm uppercase tracking-[.18em] text-gold">Svarga Journal</p>
          <h1 className="mt-5 font-display text-6xl font-light md:text-8xl">{t("pageTitle")}</h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-muted">{t("pageSubtitle")}</p>
        </div>
      </section>
      <section className="section-pad">
        <div className="container">
          <BlogList lang={lang} />
        </div>
      </section>
    </main>
  );
}
