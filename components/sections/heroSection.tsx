"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, MapPin } from "lucide-react";
import { heroImageData } from "@/lib/data/heroImageData";

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!heroImageData || heroImageData.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImageData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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

        {/* Hero Image Auto Carousel */}
        <div className="relative w-full h-72 rounded-lg overflow-hidden border border-[#E8E8E8] bg-[#F7F7F7] my-1">
          <div
            className="flex w-full h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {heroImageData.map((data, idx) => (
              <div key={idx} className="relative w-full h-full shrink-0">
                <Image
                  src={data.image}
                  alt={`COFFEE Slide ${idx + 1}`}
                  fill
                  className="object-cover"
                  priority={idx === 0}
                />
              </div>
            ))}
          </div>

          {/* Carousel Indicators / Dots */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
            {heroImageData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? "w-5 bg-white shadow" : "w-1.5 bg-white/60"
                }`}
                aria-label={`Ke slide ${idx + 1}`}
              />
            ))}
          </div>
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
