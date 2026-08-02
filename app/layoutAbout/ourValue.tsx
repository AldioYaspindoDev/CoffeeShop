"use client"

import { MdCoffeeMaker, MdChair } from "react-icons/md"
import { FaMoneyBillWave } from "react-icons/fa"
import { ourValueData } from "../data/ourValueData"

// Map string icon names to their respective React Icon components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    MdCoffeeMaker: MdCoffeeMaker,
    MdChair: MdChair,
    FaMoneyBillWave: FaMoneyBillWave,
}

export default function OurValue() {
    return (
        <section className="py-20 px-6 md:px-20 bg-[#F9F9F9] -mx-[30px] md:mx-[-30px]">
            <div className="max-w-[1400px] mx-auto">
                {/* Section Title */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">Visi & Nilai Kami</h2>
                    <p className="text-gray-500 mt-4 text-base md:text-lg max-w-2xl mx-auto font-medium">
                        Komitmen kami dalam memberikan pengalaman terbaik bagi produktivitas dan kenyamanan Anda.
                    </p>
                </div>

                {/* Values Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                    {ourValueData.map((data, idx) => {
                        const IconComponent = iconMap[data.icon]
                        return (
                            <div 
                                key={idx} 
                                className="bg-white p-8 md:p-10 rounded-[36px] border border-gray-100 flex flex-col items-center text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
                            >
                                {/* Icon Wrapper */}
                                <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {IconComponent && <IconComponent className="w-7 h-7" />}
                                </div>

                                {/* Title & Description */}
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                                    {data.title}
                                </h3>
                                <p className="text-gray-500 leading-relaxed text-sm md:text-base font-medium">
                                    {data.desription}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}