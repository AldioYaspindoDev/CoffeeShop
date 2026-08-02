import Image from "next/image"
import { galleryData } from "../data/galleryData"

export default function Gallery() {
    return (
        <section className="relative bg-[#1E1E1E] -mx-[30px] md:mx-0 p-6 py-16 md:p-20 rounded-3xl mb-20 overflow-hidden">

            {/* Dekorasi lingkaran latar */}
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-white opacity-5 rounded-full" />
            <div className="absolute -top-10 -right-24 w-96 h-96 bg-white opacity-5 rounded-full" />
            <div className="absolute -bottom-24 -left-16 w-80 h-80 bg-white opacity-5 rounded-full" />
            <div className="absolute -bottom-16 -right-20 w-64 h-64 bg-white opacity-5 rounded-full" />

            <div className="relative z-10 flex flex-col items-center gap-3 mb-10 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-white">Gallery Kita</h1>
                <h3 className="text-lg md:text-xl text-white/60">Temukan Setiap Momen Bersama Kamu</h3>
            </div>

            {/* Bento Grid */}
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* Gambar 1 (Col 1 on Mobile, Col 1 on Desktop) */}
                <div className="relative col-span-1 h-48 sm:h-64 rounded-2xl overflow-hidden">
                    <Image
                        src={galleryData[0].image}
                        alt="Gallery 1"
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        style={{ objectFit: "cover" }}
                        className="transition-transform duration-500 hover:scale-110"
                    />
                </div>

                {/* Gambar 2 (Col 2 on Mobile, Col 2 on Desktop) */}
                <div className="relative col-span-1 h-48 sm:h-64 rounded-2xl overflow-hidden">
                    <Image
                        src={galleryData[1].image}
                        alt="Gallery 2"
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        style={{ objectFit: "cover" }}
                        className="transition-transform duration-500 hover:scale-110"
                    />
                </div>

                {/* Gambar 3 (Full Width on Mobile, Col 3 on Desktop) */}
                <div className="relative col-span-2 md:col-span-1 h-48 sm:h-64 rounded-2xl overflow-hidden">
                    <Image
                        src={galleryData[2].image}
                        alt="Gallery 3"
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: "cover" }}
                        className="transition-transform duration-500 hover:scale-110"
                    />
                </div>

                {/* Gambar 4 (Full Width on Mobile, Col 1 & 2 on Desktop) */}
                <div className="relative col-span-2 h-48 sm:h-72 rounded-2xl overflow-hidden">
                    <Image
                        src={galleryData[3].image}
                        alt="Gallery 4"
                        fill
                        sizes="100vw"
                        style={{ objectFit: "cover" }}
                        className="transition-transform duration-500 hover:scale-110"
                    />
                </div>

                {/* Gambar 5 (Full Width on Mobile, Col 3 on Desktop) */}
                <div className="relative col-span-2 md:col-span-1 h-48 sm:h-72 rounded-2xl overflow-hidden">
                    <Image
                        src={galleryData[4].image}
                        alt="Gallery 5"
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: "cover" }}
                        className="transition-transform duration-500 hover:scale-110"
                    />
                </div>
            </div>
        </section>
    )
}
