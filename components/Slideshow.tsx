'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
  {
    type: 'owners',
    bgColor: 'bg-gradient-to-br from-orange-500 via-red-600 to-pink-700'
  },
  {
    type: 'regular',
    image: '/slides/slide1.jpg',
    mobileImage: '/mobile/slide2.jpg',
    text: ['Invest in', 'Delivered', 'The Quality', 'Homes at', 'Affordable Cost'],
    bgColor: 'bg-black/40'
  },
  {
    type: 'regular',
    image: '/slides/slide2.jpg',
    mobileImage: '/mobile/slide3.jpg',
    text: ['Book your', 'Two Decades', 'of Building', 'Trust And', 'Happiness'],
    bgColor: 'bg-black/40'
  },
  {
    type: 'regular',
    image: '/slides/slide3.jpg',
    mobileImage: '/mobile/slide4.avif',
    text: ['Trust us', 'Book our plot', 'Live happily'],
    bgColor: 'bg-black/40'
  }
]

// Particle component for floating orbs
const Particle = ({ delay, size, left, top }: { delay: number; size: number; left: string; top: string }) => (
  <motion.div
    className="absolute rounded-full bg-gradient-to-br from-blue-400/30 to-purple-400/30 blur-xl"
    style={{
      width: size,
      height: size,
      left,
      top,
    }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0.3, 0.6, 0.3],
      scale: [1, 1.2, 1],
      y: [0, -30, 0],
      x: [0, 15, 0],
    }}
    transition={{
      duration: 8,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
)

// Circle drawing animation component
const CircleAnimation = ({ delay = 0 }: { delay?: number }) => (
  <motion.svg
    className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)]"
    viewBox="0 0 200 200"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay }}
  >
    <motion.circle
      cx="100"
      cy="100"
      r="95"
      fill="none"
      stroke="#FCD34D"
      strokeWidth="3"
      strokeLinecap="round"
      initial={{ pathLength: 0, rotate: -90 }}
      animate={{ pathLength: 1, rotate: 0 }}
      transition={{
        pathLength: { duration: 1.5, delay: delay + 0.3, ease: "easeInOut" },
        rotate: { duration: 1.5, delay: delay + 0.3, ease: "easeInOut" }
      }}
      style={{ transformOrigin: "center" }}
    />
    <motion.circle
      cx="100"
      cy="100"
      r="95"
      fill="none"
      stroke="#FBBF24"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.5"
      initial={{ pathLength: 0, rotate: -90 }}
      animate={{ pathLength: 1, rotate: 0 }}
      transition={{
        pathLength: { duration: 1.5, delay: delay + 0.5, ease: "easeInOut" },
        rotate: { duration: 1.5, delay: delay + 0.5, ease: "easeInOut" }
      }
      }
      style={{ transformOrigin: "center" }}
    />
  </motion.svg>
)

