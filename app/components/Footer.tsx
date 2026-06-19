"use client";

import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { motion, Transition } from "framer-motion";

export default function Footer() {
  // Define spring transition
  const springTransition: Transition = { type: "spring", stiffness: 300 };

  return (
    <footer className="bg-[#4338ca] text-white pt-16 pb-6 relative">
      <motion.div
        className="max-w-6xl mx-auto pb-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Logo & Description */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <motion.div whileHover={{ scale: 1.1 }} transition={springTransition}>
              <Image
                width={56}
                height={65}
                src="/logo3.webp"
                alt="CodeVia"
                className="h-10 w-auto"
              />
            </motion.div>
            <span className="font-extrabold text-2xl">CodeVia</span>
          </div>
          <p className="text-gray-100 mb-4">
            We focus on strategies that deliver real results, avoiding what doesn’t work. Our process is backed by 200+ verified success factors.
          </p>
          <div className="flex gap-3">
            {[RxCross2, FaFacebookF, FaLinkedinIn, FaInstagram].map((Icon, i) => (
              <motion.button
                key={i}
                className="bg-white text-[#3730a3] p-2 rounded-full"
                whileHover={{
                  scale: 1.2,
                  backgroundColor: "#312e81",
                  color: "#fff",
                }}
                transition={springTransition}
              >
                <Icon />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Contacts */}
        <div>
          <h3 className="font-semibold text-lg mb-6">Contacts</h3>
          <p className="py-1">
            <span className="font-semibold">Address:</span> 3rd Floor, Al-Rehman Trade Center, F-8 Markaz, Islamabad.
          </p>
          <p className="py-1">
            <span className="font-semibold">Email:</span> info@codevia.com
          </p>
          <p className="py-1">
            <span className="font-semibold">Phone:</span> +92 (319) 041 2258
          </p>
        </div>

        {/* Services */}
        <div className="px-0 md:px-20">
          <h3 className="font-semibold text-lg mb-6">Services</h3>
          <ul className="flex flex-col gap-3">
            {["Software Development","Web Development","App Development","UI/UX Design","Digital Marketing"].map((service, i) => (
              <Link key={i} href="#">
                <motion.li
                  className="cursor-pointer hover:text-[#FFD700] transition-all"
                  whileHover={{ x: 5 }}
                  transition={springTransition}
                >
                  {service}
                </motion.li>
              </Link>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Bottom Copyright */}
      <motion.div
        className="mt-10 border-t border-blue-600 pt-6 text-center text-gray-300 text-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Copyright © 2025 CodeVia. All Rights Reserved.
      </motion.div>
    </footer>
  );
}
