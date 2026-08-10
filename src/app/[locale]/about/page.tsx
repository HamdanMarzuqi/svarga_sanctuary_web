import type { Metadata } from "next";
import { AboutPage } from "@/components/about/about-page";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://svargasanctuary.com";
  return {
    title: t("pageTitle"),
    description: t("pageSubtitle"),
    alternates: {
      canonical: `${siteUrl}/${locale}/about`,
      languages: { "id-ID": `${siteUrl}/id/about`, "en-US": `${siteUrl}/en/about` },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutPage />;
}
