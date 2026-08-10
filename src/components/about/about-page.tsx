import Image from "next/image";
import { Check } from "lucide-react";
import { PageIntro } from "@/components/ui/page-intro";
import { Reveal } from "@/components/ui/reveal";
import { getTranslations } from "next-intl/server";

export async function AboutPage() {
  const t = await getTranslations("about");
  const values = t.raw("values") as string[];
  return (
    <PageIntro title={t("pageTitle")} text={t("pageSubtitle")}>
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)]">
            <Image
              src="/images/about/homestay-interior.jpg"
              alt="Interior homestay dengan detail kayu dan tanaman hijau"
              fill
              className="object-cover"
            />
          </div>
        </Reveal>
        <Reveal className="self-center">
          <h2 className="font-display text-5xl font-light">{t("valuesTitle")}</h2>
          <div className="mt-8 grid gap-5">
            {values.map(x => (
              <div key={x} className="flex items-center gap-4 border-b border-cream/15 pb-4 text-lg">
                <Check size={20} className="text-gold" />
                {x}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </PageIntro>
  );
}
