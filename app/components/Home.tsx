"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Home() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [videoVisible, setVideoVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  // Lazy-load video using IntersectionObserver
  useEffect(() => {
    if (!heroRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVideoVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(heroRef.current);
  }, []);

  return (
    
    <div
      id="home"
      ref={heroRef}
      className="relative min-h-[120vh] overflow-hidden"
    >
      {/* --- BACKGROUND IMAGE first --- */}
      <Image
        src="/homebackground.webp"
        alt="Home Background"
        fill
        priority
        className="object-cover"
      />

      {/* --- Lazy-load VIDEO only when visible --- */}
      {!isMobile && videoVisible && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/home.webm" type="video/webm" />
        </video>
      )}

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-white px-4 text-center">

        {/* TITLE */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold opacity-0 animate-fade-in">
          Welcome to CodeVia
        </h1>

        {/* --- CSS Typing Effect (no JS) --- */}
        <div className="mt-6">
          <p className="typing text-lg sm:text-xl md:text-2xl text-gray-200 max-w-lg mx-auto">
            Powering digital dreams
          </p>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 opacity-0 animate-fade-in-delayed">
          <a href="#contact">
            <button className="bg-[#3730a3] hover:bg-[#312e81] text-white font-semibold py-3 px-8 rounded-lg shadow-lg">
              Get Started
            </button>
          </a>

          <a href="#portfolio">
            <button className="border-2 border-white hover:bg-white/10 text-white font-semibold py-3 px-8 rounded-lg">
              Learn More
            </button>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 opacity-80 animate-bounce-slow">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        /* Fade In */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease forwards;
        }
        .animate-fade-in-delayed {
          animation: fadeIn 1.4s ease forwards;
        }

        /* Slow bounce for scroll indicator */
        @keyframes slowBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(12px); }
        }
        .animate-bounce-slow {
          animation: slowBounce 2s infinite;
        }

        /* PURE CSS TYPING EFFECT */
        .typing {
          width: 0;
          white-space: nowrap;
          overflow: hidden;
          border-right: 2px solid white;
          animation: typing 6s steps(40, end) infinite, blink 0.75s step-end infinite;
        }

        @keyframes typing {
          0% { width: 0; }
          40% { width: 100%; }
          60% { width: 100%; }
          100% { width: 0; }
        }

        @keyframes blink {
          0%, 49% { border-color: white; }
          50%, 100% { border-color: transparent; }
        }
      `}</style>
    </div>
  );
}
