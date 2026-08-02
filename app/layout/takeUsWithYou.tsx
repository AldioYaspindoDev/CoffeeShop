import { takeuswithyouData } from "../data/takeuswithyoudata"
import Image from "next/image"

export default function TakeUsWithYou() {
    return (
        <section className="px-6 py-16 md:p-20 max-w-[1400px] mx-auto">
            <div className="flex flex-col items-center gap-3 text-center mb-12">
                <h1 className="text-3xl md:text-5xl font-bold text-black">Take Us With You</h1>
                <h3 className="text-lg md:text-2xl text-black/70">Bawa Kami Dalam Setiap Keseharianmu</h3>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-12 items-stretch">
                {takeuswithyouData.map((data, idx) => (
                    <div key={idx} className="flex flex-col items-center bg-white rounded-3xl p-6 shadow-sm border border-black/5 hover:shadow-md transition-shadow duration-300 w-full md:w-[30%] max-w-[360px] mx-auto">
                        <div className="flex flex-col items-center w-full aspect-square overflow-hidden rounded-2xl mb-6">
                            <Image
                                src={data.image}
                                width={300}
                                height={300}
                                alt={data.title}
                                style={{ width: "100%", height: "auto", objectFit: "contain" }}
                            />
                        </div>

                        <div className="flex flex-col items-center justify-center text-center px-4">
                            <h2 className="text-xl font-bold mb-3 text-black">{data.title}</h2>
                            <p className="text-sm md:text-base text-black/60 leading-relaxed">{data.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}