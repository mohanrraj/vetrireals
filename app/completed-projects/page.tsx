'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Home, ChevronRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const projects = [
  {
    id: 1,
    title: 'Teacher Colony',
    description: 'Premium residential plots with modern amenities and 24/7 security',
    image: '/projects/1/logo01a.jpg',
    location: 'Chengalpattu',
    year: '2023',
    area: 'Various Sizes',
    href: '/project/1'
  },
  {
    id: 2,
    title: 'Golder Heaven',
    description: 'Gated community with excellent connectivity and modern facilities',
    image: '/projects/2/logo02a.jpg',
    location: 'Chengalpattu',
    year: '2023',
    area: 'Various Sizes',
    href: '/project/2'
  },
  {
    id: 3,
    title: 'Sri Sai MM Nagar',
    description: 'Well-planned layout with all modern amenities and green spaces',
    image: '/projects/3/logo03a.jpg',
    location: 'Vandalur',
    year: '2023',
    area: 'Various Sizes',
    href: '/project/3'
  },
  // Add more projects as needed
];

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
    >
      <div className="relative h-72 overflow-hidden group">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 w-full">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">{project.title}</h3>
          <p className="text-blue-200 text-sm md:text-base">{project.location} • {project.year}</p>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
          <Link
            href={project.href}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full font-medium flex items-center space-x-2 transform hover:scale-105 transition-all duration-300"
          >
            <span>View Project</span>
            <ChevronRight size={18} className="mt-0.5" />
          </Link>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-600 mb-4 text-sm md:text-base">{project.description}</p>
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <span className="text-sm text-gray-500 font-medium">Plot Area: {project.area}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default function CompletedProjects() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 flex flex-col pt-16 md:pt-20">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-16">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Completed Projects
          </h1> */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl pb-2 font-bold text-gray-900 mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent drop-shadow-lg">
            Our Completed Projects
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-8" />

          {/* Navigation Buttons - Top */}
          {/* <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => router.back()}
              className="flex items-center px-6 py-2.5 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-blue-600 hover:bg-blue-50 font-medium"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </button>
            <Link
              href="/"
              className="flex items-center px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:opacity-90 font-medium"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </div> */}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-10 flex flex-wrap gap-4 justify-center"
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

        {/* Bottom Navigation
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4 mt-16 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center px-6 py-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-blue-600 hover:bg-blue-50 font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
          <Link 
            href="/"
            className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:opacity-90 font-medium"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          <Link 
            href="/#contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Get in Touch
          </Link>
        </motion.div> */}
      </div>

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SVR Associates</h3>
              <p className="text-gray-400">Delivering excellence in construction and development since 2010.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/#projects" className="text-gray-400 hover:text-white transition-colors">Projects</Link></li>
                <li><Link href="/founder-details" className="text-gray-400 hover:text-white transition-colors">Founder</Link></li>
                <li><Link href="/#contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <address className="not-italic text-gray-400">
                <p>123 Construction Street</p>
                <p>Chennai, Tamil Nadu 600001</p>
                <p className="mt-2">Phone: +91 98765 43210</p>
                <p>Email: info@svrconstructions.com</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} SVR Associates. All rights reserved.</p>
          </div>
        </div>
      </footer> */}
      <Footer />
    </main>
  );
}
