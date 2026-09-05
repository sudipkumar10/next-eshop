import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "../shared/Container";
import Image from "next/image";

export function FeaturesSection() {
  const features = [
    {
      title: "Money Back Guarantee",
      description:
        "Explore skincare, cosmetics and self-care essentials from top brands —",
      image: "/default-image.avif",
      variant: "light",
    },
    {
      title: "24/7 Customer Support",
      description:
        "Explore skincare, cosmetics and self-care essentials from top brands —",
      image: "/default-image.avif",
      variant: "dark",
    },
    {
      title: "First & Free Shiping",
      description:
        "Explore skincare, cosmetics and self-care essentials from top brands —",
      image: "/default-image.avif",
      variant: "light",
    },
  ];

  return (
    <section className="w-full bg-white py-10 text-[#111827]">
      <Container>
        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((item, idx) => {
            const isDark = item.variant === "dark";
            return (
              <div
                key={idx}
                className={`rounded-2xl p-5 flex flex-col justify-between shadow-sm transition-all border ${
                  isDark
                    ? "bg-[#1A6B4C] text-white border-[#1A6B4C]"
                    : "bg-white text-gray-900 border-gray-200/80"
                }`}
              >
                {/* Title */}
                <h3
                  className={`text-sm font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  {item.title}
                </h3>

                {/* Icon + Description Side-by-Side */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#FAF3E0] border border-gray-100 flex-shrink-0 flex items-center justify-center relative overflow-hidden shadow-2xs">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-1.5"
                    />
                  </div>
                  <p
                    className={`text-[11px] font-medium leading-relaxed ${isDark ? "text-gray-200" : "text-gray-500"}`}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Button */}
                <div>
                  {isDark ? (
                    <Button className="bg-white text-[#1A6B4C] hover:bg-gray-100 rounded-full px-5 font-bold text-[11px] h-7 gap-1.5 shadow-none">
                      Explore more
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  ) : (
                    <Button className="bg-[#1A6B4C] hover:bg-[#257F5A] text-white rounded-full px-5 font-bold text-[11px] h-7 gap-1.5 shadow-none">
                      Explore more
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
