"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

// Throttle helper
const throttle = (func: () => void, limit: number) => {
  let lastFunc: NodeJS.Timeout;
  let lastRan: number;
  return function () {
    if (!lastRan) {
      func();
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func();
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

const navItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/#services" },
  { name: "Portfolio", href: "/#portfolio" },
  { name: "Blogs", href: "/Blogs" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isTop, setIsTop] = useState(true);

  const pathname = usePathname();
  const isHome = pathname === "/";

  // SCROLL EFFECT (throttled)
  useEffect(() => {
    const handleScroll = throttle(() => setIsTop(window.scrollY < 50), 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed w-full top-4 z-50 flex justify-center">
      <div
        className={`flex items-center justify-between w-[92%]
          border border-white/20 rounded-full px-6 shadow-lg
          transition-colors duration-300
          ${isHome && isTop ? "bg-white/20" : "bg-white"}
        `}
      >
        {/* LOGO */}
        <Link href="/" className="flex items-center">
          {/* Consider converting this to inline SVG for faster LCP */}
          <Image
            src="/logo3.webp"
            alt="logo"
            width={65}
            height={45}
            className="cursor-pointer object-contain"
          />
          <span
            className={`font-extrabold ml-2 text-2xl transition-colors duration-300
              ${isHome && isTop ? "text-white" : "text-black"}
            `}
          >
            CodeVia
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex gap-8 text-[16px] font-medium">
          {navItems.map((item) => (
            <li
              key={item.name}
              className={`relative group py-6 cursor-pointer transition-colors duration-300
        ${isHome && isTop ? "text-white" : "text-black"}
      `}
            >
              <Link
                href={item.href}
                className="relative inline-block transition duration-300"
              >
                {item.name}

                {/* Underline Animation */}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] w-0 bg-indigo-700 transition-all duration-300 group-hover:w-full`}
                ></span>
              </Link>

              {/* SERVICES MEGA MENU */}
              {item.name === "Services" && (
                <div
                  className="absolute left-0 top-full
            grid grid-cols-2 gap-6 
            p-6 w-[600px] bg-white dark:bg-[#3730a3] 
            shadow-lg rounded-2xl
            opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100
            pointer-events-none group-hover:pointer-events-auto
            transform transition-all duration-200
          "
                >
                  {[
                    {
                      href: "/Services/1",
                      title: "Web Development",
                      desc: "Modern and responsive websites using React & Node.js",
                    },
                    {
                      href: "/Services/2",
                      title: "Software Development",
                      desc: "AI models for prediction, analysis and automation",
                    },
                    {
                      href: "/Services/3",
                      title: "App Development",
                      desc: "Custom SEO-friendly WordPress solutions",
                    },
                    {
                      href: "/Services/5",
                      title: "Digital Marketing",
                      desc: "Grow your brand with SEO and targeted campaigns",
                    },
                    {
                      href: "/Services/4",
                      title: "UI/UX Design",
                      desc: "Custom SEO-friendly WordPress solutions",
                    },
                  ].map((service) => (
                    <Link key={service.href} href={service.href}>
                      <div className="p-4 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-700 transition cursor-pointer">
                        <h4 className="font-semibold text-[#082542] dark:text-white text-lg">
                          {service.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {service.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>


        {/* DESKTOP BUTTONS */}
        <div className="hidden md:flex gap-3">
          <Link
            href="#contact"
            className="bg-indigo-700 text-white hover:bg-indigo-800 px-6 py-2 rounded-full font-semibold transition"
          >
            Get Started
          </Link>
          <Link
            href="#portfolio"
            className="bg-gray-700 text-white hover:bg-gray-600 px-6 py-2 rounded-full font-semibold transition"
          >
            Learn More
          </Link>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden text-3xl transition-colors duration-300
            ${isHome && isTop ? "text-white" : "text-black"}
          `}
        >
          {open ? "✖" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden absolute w-[90%] top-full mt-4 transition-all duration-300 
          transform ${open ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0 pointer-events-none"}
          ${isTop ? "bg-white/20" : "bg-white"} 
          backdrop-blur-xl border border-white/30 rounded-2xl p-6 text-center
        `}
      >
        <ul className="flex flex-col gap-5 text-lg font-medium">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`transition-colors duration-300 ${isTop ? "text-white hover:text-gray-300" : "text-black hover:text-gray-600"
                }`}
            >
              {item.name}
            </Link>
          ))}
        </ul>

        {/* MOBILE BUTTONS */}
        <div className="flex flex-col mt-6 gap-4">
          <Link
            href="#contact"
            className="px-6 py-2 rounded-full font-semibold transition bg-indigo-700 text-white hover:bg-indigo-800"
          >
            Get Started
          </Link>
          <Link
            href="#portfolio"
            className="px-6 py-2 rounded-full font-semibold transition bg-gray-700 text-white hover:bg-gray-600"
          >
            Learn More
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
