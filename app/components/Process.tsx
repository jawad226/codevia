"use client";

import React from "react";
import { Users, CheckCircle, Award } from "lucide-react";
import { motion } from "framer-motion";

const processData = [
  { icon: Users, title: "Happy Clients", value: "1000+" },
  { icon: CheckCircle, title: "Projects Done", value: "1800+" },
  { icon: Award, title: "Win Awards", value: "8" },
];

const Process = () => {
  return (
    <section className="relative z-20 -mt-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
        {processData.map((item, i) => (
          <motion.div
            key={i}
            className="bg-[#082542] text-white p-10 rounded-xl flex flex-col items-center justify-center shadow-lg"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2, type: "spring", stiffness: 300 }}
          >
            <div className="bg-white/20 p-4 rounded-full mb-4">
              <item.icon size={40} />
            </div>
            <p className="text-lg font-semibold">{item.title}</p>
            <h3 className="text-4xl font-bold mt-2">{item.value}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Process;
