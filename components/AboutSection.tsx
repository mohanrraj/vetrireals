'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Target, Eye, Heart } from 'lucide-react'

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true, 
    amount: 0.1, // Reduced threshold for mobile
    margin: '-50px 0px -50px 0px' // Add margin to trigger earlier
  })

  const aboutPoints = [
    "The organization's main vision is to be able to provide an ownership of a piece of land for each and every individual in Chennai to fulfill their desires of building their dream homes with innovation and customization.",
    "The organization is well known for its quality services, loyalty and commitment towards customers.",
    "More importantly, the organization creates better futures, not only for the people who live in these elegant and revolutionized environments, but also for the wider community.",
    "The organization provides to sell well-acclaimed, government approved and registered plots in good locations at unbelievably cheap costs like none other in Chennai. Many of the organization's esteemed projects are developed in and around Chennai.",
    "With the future in mind, the organization believes in creating livable communities while remaining committed to environmental sustainability.",
    "These plots are located in the niche areas and at rapidly fast developing regions. Every project undertaken by the organization has been a pioneer in changing the landscape.",
    "We specialize in offering approved residential plots around Chennai at affordable costs.",
    "Please do feel free to contact us or to step into our office as this is the unusually right and effective place."
  ]

  const corporateValues = [
    {
      icon: Target,
      title: 'Mission',
      description: 'We provide value driven results to our Customers, Employees, Industry and Environment.',
      color: 'from-pink-500 to-purple-600'
    },
    {
      icon: Eye,
      title: 'Vision',
      description: 'To be the most trusted and innovative real estate developer in India and maintain to provide quality living to all our customers and help their "Dreams come true".',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Heart,
      title: 'Values',
      description: 'To be the world\'s preferred real estate firm, providing the most creative and innovative services on a consistent basis, to drive meaningful value to our customer. To be the best what we do…',
      color: 'from-purple-500 to-pink-600'
    }
  ]

  return (
    <section id="about" ref={ref} className="py-12 md:py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-8 pb-2">
            About Us
          </h2>
          <div className="w-24 h-1 gradient-bg mx-auto rounded-full animate-underline-glow"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-20">
          {aboutPoints.map((point, index) => {
            const gradients = [
              'from-purple-500 to-pink-500',
              'from-blue-500 to-cyan-500',
              'from-green-500 to-teal-500',
              'from-orange-500 to-red-500',
              'from-indigo-500 to-purple-500',
              'from-pink-500 to-rose-500',
              'from-yellow-500 to-orange-500',
              'from-teal-500 to-green-500'
            ]
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-gradient-to-br ${gradients[index]} rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-2 hover:scale-[1.02] md:hover:scale-105`}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 rounded-full bg-white mt-2 flex-shrink-0 shadow-lg"></div>
                  <p className="text-white leading-relaxed font-medium">{point}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Corporate Profile */}
        <div className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 bg-[length:200%_200%]">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-8 pb-2">
              Corporate Profile
            </h2>
            <div className="w-24 h-1 gradient-bg mx-auto rounded-full animate-underline-glow"></div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {corporateValues.map((item, index) => {
            const Icon = item.icon
            const backgrounds = [
              'bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600',
              'bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600',
              'bg-gradient-to-br from-orange-500 via-red-500 to-pink-600'
            ]
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                className="relative group h-full"
              >
                <div className={`${backgrounds[index]} rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 h-full hover:scale-[1.02] md:hover:scale-105`}>
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white drop-shadow-lg">
                    {item.title}
                  </h3>
                  <p className="text-white/95 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
                <div className="absolute inset-0 bg-white rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10"></div>
              </motion.div>
            )
          })}
          </div>
        </div>
      </div>
    </section>
  )
}
