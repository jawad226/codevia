"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink, FileCode2 } from "lucide-react";
import { motion } from "framer-motion";

const ALL_TAG = "All";

interface Project {
  id: number;
  title: string;
  short: string;
  description: string;
  liveUrl: string;
  tags: string[];
  images: string[];
}

export default function Portfolio() {
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [activeTag, setActiveTag] = useState(ALL_TAG);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/Portfolio.json");
      const data = await res.json();
      setProjectsData(data);
    };
    fetchData();
  }, []);

  const tags = [
    ALL_TAG,
    "Web Development",
    "Software Development",
    "App Development",
    "UX/UI Design",
    "Digital Marketing",
    ...Array.from(new Set(projectsData.flatMap((p) => p.tags))).filter(
      (tag) =>
        ![
          "Web Development",
          "Software Development",
          "App Development",
          "UX/UI Design",
          "Digital Marketing",
        ].includes(tag)
    ),
  ];

  const filtered = projectsData.filter((p) =>
    activeTag === ALL_TAG
      ? true
      : p.tags.some((tag) =>
          activeTag === "Web Development"
            ? ["Web Development", "E-commerce"].includes(tag)
            : activeTag === "Software Development"
            ? ["ML", "Automation"].includes(tag)
            : activeTag === "App Development"
            ? tag === "App Development"
            : activeTag === "UX/UI Design"
            ? tag === "UX/UI Design"
            : activeTag === "Digital Marketing"
            ? tag === "Digital Marketing"
            : p.tags.includes(activeTag)
        )
  );

  return (
    <section id="portfolio" className="py-22 bg-[#f5f9ff] text-[#082542]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold">
            Our <span className="text-[#4338ca]">Portfolio</span>
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Selected work from our software house web apps, ML projects, mobile applications, UX/UI designs, and digital marketing campaigns.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-3 flex-wrap mb-8">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTag(t)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                t === activeTag
                  ? "bg-[#3730a3] text-white shadow"
                  : "bg-white text-[#082542] hover:text-white border-gray-200 hover:bg-[#312e81]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, index) => (
            <motion.article
              key={p.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
                type: "spring" as const, // ✅ TypeScript safe
              }}
            >
              <div className="relative overflow-hidden rounded-t-2xl">
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="w-full h-44 object-cover transition-transform duration-300 hover:scale-105"
                />
                <Link
                  href={p.liveUrl}
                  className="absolute top-3 right-3 bg-[#3730a3] text-white text-extrabold text-sm px-3 py-1 rounded-full hover:bg-[#312e81] transition flex items-center gap-1"
                >
                  <ExternalLink size={16} /> Live
                </Link>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{p.short}</p>

                <div className="flex justify-between items-center mt-4 flex-wrap gap-2">
                  <div className="flex gap-2 flex-wrap">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs bg-[#082542]/10 text-[#082542] px-2 py-1 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/Portfolio/${p.id}`}
                    className="flex text-sm items-center gap-2 bg-[#3730a3] text-white px-4 py-2 rounded-full hover:bg-[#312e81] transition"
                  >
                    <FileCode2 size={16} /> Details
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No projects found for the selected filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}
