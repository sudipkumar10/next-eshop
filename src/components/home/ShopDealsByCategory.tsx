import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "../shared/Container";

export function ShopDealsByCategory() {
  const categories = [
    { title: "Skin Care", image: "/default-image.png", count: "See More" },
    { title: "Cosmetics", image: "/default-image.png", count: "See More" },
    { title: "Baby Care", image: "/default-image.png", count: "See More" },
    { title: "Supplements", image: "/default-image.png", count: "See More" },
    { title: "Man's care", image: "/default-image.png", count: "See More" },
    { title: "Hair Care", image: "/default-image.png", count: "See More" },
  ];

  const promoCards = [
    {
      title: "Herbal Wellness Collection",
      price: "$12",
      image: "/default-image.png",
      layout: "image-top", // 1st: Image on top, Text & Button on bottom
    },
    {
      title: "Premium Skincare Routine",
      price: "$12",
      image: "/default-image.png",
      layout: "text-top", // 2nd: Text & Button on top, Image on bottom
    },
    {
      title: "Fresh Face Care Products",
      price: "$12",
      image: "/default-image.png",
      layout: "image-top", // 3rd: Image on top, Text & Button on bottom
    },
    {
      title: "Herbal Wellness Collection",
      price: "$12",
      image: "/default-image.png",
      layout: "text-top", // 4th: Text & Button on top, Image on bottom
    },
  ];

  return (
    <section className="w-full bg-white py-12 text-[#111827]">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-3xl font-black tracking-tight text-gray-900 mb-2">
            Shop Deals by Category
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            Dining, living, and desk areas serve their purposes in total harmony
            of style.
          </p>
        </div>
        {/* 6 Category Cards Grid */}
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="
        group flex cursor-pointer flex-col items-center
        rounded-xl border border-gray-200
        bg-white px-4 py-6 text-center
        transition-all hover:shadow-md
      "
            >
              {/* Yellow Circle + Product Image */}
              <div className="mb-3 flex h-[104px] w-[104px] items-center justify-center rounded-full bg-[#FEF3A6] p-3">
                <div className="relative h-full w-full">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Category Name */}
              <h3 className="mb-1 text-sm font-bold text-gray-900">
                {cat.title}
              </h3>

              {/* See More */}
              <span
                className="
          flex items-center gap-0.5
          text-xs font-medium text-gray-400
          transition-colors
          group-hover:text-[#2C825E]
        "
              >
                See More
                <ArrowUpRight className="h-3 w-3" />
              </span>
            </div>
          ))}
        </div>

        {/* See More Center Button */}
        <div className="flex justify-center mb-14">
          <Button className="bg-[#1A6B4C] hover:bg-[#257F5A] text-white rounded-full px-8 font-bold text-xs h-10 shadow-none">
            See More
          </Button>
        </div>

        {/* 4 Promo Cards Grid with Full-Width Clean Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {promoCards.map((promo, idx) => (
            <div
              key={idx}
              className="bg-[#FAF6F0] rounded-3xl p-5 flex flex-col justify-between border border-gray-100 shadow-sm relative overflow-hidden h-[360px]"
            >
              {promo.layout === "image-top" ? (
                <>
                  {/* Top Section: Image taking maximum space without inner box bg */}
                  <div className="w-full h-[180px] relative overflow-hidden flex items-center justify-center">
                    <Image
                      src={promo.image}
                      alt={promo.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* Bottom Section: Title, Price & Button */}
                  <div className="text-center mt-auto pt-2">
                    <h3 className="text-base font-black text-gray-900 mb-1 line-clamp-1">
                      {promo.title}
                    </h3>
                    <span className="text-[11px] text-gray-500 font-medium block mb-3">
                      Starting at{" "}
                      <span className="text-amber-600 font-bold">
                        {promo.price}
                      </span>
                    </span>
                    <Button className="bg-[#1A6B4C] hover:bg-[#257F5A] text-white rounded-full px-6 font-bold text-xs h-9 shadow-none w-full max-w-[140px]">
                      Shop Now
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {/* Top Section: Title, Price & Button */}
                  <div className="text-center mb-2">
                    <h3 className="text-base font-black text-gray-900 mb-1 line-clamp-1">
                      {promo.title}
                    </h3>
                    <span className="text-[11px] text-gray-500 font-medium block mb-2">
                      Starting at{" "}
                      <span className="text-amber-600 font-bold">
                        {promo.price}
                      </span>
                    </span>
                    <Button className="bg-[#1A6B4C] hover:bg-[#257F5A] text-white rounded-full px-6 font-bold text-xs h-9 shadow-none w-full max-w-[140px]">
                      Shop Now
                    </Button>
                  </div>
                  {/* Bottom Section: Image taking maximum space without inner box bg */}
                  <div className="w-full h-[180px] relative overflow-hidden flex items-center justify-center mt-auto">
                    <Image
                      src={promo.image}
                      alt={promo.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Black Friday Coupon Banner */}
        <div className="bg-[#1A6B4C] rounded-2xl p-5 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm mb-16">
          <div className="flex items-center gap-3 text-white">
            <span className="bg-[#FFDD54] text-black text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
              Black Friday sale 20
            </span>
            <span className="text-sm md:text-base font-bold tracking-tight">
              Save Up to <span className="text-[#FFDD54]">50%</span> with Our
              Coupons
            </span>
          </div>
          <Button className="bg-white text-[#1A6B4C] hover:bg-gray-100 rounded-full px-6 font-bold text-xs h-9 shadow-none shrink-0">
            View All Coupons
          </Button>
        </div>
      </Container>
    </section>
  );
}
