"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [faq, setFaq] = useState<FAQ[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/FAQ.json")
      .then((res) => res.json())
      .then(setFaq)
      .catch((err) => console.error("Failed to load FAQ:", err));
  }, []);

  const toggleFAQ = (id: number) =>
    setActiveIndex(activeIndex === id ? null : id);

  return (
    <section className="mx-auto my-16 px-4 sm:px-8 md:px-16 lg:px-32">
      <motion.h1
        className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 sm:mb-12 text-center text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Frequently Asked Questions
      </motion.h1>

      <div className="space-y-4">
        {faq.map((item, idx) => (
          <motion.div
            key={item.id}
            className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <button
              onClick={() => toggleFAQ(item.id)}
              className={`w-full flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 text-left text-base sm:text-lg md:text-xl font-medium focus:outline-none transition-colors duration-300 ${
                activeIndex === item.id ? "text-[#4338ca]" : "text-gray-800"
              }`}
            >
              <span>{item.question}</span>
              <motion.span
                animate={{ rotate: activeIndex === item.id ? 180 : 0 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
              >
                <ChevronDown size={20} />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {activeIndex === item.id && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="px-4 sm:px-6 pb-3 sm:pb-4 text-gray-700 bg-gray-50 text-sm sm:text-base"
                >
                  <p>{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
