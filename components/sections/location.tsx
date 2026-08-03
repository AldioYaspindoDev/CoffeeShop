import { HiLocationMarker } from "react-icons/hi"
import { locationData } from "@/lib/data/locationData"

export default function Location() {
    return (
        <section className="flex flex-col gap-10 px-6 py-16 md:p-20 max-w-[1400px] mx-auto">
            <div className="flex flex-col items-center gap-3 text-center">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-black">Lokasi Toko Kopi Kita</h1>
                </div>

                <div>
                    <h3 className="text-lg md:text-xl text-black/70">Temukan Kami di Lokasi Berikut ini ya</h3>
                </div>
            </div>

            <div className="flex flex-col items-center w-full">
                <div className="w-full max-w-[800px] aspect-video rounded-xl overflow-hidden outline-2 outline-offset-2 outline-black">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d35657.57550221389!2d100.37786998612893!3d-0.920869219480557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sKOPKIT!5e0!3m2!1sid!2sid!4v1785556472857!5m2!1sid!2sid"
                        className="w-full h-full"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin"
                    ></iframe>
                </div>
            </div>

            <div className="flex flex-col items-center w-full px-0 md:px-20">
                <div className="w-full max-w-3xl">
                    {locationData.map((data, idx) => (
                        <div key={idx}>
                            {idx !== 0 && <hr className="border-gray-200" />}

                            <div className="flex flex-col md:grid md:grid-cols-[40px_200px_1fr] items-start md:items-center gap-3 md:gap-6 py-6 text-left">
                                <div className="flex items-center gap-3 md:contents">
                                    <div className="text-2xl text-red-500">
                                        <HiLocationMarker />
                                    </div>

                                    <h2 className="text-xl md:text-2xl font-bold leading-tight text-black">
                                        {data.locationName}
                                    </h2>
                                </div>

                                <p className="text-sm md:text-base text-black/60 leading-relaxed pl-9 md:pl-0">
                                    {data.locationDetail}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
