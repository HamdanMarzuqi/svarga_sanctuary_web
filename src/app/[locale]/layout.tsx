import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SiteLayout } from "@/components/layout/site-layout";
import { JsonLd, lodgingBusinessSchema } from "@/components/jsonld";

export async function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "hero" });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://svargasanctuary.com";
  return {
    title: {
      default: "Svarga Sanctuary Homestay Yogyakarta",
      template: "%s | Svarga Sanctuary",
    },
    description: t("subline"),
    openGraph: {
      title: "Svarga Sanctuary Homestay Yogyakarta",
      description: t("headline"),
      type: "website",
      locale: locale === "en" ? "en_US" : "id_ID",
      siteName: "Svarga Sanctuary",
    },
    robots: { index: true, follow: true },
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: { "id-ID": `${siteUrl}/id`, "en-US": `${siteUrl}/en` },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "id" | "en")) notFound();
  setRequestLocale(locale);
  const messages = await getMessages({ locale });
  return (
    <NextIntlClientProvider messages={messages}>
      <SiteLayout>
        <JsonLd data={lodgingBusinessSchema} />
        {children}
      </SiteLayout>
    </NextIntlClientProvider>
  );
}
