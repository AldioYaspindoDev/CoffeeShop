import Button from "../components/button"
import Image from "next/image"

export default function HeroAbout() {
    return (
        <section className="bg-white">
            <div className="flex mt-20 flex-col md:flex-row justify-between items-center px-6 py-16 md:py-24 md:px-20 gap-12 md:gap-16 max-w-[1400px] mx-auto">
                {/* Left Side: Content Text */}
                <div className="flex flex-col gap-6 md:gap-8 items-start text-left max-w-2xl w-full">
                    <div>
                        <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-black/50 bg-gray-100 px-4 py-2 rounded-full">
                            Cerita Kita
                        </span>
                    </div>
                    <div>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-black leading-tight">
                            Tentang KOPKIT
                        </h1>
                    </div>
                    <div className="text-gray-600 text-base md:text-lg leading-relaxed font-medium">
                        <p>
                            Di KopKit, kami percaya bahwa setiap tegukan kopi membawa cerita. 
                            Berawal dari keinginan sederhana untuk menciptakan ruang yang menjembatani 
                            kenyamanan rumah dan produktivitas kantor, KopKit hadir di tengah kesibukan 
                            kota sebagai <span className="text-black font-semibold">'Your Digital Workspace Haven'</span>.
                        </p>
                        <p className="mt-4">
                            Kami tidak hanya menyajikan kopi berkualitas, tapi juga menyediakan 
                            atmosfer yang hangat untuk Anda berkreasi, berkolaborasi, dan bersantai.
                        </p>
                    </div>
                    <div className="w-full md:w-auto pt-2">
                        <Button className="w-full md:w-auto py-3 px-8 text-base">
                            Explore Lokasi
                        </Button>
                    </div>
                </div>

                {/* Right Side: Hero Image with Premium Styling */}
                <div className="w-full max-w-[360px] sm:max-w-[450px] md:max-w-[500px] flex-shrink-0">
                    <div className="relative aspect-square sm:aspect-[4/3] md:aspect-[1/1] w-full rounded-[40px] overflow-hidden shadow-2xl border border-gray-100">
                        <img
                            src="/kopkit/HeroAbout.jpg"
                            alt="Tentang Kopkit Workspace & Cafe"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}