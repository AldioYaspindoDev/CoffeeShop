"use client"

export default function CtaAbout() {
    return (
        <section className="py-16 px-6 md:px-20 bg-white -mx-[30px] md:mx-[-30px]">
            <div className="max-w-[1400px] mx-auto">
                {/* Capsule Container */}
                <div className="relative overflow-hidden rounded-[80px] md:rounded-full bg-[#1E1E1E] py-20 px-6 md:px-16 text-center flex flex-col items-center justify-center min-h-[350px] md:min-h-[400px] shadow-lg">
                    
                    {/* Background Image with Pattern Overlay */}
                    <img 
                        src="/kopkit/ctaBackround.png" 
                        alt="Background Pattern" 
                        className="absolute inset-0 w-full h-full object-cover opacity-25 pointer-events-none filter blur-[1.5px]"
                    />
                    
                    {/* Overlay layer to dim and blur the background pattern further */}
                    <div className="absolute inset-0 bg-[#1E1E1E]/85 pointer-events-none" />

                    {/* Content (z-10 to stay above background image) */}
                    <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-4 md:gap-6">
                        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                            Siap untuk Pengalaman Baru?
                        </h2>
                        
                        <p className="text-white/60 text-sm md:text-base max-w-lg leading-relaxed font-medium">
                            Mulai hari ini dengan secangkir kopi terbaik di lingkungan yang mendukung kreativitasmu.
                        </p>
                        
                        <div className="mt-4">
                            <a 
                                href="https://maps.app.goo.gl/5cymV1hEAWsPMVtH6"
                                className="inline-block bg-[#EAEAEA] hover:bg-white text-black font-semibold px-8 py-3.5 rounded-full shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
                            >
                                Temukan Lokasi
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}