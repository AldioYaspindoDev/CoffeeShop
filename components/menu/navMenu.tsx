"use client";

import React from "react";
import { categoryData } from "@/lib/data/categoryData";

interface NavMenuProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export default function NavMenu({ selectedCategory, setSelectedCategory }: NavMenuProps) {
  return (
    <section className="px-4 py-2 sticky top-[53px] z-30 bg-white/95 backdrop-blur-xs border-b border-[#E8E8E8]">
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
        {categoryData.map((data, idx) => {
          const isActive = selectedCategory === data.name;
          return (
            <button
              key={idx}
              onClick={() => setSelectedCategory(data.name)}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition active:scale-98 min-h-[36px] flex items-center justify-center shrink-0 ${
                isActive
                  ? "bg-[#1E1E1E] text-white shadow-xs"
                  : "bg-[#F7F7F7] hover:bg-[#E8E8E8] text-[#707070] border border-[#E8E8E8]"
              }`}
            >
              {data.name}
            </button>
          );
        })}
      </div>
    </section>
  );
}
