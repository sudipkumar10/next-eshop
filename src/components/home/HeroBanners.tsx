import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "../shared/Container";
import Image from "next/image";

export function HeroBanners() {
  return (
    <Container className="py-4">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[2fr_1fr]">
        {/* =====================================================
            LEFT SIDE
        ====================================================== */}
        <div className="grid grid-rows-[1.35fr_1fr] gap-3">
          {/* =================================================
              LARGE HORIZONTAL BANNER
          ================================================== */}
          <div className="relative min-h-[300px] overflow-hidden rounded-2xl bg-[#E2E8FF]">
            {/* Text */}
            <div className="absolute left-7 top-1/2 z-20 w-[42%] -translate-y-1/2">
              <div className="mb-3 flex items-center gap-1">
                <span className="text-md font-semibold text-[#111827]">
                  Supper Sale
                </span>

                <Badge className="rounded-full border-0  px-3 py-1.5 text-sm font-bold shadow-none hover:bg-accent bg-accent text-green-600">
                  50%
                </Badge>
              </div>

              <h2 className="mb-2 text-2xl font-black leading-[1.05] tracking-tight text-[#111827] md:text-3xl">
                Stylish Beauty Picks
                <br />
                For Every Season
              </h2>

              <p className="mb-5 max-w-[300px] text-xs leading-relaxed text-gray-600">
                Clean, hydrate, and protect your skin with trusted beauty
                essentials.
              </p>

              <Button className="h-9 rounded-full bg-primary px-6 text-[10px] font-bold text-white shadow-none hover:bg-secondary">
                Shop Now
              </Button>
            </div>

            {/* WIDE PRODUCT IMAGE */}
            <div className="absolute right-5 top-1/2 h-[85%] w-[55%] -translate-y-1/2">
              <Image
                src="/default-image.png"
                alt="Stylish Beauty Picks"
                fill
                priority
                className="object-contain object-right"
              />
            </div>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
              <span className="h-2 w-5 rounded-full bg-primary" />
              <span className="h-2 w-2 rounded-full bg-gray-300" />
              <span className="h-2 w-2 rounded-full bg-gray-300" />
            </div>
          </div>

          {/* =================================================
              TWO SMALL HORIZONTAL BANNERS
          ================================================== */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* ---------------- MAKEUP ---------------- */}
            <div className="relative min-h-[210px] overflow-hidden rounded-2xl bg-[#F2F5C4]">
              <div className="absolute left-6 top-1/2 z-20 w-[45%] -translate-y-1/2">
                <div className="mb-3 flex items-center gap-1">
                  <span className="text-md font-semibold text-[#111827]">
                    Supper Sale
                  </span>

                  <Badge className="rounded-full border-0 px-3 py-1.5 text-sm font-bold shadow-none hover:bg-accent bg-accent text-green-600">
                    20%
                  </Badge>
                </div>

                <h3 className="mb-3 text-xl font-black leading-tight text-[#111827]">
                  Makeup Must
                  <br />
                  Haves
                </h3>

                <Button className="h-8 rounded-full bg-primary px-5 text-[9px] font-bold text-white shadow-none hover:bg-secondary">
                  Shop Now
                </Button>
              </div>

              {/* WIDE IMAGE */}
              <div className="absolute right-3 top-1/2 h-[80%] w-[58%] -translate-y-1/2">
                <Image
                  src="/default-image.png"
                  alt="Makeup Must Haves"
                  fill
                  className="object-contain object-right"
                />
              </div>
            </div>

            {/* ---------------- SKIN ---------------- */}
            <div className="relative min-h-[210px] overflow-hidden rounded-2xl bg-[#D9F3FA]">
              <div className="absolute left-6 top-1/2 z-20 w-[45%] -translate-y-1/2">
                <div className="mb-3 flex items-center gap-1">
                  <span className="text-md font-semibold text-[#111827]">
                    Supper Sale
                  </span>

                  <Badge className="rounded-full border-0 px-3 py-1.5 text-sm font-bold shadow-none hover:bg-accent bg-accent text-green-600">
                    10%
                  </Badge>
                </div>

                <h3 className="mb-3 text-xl font-black leading-tight text-[#111827]">
                  Skin
                  <br />
                  Careness
                </h3>

                <Button className="h-8 rounded-full bg-primary px-5 text-[9px] font-bold text-white shadow-none hover:bg-secondary">
                  Shop Now
                </Button>
              </div>

              {/* WIDE IMAGE */}
              <div className="absolute right-2 top-1/2 h-[78%] w-[58%] -translate-y-1/2">
                <Image
                  src="/default-image.png"
                  alt="Skin Careness"
                  fill
                  className="object-contain object-right"
                />
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            RIGHT VERTICAL BANNER
        ====================================================== */}
        <div className="relative min-h-[525px] overflow-hidden rounded-2xl bg-[#E7F8CC]">
          {/* Text */}
          <div className="absolute left-7 top-7 z-20">
            <div className="mb-3 flex items-center gap-1">
              <span className="text-md font-semibold text-[#111827]">
                Supper Sale
              </span>

              <Badge className="rounded-full border-0 bg-accent px-3 py-1.5 text-sm font-bold shadow-none hover:bg-accent  text-green-600">
                40%
              </Badge>
            </div>

            <h2 className="text-2xl font-black leading-[1.05] tracking-tight text-[#111827] md:text-3xl">
              Glow That
              <br />
              Never Fades
            </h2>

            <Button className="mt-5 h-9 rounded-full bg-primary px-6 text-[10px] font-bold text-white shadow-none hover:bg-secondary">
              Shop Now
            </Button>
          </div>

          {/* TALL PRODUCT IMAGE */}
          <div className="absolute bottom-10 left-1/2 h-[55%] w-[80%] -translate-x-1/2">
            <Image
              src="/default-image.png"
              alt="Glow That Never Fades"
              fill
              className="object-contain object-bottom"
            />
          </div>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
            <span className="h-2 w-5 rounded-full bg-primary" />
            <span className="h-2 w-2 rounded-full bg-gray-300" />
            <span className="h-2 w-2 rounded-full bg-gray-300" />
          </div>
        </div>
      </div>
    </Container>
  );
}
