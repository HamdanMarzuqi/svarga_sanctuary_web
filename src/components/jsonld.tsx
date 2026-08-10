export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const lodgingBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "Svarga Sanctuary Homestay",
  description: "A warm, thoughtful homestay in Yogyakarta shaped by nature and Javanese culture.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://svargasanctuary.com",
  telephone: "+62-812-3456-7890",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Yogyakarta",
    addressLocality: "Yogyakarta",
    addressRegion: "DIY",
    postalCode: "55000",
    addressCountry: "ID"
  },
  priceRange: "Rp 350.000 - Rp 1.500.000",
  currenciesAccepted: "IDR",
  paymentAccepted: "Cash, Bank Transfer"
};

export function roomSchema(name: string, description: string, price: number, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    name,
    description,
    priceRange: `Rp ${price.toLocaleString("id-ID")}`,
    url
  };
}

export function blogPostingSchema(title: string, description: string, date: string, url: string, imageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: date,
    author: { "@type": "Organization", name: "Svarga Sanctuary" },
    publisher: {
      "@type": "Organization",
      name: "Svarga Sanctuary Homestay",
      logo: { "@type": "ImageObject", url: imageUrl }
    },
    image: imageUrl,
    url
  };
}
