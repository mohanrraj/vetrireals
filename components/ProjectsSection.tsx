'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from "@/lib/utils";
import { projects } from '@/data/projects'

const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <div className={cn("relative p-[4px] group", containerClassName)}>
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] opacity-60 group-hover:opacity-100 blur-xl transition duration-500 will-change-transform",
          " bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
        )}
      />
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] will-change-transform",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
        )}
      />
      <div className={cn("relative z-10 h-full", className)}>{children}</div>
    </div>
  );
};

export default function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="projects" ref={ref} className="py-20 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
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
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/${project.slug}`}>
                <BackgroundGradient
                  containerClassName="rounded-2xl overflow-hidden"
                  className="h-full"
                >
                  <div className="group relative overflow-visible rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer hover:z-10 hover:scale-105 origin-center border-4 border-white/30 backdrop-blur-sm bg-white/10">
                    <div className="relative h-96 overflow-hidden rounded-t-xl">
                      <Image
                        src={`/project_scrolling/${project.image}`}
                        alt={project.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        priority={index < 6}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-white font-semibold text-lg">
                          View Details
                        </span>
                      </div>
                    </div>
                    {/* Gradient Name Section */}
                    <div className={`bg-gradient-to-r ${index % 6 === 0 ? 'from-purple-600 to-pink-600' :
                      index % 6 === 1 ? 'from-blue-600 to-cyan-600' :
                        index % 6 === 2 ? 'from-green-600 to-teal-600' :
                          index % 6 === 3 ? 'from-orange-600 to-red-600' :
                            index % 6 === 4 ? 'from-indigo-600 to-purple-600' :
                              'from-pink-600 to-rose-600'
                      } p-4 rounded-b-xl transform group-hover:scale-105 transition-transform duration-300`}>
                      <h3 className="text-xl font-bold text-white text-center">
                        {project.name}
                      </h3>
                      <p className="text-white/90 text-center text-sm mt-1">View Details →</p>
                    </div>
                    {/* Glassy Border Glow */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[0_0_30px_rgba(255,255,255,0.5)]"></div>
                  </div>
                </BackgroundGradient>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
