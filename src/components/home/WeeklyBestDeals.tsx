import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "../shared/Container";
import Image from "next/image";

export function WeeklyBestDeals() {
  const categories = [
    "Up to 90% off",
    "Under $1",
    "Beauty & Health",
    "Jewelry & Accessories",
    "Home & Kitchen",
    "Man's Clothing",
  ];

  const products = [
    {
      title: "Cardioplus Remedy",
      category: "Heart Health",
      rating: "4.4",
      purchased: "6k Purchased",
      price: "$70.00",
      image: "/default-image.png",
    },
    {
      title: "Cetaphill Plus",
      category: "Cardiac Care",
      rating: "4.7",
      purchased: "6k Purchased",
      price: "$60.00",
      image: "/default-image.png",
    },
    {
      title: "Vasodilate Plus",
      category: "Cardiac Care",
      rating: "4.9",
      purchased: "6k Purchased",
      price: "$40.00",
      image: "/default-image.png",
    },
    {
      title: "Vasodilate Plus",
      category: "Circulatory System",
      rating: "4.8",
      purchased: "6k Purchased",
      price: "$80.00",
      image: "/default-image.png",
    },
    {
      title: "BloodFlow Booster",
      category: "Vascular Health",
      rating: "5.0",
      purchased: "6k Purchased",
      price: "$90.00",
      image: "/default-image.png",
    },
  ];

  return (
    <section className="w-full bg-[#1A6B4C] py-10 text-white">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-3xl font-black tracking-tight text-white">
            Weekly Best Deals
          </h2>

          {/* Timer */}
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-200">
            <span>Limited time only</span>
            <div className="flex items-center gap-1">
              {["02", "35", "40", "21"].map((time, idx) => (
                <span
                  key={idx}
                  className="bg-accent text-black font-bold px-2 py-1 rounded-md text-xs shadow-sm"
                >
                  {time}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Category Pills Filter & See More Button */}
        <div className="flex items-center justify-between gap-4 mb-8 overflow-x-auto scrollbar-none pb-1">
          <div className="flex items-center gap-2.5 overflow-x-auto scrollbar-none">
            {categories.map((cat, idx) => {
              const isActive = cat === "Beauty & Health";
              return (
                <button
                  key={idx}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-accent text-black shadow-sm"
                      : "bg-[#257F5A] text-white hover:bg-[#2F956B]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
          <Button className="bg-white text-[#1A6B4C] hover:bg-gray-100 rounded-full px-6 font-bold text-xs h-9 shadow-none shrink-0">
            See More
          </Button>
        </div>

        {/* Top Products Grid (5 items) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {products.map((item, idx) => (
            <div
              key={idx}
              className="bg-white text-[#111827] rounded-lg p-4 flex flex-col justify-between shadow-sm relative"
            >
              <div>
                <Badge className="bg-accent font-bold text-[10px] mb-3 px-2.5 py-0.5 rounded-full hover:bg-accent border-0 text-green-600">
                  Sale
                </Badge>
                <div className="w-full h-32 bg-[#FAF2E9] rounded-md relative overflow-hidden flex items-center justify-center mb-4 shadow-inner">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-1 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                    <span>{item.rating}</span>
                  </div>
                  <span className="text-gray-400 font-medium text-[11px]">
                    {item.purchased}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 font-medium mb-0.5">
                  {item.category}
                </p>
                <h3 className="text-sm font-bold text-gray-900 mb-3 truncate">
                  {item.title}
                </h3>
              </div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-base font-black text-gray-900">
                    {item.price}
                  </span>
                </div>
                <Button className="w-full bg-[#1A6B4C] hover:bg-[#257F5A] text-white rounded-md text-xs font-bold h-9 gap-1.5 shadow-none">
                  <ShoppingCart className="w-3.5 h-3.5" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner Section with Large Prominent Images */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-4">
          {/* 1st Large Banner */}
          <div className="relative h-[280px] overflow-hidden rounded-2xl bg-[#F2F5C4] p-8 flex items-center justify-between">
            <div className="z-10 flex flex-col justify-center max-w-[50%]">
              <span className="mb-1 text-xs font-bold text-[#1A6B4C]">
                Supper Sale 50%
              </span>
              <h3 className="mb-4 text-3xl font-black tracking-tight text-[#111827] leading-tight">
                Makeup Must Haves
              </h3>
              <Button className="w-fit h-9 rounded-full bg-[#1A6B4C] px-6 text-xs font-bold text-white shadow-none hover:bg-[#257F5A]">
                Shop Now
              </Button>
            </div>

            {/* Bada Image Container */}
            <div className="relative w-[45%] h-[220px] rounded-2xl bg-white/60 overflow-hidden shadow-sm flex items-center justify-center">
              <Image
                src="/default-image.png"
                alt="Makeup Must Haves"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* 2nd Banner */}
          <div className="relative h-[280px] overflow-hidden rounded-2xl bg-[#D9F3FA] p-6 flex flex-col justify-between">
            <div className="z-10">
              <span className="mb-1 text-xs font-bold text-[#1A6B4C]">
                Supper Sale 50%
              </span>
              <h3 className="mb-3 text-2xl font-black tracking-tight text-[#111827] leading-tight">
                Glow That Never Fades
              </h3>
              <Button className="w-fit h-8 rounded-full bg-[#1A6B4C] px-5 text-xs font-bold text-white shadow-none hover:bg-[#257F5A]">
                Shop Now
              </Button>
            </div>

            {/* Bada Image Container */}
            <div className="absolute right-4 bottom-4 w-[160px] h-[130px] rounded-xl bg-white/60 overflow-hidden shadow-sm flex items-center justify-center">
              <Image
                src="/default-image.png"
                alt="Glow That Never Fades"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* 3rd Banner */}
          <div className="relative h-[280px] overflow-hidden rounded-2xl bg-[#E7F8CC] p-6 flex flex-col justify-between">
            <div className="z-10">
              <span className="mb-1 text-xs font-bold text-[#1A6B4C]">
                Supper Sale 50%
              </span>
              <h3 className="mb-3 text-2xl font-black tracking-tight text-[#111827] leading-tight">
                Skincare Essentials
              </h3>
              <Button className="w-fit h-8 rounded-full bg-[#1A6B4C] px-5 text-xs font-bold text-white shadow-none hover:bg-[#257F5A]">
                Shop Now
              </Button>
            </div>

            {/* Bada Image Container */}
            <div className="absolute right-4 bottom-4 w-[160px] h-[130px] rounded-xl bg-white/60 overflow-hidden shadow-sm flex items-center justify-center">
              <Image
                src="/default-image.png"
                alt="Skincare Essentials"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
