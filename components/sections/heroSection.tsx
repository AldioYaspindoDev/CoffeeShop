"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, MapPin } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="px-4 pt-4 pb-4 flex flex-col gap-4">
      {/* Clean Mobile Card Banner */}
      <div className="bg-white border border-[#E8E8E8] rounded-xl p-5 shadow-xs flex flex-col gap-3">
        {/* Subtle Badge */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F7F7F7] border border-[#E8E8E8] text-[#707070] text-[11px] font-medium w-max">
          Digital Workspace & Coffee
        </div>

        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-[#1E1E1E] tracking-tight leading-snug">
            Kopi Pilihan & Digital Workspace Haven
          </h1>
          <p className="text-[#707070] text-xs leading-relaxed mt-1.5">
            Nikmati kopi berkualitas dalam suasana tenang untuk produktivitas dan inspirasi setiap hari.
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative w-full h-44 rounded-lg overflow-hidden border border-[#E8E8E8] bg-[#F7F7F7] my-1">
          <Image
            src="/kopkit/HeroImage.png"
            alt="COFFEE Coffee"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <Link
            href="/menu"
            className="flex-1 py-2.5 px-4 rounded-lg bg-[#1E1E1E] hover:bg-black text-white font-medium text-xs flex items-center justify-center gap-1.5 shadow-xs min-h-[40px] transition active:scale-98"
          >
            <span>Lihat Menu</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
          <a
            href="#location"
            className="py-2.5 px-4 rounded-lg bg-[#F7F7F7] hover:bg-[#E8E8E8] text-[#1E1E1E] font-medium text-xs flex items-center justify-center gap-1.5 min-h-[40px] border border-[#E8E8E8] transition active:scale-98"
          >
            <MapPin className="w-3.5 h-3.5 text-[#707070]" />
            Lokasi
          </a>
        </div>
      </div>
    </section>
  );
}
