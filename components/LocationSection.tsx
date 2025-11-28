'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { MapPin } from 'lucide-react'

export default function LocationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section id="location" ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <MapPin className="text-purple-600 mr-3" size={40} />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">
              Our Location
            </h2>
          </div>
          <div className="w-24 h-1 gradient-bg mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-600 text-lg max-w-2xl mx-auto">
            Visit us at our office or explore our project locations
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-3xl overflow-hidden shadow-2xl border-4 border-purple-200"
        >
          <div className="relative h-[500px] w-full">
            <iframe
              title="SVR Real Estate Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.099059473987!2d79.9817091!3d12.6815968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52fd002689e19d%3A0xd31c78ad4dd0eacd!2sVetri%20Reals%20%E0%AE%B5%E0%AF%86%E0%AE%B1%E0%AF%8D%E0%AE%B1%E0%AE%BF%20%E0%AE%B0%E0%AE%BF%E0%AE%AF%E0%AE%B2%E0%AF%8D%E0%AE%B8%E0%AF%8D!5e0!3m2!1sen!2sin!4v1698234567890!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-700 text-lg">
            <strong>Address:</strong> Chennai, Tamil Nadu
          </p>
          <p className="text-gray-600 mt-2">
            Contact us for directions to our various project sites
          </p>
        </motion.div>
      </div>
    </section>
  )
}
