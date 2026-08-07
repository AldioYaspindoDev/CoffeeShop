"use client";

import React from "react";
import { locationData } from "@/lib/data/locationData";
import { MapPin, Navigation } from "lucide-react";

export default function Location() {
  return (
    <section id="location" className="px-4 py-3 flex flex-col gap-3">
      <div>
        <h2 className="text-base font-bold text-[#1E1E1E] tracking-tight">Lokasi Toko Kopi</h2>
        <p className="text-[11px] text-[#707070]">Cabang Coffee terdekat Anda</p>
      </div>

      {/* Embedded Google Maps Container */}
      <div className="w-full h-44 rounded-xl overflow-hidden border border-[#E8E8E8] bg-[#F7F7F7]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6511988.520441004!2d-124.60181457542323!3d37.16026274770206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb9fe5f285e3d%3A0x8b5109a227086f55!2sCalifornia%2C%20Amerika%20Serikat!5e0!3m2!1sid!2sid!4v1786072815751!5m2!1sid!2sid"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="w-full h-full"
        />
      </div>

      {/* Location Cards */}
      <div className="flex flex-col gap-2">
        {locationData.map((data, idx) => (
          <div
            key={idx}
            className="bg-white border border-[#E8E8E8] rounded-xl p-3.5 shadow-xs flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#1E1E1E] shrink-0" />
                <h3 className="text-xs font-semibold text-[#1E1E1E]">{data.locationName}</h3>
              </div>
              <span className="text-[10px] bg-[#F7F7F7] text-[#707070] border border-[#E8E8E8] px-2 py-0.5 rounded-md font-medium">
                Buka
              </span>
            </div>

            <p className="text-[11px] text-[#707070] leading-relaxed pl-5">
              {data.locationDetail}
            </p>

            <div className="pt-1 flex justify-end">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(data.locationName + " " + data.locationDetail)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#F7F7F7] hover:bg-[#E8E8E8] text-[#1E1E1E] text-xs font-medium flex items-center gap-1 min-h-[36px] transition active:scale-98 border border-[#E8E8E8]"
              >
                <Navigation className="w-3.5 h-3.5" />
                Petunjuk Arah
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
