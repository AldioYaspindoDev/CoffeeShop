import Button from "../components/button"
import Image from "next/image"

export default function HeroSection(){
    return(
        <div className="flex flex-col md:flex-row justify-between items-center px-6 py-24 md:p-20 gap-10 md:gap-16 max-w-[1400px] mx-auto mt-20">
            <div className="flex flex-col gap-6 md:gap-10 text-center md:text-left items-center md:items-start max-w-2xl">
                <div>
                    <p className="text-2xl md:text-4xl text-black/80 font-medium">Toko Kopi Kita</p>
                </div>
                <div>
                    <h1 className="text-[clamp(4rem,15vw,9rem)] font-bold tracking-tight leading-none text-black font-project-note">
                        KOPKIT
                    </h1>
                </div>
                <div className="text-lg md:text-2xl text-black/70">
                    <h2>Nikmati Kopi Pilihan di Ruang Kerja Yang Tenang atau Sudut Santai Untuk Berbagi Cerita</h2>
                </div>
                <div className="w-full md:w-auto">
                    <Button className="w-full md:w-auto py-4 px-8 text-lg">Lihat Menu</Button>
                </div>
            </div>

            <div className="hidden md:block w-full max-w-[320px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px]">
                <Image
                    width={400}
                    height={400}
                    src="/kopkit/HeroImage.png"
                    alt="Hero Section Image Kopkit"
                    priority
                    className="w-full h-auto"
                    style={{ height: "auto" }}
                />
            </div>
        </div>
    )
}