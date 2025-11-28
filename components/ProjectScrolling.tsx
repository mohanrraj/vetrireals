'use client'

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ImageModal from './ImageModal';

const projects = [
  'project1.jpg',
  'project2.jpg',
  'project3.jpg',
  'project4.jpg',
  'project5.jpg',
  'project6.jpg',
  'project7.jpg',
  'project8.jpg',
  'project9.jpg',
  'project10.jpg',
];

export default function ProjectScrolling() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
      
      <div className="relative z-10 mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
          Ongoing Projects
        </h2>
        <div className="w-24 h-1 bg-white mx-auto rounded-full animate-underline-expand shadow-lg shadow-white/50"></div>
        <p className="mt-6 text-white/90 text-center max-w-2xl mx-auto px-4">
          Explore our latest ongoing projects and developments
        </p>
      </div>

      <div className="relative">
        <div className="flex animate-scroll">
          {[...projects, ...projects].map((project, index) => (
            <motion.div
              key={`project-${index}`}
              className="flex-shrink-0 w-64 h-36 sm:w-72 sm:h-44 md:w-80 md:h-52 mx-4 rounded-xl overflow-hidden shadow-2xl group relative cursor-pointer"
              onClick={() => handleImageClick(index % projects.length)}
              whileHover={{ scale: 1.03, zIndex: 10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={`/project_scrolling/${project}`}
                  alt={`Project ${(index % projects.length) + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={index < 5} // Only load first 5 images with priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white font-semibold text-lg">
                    Project {(index % projects.length) + 1}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedImage !== null && (
        <ImageModal
          images={projects}
          initialIndex={selectedImage}
          onClose={closeModal}
        />
      )}
    </section>
  );
}
