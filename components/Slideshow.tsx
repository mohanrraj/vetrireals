// 'use client'

// import { useState, useEffect } from 'react'
// import Image from 'next/image'
// import { motion, AnimatePresence } from 'framer-motion'

// const slides = [
//   {
//     type: 'owners', // First slide with owner images
//     bgColor: 'bg-gradient-to-br from-orange-500 via-red-600 to-pink-700'
//   },
//   {
//     type: 'regular',
//     image: '/slides/slide1.jpg',
//     text: ['Invest in', 'Delivered', 'The Quality', 'Homes at', 'Affordable Cost'],
//     bgColor: 'bg-black/40'
//   },
//   {
//     type: 'regular',
//     image: '/slides/slide2.jpg',
//     text: ['Book your', 'Two Decades', 'of Building', 'Trust And', 'Happiness'],
//     bgColor: 'bg-black/40'
//   },
//   {
//     type: 'regular',
//     image: '/slides/slide3.jpg',
//     text: ['Trust us', 'Book our plot', 'Live happily'],
//     bgColor: 'bg-black/40'
//   }
// ]

// export default function Slideshow() {
//   const [currentSlide, setCurrentSlide] = useState(0) // Start with first slide (owners)

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length)
//     }, 4000)

//     return () => clearInterval(interval)
//   }, [])

//   return (
//     <div className="relative h-screen w-full overflow-hidden">
//       {/* Slideshow */}
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={currentSlide}
//           initial={
//             currentSlide === 0 
//               ? { scale: 0.8, opacity: 0 } // Owner slide: scale in
//               : currentSlide === 1 
//               ? { x: -100, opacity: 0 } // Slide 1: slide from left
//               : currentSlide === 2
//               ? { x: 100, opacity: 0 } // Slide 2: slide from right
//               : { scale: 1.2, opacity: 0 } // Slide 3: zoom out
//           }
//           animate={{ x: 0, scale: 1, opacity: 1 }}
//           exit={
//             currentSlide === 0
//               ? { scale: 1.2, opacity: 0 } // Owner slide: zoom out
//               : currentSlide === 1
//               ? { x: 100, opacity: 0 } // Slide 1: slide to right
//               : currentSlide === 2
//               ? { x: -100, opacity: 0 } // Slide 2: slide to left
//               : { scale: 0.8, opacity: 0 } // Slide 3: zoom in
//           }
//           transition={{ duration: 0.7, ease: 'easeInOut' }}
//           className="absolute inset-0"
//         >
//           {slides[currentSlide].type === 'owners' ? (
//             /* Owner Images Slide - First Slide */
//             <div className={`absolute inset-0 ${slides[currentSlide].bgColor} flex items-center justify-center`}>
//               <div className="flex items-center justify-center gap-8 md:gap-12 lg:gap-16 px-4 mb-20 sm:mb-24 md:mb-28">
//                 {/* Owner Image 1 - Centered Left */}
//                 <motion.div
//                   initial={{ scale: 0, opacity: 0 }}
//                   animate={{ scale: 1, opacity: 1 }}
//                   transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
//                   className="relative"
//                 >
//                   <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-spin-slow blur-md opacity-75" style={{ animation: 'spin 3s linear infinite' }}></div>
//                   <div className="relative w-32 h-48 sm:w-40 sm:h-60 md:w-48 md:h-72 lg:w-56 lg:h-80 xl:w-64 xl:h-96 rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
//                     <Image
//                       src="/logo/owner1.png"
//                       alt="Owner 1"
//                       fill
//                       className="object-cover"
//                     />
//                   </div>
//                 </motion.div>

