"use client"

import { locationData } from "@/lib/data/locationData"
import { LuSquareArrowOutUpRight } from "react-icons/lu"
import { HiOutlineMapPin } from "react-icons/hi2"

export default function FullLocation2() {
    return (
        <section className="py-20 px-6 md:px-20 bg-white">
            <div className="max-w-[1400px] mx-auto">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">Lokasi KopKit</h2>
                        <p className="text-gray-500 mt-2 text-base md:text-lg">
                            Temukan cabang terdekat untuk mulai berkreasi dan menikmati kopi kami.
                        </p>
                    </div>

                    <a
                        href="https://maps.app.goo.gl/r96rFmXhFP87tJcW6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-black font-semibold border-b-2 border-black pb-1 hover:opacity-75 transition-opacity self-start md:self-auto"
                    >
                        <span>Buka di Google Maps</span>
                        <LuSquareArrowOutUpRight className="w-4 h-4" />
                    </a>
                </div>

                {/* Locations Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {locationData.map((data, idx) => {
                        const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.locationName + " Padang " + data.locationDetail)}`

                        return (
                            <div
                                key={idx}
                                className="bg-[#F8F9FA] rounded-[32px] p-6 border border-gray-100 flex flex-col justify-between hover:bg-white hover:shadow-xl hover:border-gray-200/60 transition-all duration-350 group"
                            >
                                <div>
                                    {/* Icon & Title */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 group-hover:bg-[#EAEAEA] group-hover:text-black transition-colors duration-300">
                                            <HiOutlineMapPin className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 leading-tight">
                                            Cabang {data.locationName}
                                        </h3>
                                    </div>

                                    {/* Detail Address */}
                                    <p className="text-sm text-gray-500 leading-relaxed font-medium mb-6">
                                        {data.locationDetail}
                                    </p>
                                </div>

                                {/* Get Directions Link */}
                                <a
                                    href={directionsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-xs font-bold text-gray-900 group-hover:text-black transition-colors"
                                >
                                    <span>Petunjuk Arah</span>
                                    <LuSquareArrowOutUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </a>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
