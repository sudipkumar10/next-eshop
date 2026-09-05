import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "../shared/Container";
import Image from "next/image";

export function PopularProducts() {
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
      title: "Vasodilate Plus",
      category: "Circulatory System",
      rating: "4.8",
      purchased: "6k Purchased",
      price: "$80.00",
      image: "/default-image.avif",
    },
    {
      title: "BloodFlow Booster",
      category: "Vascular Health",
      rating: "5.0",
      purchased: "6k Purchased",
      price: "$90.00",
      image: "/default-image.avif",
    },
    {
      title: "Vasodilate Plus",
      category: "Circulatory System",
      rating: "4.8",
      purchased: "6k Purchased",
      price: "$80.00",
      image: "/default-image.avif",
    },
    {
      title: "BloodFlow Booster",
      category: "Vascular Health",
      rating: "5.0",
      purchased: "6k Purchased",
      price: "$90.00",
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
      title: "Cetaphil Plus",
      category: "Cardiac Care",
      rating: "4.7",
      purchased: "6k Purchased",
      price: "$60.00",
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
  ];

  return (
    <section className="w-full bg-white py-12 text-[#111827]">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-3xl font-black tracking-tight text-gray-900 mb-2">
            Popular Products
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            Dining, living, and desk areas serve their purposes in total harmony
            of style.
          </p>
        </div>

        {/* 10 Products Grid (2 Rows of 5 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-10">
          {products.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200/80 rounded-2xl p-2 flex flex-col justify-between shadow-sm hover:shadow-md transition-all relative"
            >
              <div>
                {/* Product Image Container with Sale Badge Inside */}
                <div className="w-full h-36 bg-[#FAF6F0] rounded-xl relative overflow-hidden flex items-center justify-center mb-4">
                  <Badge className="absolute top-2.5 left-2.5 z-10 bg-[#FFDD54] text-green-600 font-bold text-[10px] px-2.5 py-0.5 rounded-full hover:bg-[#FEF9C3] border-0 shadow-2xs">
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
                <h3 className="text-sm font-bold text-gray-900 mb-3 truncate">
                  {item.title}
                </h3>
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
