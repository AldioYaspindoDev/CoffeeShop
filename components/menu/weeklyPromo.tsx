"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { menuData } from "@/lib/data/menuData";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function WeeklyPromo() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const bestSellerMenus = menuData.filter((item) => item.isBestSeller);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      const scrollTo =
        direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="px-4 py-3 flex flex-col gap-2.5">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-sm font-bold text-[#1E1E1E] tracking-tight">Promo Minggu Ini</h2>
        </div>

        <div className="flex gap-1">
          <button
            onClick={() => scroll("left")}
            className="w-7 h-7 rounded-lg bg-[#F7F7F7] border border-[#E8E8E8] flex items-center justify-center text-[#707070] hover:text-[#1E1E1E] transition active:scale-98"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-7 h-7 rounded-lg bg-[#F7F7F7] border border-[#E8E8E8] flex items-center justify-center text-[#707070] hover:text-[#1E1E1E] transition active:scale-98"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex gap-2.5 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-1"
      >
        {bestSellerMenus.map((menu, idx) => (
          <div
            key={menu.id || idx}
            className="min-w-[220px] max-w-[240px] flex-shrink-0 snap-start bg-white border border-[#E8E8E8] rounded-xl p-3 flex flex-col justify-between shadow-xs"
          >
            <div className="relative overflow-hidden rounded-lg aspect-[4/3] w-full bg-[#F7F7F7]">
              <Image
                src={menu.images}
                alt={menu.productName}
                fill
                className="object-cover"
                sizes="240px"
              />
              <span className="absolute top-2 right-2 bg-white/90 border border-[#E8E8E8] text-[#1E1E1E] text-[9px] font-semibold px-2 py-0.5 rounded uppercase">
                Promo
              </span>
            </div>

            <div className="mt-2 flex flex-col gap-0.5">
              <div className="flex justify-between items-start">
                <h3 className="text-xs font-semibold text-[#1E1E1E] leading-tight line-clamp-1">
                  {menu.productName}
                </h3>
                <span className="text-xs font-bold text-[#1E1E1E] shrink-0 ml-1">
                  {menu.productPricing}
                </span>
              </div>
              <p className="text-[11px] text-[#707070] line-clamp-2 leading-tight">
                {menu.productDestcription}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
