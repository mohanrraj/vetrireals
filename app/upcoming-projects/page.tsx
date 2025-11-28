'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Calendar, Clock, MapPin, ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type Project = {
  id: number;
  title: string;
  location: string;
  date: string;
  description: string;
  image: string;
  price: string;
  features: string[];
};

const projects: Project[] = [
  {
    id: 1,
    title: 'Luxury Villas',
    location: 'Chengalpattu East',
    date: '2025-12-15',
    description: 'Premium luxury villas with modern amenities and scenic views.',
    image: '/images/projects/villa.jpg',
    price: '₹75 Lakhs Onwards',
    features: ['Gated Community', 'Swimming Pool', 'Club House', '24/7 Security']
  }
  // Commented out for future use
  // {
  //   id: 2,
  //   title: 'Plots in Mahindra World City',
  //   location: 'Near Mahindra World City',
  //   date: '2026-02-20',
  //   description: 'Premium residential plots with all necessary approvals and clear titles.',
  //   image: '/images/projects/plots.jpg',
  //   price: '₹2,500/sq.ft',
  //   features: ['EB & Water Connection', 'Wide Roads', 'Drainage', 'Approved Layouts']
  // },
  // {
  //   id: 3,
  //   title: 'Farm Lands',
  //   location: 'Chengalpattu Outskirts',
  //   date: '2025-11-01',
  //   description: 'Agricultural lands with good water resources and road access.',
  //   image: '/images/projects/farmland.jpg',
  //   price: '₹15 Lakhs/Acre',
  //   features: ['Clear Title', 'Good Water Source', 'Motorable Road', 'Fertile Soil']
  // }
];

type SubscriptionStatus = 'idle' | 'loading' | 'success' | 'error';

export default function UpcomingProjects() {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [showSubscribeForm, setShowSubscribeForm] = useState(false);
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>('idle');
  const [subscriptionMessage, setSubscriptionMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const currentProject = projects[currentProjectIndex];

  useEffect(() => {
    // Calculate time until project launch
    const calculateTimeLeft = () => {
      const launchDate = new Date(currentProject.date).getTime();
      const now = new Date().getTime();
      const difference = launchDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); // Initial calculation

    return () => clearInterval(timer);
  }, [currentProject.date]);

  const nextProject = () => {
    setCurrentProjectIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProjectIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscriptionStatus('loading');

    try {
      // Save to local storage
      const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
      const newSubscriber = {
        id: crypto.randomUUID(),
        email,
        subscribedAt: new Date().toISOString()
      };

      // Check if email already exists
      if (subscribers.some((sub: any) => sub.email === email)) {
        throw new Error('This email is already subscribed');
      }

      // Add new subscriber and save to local storage
      subscribers.push(newSubscriber);
      localStorage.setItem('subscribers', JSON.stringify(subscribers));

      setSubscriptionStatus('success');
      setSubscriptionMessage('Thank you for subscribing!');
      setEmail('');

      // Hide form after 3 seconds
      setTimeout(() => {
        setShowSubscribeForm(false);
        // Reset status after hiding form
        setTimeout(() => setSubscriptionStatus('idle'), 500);
      }, 3000);
    } catch (error) {
      console.error('Subscription error:', error);
      setSubscriptionStatus('error');
      setSubscriptionMessage(
        error instanceof Error ? error.message : 'Failed to subscribe. Please try again.'
      );
    }
  };

  const renderSubscribeForm = () => {
    if (subscriptionStatus === 'success') {
      return (
        <motion.div
          className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg font-medium text-green-800 mb-2">Success!</h3>
          <p className="text-green-600">{subscriptionMessage}</p>
        </motion.div>
      );
    }

    if (subscriptionStatus === 'error') {
      return (
        <motion.div
          className="bg-red-50 border border-red-200 rounded-lg p-6 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-lg font-medium text-red-800 mb-2">Error</h3>
          <p className="text-red-600">{subscriptionMessage}</p>
          <button
            onClick={() => setSubscriptionStatus('idle')}
            className="mt-4 text-sm font-medium text-red-600 hover:text-red-700"
          >
            Try Again
          </button>
        </motion.div>
      );
    }

    return (
      <motion.form
        onSubmit={handleSubscribe}
        className="space-y-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="your@email.com"
            required
          />
        </div>
        <button
          type="submit"
          disabled={subscriptionStatus === 'loading'}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {subscriptionStatus === 'loading' ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Subscribing...
            </>
          ) : (
            'Notify Me on Launch'
          )}
        </button>
        <p className="text-xs text-gray-500 text-center">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </motion.form>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 md:pt-20">
      <Navbar />

      {/* Hero Section with Timer */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Upcoming Project
            </motion.h1>
            <motion.p
              className="text-xl mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Be the first to know about our exciting new development in Chennai
            </motion.p>

            {/* Countdown Timer */}
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-2xl font-semibold mb-4">Launching In</h3>
              <div className="flex justify-center space-x-4 md:space-x-8">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold">{timeLeft.days}</div>
                  <div className="text-sm md:text-base">Days</div>
                </div>
                <div className="text-4xl md:text-5xl font-bold">:</div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
                  <div className="text-sm md:text-base">Hours</div>
                </div>
                <div className="text-4xl md:text-5xl font-bold">:</div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                  <div className="text-sm md:text-base">Minutes</div>
                </div>
                <div className="text-4xl md:text-5xl font-bold">:</div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                  <div className="text-sm md:text-base">Seconds</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Project Showcase */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Project Image */}
            <div className="md:w-1/2 relative">
              <div className="h-full w-full bg-gray-200">
                <div className="relative w-full h-full">
                  <Image
                    src={currentProject.image}
                    alt={currentProject.title}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://placehold.co/800x600/1e3a8a/ffffff?text=Project+Image';
                    }}
                  />
                </div>
              </div>

              {/* Project Image Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="text-white">
                  <h3 className="text-lg font-semibold">Launching Soon</h3>
                  <p className="text-sm">Register your interest today</p>
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="p-8 md:w-1/2">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{currentProject.title}</h2>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-5 h-5 mr-1" />
                    <span>{currentProject.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Starting at</div>
                  <div className="text-2xl font-bold text-indigo-600">{currentProject.price}</div>
                </div>
              </div>

              <p className="text-gray-700 mb-6">{currentProject.description}</p>

              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                <div className="grid grid-cols-2 gap-2">
                  {currentProject.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Launch Date: {new Date(currentProject.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <button
                  onClick={() => setShowSubscribeForm(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg flex items-center transition-colors"
                >
                  Notify Me on Launch
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>

              {/* Subscription Form Modal */}
              {showSubscribeForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <motion.div
                    className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <button
                      onClick={() => setShowSubscribeForm(false)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                      disabled={subscriptionStatus === 'loading'}
                    >
                      <X className="w-6 h-6" />
                    </button>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Notified on Launch</h3>
                    <p className="text-gray-600 mb-6">
                      Enter your email to receive updates about {currentProject.title} and other exciting projects.
                    </p>
                    {renderSubscribeForm()}
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Project Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={prevProject}
            className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 mr-1" />
            Previous Project
          </button>
          <button
            onClick={nextProject}
            className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Next Project
            <ChevronRight className="w-6 h-6 ml-1" />
          </button>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-indigo-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Interested in Our Projects?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Get in touch with our team for more information about our upcoming projects and exclusive pre-launch offers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
            <Link
              href="/contact"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/projects"
              className="bg-white hover:bg-gray-100 text-indigo-600 border border-indigo-600 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </div>

      {/* Footer and Navigation */}
      <Footer />

      <div className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between">
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <Link href="/projects" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
              View All Projects
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
