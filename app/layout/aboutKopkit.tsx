"use client"
import Image from "next/image"

export default function AboutKopkit(){
    return(
        <section className="flex flex-col md:flex-row p-6 py-16 md:p-20 items-center gap-10 md:gap-20 max-w-[1400px] mx-auto">
            <div className="w-full max-w-[320px] sm:max-w-[450px] md:max-w-[500px]">
                <Image
                    src="/kopkit/aboutkopkit.png"
                    width={500}
                    height={500}
                    alt="about kopkit image"
                    style={{ width: "100%", height: "auto" }}
                />
            </div>

            <div className="flex flex-col gap-6 md:gap-10 text-center md:text-left max-w-xl">
                <h2 className="text-3xl md:text-5xl font-bold text-black">Toko Kopi Kita?</h2>
                <p className="text-lg md:text-2xl text-black/70 leading-relaxed">
                    KopKit hadir sebagai tempat workspace dan hangout nyaman di mana kopi berkualitas bertemu suasana tenang. Lengkapi sesi produktifmu dengan sajian makanan spesial dari Kami.
                </p>
            </div>
        </section>
    )
}