"use client"

import { useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Heart, Search, MapPin, Calendar, DollarSign, Home, X } from "lucide-react"

const properties = [
  {
    id: 1,
    image: "/1.png",
    title: "Beachfront Villa",
    location: "Malibu, California, US",
    price: "$4,850,000",
    beds: 5,
    baths: 4,
    sqft: 4500,
    rating: 4.8,
  },
  {
    id: 2,
    image: "/2.png",
    title: "Modern Apartment",
    location: "San Francisco, California, US",
    price: "$2,500,000",
    beds: 3,
    baths: 2,
    sqft: 2200,
    rating: 4.7,
  },
  {
    id: 3,
    image: "/3.png",
    title: "Mountain Retreat",
    location: "Aspen, Colorado, US",
    price: "$3,200,000",
    beds: 4,
    baths: 3,
    sqft: 3500,
    rating: 4.9,
  },
  {
    id: 4,
    image: "/4.png",
    title: "Contemporary Home",
    location: "Miami, Florida, US",
    price: "$2,100,000",
    beds: 3,
    baths: 2,
    sqft: 2800,
    rating: 4.6,
  },
  {
    id: 5,
    image: "/5.png",
    title: "Luxury Condo",
    location: "Miami, Florida, US",
    price: "$2,100,000",
    beds: 3,
    baths: 2,
    sqft: 2800,
    rating: 4.6,
  },
  {
    id: 6,
    image: "/6.png",
    title: "City Apartment",
    location: "Miami, Florida, US",
    price: "$2,100,000",
    beds: 3,
    baths: 2,
    sqft: 2800,
    rating: 4.6,
  },
  {
    id: 7,
    image: "/7.png",
    title: "Suburban Home",
    location: "Miami, Florida, US",
    price: "$2,100,000",
    beds: 3,
    baths: 2,
    sqft: 2800,
    rating: 4.6,
  },
  {
    id: 8,
    image: "/8.png",
    title: "Modern Villa",
    location: "Miami, Florida, US",
    price: "$2,100,000",
    beds: 3,
    baths: 2,
    sqft: 2800,
    rating: 4.6,
  },
  {
    id: 9,
    image: "/9.png",
    title: "Beach House",
    location: "Miami, Florida, US",
    price: "$2,100,000",
    beds: 3,
    baths: 2,
    sqft: 2800,
    rating: 4.6,
  },
  {
    id: 10,
    image: "/10.png",
    title: "Mountain Cabin",
    location: "Miami, Florida, US",
    price: "$2,100,000",
    beds: 3,
    baths: 2,
    sqft: 2800,
    rating: 4.6,
  },
  {
    id: 11,
    image: "/11.png",
    title: "Urban Loft",
    location: "Miami, Florida, US",
    price: "$2,100,000",
    beds: 3,
    baths: 2,
    sqft: 2800,
    rating: 4.6,
  },
  {
    id: 12,
    image: "/12.png",
    title: "Garden Home",
    location: "Miami, Florida, US",
    price: "$2,100,000",
    beds: 3,
    baths: 2,
    sqft: 2800,
    rating: 4.6,
  },
  {
    id: 13,
    image: "/13.png",
    title: "Penthouse Suite",
    location: "Miami, Florida, US",
    price: "$2,100,000",
    beds: 3,
    baths: 2,
    sqft: 2800,
    rating: 4.6,
  },
  {
    id: 14,
    image: "/14.png",
    title: "Country Estate",
    location: "Miami, Florida, US",
    price: "$2,100,000",
    beds: 3,
    baths: 2,
    sqft: 2800,
    rating: 4.6,
  },
  {
    id: 15,
    image: "/15.png",
    title: "Lake House",
    location: "Miami, Florida, US",
    price: "$2,100,000",
    beds: 3,
    baths: 2,
    sqft: 2800,
    rating: 4.6,
  },
  {
    id: 16,
    image: "/16.png",
    title: "City Townhouse",
    location: "Miami, Florida, US",
    price: "$2,100,000",
    beds: 3,
    baths: 2,
    sqft: 2800,
    rating: 4.6,
  },
  {
    id: 17,
    image: "/17.png",
    title: "Modern Duplex",
    location: "Miami, Florida, US",
    price: "$2,100,000",
    beds: 3,
    baths: 2,
    sqft: 2800,
    rating: 4.6,
  },
  {
    id: 18,
    image: "/18.png",
    title: "Suburban Villa",
    location: "Miami, Florida, US",
    price: "$2,100,000",
    beds: 3,
    baths: 2,
    sqft: 2800,
    rating: 4.6,
  },
  {
    id: 19,
    image: "/19.png",
    title: "Beach Condo",
    location: "Miami, Florida, US",
    price: "$2,100,000",
    beds: 3,
    baths: 2,
    sqft: 2800,
    rating: 4.6,
  },
  {
    id: 20,
    image: "/20.png",
    title: "Mountain View",
    location: "Miami, Florida, US",
    price: "$2,100,000",
    beds: 3,
    baths: 2,
    sqft: 2800,
    rating: 4.6,
  },
]

