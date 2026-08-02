import Image from "next/image"
import Link from "next/link"

export default function Footer() {
    return (
        /* Menggunakan margin negatif responsif agar pas dengan padding root di globals.css */
        <footer className="bg-[#1E1E1E] -mx-6 md:-mx-[30px] -mb-6 md:-mb-[30px] mt-10 px-6 md:px-20 pt-16 pb-8">

            {/* Baris utama footer */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16 mb-12 max-w-[1400px] mx-auto">

                {/* Kiri — Logo + Tagline */}
                <div className="flex flex-col gap-4 max-w-xs w-full">
                    <div className="relative w-36 h-20">
                        <Image
                            src="/kopkit/logowhite.png"
                            alt="Logo KopKit"
                            fill
                            style={{ objectFit: "contain" }}
                            sizes="180px"
                        />
                    </div>
                    <p className="text-white text-xl md:text-2xl leading-snug">
                        Toko Kopi Kita Coffee Workspace &amp; Hangout
                    </p>
                </div>

                {/* Kanan — Kolom navigasi */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 md:gap-16 w-full lg:w-auto">

                    {/* Lokasi */}
                    <div className="flex flex-col gap-3">
                        <h4 className="text-white text-xl md:text-2xl font-bold mb-1">Lokasi</h4>
                        {["Abdul Muis", "Veteran", "Alahan Panjang", "Sutomo", "Jhoni Anwar", "Gunung Panggilun", "Fabriek Padang", "Pondok"].map((loc) => (
                            <Link key={loc} href="#" className="text-white/60 text-sm md:text-base hover:text-white transition-colors duration-200">
                                {loc}
                            </Link>
                        ))}
                    </div>

                    {/* Menu */}
                    <div className="flex flex-col gap-3">
                        <h4 className="text-white text-xl md:text-2xl font-bold mb-1">Menu</h4>
                        {["Kopi", "Makanan", "Snack", "Non-kopi"].map((menu) => (
                            <Link key={menu} href="#" className="text-white/60 text-sm md:text-base hover:text-white transition-colors duration-200">
                                {menu}
                            </Link>
                        ))}
                    </div>

                    {/* Kontak */}
                    <div className="flex flex-col gap-3 col-span-2 sm:col-span-1">
                        <h4 className="text-white text-xl md:text-2xl font-bold mb-1">Kontak</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-1 gap-3">
                            {["Instagram", "TikTok", "Facebook", "Whatsapp", "Email"].map((kontak) => (
                                <Link key={kontak} href="#" className="text-white/60 text-sm md:text-base hover:text-white transition-colors duration-200">
                                    {kontak}
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* Garis pemisah */}
            <hr className="border-white/10 mb-6 max-w-[1400px] mx-auto" />

            {/* Copyright */}
            <p className="text-white/40 text-xs md:text-sm text-center">
                © 2026 Toko Kopi Kita. All rights reserved.
            </p>

        </footer>
    )
}
