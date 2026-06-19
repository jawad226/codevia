"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Testimonial {
  content: string;
  author: string;
  position: string;
  image: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/Testimonials.json");
        const data = await res.json();
        setTestimonials(data);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      }
    };
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (!testimonials.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials]);

  const prevSlide = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);

  if (!testimonials.length)
    return (
      <div className="text-center py-20 text-xl font-semibold text-gray-500">
        Loading testimonials...
      </div>
    );

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-18 px-3">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12">

        {/* LEFT */}
        <div>
          <p className="font-semibold uppercase tracking-wide mb-3">Testimonial</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#082542] mb-6 leading-tight">
            What Say <span className="text-[#4338ca]">Our Clients!</span>
          </h2>
          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            See what our students say about their experience with{" "}
            <span className="font-semibold text-[#082542]">CodeVia</span>.
          </p>
          <button className="bg-[#3730a3] text-white hover:bg-[#312e81] px-6 py-3 rounded-full font-semibold transition">
            Read More
          </button>
        </div>

        {/* RIGHT - SLIDER */}
        <div className="relative bg-white p-10 rounded-2xl shadow-xl border-t-8 border-[#312e81] overflow-hidden">
          <div className="absolute top-8 left-8 text-4xl font-serif">“</div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-gray-700 text-lg italic leading-relaxed mb-8">
                {currentTestimonial.content}
              </p>

              <div className="flex items-center gap-4">
                <Image
                  src={currentTestimonial.image}
                  alt={currentTestimonial.author}
                  width={60}
                  height={60}
                  className="rounded-full bg-[#082542] object-cover"
                />
                <div>
                  <h4 className="font-semibold text-[#082542] text-lg">
                    {currentTestimonial.author}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {currentTestimonial.position}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-[#312e81] hover:text-white transition-all duration-300"
            >
              ‹
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-[#312e81] hover:text-white transition-all duration-300"
            >
              ›
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, i) => (
              <span
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === currentIndex ? "bg-[#00A884]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
