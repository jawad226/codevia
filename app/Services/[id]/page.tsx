"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

import { motion } from "framer-motion";

interface SectionItem {
  title: string;
  desc: string;
  icon?: string;
}

interface SectionType {
  type: "text" | "features" | "imageRight" | "featuresWithImage" | "Understanding";
  title: string;
  desc?: string;
  items?: SectionItem[];
  img?: string;
  description: string;
  icon: string;

}

interface ServiceType {
  id: number;
  title: string;
  slug: string;
  description: string;
  details: string;
  heading: string;
  about: string;
  img: string;
  section: string;
  sections?: SectionType[];
}

export default function ServiceDetailPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const params = useParams();
  const { id } = params as { id: string };
  const numericId = Number(id);

  const [service, setService] = useState<ServiceType | null>(null);

  useEffect(() => {
    fetch("/Services.json")
      .then((res) => res.json())
      .then((data: ServiceType[]) => {
        const found = data.find((item) => item.id === numericId);
        setService(found || null);
      });
  }, [id]);

  if (!service) {
    return (
      <h1 className="text-center text-xl mt-20 font-semibold text-red-600">
        Service Not Found 😔
      </h1>
    );
  }

  return (
    <section className="pt-32 pb-32 px-6 max-w-7xl mx-auto">
      <div className="px-4">
        {/* Title */}
        <motion.h1
          className="text-center text-4xl md:text-5xl font-bold tracking-tight mb-20"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          {service.title}
        </motion.h1>

        {/* TOP INTRO SECTION */}
        <div className="grid md:grid-cols-2 gap-16 items-center text-center md:text-left">
          {/* LEFT IMAGE */}
          <motion.div
            className="flex justify-center"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <Image
              width={800}
              height={500}
              src={service.img}
              alt={service.title}
              className="w-[80%] sm:w-[60%] md:w-full max-w-md mx-auto hover:scale-105 transition-all duration-500"
              loading="lazy"
            />
          </motion.div>

          {/* RIGHT DETAILS */}
          <motion.div
            className="space-y-5 flex flex-col items-center md:items-start"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            <p className="text-[#4338ca] font-semibold tracking-widest text-sm">
              {service.heading}
            </p>

            <h2 className="text-3xl md:text-4xl font-bold leading-snug max-w-lg">
              {service.about}
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
              {service.details}
            </p>
          </motion.div>
        </div>

      </div>
      <div className="px-4 md:px-20">
        {service.sections &&
          service.sections.map((section, index) => (
            <motion.div
              key={index}
              className="mt-28"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* TEXT BLOCK SECTION */}
              {section.type === "text" && (
                <div className="max-w-3xl">
                  <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
                  <p className="text-gray-600 text-lg leading-relaxed">{section.desc}</p>
                </div>
              )}

              {/* FEATURES GRID */}
              {section.type === "features" && (
                <div className="relative">
                  {section.title && (
                    <h2 className="text-3xl font-bold mb-12">{section.title}</h2>
                  )}

                  <div className="grid md:grid-cols-2 gap-10">
                    {section.items?.map((item, i) => (
                      <motion.div
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`group relative bg-white p-10 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-all duration-300 cursor-pointer hover:bg-gradient-to-r hover:from-[#312e81] hover:to-[#4f46e5] hover:text-white hover:shadow-[0_15px_50px_rgba(0,0,0,0.10)]`}
                        whileHover={{ scale: 1.03 }}
                      >
                        {/* ICON */}
                        <div
                          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg mb-6 transition-all duration-300
                          ${activeIndex === i
                              ? "bg-black text-white"
                              : "bg-gradient-to-br from-blue-500 to-indigo-500 text-white"
                            } ${activeIndex !== i ? "group-hover:bg-black group-hover:text-white" : ""}`}
                        >
                          <span className="text-2xl">💡</span>
                        </div>

                        {/* TITLE */}
                        <h3 className="text-xl font-semibold mb-3">{item.title}</h3>

                        {/* DESCRIPTION */}
                        <p className="leading-relaxed">{item.desc}</p>

                        {/* BACK NUMBER */}
                        <div className="absolute bottom-4 right-6 text-[70px] font-extrabold text-gray-200 opacity-30 select-none">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* FEATURES WITH IMAGE */}
              {section.type === "featuresWithImage" && (
                <section>
                  <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* LEFT TEXT + FEATURES LIST */}
                    <div>
                      <h2 className="text-4xl md:text-5xl font-extrabold mb-10 leading-tight">
                        {section.title}
                      </h2>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                        {section.items?.map((item, i) => (
                          <motion.div
                            key={i}
                            className="group p-6 rounded-2xl bg-white shadow-[0px_10px_40px_rgba(0,0,0,0.05)] hover:shadow-[0px_15px_50px_rgba(0,0,0,0.1)] transition-all duration-300 cursor-default"
                            whileHover={{ scale: 1.02 }}
                          >
                            <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:from-indigo-500 group-hover:to-purple-500 transition-all">
                              {String(i + 1).padStart(2, "0")}. {item.title}
                            </h3>
                            <p className="text-gray-600 mt-2 leading-relaxed">{item.desc}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="flex justify-center">
                      {section.img && (
                        <motion.div whileHover={{ scale: 1.05 }} className="max-w-md">
                          <Image
                            width={550}
                            height={550}
                            src={section.img}
                            alt={section.title || "feature image"}
                          />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </section>
              )}

              {/* UNDERSTANDING SECTION */}
              {section.type === "Understanding" && (
  <section className="px-6 md:px-10">
    <div className="grid md:grid-cols-3 gap-14 text-center md:text-left">

      {/* LEFT SIDE */}
      <div className="col-span-1 flex flex-col items-center md:items-start">
        <p className="text-sm tracking-widest text-indigo-500 font-semibold mb-3">
          ● OUR SERVICE ●
        </p>

        <h2 className="text-3xl md:text-4xl font-extrabold leading-snug mb-4 max-w-sm">
          {section.title}
        </h2>

        <p className="text-gray-600 text-lg max-w-xs md:max-w-md">
          {section.description}
        </p>
      </div>

      {/* RIGHT SIDE LIST ITEMS */}
      <div className="col-span-2 grid sm:grid-cols-1 md:grid-cols-2 gap-10">
        {section.items?.map((item, i) => (
          <motion.div
            key={i}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <div>
              {item.icon && (
                <Image
                  src={item.icon}
                  alt={item.title || "icon"}
                  width={100}
                  height={100}
                  className="w-[60px] sm:w-[80px] md:w-[120px] mx-auto sm:mx-0"
                />
              )}
            </div>

            <div>
              <h3 className="font-bold text-xl mb-2">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed max-w-xs">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)}


              {/* IMAGE RIGHT SECTION */}
              {section.type === "imageRight" && (
                <div className="grid md:grid-cols-2 gap-12 items-center px-6 md:px-20 text-center md:text-left">

                  {/* LEFT TEXT */}
                  <motion.div
                    className="space-y-6 max-w-xl flex flex-col items-center md:items-start"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-snug tracking-tight max-w-md">
                      {section.title}
                    </h2>

                    <p className="text-gray-600 text-lg md:text-xl leading-relaxed tracking-wide max-w-md">
                      {section.desc}
                    </p>
                  </motion.div>

                  {/* RIGHT IMAGE */}
                  <motion.div
                    className="flex justify-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    {section.img && (
                      <Image
                        src={section.img}
                        alt={section.title || "service image"}
                        width={700}
                        height={500}
                        className="w-[80%] sm:w-[60%] md:w-full max-w-md mx-auto transition-transform duration-500"
                      />
                    )}
                  </motion.div>
                </div>
              )}

            </motion.div>
          ))}
      </div>

      {/* BACK BUTTON */}
      <div className="mt-20 text-center">
        <a
          href="/#services"
          className="bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white px-7 py-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-105"
        >
          ← Back to Services
        </a>
      </div>

    </section>
  );
}
