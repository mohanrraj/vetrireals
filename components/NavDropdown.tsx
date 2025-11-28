'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

interface DropdownItem {
  label: string
  href: string
  description?: string
  icon?: React.ReactNode
}

interface NavDropdownProps {
  title: string
  items: DropdownItem[][]
  isMobile?: boolean
  isScrolled?: boolean
}

export const NavDropdown = ({ title, items, isMobile = false, isScrolled = false }: NavDropdownProps) => {
  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    setOpen(false)
    window.location.href = href
  };

  const [open, setOpen] = useState(false)
  const setIsOpen = (isOpen: boolean) => setOpen(isOpen);
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const handleNavClickLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setOpen(false)
    
    // If it's an internal link, use Next.js router
    if (href.startsWith('/')) {
      window.location.href = href
    } else {
      // Handle external links
      window.open(href, '_blank', 'noopener,noreferrer')
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close dropdown when route changes
  useEffect(() => {
    setOpen(false)
  }, [pathname])


  if (isMobile) {
    return (
      <div className="space-y-1">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={`flex items-center justify-between w-full px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/20'
          }`}
        >
          <span className={isScrolled ? 'text-gray-800' : 'text-white'}>{title}</span>
          <svg
            className={`ml-2 h-5 w-5 text-gray-400 group-hover:text-blue-500 transform transition-transform ${
              open ? 'rotate-180' : ''
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {open && (
          <div className="pl-4 space-y-1">
            {items.map((group, groupIndex) => (
              <div key={groupIndex} className="space-y-1">
                {group.map((item, itemIndex) => (
                  <Link
                    key={itemIndex}
                    href={item.href}
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                  >
                    {item.label}
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
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors text-white hover:bg-white/20"
      >
        <span className="text-white">{title}</span>
        <svg
          className={`ml-2 h-5 w-5 transition-transform duration-200 text-white ${
            open ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 w-64 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
          >
            <div className="py-1">
              {items.map((group, groupIndex) => (
                <div key={groupIndex} className="space-y-1">
                  {groupIndex > 0 && <div className="border-t border-gray-100 my-1"></div>}
                  {group.map((item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      href={item.href}
                      onClick={(e) => handleNavClickLink(e, item.href)}
                      className="flex items-start p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors group"
                    >
                      {item.icon && (
                        <span className="mr-3 text-gray-400 group-hover:text-blue-500">
                          {item.icon}
                        </span>
                      )}
                      <div>
                        <div className="font-medium text-gray-900 group-hover:text-blue-600">
                          {item.label}
                        </div>
                        {item.description && (
                          <div className="text-xs text-gray-500 mt-0.5">
                            {item.description}
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
