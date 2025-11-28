'use client'

import Navbar from '@/components/Navbar'
import Slideshow from '@/components/Slideshow'
import FounderSection from '@/components/FounderSection'
import AboutSection from '@/components/AboutSection'
import ProjectScrolling from '@/components/ProjectScrolling'
import ProjectsSection from '@/components/ProjectsSection'
import VideoSection from '@/components/VideoSection'
import ContactSection from '@/components/ContactSection'
import GoogleReviews from '@/components/GoogleReviews'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import { Suspense } from 'react'
import Loading from './loading'

export default function Home() {
  return (
    <main className="min-h-screen pt-16 md:pt-20">
      <Navbar />
      <Suspense fallback={<Loading />}>
        <Slideshow />
        <FounderSection />
        <AboutSection />
        <ProjectScrolling />
        <ProjectsSection />
        <VideoSection />
        <GoogleReviews />
        <ContactSection />
      </Suspense>
      <Footer />
      <BackToTop />
    </main>
  )
}