export default function LocationSection() {
  const [visibleCount, setVisibleCount] = useState(12)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isSearchSticky, setIsSearchSticky] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const ref = useRef(null)
  const searchBarRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  // Handle scroll effect for search bar contraction/expansion
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const scrollDirection = scrollTop > lastScrollY ? 'down' : 'up'
      
      // Contract search bar when scrolling down, expand when scrolling up
      if (scrollDirection === 'down' && scrollTop > 100 && isSearchExpanded) {
        setIsSearchExpanded(false)
      }
      
      setIsScrolled(scrollTop > 100)
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  }

  const staggerItem = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  }

  const slideUp = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeInOut"
      }
    }
  }

  const loadMoreVariants = {
    hidden: { 
      y: 20, 
      opacity: 0,
      scale: 0.95
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  }

  const searchBarVariants = {
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

  const handleLoadMore = async () => {
    setIsLoadingMore(true)
    
    // Simulate loading delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800))
    
    setVisibleCount((prev) => {
      const newCount = prev + 6
      return Math.min(newCount, properties.length)
    })
    
    setIsLoadingMore(false)
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

  return (
    <motion.section 
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30"
    >
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Search Bar */}
        <motion.div
          ref={searchBarRef}
          variants={slideUp}
          className={`mb-12 transition-all duration-300 ${
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

        {/* Section Header */}
        <motion.div 
          variants={slideUp}
          className="flex justify-between items-start mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
              Based on your location
            </h2>
            <p className="text-muted-foreground">
              Some of our picked properties near your location
            </p>
          </div>
        </motion.div>

        {/* Enhanced Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.slice(0, visibleCount).map((property, index) => (
            <motion.div
              key={property.id}
              variants={staggerItem}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group"
            >
              <div className="relative h-48 bg-muted overflow-hidden group">
                <Image
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow hover:bg-gray-50 transition-all duration-300 hover:scale-110">
                  <Heart size={18} className="text-muted-foreground hover:text-red-500 transition-colors duration-300" />
                </button>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>
              </div>
              <div className="p-4 group-hover:bg-purple-50/30 transition-colors duration-300">
                <p className="text-xs text-muted-foreground mb-1">Featured</p>
                <h3 className="font-bold text-primary mb-1 group-hover:text-purple-600 transition-colors duration-300">{property.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{property.location}</p>
                <p className="text-xl font-bold text-secondary mb-3">{property.price}</p>
                <div className="flex justify-between text-xs text-muted-foreground">
                  {[
                    `${property.beds} Beds`,
                    `${property.baths} Baths`, 
                    `${property.sqft} sqft`,
                    `⭐ ${property.rating}`
                  ].map((item, idx) => (
                    <span 
                      key={idx}
                      className="hover:text-secondary transition-colors duration-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Load More Button */}
        {visibleCount < properties.length && (
          <motion.div 
            variants={loadMoreVariants}
            initial="hidden"
            animate="visible"
            className="flex justify-center mt-10"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="px-8 py-3 bg-secondary text-white rounded-lg font-medium hover:bg-secondary/90 transition-all duration-300 hover:shadow-lg group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoadingMore ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <span className="group-hover:scale-110 transition-transform duration-300">Load More</span>
              )}
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}