export default function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Progress bar animation
  useEffect(() => {
    setProgress(0)
    const duration = 5000 // Increased to 5 seconds for better viewing
    const interval = 50
    const increment = (interval / duration) * 100

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 100
        }
        return prev + increment
      })
    }, interval)

    return () => clearInterval(progressInterval)
  }, [currentSlide])

  // Slide auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000) // Increased to 5 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] w-full overflow-hidden bg-black">
      {/* Floating Particles Background */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <Particle delay={0} size={100} left="10%" top="20%" />
        <Particle delay={1} size={150} left="80%" top="30%" />
        <Particle delay={2} size={120} left="15%" top="70%" />
        <Particle delay={3} size={80} left="85%" top="60%" />
        <Particle delay={4} size={110} left="50%" top="40%" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {slides[currentSlide].type === 'owners' ? (
            <div className="relative w-full h-full gradient-rotate bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600">
              {isMobile ? (
                // Mobile layout
                <div className="flex flex-col h-full justify-end items-center pb-16">
                  <motion.div
                    className="relative w-full max-w-md"
                    style={{ maxHeight: '60vh' }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
                  >
                    <Image
                      src="/mobile/slide1.png"
                      alt="SVR Associates Founders"
                      width={500}
                      height={500}
                      className="w-full h-auto object-contain drop-shadow-2xl"
                      priority
                      quality={100}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="w-full max-w-md glass-dark rounded-2xl p-6 border border-white/20 shadow-2xl mx-4 hover-lift"
                  >
                    <div className="space-y-3 text-center">
                      <motion.h1
                        className="text-2xl sm:text-3xl font-bold text-white"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                      >
                        Welcome to SVR Associates
                      </motion.h1>
                      <motion.div
                        className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1.1, duration: 0.6 }}
                      />
                      <motion.p
                        className="text-base sm:text-lg text-white/90"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.6 }}
                      >
                        We are here to support you
                      </motion.p>
                    </div>
                  </motion.div>
                </div>
              ) : (
                // Desktop layout
                <>
                  <div className="relative w-full h-full overflow-hidden">
                    <motion.div
                      initial={{ scale: 1 }}
                      animate={{ scale: 1.1 }}
                      transition={{ duration: 20, ease: "linear" }}
                      className="w-full h-full"
                    >
                      <Image
                        src="/logo/founder.jpg"
                        alt="SVR Associates Founders"
                        fill
                        className="object-cover"
                        priority
                        quality={100}
                      />
                    </motion.div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/80 to-transparent pt-20 pb-10 px-4">
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="max-w-4xl mx-auto glass-dark rounded-2xl p-6 sm:p-8 border border-white/20 shadow-2xl hover-lift"
                    >
                      <div className="space-y-4">
                        <motion.h1
                          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.8, duration: 0.6 }}
                        >
                          Welcome to SVR Associates
                        </motion.h1>
                        <motion.div
                          className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full animate-pulse-glow"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: 1, duration: 0.6 }}
                        />
                        <motion.p
                          className="text-lg sm:text-xl md:text-2xl text-white/90"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 1.1, duration: 0.6 }}
                        >
                          We are here to support you
                        </motion.p>
                      </div>
                    </motion.div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              {/* Split Screen Layout - Image on Right, Text on Left */}
              <div className="absolute inset-0 flex flex-col md:flex-row">
                {/* Left Side - Text Content */}
                <div className="w-full md:w-1/2 relative flex items-center justify-center p-4 md:p-8 lg:p-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
                  {/* Animated decorative elements */}
                  <div className="absolute top-10 left-10 w-20 h-20 border-4 border-yellow-400/30 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-10 right-10 w-32 h-32 border-4 border-yellow-400/20 rounded-full animate-spin-slow"></div>

                  <div className="relative z-10 max-w-2xl">
                    {/* Circle Animation Container */}
                    <div className="relative inline-block">
                      <CircleAnimation delay={0.3} />

                      {/* Text Content - No Background */}
                      <div className="relative p-8 md:p-12">
                        {slides[currentSlide].text?.map((line, index) => (
                          <motion.div
                            key={index}
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{
                              delay: 0.6 + index * 0.1,
                              duration: 0.6,
                              type: "spring",
                              stiffness: 100
                            }}
                          >
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 drop-shadow-2xl leading-tight">
                              {line}
                            </h2>
                          </motion.div>
                        ))}

                        {/* Decorative underline */}
                        <motion.div
                          className="mt-6 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-transparent rounded-full"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: 1.2, duration: 0.8 }}
                          style={{ transformOrigin: 'left' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Image with Ken Burns Effect */}
                <div className="w-full md:w-1/2 relative overflow-hidden">
                  <motion.div
                    initial={{ scale: 1.2, x: 100 }}
                    animate={{ scale: 1, x: 0 }}
                    transition={{ duration: 20, ease: "linear" }}
                    className="w-full h-full"
                  >
                    <Image
                      src={isMobile && slides[currentSlide].mobileImage ? slides[currentSlide].mobileImage! : slides[currentSlide].image!}
                      alt={`Slide ${currentSlide + 1}`}
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>

                  {/* Gradient overlay for better blend */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

                  {/* Decorative corner elements */}
                  <motion.div
                    className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-yellow-400/50"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  />
                  <motion.div
                    className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-yellow-400/50"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.6 }}
                  />
                </div>
              </div>
            </>
          )}

          {/* Enhanced Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20 bg-black/30 backdrop-blur-md px-6 py-3 rounded-full">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`relative rounded-full transition-all duration-300 ${index === currentSlide
                    ? 'bg-yellow-400 w-12 h-3 shadow-lg shadow-yellow-400/50'
                    : 'bg-white/50 hover:bg-white/75 w-3 h-3 hover-scale'
                  }`}
              >
                {index === currentSlide && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-500 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: progress / 100 }}
                    style={{ transformOrigin: 'left' }}
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}