'use client'

import Link from 'next/link'
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <footer ref={ref} className="bg-gray-900 text-white relative overflow-hidden">
      {/* Enhanced Building Construction Animation Background */}
      <div className="absolute inset-0 opacity-15">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ height: 0, opacity: 0 }}
            animate={isInView ? { 
              height: `${60 + Math.random() * 40}%`,
              opacity: 1
            } : {}}
            transition={{ 
              duration: 2, 
              delay: i * 0.15, 
              ease: [0.43, 0.13, 0.23, 0.96],
              repeat: Infinity,
              repeatType: 'reverse',
              repeatDelay: 3
            }}
            className={`absolute bottom-0 ${
              i % 3 === 0 ? 'bg-gradient-to-t from-purple-500 via-pink-500 to-purple-400' :
              i % 3 === 1 ? 'bg-gradient-to-t from-blue-500 via-cyan-500 to-blue-400' :
              'bg-gradient-to-t from-indigo-500 via-purple-500 to-indigo-400'
            }`}
            style={{
              left: `${i * 12.5}%`,
              width: '10%',
              borderRadius: '8px 8px 0 0',
            }}
          />
        ))}
      </div>
      
      {/* Animated Wave Effect */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 bg-[length:200%_200%]"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4">SVR Real Estate</h3>
            <p className="text-gray-400 mb-4">
              Leading property developer in Chennai with over 25 frontline projects and 4500+ satisfied customers since 2006.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-gray-400 hover:text-white transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-400">
                <Phone size={16} />
                <a href="https://wa.me/919367936768" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
                  +91 93679 36768
                </a>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail size={16} />
                <span>info@svrassociates.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <MapPin size={16} />
                <span>Chennai, Tamil Nadu</span>
              </li>
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/srivetrirealsassociate"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/svr24associates"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.youtube.com/@SVRASSOCIATES-v2w"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Youtube size={20} />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="border-t border-gray-800 mt-8 pt-8 text-center"
        >
          <p className="text-gray-400">
            © {currentYear} SVR Real Estate. All rights reserved. | Designed with ❤️ for your dream home
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
