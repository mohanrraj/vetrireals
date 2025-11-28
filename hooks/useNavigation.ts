import { useState, useEffect } from 'react'

export function useNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  // Close mobile menu when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setMobileMenuOpen(false)
      setActiveDropdown(null)
    }

    window.addEventListener('popstate', handleRouteChange)
    return () => window.removeEventListener('popstate', handleRouteChange)
  }, [])

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name)
  }

  const closeAll = () => {
    setMobileMenuOpen(false)
    setActiveDropdown(null)
  }

  return {
    mobileMenuOpen,
    activeDropdown,
    setMobileMenuOpen,
    toggleDropdown,
    closeAll,
  }
}
