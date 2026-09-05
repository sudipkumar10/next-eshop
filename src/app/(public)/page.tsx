import { BestSellersSection } from "@/components/home/BestSellersSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { HeroBanners } from "@/components/home/HeroBanners";
import { MostPopularSellers } from "@/components/home/MostPopularSellers";
import { PopularProducts } from "@/components/home/PopularProducts";
import { PromoBanner } from "@/components/home/PromoBanner";
import { ShopDealsByCategory } from "@/components/home/ShopDealsByCategory";
import { WeeklyBestDeals } from "@/components/home/WeeklyBestDeals";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFFFFF] text-[#111827]">
      <Header />
      <HeroBanners />
      <WeeklyBestDeals />
      <ShopDealsByCategory />
      <PopularProducts />
      <PromoBanner />
      <BestSellersSection />
      <MostPopularSellers />
      <FeaturesSection />
      <Footer />
    </main>
  );
}
