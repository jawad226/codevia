"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import facultyData from "../../public/Faculty.json";

interface TeacherType {
  name: string;
  role: string;
  img: string;
  description: string;
}

export default function Faculty() {
  return (
    <section id="faculty" className="py-20 bg-gradient-to-b from-[#F9FAFB] to-[#EEF2F6]">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[#082542] mb-12">
          Meet Our <span className="text-[#4338ca]">Expert Faculty</span>
        </h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          className="max-w-3xl mx-auto"
        >
          {facultyData.map((teacher: TeacherType, index: number) => (
            <SwiperSlide key={index}>
              <div className="bg-white/80 md:backdrop-blur-xl rounded-3xl transition-all duration-500 p-10 border-[#082542]">
                <div className="w-40 h-40 mx-auto mb-6 relative group">
                  <Image
                    src={teacher.img}
                    alt={teacher.name}
                    width={400}
                    height={400}
                    loading="lazy"
                    className="rounded-full border-2 border-gray-700 object-cover transition-transform duration-500 md:group-hover:scale-105"
                  />
                  <div className="absolute inset-0 rounded-full bg-[#D79F29]/10 opacity-0  transition-opacity"></div>
                </div>

                <h3 className="text-2xl font-semibold text-[#082542] mb-1">
                  {teacher.name}
                </h3>
                <p className="text-[#4338ca] font-medium mb-3 italic">
                  {teacher.role}
                </p>
                <p className="text-gray-600 max-w-lg mx-auto">
                  {teacher.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
