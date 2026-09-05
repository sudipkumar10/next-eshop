import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function LowerBanners() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Banner */}
      <div className="bg-[#eaf4f1] rounded-2xl p-6 md:p-8 flex items-center justify-between border border-[#d3e5e0] relative overflow-hidden">
        <div className="max-w-[200px] z-10">
          <Badge className="bg-[#f59e0b] text-black font-semibold text-xs mb-2 hover:bg-[#f59e0b]">
            Supper Sale 50%
          </Badge>
          <h3 className="text-xl md:text-2xl font-bold text-[#111827] mb-3 leading-tight">
            Glow That Never Fades
          </h3>
          <Button className="bg-[#1b4d3e] text-white hover:bg-[#14382d] rounded-full px-5 text-xs">
            Shop Now
          </Button>
        </div>
        <div className="flex items-center gap-2 z-10">
          <div className="w-24 h-28 bg-white shadow-md rounded-xl p-2 flex items-center justify-center text-xs">
            ✨
          </div>
        </div>
      </div>

      {/* Right Banner */}
      <div className="bg-[#fcf8ec] rounded-2xl p-6 md:p-8 flex items-center justify-between border border-[#f3e7c4] relative overflow-hidden">
        <div className="max-w-[200px] z-10">
          <Badge className="bg-[#f59e0b] text-black font-semibold text-xs mb-2 hover:bg-[#f59e0b]">
            Supper Sale 50%
          </Badge>
          <h3 className="text-xl md:text-2xl font-bold text-[#111827] mb-3 leading-tight">
            Skincare Essentials
          </h3>
          <Button className="bg-[#1b4d3e] text-white hover:bg-[#14382d] rounded-full px-5 text-xs">
            Shop Now
          </Button>
        </div>
        <div className="flex items-center gap-2 z-10">
          <div className="w-24 h-28 bg-white shadow-md rounded-xl p-2 flex items-center justify-center text-xs">
            🌿
          </div>
        </div>
      </div>
    </section>
  );
}
