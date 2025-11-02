"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Heart, Bed, Bath, Maximize } from "lucide-react"

export default function DashboardPage() {
  const [visibleCount, setVisibleCount] = useState(4) // show 2 rows initially (2 * 2 = 4)
  const [expandedCards, setExpandedCards] = useState<number[]>([])

  // Sample property data
  const properties = [
    {
      id: 1,
      image: "/4.png",
      title: "Beverly Springfield",
      location: "2821 Lake Sevilla, Palm Harbor, TX",
      price: "$2,095",
      beds: 4,
      baths: 2,
      sqft: "6×7.5 m²",
      rating: 4.8,
      featured: true,
      securityDeposit: "$4,190",
      monthlyRent: "$2,095",
    },
    {
      id: 2,
      image: "/5.png",
      title: "Tarpon Bay",
      location: "Palm Harbor, TX",
      price: "$2,700",
      beds: 4,
      baths: 2,
      sqft: "6×8 m²",
      rating: 4.9,
      featured: true,
      securityDeposit: "$5,400",
      monthlyRent: "$2,700",
    },
    {
      id: 3,
      image: "/6.png",
      title: "Contemporary Home",
      location: "Miami, Florida, US",
      price: "$2,100",
      beds: 3,
      baths: 2,
      sqft: "6×7.5 m²",
      rating: 4.6,
      featured: false,
      securityDeposit: "$4,200",
      monthlyRent: "$2,100",
    },
    {
      id: 4,
      image: "/7.png",
      title: "Modern Villa",
      location: "Los Angeles, CA",
      price: "$3,500",
      beds: 4,
      baths: 3,
      sqft: "6×8 m²",
      rating: 4.7,
      featured: true,
      securityDeposit: "$7,000",
      monthlyRent: "$3,500",
    },
    {
      id: 5,
      image: "/4.png",
      title: "Luxury Apartment",
      location: "New York, NY",
      price: "$4,200",
      beds: 3,
      baths: 2,
      sqft: "5×6 m²",
      rating: 4.5,
      featured: false,
      securityDeposit: "$8,400",
      monthlyRent: "$4,200",
    },
    {
      id: 6,
      image: "/5.png",
      title: "Beach House",
      location: "San Diego, CA",
      price: "$3,800",
      beds: 5,
      baths: 3,
      sqft: "8×9 m²",
      rating: 4.9,
      featured: true,
      securityDeposit: "$7,600",
      monthlyRent: "$3,800",
    },
    {
      id: 7,
      image: "/6.png",
      title: "Mountain Cabin",
      location: "Denver, CO",
      price: "$1,900",
      beds: 2,
      baths: 1,
      sqft: "4×5 m²",
      rating: 4.4,
      featured: false,
      securityDeposit: "$3,800",
      monthlyRent: "$1,900",
    },
    {
      id: 8,
      image: "/7.png",
      title: "Downtown Loft",
      location: "Chicago, IL",
      price: "$2,300",
      beds: 2,
      baths: 2,
      sqft: "5×6 m²",
      rating: 4.6,
      featured: false,
      securityDeposit: "$4,600",
      monthlyRent: "$2,300",
    },
  ]

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4) // load 2 more rows (4 properties) on click
  }

  const handleViewLess = () => {
    setVisibleCount(4) // reset to initial 4 properties
  }

  const toggleExpand = (id: number) => {
    setExpandedCards((prev) =>
      prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Section */}
      <div className="border-b border-gray-200 px-6 py-4 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Left - Logo */}
            <div className="flex items-center gap-2 md:w-[200px] flex-shrink-0">
              <div
                style={{ backgroundColor: "#6366f1" }}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md"
              >
                N
              </div>
              <span className="font-bold text-gray-900 text-xl">Nestbooking</span>
            </div>

            {/* Center - Buttons */}
            <div className="flex flex-wrap justify-center gap-8 w-full md:w-auto">
              <Link href="/properties">
              <button className="text-gray-700 hover:text-gray-900 transition font-semibold text-base whitespace-nowrap">
                Manage Properties
              </button>
              </Link>
              <Link href="/properties" passHref>
                <button className="text-gray-700 hover:text-gray-900 transition font-semibold text-base whitespace-nowrap">
                  Claim your Properties
                </button>
              </Link>
              <button className="text-gray-700 hover:text-gray-900 transition font-semibold text-base whitespace-nowrap">
                Search
              </button>
            </div>

            {/* Right - Back to Home */}
            <div className="md:w-[200px] flex justify-end flex-shrink-0">
              <Link href="/" passHref>
                <button className="text-gray-700 hover:text-gray-900 transition font-bold text-base whitespace-nowrap">
                  Back to Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Buttons Section */}
      <div className="border-b border-gray-200 px-6 py-5 bg-white">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-3">
          <button className="px-5 py-2.5 text-gray-700 rounded-xl bg-white border border-gray-300 hover:border-gray-400 hover:shadow-sm transition font-medium text-sm">
            All (4)
          </button>
          <button className="px-5 py-2.5 text-gray-700 rounded-xl bg-white border border-gray-300 hover:border-gray-400 hover:shadow-sm transition font-medium text-sm">
            Claim (0)
          </button>
          <button className="px-5 py-2.5 text-gray-700 rounded-xl bg-white border border-gray-300 hover:border-gray-400 hover:shadow-sm transition font-medium text-sm">
            Booked (0)
          </button>
          <button className="px-5 py-2.5 text-gray-700 rounded-xl bg-white border border-gray-300 hover:border-gray-400 hover:shadow-sm transition font-medium text-sm">
            Registered (2)
          </button>
          <button className="px-5 py-2.5 text-gray-700 rounded-xl bg-white border border-gray-300 hover:border-gray-400 hover:shadow-sm transition font-medium text-sm">
            Delivered (0)
          </button>
          <button className="px-5 py-2.5 text-gray-700 rounded-xl bg-white border border-gray-300 hover:border-gray-400 hover:shadow-sm transition font-medium text-sm">
            In Rent (0)
          </button>
          <button className="px-5 py-2.5 text-gray-700 rounded-xl bg-white border border-gray-300 hover:border-gray-400 hover:shadow-sm transition font-medium text-sm">
            For Rent (2)
          </button>
          <button className="px-5 py-2.5 text-gray-700 rounded-xl bg-white border border-gray-300 hover:border-gray-400 hover:shadow-sm transition font-medium text-sm">
            Sale (0)
          </button>
        </div>
      </div>

      {/* Main Content - Property Cards */}
      <main className="px-6 py-10">
        <div className="max-w-7xl mx-auto">
          {/* Properties Grid - 2 columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {properties.slice(0, visibleCount).map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                {/* Property Image */}
                <div className="relative h-48 bg-gray-100 overflow-hidden group">
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <button className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition">
                    <Heart size={20} className="text-gray-700" />
                  </button>
                  {property.featured && (
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-md">
                      <p className="text-xs text-gray-700 font-semibold">Featured</p>
                    </div>
                  )}
                </div>

                {/* Property Details */}
                <div className="p-5">
                  {/* Property Title Badge */}
                  <div className="inline-block mb-3">
                    <div 
                      style={{ backgroundColor: "#6366f1" }}
                      className="px-4 py-2 rounded-lg"
                    >
                      <p className="text-white font-semibold text-sm">{property.title}</p>
                    </div>
                  </div>

                  {/* Property Info Boxes */}
                  <div className="flex gap-3 mb-3">
                    <div className="flex-1 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-gray-700 font-medium text-sm flex items-center gap-1.5">
                        <Bed size={16} className="text-gray-500" />
                        {property.beds} Beds
                      </span>
                    </div>
                    <div className="flex-1 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-gray-700 font-medium text-sm flex items-center gap-1.5">
                        <Bath size={16} className="text-gray-500" />
                        {property.baths} Baths
                      </span>
                    </div>
                  </div>

                  {/* Location Box */}
                  <div className="mb-3">
                    <div className="h-10 bg-gray-100 rounded-lg flex items-center px-3">
                      <span className="text-gray-700 font-medium text-sm truncate">{property.location}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <p 
                    style={{ color: "#6366f1" }}
                    className="text-2xl font-bold mb-4"
                  >
                    {property.price}<span className="text-base font-medium text-gray-600">/month</span>
                  </p>

                  {/* View All Button */}
                  <button
                    onClick={() => toggleExpand(property.id)}
                    className="w-full mb-3 text-gray-700 hover:text-gray-900 transition font-semibold text-sm text-center py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    {expandedCards.includes(property.id) ? "Hide Details" : "View All Details"}
                  </button>

                  {/* Payment Details - Expandable */}
                  {expandedCards.includes(property.id) && (
                    <div className="space-y-3 mb-4 animate-fadeIn">
                      <div className="h-10 bg-gray-100 rounded-lg flex items-center px-4 justify-between">
                        <span className="text-gray-600 font-medium text-sm">Security Deposit:</span>
                        <span className="text-gray-900 font-semibold text-sm">{property.securityDeposit}</span>
                      </div>
                      <div className="h-10 bg-gray-100 rounded-lg flex items-center px-4 justify-between">
                        <span className="text-gray-600 font-medium text-sm">Monthly Rent:</span>
                        <span className="text-gray-900 font-semibold text-sm">{property.monthlyRent}</span>
                      </div>
                    </div>
                  )}

                  {/* Claim Property Button */}
                  <Link href="/tenApplication" passHref>
                    <button 
                      style={{ backgroundColor: "#6366f1" }}
                      className="w-full py-3 text-white rounded-xl hover:opacity-90 transition font-semibold text-base shadow-md"
                    >
                      Claim Property
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Load More / View Less Buttons */}
          <div className="flex justify-center gap-4">
            {visibleCount < properties.length && (
              <button
                onClick={handleLoadMore}
                style={{ backgroundColor: "#6366f1" }}
                className="px-16 py-3 text-white rounded-xl hover:opacity-90 transition-all duration-300 font-semibold text-base shadow-md hover:shadow-lg"
              >
                Load More
              </button>
            )}
            {visibleCount > 4 && (
              <button
                onClick={handleViewLess}
                className="px-16 py-3 bg-white text-gray-700 border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold text-base shadow-md hover:shadow-lg"
              >
                View Less
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}