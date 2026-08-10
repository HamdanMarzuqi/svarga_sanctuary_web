import type { Metadata } from "next";
import { BookingForm } from "@/components/booking/booking-form";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "booking" });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://svargasanctuary.com";
  return {
    title: t("pageTitle"),
    description: t("pageSubtitle"),
    alternates: {
      canonical: `${siteUrl}/${locale}/booking`,
      languages: { "id-ID": `${siteUrl}/id/booking`, "en-US": `${siteUrl}/en/booking` },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("booking");
  return (
    <main className="bg-ink">
      <section className="bg-ink-soft pt-36 pb-20">
        <div className="container">
          <p className="text-sm uppercase tracking-[.18em] text-gold">Svarga Sanctuary</p>
          <h1 className="mt-5 font-display text-6xl font-light md:text-8xl">{t("pageTitle")}</h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-muted">{t("pageSubtitle")}</p>
        </div>
      </section>
      <section className="section-pad">
        <BookingForm />
      </section>
    </main>
  );
}
