"use client";

import React from "react";
import Image from "next/image";
import { takeuswithyouData } from "@/lib/data/takeuswithyouData";

export default function TakeUsWithYou() {
  return (
    <section className="px-4 py-3 flex flex-col gap-3">
      <div>
        <h2 className="text-base font-bold text-[#1E1E1E] tracking-tight">Take Us With You</h2>
        <p className="text-[11px] text-[#707070]">Produk & kemasan praktis Coffee</p>
      </div>

      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1 snap-x snap-mandatory">
        {takeuswithyouData.map((data, idx) => (
          <div
            key={idx}
            className="shrink-0 w-60 snap-start bg-white border border-[#E8E8E8] rounded-xl p-3.5 shadow-xs flex flex-col items-center text-center gap-2"
          >
            <div className="relative w-full h-32 rounded-lg overflow-hidden bg-[#F7F7F7] border border-[#E8E8E8] flex items-center justify-center p-2">
              <Image
                src={data.image}
                alt={data.title}
                fill
                className="object-contain p-2"
              />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-[#1E1E1E] mb-0.5">{data.title}</h3>
              <p className="text-[11px] text-[#707070] leading-relaxed line-clamp-2">
                {data.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
