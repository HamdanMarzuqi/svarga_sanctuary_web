import type { Metadata } from "next";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { JsonLd, blogPostingSchema } from "@/components/jsonld";
import { posts } from "@/data/content";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types/content";

export const generateStaticParams = () =>
  posts.flatMap(post => [
    { slug: post.slug, locale: "id" },
    { slug: post.slug, locale: "en" },
  ]);

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const lang: Locale = locale === "en" ? "en" : "id";
  const post = posts.find(p => p.slug === slug);
  if (!post) return { title: "Not Found" };
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://svargasanctuary.com";
  return {
    title: `${post.title[lang]} — Svarga Journal`,
    description: post.excerpt[lang],
    openGraph: {
      title: `${post.title[lang]} — Svarga Journal`,
      description: post.excerpt[lang],
      type: "article",
      images: [{ url: post.image, width: 900, height: 675, alt: post.imageAlt[lang] }],
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/blog/${slug}`,
      languages: { "id-ID": `${siteUrl}/id/blog/${slug}`, "en-US": `${siteUrl}/en/blog/${slug}` },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const lang: Locale = locale === "en" ? "en" : "id";
  const t = await getTranslations({ locale, namespace: "blog" });
  const post = posts.find(p => p.slug === slug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://svargasanctuary.com";

  if (!post) {
    return (
      <main className="bg-ink section-pad">
        <div className="container">
          <h1 className="font-display text-4xl text-cream">Not Found</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-ink">
      <JsonLd data={blogPostingSchema(post.title[lang], post.excerpt[lang], post.date, `${siteUrl}/${locale}/blog/${slug}`, post.image)} />
      <section className="relative min-h-[50dvh] pt-28">
        <Image src={post.image} alt={post.imageAlt[lang]} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,15,0,.15),rgba(26,15,0,.95))]" />
        <div className="container relative flex min-h-[50dvh] items-end pb-16">
          <div>
            <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm text-cream/70">
              <ArrowLeft size={16} /> {t("back")}
            </Link>
            <p className="text-xs uppercase tracking-[.16em] text-gold">{post.category}</p>
            <h1 className="mt-4 max-w-3xl font-display text-5xl font-light leading-tight text-cream md:text-7xl">{post.title[lang]}</h1>
            <div className="mt-5 flex gap-6 text-sm text-cream/60">
              <span>{new Date(post.date).toLocaleDateString(lang === "id" ? "id-ID" : "en-US", { day: "numeric", month: "long", year: "numeric" })}</span>
              <span>{post.readingTime} {t("minRead")}</span>
            </div>
          </div>
        </div>
      </section>
      <section className="section-pad">
        <div className="container max-w-3xl">
          <p className="text-xl leading-9 text-cream/80">{post.excerpt[lang]}</p>
          {post.content && (
            <div className="mt-6 space-y-6">
              {post.content[lang].split("\n\n").map((para, i) => (
                <p key={i} className="text-base leading-8 text-cream/70">
                  {para}
                </p>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
