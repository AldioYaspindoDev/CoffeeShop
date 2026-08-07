"use client";

import React from "react";
import { locationData } from "@/lib/data/locationData";
import { Navigation } from "lucide-react";

export default function FullLocation2() {
  return (
    <section className="px-4 py-2 flex flex-col gap-2.5">
      <div>
        <h2 className="text-sm font-bold text-[#1E1E1E] tracking-tight">Semua Cabang</h2>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {locationData.map((data, idx) => {
          const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            data.locationName + " Padang " + data.locationDetail
          )}`;

          return (
            <div
              key={idx}
              className="bg-white border border-[#E8E8E8] rounded-xl p-3 shadow-xs flex items-center justify-between gap-2"
            >
              <div>
                <h3 className="text-xs font-semibold text-[#1E1E1E]">Cabang {data.locationName}</h3>
                <p className="text-[11px] text-[#707070] leading-tight mt-0.5 line-clamp-1">
                  {data.locationDetail}
                </p>
              </div>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-[#F7F7F7] hover:bg-[#E8E8E8] text-[#1E1E1E] shrink-0 flex items-center justify-center min-h-[32px] min-w-[32px] transition active:scale-98 border border-[#E8E8E8]"
                aria-label="Petunjuk Arah"
              >
                <Navigation className="w-3.5 h-3.5" />
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
