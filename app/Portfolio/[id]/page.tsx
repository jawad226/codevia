"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ExternalLink, Globe, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: number;
  title: string;
  short: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  tags: string[];
  images: string[];
  liveUrl: string | null;
  githubUrl: string | null;
}

export default function ProjectDetail() {
  const params = useParams();
  const id = params.id;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (!id) return;

    fetch("/Portfolio.json")
      .then((res) => res.json())
      .then((data: Project[]) => {
        const foundProject = data.find((p) => p.id === parseInt(id as string));
        setProject(foundProject || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const nextImage = () => {
    if (!project) return;
    setActiveImageIndex((i) => (i + 1) % project.images.length);
  };

  const prevImage = () => {
    if (!project) return;
    setActiveImageIndex((i) =>
      i === 0 ? project.images.length - 1 : i - 1
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center max-w-md px-6">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">⚠️</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-6">The project you're looking for doesn't exist or has been moved.</p>
          <Link
            href="/Portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            <ArrowLeft size={18} />
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
      {/* Header Section */}
      <header className="relative bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-16">

          {/* Back Button */}
          <div className="flex justify-center mb-8">
            <Link
              href="/Portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium shadow-sm border hover:shadow-md"
              aria-label="Back to Portfolio"
            >
              <ArrowLeft size={18} />
              Back to Portfolio
            </Link>
          </div>

          {/* Project Title */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4"
            >
              {project.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              {project.short}
            </motion.p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-200"
            >
              <Image
                src={project.images[0]}
                alt={project.title}
                width={600}
                height={450}
                className="w-full h-auto object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-3">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full text-sm font-medium shadow-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-4 pt-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    aria-label="Visit Live Site"
                  >
                    <Globe size={20} />
                    Visit Live Site
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gray-900 text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    aria-label="View Code"
                  >
                    <ExternalLink size={20} />
                    View Code
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Image Gallery */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Project Gallery</h2>

            <div className="relative rounded-3xl overflow-hidden bg-gray-200">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={project.images[activeImageIndex]}
                    alt={`${project.title} - Image ${activeImageIndex + 1}`}
                    width={800}
                    height={600}
                    className="w-full h-96 object-cover rounded-3xl"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              {project.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute top-1/2 left-6 transform -translate-y-1/2 bg-white/90 hover:bg-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
                    aria-label="Previous Image"
                  >
                    ‹
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute top-1/2 right-6 transform -translate-y-1/2 bg-white/90 hover:bg-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
                    aria-label="Next Image"
                  >
                    ›
                  </button>
                </>
              )}

              {/* Image Counter */}
              {project.images.length > 1 && (
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                  {activeImageIndex + 1} / {project.images.length}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {project.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-4">
                {project.images.map((img, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-3 transition-all duration-300 ${
                      idx === activeImageIndex
                        ? "border-indigo-600 shadow-lg"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                    aria-label={`View Image ${idx + 1}`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Project Details */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Project Overview</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{project.fullDescription}</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Technologies Used</h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-5 py-3 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-2xl text-sm font-medium shadow-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            {(!project.liveUrl && !project.githubUrl) && (
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-8 shadow-2xl text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Like What You See?</h3>
                <p className="text-white/90 mb-6 text-lg">Let's work together on your next project</p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                >
                  Start Your Project
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
