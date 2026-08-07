"use client";

import React from "react";
import { ourValueData } from "@/lib/data/ourValueData";
import { Coffee, Armchair, Banknote } from "lucide-react";

export default function OurValue() {
  const getIcon = (idx: number) => {
    if (idx === 0) return Coffee;
    if (idx === 1) return Armchair;
    return Banknote;
  };

  return (
    <section className="px-4 py-2 flex flex-col gap-2.5">
      <div>
        <h2 className="text-sm font-bold text-[#1E1E1E] tracking-tight">Visi & Nilai Kami</h2>
      </div>

      <div className="flex flex-col gap-2">
        {ourValueData.map((data, idx) => {
          const IconComp = getIcon(idx);
          return (
            <div
              key={idx}
              className="bg-white border border-[#E8E8E8] rounded-xl p-3.5 shadow-xs flex items-start gap-3"
            >
              <div className="p-2 rounded-lg bg-[#F7F7F7] border border-[#E8E8E8] text-[#1E1E1E] shrink-0">
                <IconComp className="w-4 h-4" />
              </div>

              <div>
                <h3 className="text-xs font-semibold text-[#1E1E1E] mb-0.5">{data.title}</h3>
                <p className="text-[11px] text-[#707070] leading-relaxed">
                  {data.desription}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
