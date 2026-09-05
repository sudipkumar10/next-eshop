"use client";
import { useState } from "react";
import { Star, ShoppingCart, Trash2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Container } from "@/components/shared/Container";

export default function WishlistPage() {
  // Sample wishlist items state so user can remove items dynamically if needed
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      title: "Cardioplus Remedy",
      category: "Heart Health",
      rating: "4.4",
      purchased: "6k Purchased",
      price: "$70.00",
      image: "/default-image.avif",
      isSale: true,
    },
    {
      id: 2,
      title: "Cetaphil Plus",
      category: "Cardiac Care",
      rating: "4.7",
      purchased: "6k Purchased",
      price: "$60.00",
      image: "/default-image.avif",
      isSale: true,
    },
    {
      id: 3,
      title: "Vasodilate Plus",
      category: "Cardiac Care",
      rating: "4.9",
      purchased: "6k Purchased",
      price: "$40.00",
      image: "/default-image.avif",
      isSale: false,
    },
    {
      id: 4,
      title: "BloodFlow Booster",
      category: "Vascular Health",
      rating: "5.0",
      purchased: "6k Purchased",
      price: "$90.00",
      image: "/default-image.avif",
      isSale: true,
    },
  ]);

  const removeItem = (id: number) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  return (
    <section className="w-full min-h-screen bg-white py-12 text-[#111827]">
      <Container>
        {/* Wishlist Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-100 pb-6 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 flex items-center gap-2">
              <Heart className="w-7 h-7 text-[#1A6B4C] fill-[#1A6B4C]/20" />
              My Wishlist
            </h1>
            <p className="text-xs text-gray-500 font-medium mt-1">
              You have {wishlistItems.length} items saved in your wishlist.
            </p>
          </div>
          {wishlistItems.length > 0 && (
            <Button
              variant="outline"
              className="mt-4 sm:mt-0 text-xs font-bold border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl h-9"
              onClick={() => setWishlistItems([])}
            >
              Clear Wishlist
            </Button>
          )}
        </div>

        {/* Empty State */}
        {wishlistItems.length === 0 ? (
          <div className="text-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
            <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3 stroke-[1.5]" />
            <h3 className="text-base font-bold text-gray-800 mb-1">
              Your wishlist is empty
            </h3>
            <p className="text-xs text-gray-400 mb-5">
              Explore our products and save your favorites here.
            </p>
            <Button className="bg-[#1A6B4C] hover:bg-[#257F5A] text-white rounded-full px-6 font-bold text-xs h-9 shadow-none">
              Explore Products
            </Button>
          </div>
        ) : (
          /* Wishlist Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200/80 rounded-2xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-all relative group"
              >
                <div>
                  {/* Remove Button Icon on Top Right */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-3 right-3 z-20 bg-white/80 backdrop-blur-xs p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors shadow-2xs"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Product Image Container with Reusable Sale Badge */}
                  <div className="w-full h-36 bg-[#FAF6F0] rounded-xl relative overflow-hidden flex items-center justify-center mb-4">
                    {item.isSale && (
                      <Badge className="badge-sale absolute top-2.5 left-2.5 z-10">
                        Sale
                      </Badge>
                    )}
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
                    Move to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
