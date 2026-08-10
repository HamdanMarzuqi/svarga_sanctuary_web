import { HeroSection } from "@/components/home/hero";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { FeaturedRooms } from "@/components/home/FeaturedRooms";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { LocationTeaser } from "@/components/home/LocationTeaser";
import { LatestBlog } from "@/components/home/LatestBlog";

export function Home() {
  return (
    <>
      <HeroSection />
      <WhyChooseUs />
      <FeaturedRooms />
      <GalleryPreview />
      <Testimonials />
      <LocationTeaser />
      <LatestBlog />
    </>
  );
}