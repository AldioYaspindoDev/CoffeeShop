"use client"

import { categoryData } from "../data/categoryData"

interface NavMenuProps {
    selectedCategory: string
    setSelectedCategory: (category: string) => void
}

export default function NavMenu({ selectedCategory, setSelectedCategory }: NavMenuProps) {
    return (
        <section className="py-6 px-4 md:px-20 bg-white">
            <div className="flex flex-wrap gap-3 sm:gap-4 items-center justify-center max-w-4xl mx-auto">
                {categoryData.map((data, idx) => {
                    const isActive = selectedCategory === data.menu
                    return (
                        <button
                            key={idx}
                            onClick={() => setSelectedCategory(data.menu)}
                            className={`rounded-full px-6 py-2.5 text-sm sm:text-base font-semibold tracking-wide transition-all duration-300 ${
                                isActive
                                    ? "bg-black text-white shadow-md transform scale-105"
                                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                            }`}
                        >
                            {data.menu}
                        </button>
                    )
                })}
            </div>
        </section>
    )
}