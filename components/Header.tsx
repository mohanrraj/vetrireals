'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NavDropdown } from './NavDropdown'
import { useNavigation } from '../hooks/useNavigation'

// Simple SVG Icons as React components
const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
)

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const ChevronDown = ({ isOpen }: { isOpen: boolean }) => (
  <svg 
    className={`w-5 h-5 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

const HomeIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
)

const InfoIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const LayersIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
)

const MailIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const PhoneIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)

export function Header() {
  const pathname = usePathname()
  const { mobileMenuOpen, activeDropdown, setMobileMenuOpen, toggleDropdown, closeAll } = useNavigation()

  // Navigation items
  const navItems = [
    { 
      name: 'Home', 
      href: '/',
      icon: <HomeIcon />
    },
    {
      name: 'About Us',
      href: '#',
      icon: <InfoIcon />,
      dropdown: [
        [
          {
            label: 'Founder',
            href: '/founder-details',
            description: 'Learn about our founder',
            icon: <InfoIcon />
          },
          {
            label: 'SVR Associates',
            href: '/#about',
            description: 'About our company',
            icon: <InfoIcon />
          }
        ]
      ]
    },
    { 
      name: 'Projects', 
      href: '#',
      icon: <LayersIcon />,
      dropdown: [
        [
          {
            label: 'Ongoing Projects',
            href: '/#projects',
            description: 'View our current developments',
            icon: <LayersIcon />
          },
          {
            label: 'Completed Projects',
            href: '/completed-projects',
            description: 'Explore our successful deliveries',
            icon: <LayersIcon />
          }
        ]
      ]
    },
    { 
      name: 'Contact', 
      href: '/#contact',
      icon: <MailIcon />
    }
  ]

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (mobileMenuOpen && !target.closest('.mobile-menu-container')) {
        closeAll()
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [mobileMenuOpen, closeAll])

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center" onClick={closeAll}>
              <img
                className="h-8 w-auto"
                src="/logo/logo.jpg"
                alt="SVR Associates"
              />
              <span className="ml-2 text-xl font-bold text-gray-900">SVR Associates</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:ml-6 md:flex md:items-center md:space-x-1">
            {navItems.map((item) => {
              if (item.dropdown) {
                return (
                  <NavDropdown
                    key={item.name}
                    title={item.name}
                    items={item.dropdown}
                  />
                )
              }
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium ${
                    pathname === item.href
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
            <a
              href="tel:+919876543210"
              className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              <PhoneIcon />
              Call Now
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
              aria-label="Main menu"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden overflow-hidden mobile-menu-container transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
            <div className="pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              {navItems.map((item) => {
                if (item.dropdown) {
                  return (
                    <div key={item.name} className="px-4 py-2">
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className="w-full flex justify-between items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                      >
                        <div className="flex items-center">
                          <span className="mr-2">{item.icon}</span>
                          {item.name}
                          <ChevronDown isOpen={activeDropdown === item.name} />
                        </div>
                      </button>
                      {activeDropdown === item.name && (
                        <div className="mt-2 pl-4 space-y-1">
                          {item.dropdown.map((group, groupIndex) => (
                            <div key={groupIndex} className="space-y-1">
                              {group.map((subItem, itemIndex) => (
                                <Link
                                  key={itemIndex}
                                  href={subItem.href}
                                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md ml-6"
                                  onClick={closeAll}
                                >
                                  <div className="flex items-center">
                                    <span className="mr-2">{subItem.icon}</span>
                                    {subItem.label}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                }
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-4 py-2 text-base font-medium ${
                      pathname === item.href
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                    onClick={closeAll}
                  >
                    <div className="flex items-center">
                      <span className="mr-2">{item.icon}</span>
                      {item.name}
                    </div>
                  </Link>
                )
              })}
              <div className="border-t border-gray-200 pt-4 pb-3">
                <div className="px-4">
                  <a
                    href="tel:+919876543210"
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                    onClick={closeAll}
                  >
                    <PhoneIcon />
                    Call Now
                  </a>
                </div>
              </div>
            </div>
      </div>
    </header>
  )
}
