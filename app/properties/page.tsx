"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, Variants, easeInOut } from "framer-motion"
import { Heart, MapPin, Bed, Bath, Ruler, ChevronLeft, ChevronRight, Search, DollarSign, Home, X, Calendar } from "lucide-react"
import Header from "@/components/layout/header"

// Animation variants
const slideInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeInOut,
    },
  },
}

// Sample properties data
const propertiesData = [
  {
    id: 1,
    image: "/1.png",
    title: "Beachfront Villa",
    location: "Malibu, California, US",
    price: "4,850",
    beds: 5,
    baths: 4,
    sqft: 4500,
    popular: true,
  },
  {
    id: 2,
    image: "/2.png",
    title: "Modern Apartment",
    location: "San Francisco, California, US",
    price: "2,500",
    beds: 3,
    baths: 2,
    sqft: 2200,
    popular: false,
  },
  {
    id: 3,
    image: "/3.png",
    title: "Mountain Retreat",
    location: "Aspen, Colorado, US",
    price: "3,200",
    beds: 4,
    baths: 3,
    sqft: 3500,
    popular: true,
  },
  {
    id: 4,
    image: "/4.png",
    title: "Contemporary Home",
    location: "Miami, Florida, US",
    price: "2,100",
    beds: 3,
    baths: 2,
    sqft: 2800,
    popular: false,
  },
  {
    id: 5,
    image: "/5.png",
    title: "Luxury Penthouse",
    location: "New York, NY, US",
    price: "5,500",
    beds: 4,
    baths: 3,
    sqft: 3800,
    popular: true,
  },
  {
    id: 6,
    image: "/6.png",
    title: "Cozy Cottage",
    location: "Portland, Oregon, US",
    price: "1,800",
    beds: 2,
    baths: 1,
    sqft: 1500,
    popular: false,
  },
]

