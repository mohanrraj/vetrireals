'use client'

import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, ArrowLeft, CheckCircle, MessageCircle, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { projects } from '@/data/projects'

const getImageCategory = (img: string, index: number): string => {
    const categories = [
        'Exterior', 'Interior', 'Aerial', 'Landscape', 'Detail', 'Overview'
    ];
    return categories[index % categories.length];
};

function ImageGallery({
    images,
    initialIndex = 0,
    onClose,
    projectId
}: {
    images: string[]
    initialIndex?: number
    onClose: () => void
    projectId: number
}) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') goToNext();
            if (e.key === 'ArrowLeft') goToPrevious();
        };

        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
                aria-label="Close gallery"
            >
                <X size={32} />
            </button>

            <button
                onClick={goToPrevious}
                className="absolute left-4 p-2 text-white hover:text-gray-300 transition-colors z-10"
                aria-label="Previous image"
            >
                <ChevronLeft size={40} />
            </button>

            <div className="flex justify-center items-center w-full py-8">
                <div className="project-image relative w-full max-w-[700px] aspect-square bg-black rounded-2xl overflow-hidden">
                    <Image
                        src={`/projects/${projectId}/${images[currentIndex]}`}
                        alt={`Project image ${currentIndex + 1}`}
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>

            <button
                onClick={goToNext}
                className="absolute right-4 p-2 text-white hover:text-gray-300 transition-colors z-10"
                aria-label="Next image"
            >
                <ChevronRight size={40} />
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-500'
                            }`}
                        aria-label={`Go to image ${index + 1}`}
                    />
                ))}
            </div>
        </motion.div>
    );
}

export default function ProjectDetailClient() {
    const params = useParams()
    const router = useRouter()
    const slug = params.slug as string
    const project = projects.find(p => p.slug === slug)
    const [isGalleryOpen, setIsGalleryOpen] = useState(false)
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    const galleryRef = useRef<HTMLDivElement>(null)

    const images = project ? project.images : []

    const scrollToGallery = () => {
        galleryRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const openGallery = (index: number) => {
        setSelectedImageIndex(index)
        setIsGalleryOpen(true)
    }

    if (!project) {
        return <div>Project not found</div>
    }

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
                        className="mb-12 sm:mb-14 md:mb-16 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-xl animate-gradient bg-[length:200%_200%]"
                    >
                        <motion.h1
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold gradient-text mb-4 sm:mb-5 md:mb-6 pb-2 sm:pb-3 md:pb-4"
                        >
                            {project.name}
                        </motion.h1>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100px' }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-4 sm:mb-5 md:mb-6"
                        />
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl font-medium"
                        >
                            {project.description}
                        </motion.p>
                    </motion.div>

                    {/* Project Details Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                        {/* Main Project Image */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                            className="lg:col-span-2 rounded-2xl overflow-hidden shadow-2xl"
                        >
                            <div className="relative h-80 md:h-[500px]">
                                <div className="relative h-full w-full cursor-pointer" onClick={() => openGallery(0)}>
                                    <Image
                                        src={`/project_scrolling/${project.image}`}
                                        alt={project.name}
                                        fill
                                        className="object-contain hover:opacity-90 transition-opacity"
                                    />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="bg-white/80 text-gray-900 px-4 py-2 rounded-full text-sm font-medium">
                                            View Gallery ({images.length} images)
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Project Highlights */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                            className="bg-white rounded-2xl p-6 shadow-2xl"
                        >
                            <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">Project Highlights</h3>

                            <div className="space-y-4">
                                {project.highlights.map((highlight, index) => (
                                    <div key={index} className="flex items-start">
                                        <div className={`p-2 rounded-lg mr-4 ${highlight.icon === 'location' ? 'bg-blue-100 text-blue-600' :
                                            highlight.icon === 'price' ? 'bg-green-100 text-green-600' :
                                                highlight.icon === 'size' ? 'bg-purple-100 text-purple-600' :
                                                    'bg-yellow-100 text-yellow-600'
                                            }`}>
                                            {/* Icons based on type */}
                                            {highlight.icon === 'location' && (
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            )}
                                            {highlight.icon === 'price' && (
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            )}
                                            {highlight.icon === 'size' && (
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                </svg>
                                            )}
                                            {highlight.icon === 'status' && (
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800">{highlight.label}</h4>
                                            <p className={`${highlight.icon === 'status' ? 'text-green-600 font-medium' : 'text-gray-600'}`}>
                                                {highlight.value}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <button
                                    onClick={scrollToGallery}
                                    className="w-full mt-4 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg shadow-sm transition-all duration-300"
                                >
                                    View Site Plan & Gallery
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Amenities Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mb-12"
                    >
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <h2 className="text-3xl font-bold gradient-text mb-6">
                                AMENITIES / PROJECT FEATURES
                            </h2>
                            <p className="text-xl font-semibold text-gray-700 mb-6">
                                You get everything at one place at {project.name}!
                            </p>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {project.amenities.map((amenity, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                                        className="flex items-start space-x-3"
                                    >
                                        <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                                        <span className="text-gray-700">{amenity}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Enhanced Project Gallery Section */}
                    <div ref={galleryRef} className="relative py-16 md:py-20 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                                }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="text-center mb-16"
                            >
                                <span className="inline-block text-sm font-semibold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full mb-4">
                                    Visual Showcase
                                </span>
                                <h2 className="text-4xl md:text-5xl pb-2 font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                                    Project Gallery
                                </h2>
                                <div className="mt-6 w-32 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto mb-6 rounded-full"></div>
                                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                    Discover the beauty and craftsmanship of {project.name} through our exclusive photo collection
                                </p>
                            </motion.div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                {images.map((img, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                        whileInView={{
                                            opacity: 1,
                                            y: 0,
                                            scale: 1,
                                            transition: {
                                                duration: 0.6,
                                                delay: index * 0.1,
                                                ease: [0.16, 1, 0.3, 1]
                                            }
                                        }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        whileHover={{
                                            y: -8,
                                            transition: { duration: 0.3, ease: "easeOut" }
                                        }}
                                        className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 bg-white"
                                        onClick={() => openGallery(index)}
                                    >
                                        <div className="aspect-[4/3] relative">
                                            <Image
                                                src={`/projects/${project.id}/${img}`}
                                                alt={`${project.name} - Image ${index + 1}`}
                                                fill
                                                className="object-cover transition-all duration-700 group-hover:scale-110"
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                priority={index < 3} // Load first 3 images with priority
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                    <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-medium px-3 py-1 rounded-full mb-2">
                                                        {getImageCategory(img, index)}
                                                    </span>
                                                    <h3 className="text-white text-xl font-bold">
                                                        {project.name} - {index + 1}
                                                    </h3>
                                                </div>
                                            </div>
                                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="bg-white/90 backdrop-blur-sm text-gray-900 p-2 rounded-full shadow-lg">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                    transition: { duration: 0.6, delay: 0.3 }
                                }}
                                viewport={{ once: true }}
                                className="mt-12 text-center"
                            >
                                <p className="text-gray-500 text-sm">
                                    {images.length}+ high-quality images • Click any image to view in full screen
                                </p>
                            </motion.div>
                        </div>

                        <style jsx global>{`
              @keyframes blob {
                0% { transform: translate(0px, 0px) scale(1); }
                33% { transform: translate(30px, -50px) scale(1.1); }
                66% { transform: translate(-20px, 20px) scale(0.9); }
                100% { transform: translate(0px, 0px) scale(1); }
              }
              .animate-blob {
                animation: blob 7s infinite;
              }
              .animation-delay-2000 {
                animation-delay: 2s;
              }
            `}</style>
                    </div>

                    {/* Location Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1 }}
                        className="mb-12"
                    >
                        <h2 className="text-3xl font-bold gradient-text mb-6">
                            Project Location
                        </h2>
                        <div className="rounded-2xl overflow-hidden shadow-2xl h-96 border-4 border-purple-200">
                            <iframe
                                title="Project Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.099059473987!2d79.9817091!3d12.6815968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52fd002689e19d%3A0xd31c78ad4dd0eacd!2sVetri%20Reals%20%E0%AE%B5%E0%AF%86%E0%AE%B1%E0%AF%8D%E0%AE%B1%E0%AE%BF%20%E0%AE%B0%E0%AE%BF%E0%AE%AF%E0%AE%B2%E0%AF%8D%E0%AE%B8%E0%AF%8D!5e0!3m2!1sen!2sin!4v1698234567890!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </motion.div>

                    {/* Navigation Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                        className="flex flex-wrap gap-4 justify-center"
                    >
                        <button
                            onClick={() => router.back()}
                            className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                        >
                            <ArrowLeft size={20} />
                            <span>Go Back</span>
                        </button>
                        <Link
                            href="/"
                            className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                        >
                            <Home size={20} />
                            <span>Home</span>
                        </Link>
                        <a
                            href={`https://wa.me/919367936768?text=Hi, I'm interested in the project: ${project.name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                        >
                            <MessageCircle size={20} />
                            <span>Inquiry</span>
                        </a>
                    </motion.div>
                </div>
            </div>

            <Footer />

            {/* Image Gallery Modal */}
            <AnimatePresence>
                {isGalleryOpen && (
                    <ImageGallery
                        images={images}
                        initialIndex={selectedImageIndex}
                        onClose={() => setIsGalleryOpen(false)}
                        projectId={project.id}
                    />
                )}
            </AnimatePresence>
        </main>
    )
}
