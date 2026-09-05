import { Button } from "@/components/ui/button";
import { Container } from "../shared/Container";
import Image from "next/image";

export function PromoBanner() {
  return (
    <section className="w-full bg-white py-6">
      <Container>
        <div className="bg-[#1A6B4C] rounded-3xl py-10 px-8 md:px-16 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-sm">
          {/* Left Side: Product Lineup Image */}
          <div className="relative w-full md:w-[45%] h-[200px] md:h-[240px] flex items-center justify-center mb-6 md:mb-0">
            <Image
              src="/default-image.avif"
              alt="Premium Skincare Routine"
              fill
              className="object-contain drop-shadow-lg"
            />
          </div>

          {/* Right Side: Text & Button */}
          <div className="w-full md:w-[50%] flex flex-col items-center md:items-center text-center z-10">
            <h2 className="text-2xl md:text-4xl font-normal tracking-tight text-white mb-3 leading-tight">
              Premium <br /> Skincare Routine
            </h2>
            <p className="text-xs md:text-sm text-gray-200 mb-6 font-normal max-w-sm leading-relaxed">
              Nourish, hydrate, and protect your skin with clean beauty for
              everyday care.
            </p>
            <Button className="bg-white text-[#1A6B4C] hover:bg-gray-100 rounded-full px-8 font-bold text-xs h-10 shadow-none">
              Shop Now
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
