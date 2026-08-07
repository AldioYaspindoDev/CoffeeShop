"use client";

import React from "react";
import Image from "next/image";
import { galleryData } from "@/lib/data/galleryData";

export default function Gallery() {
  return (
    <section className="px-4 py-3 flex flex-col gap-3">
      <div>
        <h2 className="text-base font-bold text-[#1E1E1E] tracking-tight">Galeri Coffee</h2>
        <p className="text-[11px] text-[#707070]">Suasana & momen di Coffee</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {galleryData.map((item, idx) => (
          <div
            key={idx}
            className={`relative rounded-xl overflow-hidden border border-[#E8E8E8] bg-[#F7F7F7] shadow-xs ${
              idx === 0 ? "col-span-2 h-100" : "col-span-1 h-32"
            }`}
          >
            <Image
              src={item.image}
              alt={`Gallery ${idx + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
