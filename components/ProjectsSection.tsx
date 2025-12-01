'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { cn } from "@/lib/utils";
import { projects } from '@/data/projects'
import { MapPin, Home, TrendingUp } from 'lucide-react'

export default function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="projects" ref={ref} className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-full text-sm font-semibold">
              Premium Properties
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 pb-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent drop-shadow-lg">
            Our Projects
          </h2>
          <div className="relative w-32 h-1 mx-auto overflow-hidden rounded-full bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200">
            <motion.div
              className="absolute inset-0 w-12 h-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full shadow-lg"
              animate={{
                x: ['-100%', '100%', '-100%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          <p className="mt-6 text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our premium residential projects across Tamilnadu
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index, isInView }: { project: any; index: number; isInView: boolean }) {
  const [isHovered, setIsHovered] = useState(false)

  const gradients = [
    'from-purple-600 to-pink-600',
    'from-blue-600 to-cyan-600',
    'from-green-600 to-teal-600',
    'from-orange-600 to-red-600',
    'from-indigo-600 to-purple-600',
    'from-pink-600 to-rose-600'
  ]

  const gradient = gradients[index % 6]

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/${project.slug}`}>
        <div className="group relative h-full">
          {/* Animated gradient border */}
          <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-500 animate-pulse-glow`}></div>

          {/* Main card */}
          <div className="relative bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            {/* Image container - No zoom, No overlay */}
            <div className="relative h-72 overflow-hidden">
              <Image
                src={`/project_scrolling/${project.images[0]}`}
                alt={project.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority={index < 6}
              />

              {/* Floating status badge - Hidden on mobile */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="absolute top-4 right-4 z-10 hidden md:block"
              >
                <div className="glass-dark px-3 py-1.5 rounded-full flex items-center space-x-2 border border-white/20">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white text-xs font-semibold">{project.status}</span>
                </div>
              </motion.div>

              {/* Location badge - Hidden on mobile */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="absolute top-4 left-4 z-10 hidden md:block"
              >
                <div className="glass-dark px-3 py-1.5 rounded-full flex items-center space-x-2 border border-white/20">
                  <MapPin className="w-3 h-3 text-yellow-400" />
                  <span className="text-white text-xs font-semibold">{project.location}</span>
                </div>
              </motion.div>
            </div>

            {/* Card content */}
            <div className={`relative bg-gradient-to-r ${gradient} p-6`}>
              {/* Shimmer effect */}
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:scale-105 transition-transform duration-300">
                  {project.name}
                </h3>
                <p className="text-white/90 text-sm line-clamp-2 mb-3">
                  {project.description}
                </p>

                {/* View details button */}
                <motion.div
                  className="flex items-center justify-between"
                  animate={isHovered ? { x: 5 } : { x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-white font-semibold text-sm flex items-center space-x-2">
                    <span>View Details</span>
                    <motion.span
                      animate={isHovered ? { x: 5 } : { x: 0 }}
                      transition={{ duration: 0.3, repeat: isHovered ? Infinity : 0, repeatType: "reverse" }}
                    >
                      →
                    </motion.span>
                  </span>
                </motion.div>
              </div>

              {/* Corner accent */}
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-white/10 rounded-tl-full"></div>
            </div>

            {/* Glowing border on hover */}
            <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/50 transition-all duration-500 pointer-events-none`}></div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
