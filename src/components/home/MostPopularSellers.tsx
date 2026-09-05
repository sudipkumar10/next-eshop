import { Star, ArrowUpRight } from "lucide-react";
import { Container } from "../shared/Container";
import Image from "next/image";

export function MostPopularSellers() {
  const sellers = [
    {
      name: "Chanel",
      rating: "5.0",
      reviews: "1.6k Review",
      image: "/default-image.avif",
    },
    {
      name: "Anastasia",
      rating: "5.0",
      reviews: "1.6k Review",
      image: "/default-image.avif",
    },
    {
      name: "Fenty Beauty",
      rating: "5.0",
      reviews: "1.6k Review",
      image: "/default-image.avif",
    },
    {
      name: "Fenty",
      rating: "5.0",
      reviews: "1.6k Review",
      image: "/default-image.avif",
    },
    {
      name: "Charlotte",
      rating: "5.0",
      reviews: "1.6k Review",
      image: "/default-image.avif",
    },
    {
      name: "Fenty",
      rating: "5.0",
      reviews: "1.6k Review",
      image: "/default-image.avif",
    },
    {
      name: "Charlotte",
      rating: "5.0",
      reviews: "1.6k Review",
      image: "/default-image.avif",
    },
    {
      name: "Anastasia",
      rating: "5.0",
      reviews: "1.6k Review",
      image: "/default-image.avif",
    },
    {
      name: "Fenty Beauty",
      rating: "5.0",
      reviews: "1.6k Review",
      image: "/default-image.avif",
    },
    {
      name: "Chanel",
      rating: "5.0",
      reviews: "1.6k Review",
      image: "/default-image.avif",
    },
  ];

  return (
    <section className="w-full bg-white py-12 text-[#111827]">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-3xl font-black tracking-tight text-gray-900 mb-2">
            Most Popular Seller
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            Trusted and loved by thousands of customers, this best-selling
            product continues to lead the way with high satisfaction.
          </p>
        </div>

        {/* 10 Sellers Grid (2 Rows of 5 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {sellers.map((seller, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200/80 rounded-2xl p-6 flex flex-col items-center justify-between shadow-sm hover:shadow-md transition-all text-center relative"
            >
              <div className="w-full flex flex-col items-center">
                {/* Circular Brand Logo */}
                <div className="w-16 h-16 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center relative overflow-hidden mb-4 shadow-sm">
                  <Image
                    src={seller.image}
                    alt={seller.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>

                {/* Brand Name */}
                <h3 className="text-sm font-bold text-gray-900 mb-2">
                  {seller.name}
                </h3>

                {/* Rating & Reviews */}
                <div className="flex items-center justify-center gap-1 text-[11px] text-gray-500 mb-5">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <span className="font-medium">({seller.reviews})</span>
                </div>
              </div>

              {/* Action Arrow Button */}
              <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors shadow-2xs">
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
