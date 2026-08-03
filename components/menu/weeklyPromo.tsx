"use client"

import { useRef } from "react"
import Image from "next/image"
import { menuData } from "@/lib/data/menuData"

export default function WeeklyPromo() {
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    // Filter only items that are best sellers
    const bestSellerMenus = menuData.filter((item) => item.isBestSeller)

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const { scrollLeft, clientWidth } = scrollContainerRef.current
            const scrollAmount = clientWidth * 0.75
            const scrollTo = direction === "left"
                ? scrollLeft - scrollAmount
                : scrollLeft + scrollAmount

            scrollContainerRef.current.scrollTo({
                left: scrollTo,
                behavior: "smooth"
            })
        }
    }

    return (
        <section className="py-12 px-6 md:px-20 bg-white">
            {/* Header section */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Promo Minggu Ini</h2>

                {/* Arrow navigation buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={() => scroll("left")}
                        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        aria-label="Scroll left"
                    >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        aria-label="Scroll right"
                    >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Scrollable container */}
            <div
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4"
                style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                }}
            >
                {bestSellerMenus.map((menu, idx) => (
                    <div
                        key={menu.id || idx}
                        className="min-w-[280px] sm:min-w-[340px] md:min-w-[380px] max-w-[400px] flex-shrink-0 snap-start bg-[#F8F9FA] border border-gray-100 rounded-[32px] p-5 flex flex-col justify-between hover:shadow-md transition-all duration-300"
                    >
                        {/* Image section */}
                        <div className="relative overflow-hidden rounded-[24px] aspect-[4/3] w-full">
                            <Image
                                src={menu.images}
                                alt={menu.productName}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-500"
                                sizes="(max-width: 640px) 280px, (max-width: 768px) 340px, 380px"/>
                            {menu.isBestSeller && (
                                <span className="absolute top-4 right-4 bg-black text-white text-[10px] md:text-xs font-bold tracking-wider px-3 py-1.5 rounded-full uppercase">
                                    Best Seller
                                </span>
                            )}
                        </div>

                        {/* Text and pricing section */}
                        <div className="mt-5">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-xl font-bold text-gray-900">{menu.productName}</h3>
                                <span className="text-xl font-bold text-gray-900">{menu.productPricing}</span>
                            </div>
                            <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                                {menu.productDestcription}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
