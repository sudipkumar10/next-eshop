"use client";
import { useState } from "react";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "../shared/Container";
import Image from "next/image";

export function BestSellersSection() {
  const [activeTab, setActiveTab] = useState("Best Seller");

  const tabs = ["New Arrivals", "Best Seller", "Best Offers"];

  const products = [
    {
      title: "Cardioplus Remedy",
      category: "Heart Health",
      rating: "4.4",
      purchased: "6k Purchased",
      price: "$70.00",
      image: "/default-image.avif",
    },
    {
      title: "Cetaphil Plus",
      category: "Cardiac Care",
      rating: "4.7",
      purchased: "6k Purchased",
      price: "$60.00",
      image: "/default-image.avif",
    },
    {
      title: "Vasodilate Plus",
      category: "Cardiac Care",
      rating: "4.9",
      purchased: "6k Purchased",
      price: "$40.00",
      image: "/default-image.avif",
    },
    {
      title: "Cardioplus Remedy",
      category: "Heart Health",
      rating: "4.4",
      purchased: "6k Purchased",
      price: "$70.00",
      image: "/default-image.avif",
    },
    {
      title: "Cetaphil Plus",
      category: "Cardiac Care",
      rating: "4.7",
      purchased: "6k Purchased",
      price: "$60.00",
      image: "/default-image.avif",
    },
    {
      title: "Vasodilate Plus",
      category: "Cardiac Care",
      rating: "4.9",
      purchased: "6k Purchased",
      price: "$40.00",
      image: "/default-image.avif",
    },
  ];

  return (
    <section className="w-full bg-white py-12 text-[#111827]">
      <Container>
        {/* Top Tab Filters */}
        <div className="flex justify-center items-center gap-3 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all border ${
                activeTab === tab
                  ? "bg-[#FEF08A] text-gray-900 border-[#FEF08A] shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main Grid: Left Banner + Right 6 Products */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
          {/* Left Side: Limited Time Promo Banner */}
          <div className="lg:col-span-4 bg-[#1A6B4C] rounded-3xl p-8 flex flex-col justify-between items-center text-center text-white relative overflow-hidden shadow-sm">
            <div>
              <p className="text-[11px] font-medium text-gray-200 mb-2 uppercase tracking-wider">
                Limited time only!
              </p>
              {/* Countdown Timer */}
              <div className="flex items-center justify-center gap-1.5 mb-6">
                <span className="bg-accent text-black font-black text-xs px-2.5 py-1 rounded-md shadow-sm">
                  02
                </span>
                <span className="font-bold text-white">:</span>
                <span className="bg-accent text-black font-black text-xs px-2.5 py-1 rounded-md shadow-sm">
                  35
                </span>
                <span className="font-bold text-white">:</span>
                <span className="bg-accent text-black font-black text-xs px-2.5 py-1 rounded-md shadow-sm">
                  40
                </span>
                <span className="font-bold text-white">:</span>
                <span className="bg-accent text-black font-black text-xs px-2.5 py-1 rounded-md shadow-sm">
                  21
                </span>
              </div>
            </div>

            {/* Banner Products Image - Original Position & Fully Covered without cutting */}
            <div className="relative w-full h-[220px] my-4 flex items-center justify-center">
              <Image
                src="/default-image.avif"
                alt="Complete Herbal Wellness Essentials"
                fill
                className="object-contain drop-shadow-lg"
              />
            </div>

            <div className="w-full">
              <h3 className="text-xl font-black tracking-tight mb-1 text-white">
                Complete Herbal
                <br />
                Wellness Essentials
              </h3>
              <p className="text-[11px] text-gray-200 font-medium mb-5">
                Up to 40% off for woman
              </p>
              <Button className="bg-accent text-black hover:bg-[#fde047] rounded-full px-8 font-bold text-xs h-9 shadow-none">
                Shop Now
              </Button>
            </div>
          </div>

          {/* Right Side: 6 Products Grid (2 Rows x 3 Cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {products.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200/80 rounded-2xl p-2 flex flex-col justify-between shadow-sm hover:shadow-md transition-all relative"
              >
                <div>
                  {/* Product Image Container with Sale Badge Inside */}
                  <div className="w-full h-36 bg-[#FAF6F0] rounded-xl relative overflow-hidden flex items-center justify-center mb-4">
                    <Badge className="absolute top-2.5 left-2.5 z-10 bg-accent  text-green-600 font-bold text-[10px] px-2.5 py-0.5 rounded-full hover:bg-[#FEF08A] border-0 shadow-2xs">
                      Sale
                    </Badge>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  {/* Rating & Purchased Info */}
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-1 font-bold text-gray-900">
                      <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                      <span>{item.rating}</span>
                    </div>
                    <span className="text-gray-400 font-medium text-[11px]">
                      {item.purchased}
                    </span>
                  </div>

                  {/* Category & Title */}
                  <p className="text-[11px] text-gray-500 font-medium mb-0.5">
                    {item.category}
                  </p>
                  <h4 className="text-sm font-bold text-gray-900 mb-3 truncate">
                    {item.title}
                  </h4>
                </div>

                <div>
                  {/* Price */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-base font-black text-gray-900">
                      {item.price}
                    </span>
                  </div>

                  {/* Add to Cart Button */}
                  <Button className="w-full bg-[#1A6B4C] hover:bg-[#257F5A] text-white rounded-xl text-xs font-bold h-9 gap-1.5 shadow-none">
                    <ShoppingCart className="w-3.5 h-3.5" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* See More Center Button */}
        <div className="flex justify-center">
          <Button className="bg-[#1A6B4C] hover:bg-[#257F5A] text-white rounded-full px-8 font-bold text-xs h-10 shadow-none">
            See More
          </Button>
        </div>
      </Container>
    </section>
  );
}
