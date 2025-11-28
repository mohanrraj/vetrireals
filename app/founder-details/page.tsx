'use client'

import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Award, Users, Building, TrendingUp } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

export default function FounderDetails() {
  const [counts, setCounts] = useState({
    projects: 0,
    customers: 0,
    years: 0,
    isVisible: false
  })
  const animationStarted = useRef(false)
  const rafRef = useRef<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)

  // Function to animate the counter with easing
  const animateCounter = (start: number, end: number, duration: number, callback: (value: number) => void) => {
    const range = end - start;
    const startTime = performance.now();
    
    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Apply easing function (easeOutQuad)
      const easedProgress = 1 - Math.pow(1 - progress, 2);
      const currentValue = Math.floor(start + (range * easedProgress));
      
      callback(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        // Ensure final value is set exactly
        callback(end);
      }
    };
    
    requestAnimationFrame(updateCounter);
  };
  
  // Function to calculate scroll progress through the section
  const handleScroll = () => {
    if (!sectionRef.current) return;
    
    const section = sectionRef.current;
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate how much of the section is visible
    const sectionTop = rect.top;
    const sectionHeight = rect.height;
    
    // Start animation when section is 30% in view
    if (sectionTop <= windowHeight * 0.7 && !animationStarted.current) {
      animationStarted.current = true;
      
      // Reset all counters to 0 first
    setCounts({
      projects: 0,
      customers: 0,
      years: 0,
      isVisible: true
    });
    
    // Start counter animations with staggered delays
    const duration = 2500; // 2.5 seconds
    
    // Projects counter (25)
    setTimeout(() => {
      animateCounter(0, 25, duration, (value) => {
        setCounts(prev => ({
          ...prev,
          projects: value
        }));
      });
    }, 100);
    
    // Customers counter (4500)
    setTimeout(() => {
      animateCounter(0, 4500, duration, (value) => {
        setCounts(prev => ({
          ...prev,
          customers: value
        }));
      });
    }, 300);
    
    // Years counter (18)
    setTimeout(() => {
      animateCounter(0, 18, duration, (value) => {
        setCounts(prev => ({
          ...prev,
          years: value
        }));
      });
    }, 500);
      
      // Clean up function
      return () => {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
      };
    }
  };
  
  // Set up scroll listener with Intersection Observer for better performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Reset animation state when element comes into view
            animationStarted.current = false;
            handleScroll();
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the element is visible
        rootMargin: '0px 0px -100px 0px' // Slightly larger margin to trigger earlier
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    // Initial check in case the section is already in view
    const timer = setTimeout(() => {
      if (currentRef) {
        const rect = currentRef.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.8) {
          handleScroll();
        }
      }
    }, 500);
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      clearTimeout(timer);
    };
  }, [])

  const achievements = [
    {
      icon: Building,
      value: counts.projects,
      title: 'Projects',
      description: 'Frontline developments across Chennai',
      suffix: '+',
      isNumber: true
    },
    {
      icon: Users,
      value: counts.customers,
      title: 'Customers',
      description: 'Highly satisfied and happy clients',
      suffix: '+',
      isNumber: true
    },
    {
      icon: Award,
      value: counts.years,
      title: 'Years',
      description: 'Of excellence since 2006',
      suffix: '+',
      isNumber: true
    },
    {
      icon: TrendingUp,
      value: 'Market Leader',
      title: 'Market Leader',
      description: 'In affordable residential plots'
    }
  ]

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl pb-2 md:text-4xl font-bold gradient-text mb-4">
              MJF.Ln.Dr. L. Velayutham MBA,ML,Ph.D
            </h1>
            <p className="text-xl text-gray-600">Founder & Visionary Leader</p>
          </motion.div>

          {/* Founder Image and Bio */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100"
          >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9Ii9yZ2JhKDE1MywxNjIsMjQ4LDAuMSkiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent"></div>
            </div>
            
            <div className="relative z-10 max-w-6xl mx-auto p-8 md:p-12">
              <div className="relative flex flex-col lg:flex-row items-start gap-12">
                {/* Image Container */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="sticky top-24 w-full lg:w-2/6 self-start flex-shrink-0"
                  style={{
                    maxHeight: 'calc(100vh - 8rem)', // Maximum height based on viewport
                    alignSelf: 'flex-start',
                    minHeight: '500px', // Minimum height to ensure visibility
                  }}
                >
                  <div className="relative w-full h-full">
                    <Image 
                      src="/founder/owner.png" 
                      alt="Dr. L. Velayutham" 
                      width={500}
                      height={700}
                      className="w-full h-full object-contain rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.01]" 
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                      <div>
                        <p className="text-white text-xl font-semibold">MJF.Ln.Dr. L. Velayutham MBA,ML,Ph.D</p>
                        <p className="text-white/90 text-sm">Founder & Visionary</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Bio Container */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="w-full lg:w-4/6 lg:pl-8"
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                    <motion.h2 
                      className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      About Our Founder
                    </motion.h2>
                    
                    <div className="space-y-6 text-gray-800 leading-relaxed text-lg">
                      <motion.p 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                        className="relative pl-6 border-l-4 border-purple-300 py-1"
                      >
                        <span className="font-semibold text-purple-700">MJF.Ln.Dr. L. Velayutham MBA,ML,Ph.D</span> is a visionary businessman and acclaimed developer who established SVR ASSOCIATES
                        in 2006 with a dream to make quality housing accessible to every individual in Chennai.
                      </motion.p>
                      
                      <motion.p 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                        className="relative pl-6 border-l-4 border-pink-300 py-1"
                      >
                        With his <span className="font-semibold text-pink-700">exceptional leadership</span> and commitment to excellence, he has transformed the real estate
                        landscape in Chennai, developing more than 25 frontline projects that have become landmarks of
                        quality and trust.
                      </motion.p>
                      
                      <motion.p 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 }}
                        className="relative pl-6 border-l-4 border-blue-300 py-1"
                      >
                        His philosophy centers around providing <span className="font-semibold text-blue-700">government-approved, registered plots</span> in prime locations
                        at affordable costs, ensuring that every family can fulfill their dream of owning a home.
                      </motion.p>
                    </div>
                    
                    <motion.div 
                      className="mt-10 pt-6 border-t border-gray-100"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                    >
                      <div className="gradient-animated-bg p-8 rounded-2xl text-white shadow-xl">
                        <blockquote className="text-xl italic font-medium leading-relaxed">
                          "Transforming dreams into reality through integrity, innovation, and sustainable development"
                        </blockquote>
                        <p className="mt-4 text-lg font-semibold">- MJF.Ln.Dr. L. Velayutham MBA,ML,Ph.D</p>
                        <p className="text-white/90 text-sm">Founder & Managing Director</p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div 
            ref={sectionRef}
            id="achievements"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-16">
              <motion.h2 
                className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Our Milestones
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Celebrating our journey of excellence and commitment to quality
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                const gradients = [
                  'from-blue-600 to-blue-400',
                  'from-purple-600 to-purple-400',
                  'from-pink-600 to-pink-400',
                  'from-indigo-600 to-indigo-400',
                ][index % 4];
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.1 * index,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    className={`relative group overflow-hidden rounded-2xl bg-gradient-to-br ${gradients} p-0.5 shadow-xl`}
                  >
                    <div className="absolute inset-0.5 bg-white/5 backdrop-blur-sm rounded-xl"></div>
                    
                    <div className="relative bg-white/5 backdrop-blur-sm rounded-xl p-8 h-full transition-all duration-500 group-hover:bg-white/10">
                      {/* Animated border effect */}
                      <div className="absolute inset-0 border-2 border-white/10 rounded-xl group-hover:border-white/30 transition-all duration-500"></div>
                      
                      {/* Icon container with glow effect */}
                      <div className={`w-20 h-20 rounded-2xl mb-6 mx-auto flex items-center justify-center bg-white/10 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-white/20`}>
                        <Icon className="text-white" size={32} />
                      </div>
                      
                      {/* Counter */}
                      <div className="text-center">
                        <h3 className="text-5xl font-extrabold text-white mb-2">
                          {achievement.isNumber ? (
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                              {achievement.value.toLocaleString()}
                              <span className="text-3xl">{achievement.suffix}</span>
                            </span>
                          ) : (
                            <span className="text-4xl">
                              {achievement.value}
                            </span>
                          )}
                        </h3>
                        <h4 className="text-xl font-bold text-white mb-2">{achievement.title}</h4>
                        <p className="text-white/90 font-medium text-base">{achievement.description}</p>
                      </div>
                      
                      {/* Shine effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            <div className="mt-16 text-center">
              <motion.a
                href="/#projects"
                className="inline-flex items-center px-8 py-4 border border-transparent text-base font-bold rounded-full text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Explore Our Projects
                <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* Vision Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12 text-white mb-12"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">Founder's Vision</h2>
            <p className="text-lg text-center max-w-4xl mx-auto leading-relaxed">
              "To be the most trusted real estate developer in India, providing innovative and quality living spaces
              that help every family realize their dreams. We are committed to building not just homes, but communities
              where people can thrive, grow, and create lasting memories."
            </p>
            <p className="text-center mt-6 text-xl font-semibold">- MJF.Ln.Dr. L. Velayutham MBA,ML,Ph.D</p>
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link
              href="/"
              className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft size={20} />
              <span>Go Back</span>
            </Link>
            <Link
              href="/"
              className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Home size={20} />
              <span>Home</span>
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

//   // useEffect(() => {
//   //   const element = document.querySelector('#achievements');
//   //   if (!element || animationStarted.current) return;

//   //   const observer = new IntersectionObserver(([entry]) => {
//   //     if (entry.isIntersecting && !animationStarted.current) {
//   //       console.log('Starting animation...');
//   //       animationStarted.current = true;
        
//   //       const startTime = Date.now();
//   //       const duration = 2000; // 2 seconds
//   //       const steps = 50; // Number of steps in the animation
//   //       const stepTime = duration / steps;
//   //       let currentStep = 0;

//   //       const animateStep = () => {
//   //         currentStep++;
//   //         const progress = currentStep / steps;
          
//   //         setCounts({
//   //           projects: Math.min(Math.floor(25 * progress), 25),
//   //           customers: Math.min(Math.floor(4500 * progress), 4500),
//   //           years: Math.min(Math.floor(18 * progress), 18),
//   //           isVisible: true
//   //         });

//   //         if (currentStep < steps) {
//   //           timeoutRef.current = setTimeout(animateStep, stepTime);
//   //         }
//   //       };

//   //       // Start the animation
//   //       timeoutRef.current = setTimeout(animateStep, stepTime);
//   //     }
//   //   }, { threshold: 0.1 });
    
//   //   observer.observe(element);
    
//   //   return () => {
//   //     observer.disconnect();
//   //     if (timeoutRef.current) {
//   //       clearTimeout(timeoutRef.current);
//   //     }
//   //   };
//   // }, []);

//   useEffect(() => {
//   const element = document.querySelector('#achievements');
//   if (!element || animationStarted.current) return;

//   const observer = new IntersectionObserver(([entry]) => {
//     if (entry.isIntersecting && !animationStarted.current) {
//       animationStarted.current = true;

//       const duration = 2000; // 2 seconds
//       const startTime = performance.now();

//       const animate = (currentTime: number) => {
//         const elapsed = currentTime - startTime;
//         const progress = Math.min(elapsed / duration, 1);

//         setCounts({
//           projects: Math.floor(25 * progress),
//           customers: Math.floor(4500 * progress),
//           years: Math.floor(18 * progress),
//           isVisible: true
//         });

//         if (progress < 1) {
//           requestAnimationFrame(animate);
//         }
//       };

//       requestAnimationFrame(animate);
//     }
//   }, { threshold: 0.1 });

//   observer.observe(element);

//   return () => {
//     observer.disconnect();
//   };
// }, []);

//   const achievements = [
//     { 
//       icon: Building, 
//       value: counts.projects, 
//       title: 'Projects', 
//       description: 'Frontline developments across Chennai',
//       suffix: '+',
//       isNumber: true
//     },
//     { 
//       icon: Users, 
//       value: counts.customers, 
//       title: 'Customers', 
//       description: 'Highly satisfied and happy clients',
//       suffix: '+',
//       isNumber: true
//     },
//     { 
//       icon: Award, 
//       value: counts.years, 
//       title: 'Years', 
//       description: 'Of excellence since 2006',
//       suffix: '+',
//       isNumber: true
//     },
//     { 
//       icon: TrendingUp, 
//       value: 'Market Leader', 
//       title: 'Market Leader', 
//       description: 'In affordable residential plots'
//     },
//   ]

//   return (
//     <main className="min-h-screen bg-gray-50">
//       <Navbar />
      
//       <div className="pt-24 pb-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Header */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-12"
//           >
//             <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4">
//               Dr. L. Velayutham
//             </h1>
//             <p className="text-xl text-gray-600">
//               Founder & Visionary Leader
//             </p>
//           </motion.div>

//           {/* Founder Image and Bio */}
//           <div className="grid md:grid-cols-2 gap-12 mb-16">
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//               className="flex justify-center items-center"
//             >
//               <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
//                 <Image
//                   src="/founder/founder.jpg"
//                   alt="Dr. L. Velayutham"
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//               className="space-y-6"
//             >
//               <div className="bg-white rounded-2xl p-8 shadow-lg">
//                 <h2 className="text-3xl font-bold gradient-text mb-6">
//                   About Our Founder
//                 </h2>
//                 <div className="space-y-4 text-gray-700 leading-relaxed">
//                   <p>
//                     Dr. L. Velayutham is a visionary businessman and acclaimed developer who established 
//                     SVR ASSOCIATES in 2006 with a dream to make quality housing accessible to every individual 
//                     in Chennai.
//                   </p>
//                   <p>
//                     With his exceptional leadership and commitment to excellence, he has transformed the 
//                     real estate landscape in Chennai, developing more than 25 frontline projects that have 
//                     become landmarks of quality and trust.
//                   </p>
//                   <p>
//                     His philosophy centers around providing government-approved, registered plots in prime 
//                     locations at affordable costs, ensuring that every family can fulfill their dream of 
//                     owning a home.
//                   </p>
//                   <p>
//                     Under his guidance, SVR ASSOCIATES has grown to serve over 4500 highly satisfied 
//                     customers, establishing a reputation for integrity, quality, and customer-centric service.
//                   </p>
//                   <p>
//                     Dr. Velayutham's vision extends beyond business success. He believes in creating 
//                     sustainable communities that enhance the quality of life for residents while remaining 
//                     committed to environmental responsibility.
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           </div>

//           {/* Achievements */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             className="mb-16"
//           >
//             <h2 className="text-3xl font-bold gradient-text mb-8 text-center">
//               Key Achievements
//             </h2>
//             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {achievements.map((achievement, index) => {
//                 const Icon = achievement.icon
//                 return (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
//                     className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center"
//                   >
//                     <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center mb-4 mx-auto">
//                       <Icon className="text-white" size={32} />
//                     </div>
//                     <h3 className="text-3xl font-bold text-gray-900 mb-2">
//                       {achievement.isNumber ? (
//                         <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
//                           {achievement.value.toLocaleString()}{achievement.suffix}
//                         </span>
//                       ) : (
//                         <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
//                           {achievement.value}
//                         </span>
//                       )}
//                     </h3>
//                     <p className="text-gray-600 font-medium">{achievement.title}</p>
//                     <p className="text-gray-500 text-sm mt-2">{achievement.description}</p>
//                   </motion.div>
//                 )
//               })}
//             </div>
//           </motion.div>

//           {/* Vision Statement */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.8 }}
//             className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12 text-white mb-12"
//           >
//             <h2 className="text-3xl font-bold mb-6 text-center">
//               Founder's Vision
//             </h2>
//             <p className="text-lg text-center max-w-4xl mx-auto leading-relaxed">
//               "To be the most trusted real estate developer in India, providing innovative and quality 
//               living spaces that help every family realize their dreams. We are committed to building 
//               not just homes, but communities where people can thrive, grow, and create lasting memories."
//             </p>
//             <p className="text-center mt-6 text-xl font-semibold">
//               - Dr. L. Velayutham
//             </p>
//           </motion.div>

//           {/* Navigation Buttons */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 1 }}
//             className="flex flex-wrap gap-4 justify-center"
//           >
//             <Link
//               href="/"
//               className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
//             >
//               <ArrowLeft size={20} />
//               <span>Go Back</span>
//             </Link>
//             <Link
//               href="/"
//               className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
//             >
//               <Home size={20} />
//               <span>Home</span>
//             </Link>
//           </motion.div>
//         </div>
//       </div>

//       <Footer />
//     </main>
//   )
// }
