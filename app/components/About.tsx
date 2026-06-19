"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const About = () => {
  const features = [
    "AI & Machine Learning Solutions",
    "Custom Web & App Development",
    "Digital Marketing & Branding",
  ];

  return (
    <section id="about" className="py-28 px-4 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-center">

          {/* LEFT TEXT SECTION */}
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-extrabold mb-6">
              About <span className="text-[#4338ca] ">CodeVia</span>
            </h2>

            <p className="text-gray-600 mb-6">
              <strong className="text-[#082542]">CodeVia</strong> is a modern
              technology company offering innovative AI solutions and full-stack
              web and app development services. We focus on building future-ready,
              scalable, and intelligent digital systems that help brands grow in
              today’s fast-moving digital world.
            </p>

            <p className="text-gray-600 mb-8">
              From AI-powered automation to custom mobile applications, our
              mission is to deliver high-quality digital solutions designed to
              improve user experience, boost efficiency, and create long-term
              value for businesses and startups globally.
            </p>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              viewport={{ once: true }}
            >
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.2 }}
                >
                  <span className="text-blue-600 mr-3 text-lg">🔹</span>
                  <span className="text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT IMAGE SECTION */}
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="rounded-xl overflow-hidden"
            >
              <Image
                src="https://res.cloudinary.com/dcfzqdk58/image/upload/v1764329475/about_gvxucd.png"
                alt="About CodeVia"
                width={1000}
                height={600}
                className="w-full object-cover"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