export default function PropertiesPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [favorites, setFavorites] = useState<number[]>([])
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [isSearchSticky, setIsSearchSticky] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isHeaderVisible, setIsHeaderVisible] = useState(false)
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [isGridVisible, setIsGridVisible] = useState(false)

  const searchBarRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const searchSectionRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const itemsPerPage = 6
  const totalPages = Math.ceil(propertiesData.length / itemsPerPage)
  const startIdx = (currentPage - 1) * itemsPerPage
  const displayedProperties = propertiesData.slice(startIdx, startIdx + itemsPerPage)

  // Handle scroll effect for search bar contraction/expansion
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const scrollDirection = scrollTop > lastScrollY ? 'down' : 'up'
      
      // Contract search bar when scrolling down, expand when scrolling up
      if (scrollDirection === 'down' && scrollTop > 100 && isSearchExpanded) {
        setIsSearchExpanded(false)
      }
      
      setLastScrollY(scrollTop)
      
      // Make search bar sticky when scrolled past it
      if (searchBarRef.current) {
        const searchBarRect = searchBarRef.current.getBoundingClientRect()
        setIsSearchSticky(searchBarRect.top <= 20)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY, isSearchExpanded])

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setIsSearchExpanded(false)
      }
    }

    if (isSearchExpanded) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isSearchExpanded])

  useEffect(() => {
    const observers = []

    // Header observer
    const headerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsHeaderVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    // Search section observer
    const searchObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsSearchVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    // Grid observer
    const gridObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsGridVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (headerRef.current) {
      headerObserver.observe(headerRef.current)
      observers.push({ ref: headerRef, observer: headerObserver })
    }
    if (searchSectionRef.current) {
      searchObserver.observe(searchSectionRef.current)
      observers.push({ ref: searchSectionRef, observer: searchObserver })
    }
    if (gridRef.current) {
      gridObserver.observe(gridRef.current)
      observers.push({ ref: gridRef, observer: gridObserver })
    }

    return () => {
      observers.forEach(({ ref, observer }) => {
        if (ref.current) {
          observer.unobserve(ref.current)
        }
      })
    }
  }, [])

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded)
    if (!isSearchExpanded) {
      // Scroll to search bar when expanding
      setTimeout(() => {
        searchBarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 100)
    }
  }

  const searchBarVariants: Variants = {
    collapsed: {
      scale: isSearchSticky ? 0.95 : 1,
      y: isSearchSticky ? 10 : 0,
      borderRadius: isSearchSticky ? "16px" : "12px",
      boxShadow: isSearchSticky ? "0 4px 20px rgba(0,0,0,0.15)" : "0 2px 8px rgba(0,0,0,0.1)",
    },
    expanded: {
      scale: 1,
      y: 0,
      borderRadius: "24px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
    }
  }

  return (
    <div className="min-h-screen bg-purple-50">
      <Header/>
    
      {/* Search Section */}
      <section 
        ref={searchSectionRef}
        className="border-b border-gray-200 bg-white py-8 transition-all duration-1000"
        style={{
          opacity: isSearchVisible ? 1 : 0,
          transform: isSearchVisible ? 'translateY(0)' : 'translateY(30px)'
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Enhanced Search Bar */}
          <motion.div
            ref={searchBarRef}
            className={`mb-8 transition-all duration-300 ${
              isSearchSticky ? 'sticky top-4 z-50' : 'relative'
            }`}
          >
            <motion.div
              className={`bg-white transition-all duration-500 ${
                isSearchSticky ? 'mx-auto max-w-4xl' : 'max-w-6xl mx-auto'
              }`}
              variants={searchBarVariants}
              initial="collapsed"
              animate={isSearchExpanded ? "expanded" : "collapsed"}
              whileHover={!isSearchExpanded ? { scale: 1.02 } : {}}
            >
              {/* Collapsed Search Bar */}
              {!isSearchExpanded ? (
                <div className="p-2">
                  <div className={`flex items-center gap-2 ${isSearchSticky ? 'flex-row' : 'flex-col lg:flex-row'}`}>
                    {/* Compact Sticky Version */}
                    {isSearchSticky ? (
                      <>
                        {/* Location - Compact */}
                        <motion.div
                          className="flex-1"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                          <button
                            onClick={handleSearchToggle}
                            className="w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-all duration-300 group border border-transparent hover:border-gray-200"
                          >
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-purple-600" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">Location</p>
                                <p className="text-xs text-gray-500">New York, USA</p>
                              </div>
                            </div>
                          </button>
                        </motion.div>

                        {/* When - Compact */}
                        <motion.div
                          className="flex-1"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                          <button
                            onClick={handleSearchToggle}
                            className="w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-all duration-300 group border border-transparent hover:border-gray-200"
                          >
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-blue-600" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">When</p>
                                <p className="text-xs text-gray-500">Select Move-in Date</p>
                              </div>
                            </div>
                          </button>
                        </motion.div>

                        {/* Price - Compact */}
                        <motion.div
                          className="flex-1"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                          <button
                            onClick={handleSearchToggle}
                            className="w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-all duration-300 group border border-transparent hover:border-gray-200"
                          >
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-green-600" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">Price</p>
                                <p className="text-xs text-gray-500">$500-$2,500</p>
                              </div>
                            </div>
                          </button>
                        </motion.div>

                        {/* Property Type - Compact */}
                        <motion.div
                          className="flex-1"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                          <button
                            onClick={handleSearchToggle}
                            className="w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-all duration-300 group border border-transparent hover:border-gray-200"
                          >
                            <div className="flex items-center gap-2">
                              <Home className="h-4 w-4 text-orange-600" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">Property Type</p>
                                <p className="text-xs text-gray-500">Houses</p>
                              </div>
                            </div>
                          </button>
                        </motion.div>

                        {/* Search Button - Compact */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleSearchToggle}
                          className="p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          <Search className="h-4 w-4" />
                        </motion.button>
                      </>
                    ) : (
                      /* Full Expanded Version (when not sticky) */
                      <>
                        {/* Location Search */}
                        <motion.div
                          className="flex-1 w-full"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                          <button
                            onClick={handleSearchToggle}
                            className="w-full p-4 text-left hover:bg-gray-50 rounded-xl transition-all duration-300 group border border-transparent hover:border-gray-200"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors duration-300">
                                <MapPin className="h-4 w-4 text-purple-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">Location</p>
                                <p className="text-sm text-gray-500">New York, USA</p>
                              </div>
                            </div>
                          </button>
                        </motion.div>

                        {/* When */}
                        <motion.div
                          className="flex-1 w-full"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                          <button
                            onClick={handleSearchToggle}
                            className="w-full p-4 text-left hover:bg-gray-50 rounded-xl transition-all duration-300 group border border-transparent hover:border-gray-200"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors duration-300">
                                <Calendar className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">When</p>
                                <p className="text-sm text-gray-500">Select Move-in Date</p>
                              </div>
                            </div>
                          </button>
                        </motion.div>

                        {/* Price */}
                        <motion.div
                          className="flex-1 w-full"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                          <button
                            onClick={handleSearchToggle}
                            className="w-full p-4 text-left hover:bg-gray-50 rounded-xl transition-all duration-300 group border border-transparent hover:border-gray-200"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors duration-300">
                                <DollarSign className="h-4 w-4 text-green-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">Price</p>
                                <p className="text-sm text-gray-500">$500-$2,500</p>
                              </div>
                            </div>
                          </button>
                        </motion.div>

                        {/* Property Type */}
                        <motion.div
                          className="flex-1 w-full"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                          <button
                            onClick={handleSearchToggle}
                            className="w-full p-4 text-left hover:bg-gray-50 rounded-xl transition-all duration-300 group border border-transparent hover:border-gray-200"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors duration-300">
                                <Home className="h-4 w-4 text-orange-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">Property Type</p>
                                <p className="text-sm text-gray-500">Houses</p>
                              </div>
                            </div>
                          </button>
                        </motion.div>

                        {/* Search Button */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleSearchToggle}
                          className="p-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          <Search className="h-5 w-5" />
                        </motion.button>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                /* Expanded Search Bar */
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Search properties</h3>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsSearchExpanded(false)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {/* Location Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-purple-600" />
                          Location
                        </div>
                      </label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="New York, USA"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          autoFocus
                        />
                      </div>
                    </div>

                    {/* When - Move-in Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          When
                        </div>
                      </label>
                      <input
                        type="date"
                        placeholder="Select Move-in Date"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    {/* Price Range */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          Price Range
                        </div>
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                        <option value="$500-$2,500">$500 - $2,500</option>
                        <option value="$2,500-$5,000">$2,500 - $5,000</option>
                        <option value="$5,000-$10,000">$5,000 - $10,000</option>
                        <option value="$10,000+">$10,000+</option>
                      </select>
                    </div>

                    {/* Property Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <Home className="h-4 w-4 text-orange-600" />
                          Property Type
                        </div>
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                        <option value="houses">Houses</option>
                        <option value="apartments">Apartments</option>
                        <option value="condos">Condos</option>
                        <option value="townhouses">Townhouses</option>
                        <option value="villas">Villas</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setIsSearchExpanded(false)}
                      className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button 
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center gap-2"
                    >
                      <Search className="h-4 w-4" />
                      Search
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Properties Grid */}
      <section ref={gridRef} className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayedProperties.map((property, index) => (
              <Link key={property.id} href={`/properties/${property.id}`}>
                <div 
                  className="overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
                  style={{
                    opacity: isGridVisible ? 1 : 0,
                    transform: isGridVisible ? 'translateY(0)' : 'translateY(40px)',
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <div className="relative overflow-hidden group">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {property.popular && (
                      <div className="absolute left-3 top-3 rounded bg-purple-600 px-2 py-1 text-xs font-semibold text-white">
                        POPULAR
                      </div>
                    )}
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        toggleFavorite(property.id)
                      }}
                      className="absolute right-3 top-3 rounded-full bg-white p-2 text-gray-900 hover:bg-gray-100 transition-all duration-300 hover:scale-110"
                    >
                      <Heart size={20} className={favorites.includes(property.id) ? "fill-current text-red-500" : ""} />
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="mb-2 flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-purple-600">${property.price}</span>
                      <span className="text-sm text-gray-500">/month</span>
                    </div>
                    <h3 className="mb-1 text-lg font-semibold text-gray-900">{property.title}</h3>
                    <p className="mb-4 flex items-center gap-1 text-sm text-gray-500">
                      <MapPin size={16} />
                      {property.location}
                    </p>
                    <div className="flex gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Bed size={16} />
                        {property.beds} Beds
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath size={16} />
                        {property.baths} Baths
                      </div>
                      <div className="flex items-center gap-1">
                        <Ruler size={16} />
                        {property.sqft} sqft
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div 
            className="mt-12 flex items-center justify-center gap-2 transition-all duration-1000"
            style={{
              opacity: isGridVisible ? 1 : 0,
              transform: isGridVisible ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: '600ms'
            }}
          >
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
            >
              <ChevronLeft size={20} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                  currentPage === page 
                    ? "bg-purple-600 text-white" 
                    : "border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      <motion.div
        variants={slideInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="border-t border-gray-200 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.p className="text-sm text-gray-500 text-center">
            © 2021 Nestbooking. All rights reserved
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}