//                 {/* Owner Image 2 - Centered Right */}
//                 <motion.div
//                   initial={{ scale: 0, opacity: 0 }}
//                   animate={{ scale: 1, opacity: 1 }}
//                   transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
//                   className="relative"
//                 >
//                   <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-spin-slow blur-md opacity-75" style={{ animation: 'spin 3s linear infinite' }}></div>
//                   <div className="relative w-32 h-48 sm:w-40 sm:h-60 md:w-48 md:h-72 lg:w-56 lg:h-80 xl:w-64 xl:h-96 rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
//                     <Image
//                       src="/logo/owner2.jpg"
//                       alt="Owner 2"
//                       fill
//                       className="object-cover"
//                     />
//                   </div>
//                 </motion.div>
//               </div>

//               {/* Welcome Text Below Images */}
//               <motion.div
//                 initial={{ y: 50, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 0.8, duration: 0.8 }}
//                 className="absolute bottom-24 left-0 right-0 text-center px-4"
//               >
//                 <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
//                   Welcome to SVR Associates
//                 </h1>
//                 <p className="text-base sm:text-lg md:text-xl text-white/90">
//                   We are here to support you
//                 </p>
//               </motion.div>
//             </div>
//           ) : (
//             /* Regular Slides */
//             <>
//               {/* Background Image */}
//               <div className="absolute inset-0">
//                 <Image
//                   src={slides[currentSlide].image!}
//                   alt={`Slide ${currentSlide + 1}`}
//                   fill
//                   className="object-cover"
//                   priority
//                 />
//                 <div className={`absolute inset-0 ${slides[currentSlide].bgColor}`} />
//               </div>

//               {/* Text Content */}
//               <div className="absolute left-2 sm:left-4 md:left-8 lg:left-16 top-1/2 -translate-y-1/2 z-10 right-2 sm:right-auto">
//                 <motion.div
//                   initial={{ x: -100, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   transition={{ delay: 0.3, duration: 0.8 }}
//                   className="bg-yellow-400 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 shadow-2xl max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg border-3 sm:border-4 border-yellow-500"
//                 >
//                   {slides[currentSlide].text?.map((line, index) => (
//                     <motion.p
//                       key={index}
//                       initial={{ x: -50, opacity: 0 }}
//                       animate={{ x: 0, opacity: 1 }}
//                       transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
//                       className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-red-900 mb-1 sm:mb-2"
//                     >
//                       {line}
//                     </motion.p>
//                   ))}
//                 </motion.div>
//               </div>
//             </>
//           )}

//           {/* Slide Indicators */}
//           <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
//             {slides.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentSlide(index)}
//                 className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                   index === currentSlide
//                     ? 'bg-white w-8'
//                     : 'bg-white/50 hover:bg-white/75'
//                 }`}
//               />
//             ))}
//           </div>
//         </motion.div>
//       </AnimatePresence>
//     </div>
//   )
// }

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
    const duration = 4000
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
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] w-full overflow-hidden">
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
                // Mobile layout: Image above text with no gap
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
                // Desktop layout: Original design with enhancements
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
              {/* Background Image with Ken Burns Effect */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.1 }}
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
                <div className={`absolute inset-0 ${slides[currentSlide].bgColor}`} />
              </div>

              {/* Animated Text Content with Glassmorphism */}
              <div className="absolute left-2 sm:left-4 md:left-8 lg:left-16 top-1/2 -translate-y-1/2 z-10 right-2 sm:right-auto">
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 100 }}
                  className="glass-dark rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 shadow-2xl max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg border-3 sm:border-4 border-yellow-500/50 hover-lift"
                >
                  {slides[currentSlide].text?.map((line, index) => (
                    <motion.p
                      key={index}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        delay: 0.5 + index * 0.1,
                        duration: 0.6,
                        type: "spring",
                        stiffness: 100
                      }}
                      className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-1 sm:mb-2 drop-shadow-lg"
                    >
                      {line}
                    </motion.p>
                  ))}
                </motion.div>
              </div>
            </>
          )}

          {/* Slide Indicators with Enhanced Animation */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`relative rounded-full transition-all duration-300 ${index === currentSlide
                    ? 'bg-white w-8 h-3'
                    : 'bg-white/50 hover:bg-white/75 w-3 h-3 hover-scale'
                  }`}
              >
                {index === currentSlide && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
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