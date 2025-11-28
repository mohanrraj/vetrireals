'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type Testimonial = {
  id: number;
  name: string;
  role: string;
  location: string;
  content: string;
  rating: number;
  image: string;
};

const HappyCustomers = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Ramesh Kumar',
      role: 'Business Owner',
      location: 'Chengalpattu',
      content: 'Vetri Reals made my dream of owning a plot near Mahindra World City come true. Their team was professional and guided me through every step of the process. The documentation was handled smoothly.',
      rating: 5,
      image: '/avatars/avatar_1.png',
    },
    {
      id: 2,
      name: 'Priya Suresh',
      role: 'IT Professional',
      location: 'Chennai',
      content: 'I was looking for a good investment opportunity in Chengalpattu, and Vetri Reals helped me find the perfect plot. The location is excellent, and the appreciation has been great. Highly recommended!',
      rating: 5,
      image: '/avatars/avatar_2.png',
    },
    {
      id: 3,
      name: 'Arjun Menon',
      role: 'Doctor',
      location: 'Tambaram',
      content: 'The team at Vetri Reals is very professional and transparent. They provided all the necessary documents and ensured a hassle-free buying experience. The plot I purchased has good connectivity and infrastructure.',
      rating: 4,
      image: '/avatars/avatar_3.png',
    },
    {
      id: 4,
      name: 'Meena Ravi',
      role: 'Teacher',
      location: 'Vandalur',
      content: 'As a first-time buyer, I was quite nervous about the entire process. But the team at Vetri Reals made it so simple and transparent. I\'m extremely happy with my investment in their project.',
      rating: 5,
      image: '/avatars/avatar_4.png',
    },
    {
      id: 5,
      name: 'Suresh Babu',
      role: 'Retired Banker',
      location: 'Chengalpattu',
      content: 'I invested in a plot with Vetri Reals as part of my retirement planning. The location is excellent with good growth potential. The team provides regular updates about the development in the area.',
      rating: 4,
      image: '/avatars/avatar_5.png',
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Happy Customers</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Hear what our valued customers have to say about their experience with Vetri Reals
            </p>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="md:flex">
                {/* Customer Image */}
                <div className="md:w-2/5 bg-gray-100 relative h-96 md:h-auto">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <Image
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold">{currentTestimonial.name}</h3>
                    <p className="text-blue-100">{currentTestimonial.role}</p>
                    <p className="text-blue-100">{currentTestimonial.location}</p>
                    <div className="flex mt-2">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-6 h-6 ${i < currentTestimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="p-8 md:w-3/5 flex flex-col">
                  <Quote className="text-blue-100 w-12 h-12 mb-4" />

                  <div className="flex-grow">
                    <p className="text-gray-700 text-lg leading-relaxed mb-8">
                      "{currentTestimonial.content}"
                    </p>
                  </div>

                  {/* Navigation Arrows */}
                  <div className="flex justify-between items-center border-t border-gray-100 pt-6">
                    <button
                      onClick={prevTestimonial}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-600" />
                    </button>

                    <div className="flex space-x-2">
                      {testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentIndex(index)}
                          className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
                          aria-label={`Go to testimonial ${index + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={nextTestimonial}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* More Testimonials Grid */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-center mb-12">More Happy Customers</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                  <motion.div
                    key={testimonial.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    whileHover={{ y: -5 }}
                  >
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden mr-4">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            width={64}
                            height={64}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                          <p className="text-gray-600 text-sm">{testimonial.role}, {testimonial.location}</p>
                        </div>
                      </div>
                      <div className="flex mb-3">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-700">"{testimonial.content.substring(0, 120)}..."</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey With Us?</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              Join our growing family of satisfied customers and invest in your dream property today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 inline-block"
              >
                Contact Us
              </Link>
              <Link
                href="/projects"
                className="bg-white hover:bg-gray-100 text-blue-600 font-semibold py-3 px-8 border border-blue-600 rounded-lg transition duration-300 inline-block"
              >
                View Projects
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Navigation Buttons */}
      <div className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between">
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <Link href="/upcoming-projects" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
              View Upcoming Projects
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HappyCustomers;
