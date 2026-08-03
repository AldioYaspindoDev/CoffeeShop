"use client"
import { menuSpecialData } from "@/lib/data/menuSpecialData"
import Image from "next/image"

export default function MenuSpecial() {
    return (
        <section className="bg-[#1E1E1E] -mx-[30px] md:mx-[-30px] py-16 px-6 md:px-20">
            <div className="flex flex-col items-center gap-3 text-center">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">Special Menu Kita</h1>
                </div>

                <div>
                    <h3 className="text-lg md:text-xl text-white/60">Temukan Menu Baru dan Promo Kami disini</h3>
                </div>
            </div>
            <div className="flex flex-row overflow-x-auto justify-start md:justify-center gap-6 md:gap-8 mt-12 max-w-[1400px] mx-auto w-full px-4 md:px-0 pb-4 snap-x snap-mandatory scrollbar-none">
                {menuSpecialData.map((menu, idx) => (
                    <div key={idx} className="flex flex-col items-center shrink-0 w-[260px] sm:w-[300px] md:w-[30%] max-w-[360px] snap-center">
                        <div className="overflow-hidden rounded-3xl w-full aspect-[3/4]">
                            <Image
                                src={menu.image}
                                width={450}
                                height={600}
                                alt={menu.description}
                                className="rounded-3xl border border-black/20 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                            />
                        </div>

                        <div className="mt-6 flex flex-col items-center text-center">
                            <h2 className="text-xl md:text-2xl font-semibold text-white">{menu.description}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
