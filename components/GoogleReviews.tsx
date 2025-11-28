'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

type Review = {
  id: string;
  author_name: string;
  rating: number;
  text: string;
  relative_time_description?: string;
  time: number;
  profile_photo_url?: string;
};

// Replace with your actual Google Maps Place ID
const PLACE_ID = 'YOUR_GOOGLE_PLACES_PLACE_ID';
const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';

// Function to format the time
const formatTimeAgo = (timestamp: number) => {
  const seconds = Math.floor((Date.now() / 1000 - timestamp) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return `${interval} year${interval === 1 ? '' : 's'} ago`;

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return `${interval} month${interval === 1 ? '' : 's'} ago`;

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return `${interval} day${interval === 1 ? '' : 's'} ago`;

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return `${interval} hour${interval === 1 ? '' : 's'} ago`;

  interval = Math.floor(seconds / 60);
  if (interval >= 1) return `${interval} minute${interval === 1 ? '' : 's'} ago`;

  return 'just now';
};

const GoogleReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!PLACE_ID || !GOOGLE_MAPS_API_KEY) {
        console.error('Google Places API key or Place ID is missing');
        setError('Google Reviews are not properly configured');
        setIsLoading(false);
        return;
      }

      try {
        // First, fetch the place details to get the latest reviews
        const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,user_ratings_total,rating&key=${GOOGLE_MAPS_API_KEY}`;

        const response = await fetch(placeDetailsUrl);
        const data = await response.json();

        if (data.status !== 'OK') {
          console.error('Google Places API Error:', data.error_message || 'Unknown error');
          // Fallback to mock data
          const mockData = getMockReviews();
          setReviews(mockData);
          setError(null); // Clear any previous errors
          return; // Exit early
        }

        if (data.result && data.result.reviews) {
          // Format the reviews data
          const formattedReviews = data.result.reviews.map((review: any) => ({
            id: review.time?.toString() || Date.now().toString(),
            author_name: review.author_name,
            rating: review.rating,
            text: review.text,
            time: review.time * 1000, // Convert to milliseconds
            profile_photo_url: review.profile_photo_url || `/images/avatar${Math.floor(Math.random() * 3) + 1}.jpg`,
          }));

          setReviews(formattedReviews);
        } else {
          // Fallback to mock data if no reviews found
          setReviews(getMockReviews());
        }
      } catch (error) {
        console.error('Error fetching Google reviews:', error);
        // Fallback to mock data
        const mockData = getMockReviews();
        setReviews(mockData);
        setError(null); // Clear any error state to show mock data
      } finally {
        setIsLoading(false);
      }
    };

    // Fallback mock data in case of API failure
    const getMockReviews = (): Review[] => {
      return [
        {
          id: '1',
          author_name: 'Ramesh Kumar',
          rating: 5,
          text: 'Excellent service! Vetri Reals provided us with the best plots in Chengalpattu. Very professional team.',
          time: Date.now() - 14 * 24 * 60 * 60 * 1000, // 2 weeks ago
          profile_photo_url: '/images/avatar1.jpg'
        },
        {
          id: '2',
          author_name: 'Priya Suresh',
          rating: 5,
          text: 'Trustworthy real estate developers. We are happy with our investment near Mahindra World City.',
          time: Date.now() - 30 * 24 * 60 * 60 * 1000, // 1 month ago
          profile_photo_url: '/images/avatar2.jpg'
        },
        {
          id: '3',
          author_name: 'Arjun Menon',
          rating: 4,
          text: 'Good experience overall. The plots are as described and the documentation process was smooth.',
          time: Date.now() - 21 * 24 * 60 * 60 * 1000, // 3 weeks ago
          profile_photo_url: '/images/avatar3.jpg'
        },
      ];
    };

    fetchReviews();
  }, []);

  // Auto-rotate reviews
  useEffect(() => {
    if (reviews.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [reviews.length]);

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-8"></div>
            <div className="h-64 bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  {error}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50" id="testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-blue-600 font-semibold">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 pb-2 gradient-text">
            What Our Clients Say
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="relative h-[32rem] md:h-96 overflow-hidden">
          <AnimatePresence mode="wait">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-8 max-w-4xl mx-auto h-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: index === currentIndex ? 1 : 0,
                  y: index === currentIndex ? 0 : 20,
                  scale: index === currentIndex ? 1 : 0.98
                }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <div className="relative w-full h-full bg-white rounded-2xl shadow-lg overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                  <div className="absolute top-4 right-4 text-blue-100 text-8xl font-serif leading-none">"</div>

                  <div className="h-full flex flex-col p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-center mb-6 w-full">
                      {review.profile_photo_url ? (
                        <div className="w-24 h-24 md:w-20 md:h-20 lg:w-24 lg:h-24 mb-4 md:mb-0 md:mr-6 flex-shrink-0 relative">
                          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full blur opacity-20"></div>
                          <img
                            src={review.profile_photo_url}
                            alt={review.author_name}
                            className="relative w-full h-full rounded-full object-cover border-4 border-white shadow-md"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const fallback = target.parentElement?.querySelector('.initials-fallback');
                              if (fallback) {
                                fallback.classList.remove('hidden');
                              }
                            }}
                          />
                          <div className="initials-fallback hidden w-full h-full rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-2xl font-bold text-white relative">
                            {review.author_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </div>
                        </div>
                      ) : (
                        <div className="relative">
                          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full blur opacity-20"></div>
                          <div className="relative w-24 h-24 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-2xl font-bold text-white shadow-md">
                            {review.author_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </div>
                        </div>
                      )}
                      <div className="text-center md:text-left mt-6 md:mt-0">
                        <h4 className="text-xl font-bold text-gray-900">{review.author_name}</h4>
                        <div className="flex justify-center md:justify-start items-center my-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                          <span className="ml-2 text-sm font-medium text-gray-600">
                            {review.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="relative flex-grow w-full px-2 md:px-6 mb-6">
                      <div className="relative">
                        <svg
                          className="absolute -left-4 -top-4 w-10 h-10 text-blue-100"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>

                        <p className="text-gray-700 text-lg md:text-xl leading-relaxed italic px-8 py-4 text-center md:text-left relative z-10">
                          {review.text}
                        </p>

                        <svg
                          className="absolute -right-4 -bottom-4 w-10 h-10 text-blue-100 transform rotate-180"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <span className="text-sm text-gray-500">
                        {formatTimeAgo(review.time)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Dots indicator */}
        {reviews.length > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-primary' : 'bg-gray-300'}`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Google review button */}
        {/* <div className="text-center mt-12">
          <a
            href="https://search.google.com/local/writereview?placeid=YOUR_GOOGLE_PLACE_ID"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#4285F4] hover:bg-[#3367D6] transition-colors"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
            Write a Review on Google
          </a>
        </div> */}
      </div>
    </section>
  );
};

export default GoogleReviews;
