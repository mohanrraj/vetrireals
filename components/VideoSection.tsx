'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Play } from 'lucide-react'

const videos = [
  {
    title: 'Siddhar Nagar',
    subtitle: 'Muthumala Murugan Temple Salem',
    url: 'https://youtu.be/wt1QPy_p0K0',
    embedId: 'wt1QPy_p0K0'
  },
  {
    title: 'SATELLITE CITY',
    subtitle: 'CHENNAI PART-2 ECR TOWNSHIP ANUPURAM',
    url: 'https://youtu.be/PPkVXY_9irk',
    embedId: 'PPkVXY_9irk'
  },
  {
    title: 'VSR Nagar',
    subtitle: 'CHENGALPATTU COLLECTOR OFFICE OPPOSITE & NH 45',
    url: 'https://youtu.be/_e5S-fZDId4',
    embedId: '_e5S-fZDId4'
  }
]

export default function VideoSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 pb-2">
            Explore Our Stunning Property Developments
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full animate-underline-glow"></div>
          <p className="mt-6 text-gray-300 text-lg max-w-2xl mx-auto">
            Take a virtual tour of our premium projects
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative aspect-video bg-gray-800">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.embedId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {video.title}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {video.subtitle}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
