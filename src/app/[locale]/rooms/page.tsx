import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/page-intro";
import { RoomCard } from "@/components/rooms/room-card";
import { Reveal } from "@/components/ui/reveal";
import { scaleInVariant } from "@/lib/animations";
import { rooms } from "@/data/content";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "rooms" });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://svargasanctuary.com";
  return {
    title: t("pageTitle"),
    description: t("pageSubtitle"),
    alternates: {
      canonical: `${siteUrl}/${locale}/rooms`,
      languages: { "id-ID": `${siteUrl}/id/rooms`, "en-US": `${siteUrl}/en/rooms` },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("rooms");
  return (
    <PageIntro title={t("pageTitle")} text={t("pageSubtitle")}>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rooms.map((r, i) => (
          <Reveal key={r.id} variant={scaleInVariant}>
            <RoomCard room={r} index={i} />
          </Reveal>
        ))}
      </div>
    </PageIntro>
  );
}
