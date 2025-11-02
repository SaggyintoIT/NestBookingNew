"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, Variants, easeOut} from "framer-motion"
import { Heart, MapPin, Bed, Bath, Ruler as Ruler2, ChevronLeft, ChevronRight, Search, DollarSign, Home, X, Calendar } from "lucide-react"
import Header from "@/components/layout/header"


// Animation variants (added)
const slideInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeOut, // ✅ imported easing constant, not string
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
  const [favorites, setFavorites] = useState([])
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [isSearchSticky, setIsSearchSticky] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(false)
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [isGridVisible, setIsGridVisible] = useState(false)

  const searchBarRef = useRef(null)
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const searchSectionRef = useRef(null)
  const gridRef = useRef(null)

  const itemsPerPage = 6
  const totalPages = Math.ceil(propertiesData.length / itemsPerPage)
  const startIdx = (currentPage - 1) * itemsPerPage
  const displayedProperties = propertiesData.slice(startIdx, startIdx + itemsPerPage)

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

  const toggleFavorite = (id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
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
          <div
            ref={searchBarRef}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
          >
            {!isSearchExpanded ? (
              <div className="flex flex-col lg:flex-row gap-4">
                <button
                  onClick={() => setIsSearchExpanded(true)}
                  className="flex-1 p-4 text-left hover:bg-gray-50 rounded-xl transition-all duration-300 border border-gray-200 hover:border-purple-300"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Location</p>
                      <p className="text-sm text-gray-500">New York, USA</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setIsSearchExpanded(true)}
                  className="flex-1 p-4 text-left hover:bg-gray-50 rounded-xl transition-all duration-300 border border-gray-200 hover:border-purple-300"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">When</p>
                      <p className="text-sm text-gray-500">Select Move-in Date</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setIsSearchExpanded(true)}
                  className="flex-1 p-4 text-left hover:bg-gray-50 rounded-xl transition-all duration-300 border border-gray-200 hover:border-purple-300"
                >
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Price</p>
                      <p className="text-sm text-gray-500">$500-$2,500</p>
                    </div>
                  </div>
                </button>

                <button
                  className="p-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Search properties</h3>
                  <button
                    onClick={() => setIsSearchExpanded(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      placeholder="New York, USA"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">When</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                      <option>$500 - $2,500</option>
                      <option>$2,500 - $5,000</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                      <option>Houses</option>
                      <option>Apartments</option>
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
                  <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
                    Search
                  </button>
                </div>
              </div>
            )}
          </div>
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
                        <Ruler2 size={16} />
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
        className="border-t border-border bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.p  className="text-sm text-muted-foreground text-center">
            © 2021 Nestbooking. All rights reserved
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}