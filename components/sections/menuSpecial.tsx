"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { menuSpecialData } from "@/lib/data/menuSpecialData";
import { ChevronRight } from "lucide-react";

export default function MenuSpecial() {
  return (
    <section className="px-4 py-3 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-[#1E1E1E] tracking-tight">Menu Spesial</h2>
          <p className="text-[11px] text-[#707070]">Pilihan favorit pelanggan minggu ini</p>
        </div>
        <Link
          href="/menu"
          className="text-xs text-[#1E1E1E] font-medium flex items-center gap-0.5 min-h-[40px] px-1 hover:underline"
        >
          Lihat Semua
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Horizontal Carousel Cards */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1 snap-x snap-mandatory">
        {menuSpecialData.map((menu, idx) => (
          <div
            key={idx}
            className="shrink-0 w-56 snap-start bg-white border border-[#E8E8E8] rounded-xl overflow-hidden shadow-xs flex flex-col"
          >
            <div className="relative w-full h-70 bg-[#F7F7F7]">
              <Image
                src={menu.image}
                alt={menu.description}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-3 flex flex-col justify-between flex-1 gap-2">
              <h3 className="text-xs font-semibold text-[#1E1E1E] leading-snug line-clamp-2">
                {menu.description}
              </h3>
              <div className="flex items-center justify-between pt-1 border-t border-[#E8E8E8]">
                <span className="text-[10px] text-[#707070] font-medium">Spesial</span>
                <Link
                  href="/menu"
                  className="px-2.5 py-1 rounded-md bg-[#1E1E1E] hover:bg-black text-white text-[11px] font-medium transition active:scale-98 min-h-[32px] flex items-center justify-center"
                >
                  Pesan
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
