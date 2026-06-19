"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";

interface ServiceType {
    id: number;
    title: string;
    description: string;
    img: string;
    slug: string;
    details: string;
}

export default function Services() {
    const [services, setServices] = useState<ServiceType[]>([]);
    const [hovered, setHovered] = useState<number | null>(null);

    useEffect(() => {
        import("../../public/Services.json").then((data) => {
            setServices(data.default);
        });
    }, []);

    return (
        <section id="services" className="py-24 bg-[#f5f9ff]">
            <div className="text-center mb-10 px-4">
                <p className="text-[#4338ca] font-semibold tracking-widest text-sm">
                    OUR SERVICES
                </p>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 leading-snug">
                    Introduce Best <br />Services for Business
                </h2>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 md:px-10">

                {/* Hide Arrows on Mobile */}
                <div className="swiper-button-prev hidden md:block hover:scale-110 transition cursor-pointer"></div>
                <div className="swiper-button-next hidden md:block hover:scale-110 transition cursor-pointer"></div>

                <Swiper
                    modules={[Navigation, Autoplay]}
                    navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    }}
                    autoplay={{
                        delay: 1800,
                        disableOnInteraction: false,
                    }}
                    loop
                    speed={600}
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="!overflow-visible"
                >
                    {services.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div
                                className="group bg-white rounded-3xl shadow-xl p-6 md:px-8 text-center relative overflow-visible cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                                onMouseEnter={() => setHovered(item.id)}
                                onMouseLeave={() => setHovered(null)}
                            >
                                <Image
                                width={120}
                                height={90}
                                    src={item.img}
                                    alt={item.title}
                                    className="h-16 md:h-24 mx-auto mb-4 transition duration-300 group-hover:scale-110"
                                />

                                <h3 className="font-semibold text-lg md:text-xl mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-gray-500 text-sm md:text-base mb-10">
                                    {item.description}
                                </p>

                                {/* Floating Button */}
                                <Link href={`/Services/${item.id}`}>
                                    <button
                                        className={`bg-[#3730a3] text-white hover:bg-[#312e81] py-2 md:py-3 px-5 md:px-6 text-sm md:text-base rounded-full shadow-lg transition-all duration-300 absolute left-1/2 -translate-x-1/2 ${hovered === item.id ? "bottom-[-20px] opacity-100" : "bottom-[-60px] opacity-0"
                                            }`}
                                    >
                                        Learn More →
                                    </button>
                                </Link>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}

