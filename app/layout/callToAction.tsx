export default function CallToAction() {
    return (
        <section className="px-6 py-10 md:px-20">
            <div className="relative flex flex-col items-center justify-center bg-[#1E1E1E] max-w-5xl mx-auto gap-8 py-16 md:py-20 px-6 md:px-16 rounded-3xl md:rounded-full overflow-hidden text-center">

                {/* Dekorasi lingkaran latar */}
                <div className="absolute -top-16 -left-16 w-64 h-64 bg-white opacity-5 rounded-full" />
                <div className="absolute -bottom-20 -right-16 w-80 h-80 bg-white opacity-5 rounded-full" />

                {/* Teks */}
                <div className="relative z-10 flex flex-col gap-2">
                    <p className="text-white/60 text-sm md:text-lg tracking-widest uppercase">Sudah siap?</p>
                    <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                        Tunggu Apa Lagi Ayo !
                    </h2>
                    <h3 className="text-2xl md:text-4xl font-bold text-white/80">
                        Hangout di KOPKIT
                    </h3>
                </div>

                {/* Tombol */}
                <a
                    href="/menu"
                    className="relative z-10 bg-white text-[#1E1E1E] font-semibold text-base md:text-lg px-8 py-3.5 md:px-10 md:py-4 rounded-full transition-all duration-300 hover:bg-[#1E1E1E] hover:text-white hover:outline hover:outline-2 hover:outline-white hover:scale-105 w-full md:w-auto"
                >
                    Lihat Menu →
                </a>
            </div>
        </section>
    )
}
