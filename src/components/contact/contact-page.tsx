import { ArrowRight, MapPin } from "lucide-react";
import { PageIntro } from "@/components/ui/page-intro";
import { WhatsappLogo } from "@/components/ui/icons";
import { wa } from "@/lib/wa";
import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/types/content";

export async function ContactPage() {
  const t = await getTranslations("contact");
  const location = await getTranslations("location");
  const locale = (await getLocale()) as Locale;
  return (
    <PageIntro title={t("pageTitle")} text={t("pageSubtitle")}>
      <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr]">
        <div className="min-h-96 rounded-[var(--radius-card)] bg-ink-soft p-8">
          <div className="flex size-full min-h-80 flex-col justify-end bg-[linear-gradient(135deg,rgba(201,168,76,.18),transparent),url('/images/about/yogyakarta-landscape.jpg')] bg-cover bg-center p-8">
            <MapPin size={30} className="text-gold" />
            <h2 className="mt-4 font-display text-4xl">{t("address")}</h2>
            <p className="mt-2 max-w-sm text-sm leading-7 text-cream/70">{location("text")}</p>
          </div>
        </div>
        <div className="rounded-[var(--radius-card)] bg-cream p-8 text-ink">
          <h2 className="font-display text-4xl">{t("title")}</h2>
          <div className="mt-8 grid gap-5 text-sm">
            <a href={wa(locale)} target="_blank" rel="noreferrer" className="flex items-center gap-3 border-b border-ink/15 pb-4 font-semibold">
              <WhatsappLogo size={23} className="text-gold" />
              {t("whatsapp")}
            </a>
            <a href="mailto:hello@svargasanctuary.example" className="flex items-center gap-3 border-b border-ink/15 pb-4">
              hello@svargasanctuary.example
            </a>
            <span className="flex items-center gap-3">
              <MapPin size={23} className="text-gold" />
              {t("address")}
            </span>
          </div>
          <a
            href={wa(locale)}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-ink px-5 font-semibold text-cream"
          >
            {t("whatsapp")}
            <ArrowRight size={17} />
          </a>
        </div>
      </div>
    </PageIntro>
  );
}
