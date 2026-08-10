export type Locale = "id" | "en";
export type Localized = { id: string; en: string };
export type RoomType = "standard" | "deluxe" | "suite";

export type Room = {
  id: string;
  slug: string;
  type: RoomType;
  name: Localized;
  shortDescription: Localized;
  fullDescription: Localized;
  price: { weekday: number; weekend: number; currency: "IDR" };
  capacity: { adults: number; children: number; maxTotal: number };
  size: number;
  floor: number;
  bedType: string;
  image: string;
  imageAlt: Localized;
  amenities: string[];
  highlights: Localized[];
  isAvailable: boolean;
  isSample: boolean;
};

export type Testimonial = {
  id: string;
  guestName: string;
  origin: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: Localized;
  initials: string;
  roomType?: RoomType;
  stayMonth?: string;
  isHighlighted?: boolean;
  isSample: boolean;
};

export type BlogPost = {
  slug: string;
  title: Localized;
  excerpt: Localized;
  category: string;
  date: string;
  readingTime: number;
  image: string;
  imageAlt: Localized;
  content?: Localized;
  isSample: boolean;
};

export type GalleryCategory = "all" | "rooms" | "common" | "food" | "around";

export type GalleryItem = {
  id: string;
  url: string;
  title: Localized;
  category: Exclude<GalleryCategory, "all">;
  aspectRatio?: "square" | "portrait" | "landscape";
  caption?: Localized;
  description?: Localized;
};
