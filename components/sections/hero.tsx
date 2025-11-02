"use client"

import { useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { easeInOut } from "framer-motion";

import { useRef } from "react"
import Image from "next/image"
import { MapPin, Calendar, Search } from "lucide-react"

export default function Hero() {
  const [activeTab, setActiveTab] = useState("rent")
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const slideUp = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const slideInRight = {
    hidden: { x: 60, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  }

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const markerVariants = {
    hidden: { scale: 0, y: -20, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      y: 0,
      opacity: 0.7,
      transition: {
        duration: 0.6,
        delay: i * 0.1,
        ease: "easeOut"
      }
    })
  }

  return (
    <motion.section 
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-purple-50 overflow-hidden"
    >
      {/* Enhanced Background with Animation */}
      <motion.div 
        className="absolute inset-y-0 right-0 w-full md:w-1/2" 
        variants={slideInRight}
      >
        <Image
          src="/map.png"
          alt="Map background"
          fill
          className="object-cover object-center md:object-right opacity-50"
          priority
        />
      </motion.div>

      {/* Animated Map Markers */}
      {[
        { top: '20%', right: '10%', size: 'w-7 h-7', custom: 0 },
        { top: '60%', left: '50%', size: 'w-5 h-5', custom: 1 },
        { top: '10%', right: '33%', size: 'w-3 h-3', custom: 2 },
        { top: '30%', right: '25%', size: 'w-14 h-14', custom: 3, customMarker: true },
        { top: '25%', right: '12%', size: 'w-6 h-6', custom: 4 },
        { top: '50%', right: '12%', size: 'w-2 h-2', custom: 5 },
        { top: '40%', right: '7%', size: 'w-5 h-5', custom: 6 },
      ].map((marker) => (
        <motion.div 
          key={marker.custom}
          custom={marker.custom}
          variants={markerVariants}
          className={`absolute ${marker.size} bg-secondary rounded-full opacity-70`}
          style={{ 
            top: marker.top,
            left: marker.left,
            right: marker.right,
          }}
        >
          {marker.customMarker && (
            <Image src="/marker.svg" alt="Map marker" width={56} height={56} className="animate-pulse" />
          )}
        </motion.div>
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-8">
            <motion.h1 
              variants={slideUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary leading-tight"
            >
              Buy, rent, or sell your property easily
            </motion.h1>
            
            <motion.p 
              variants={slideUp}
              className="text-base md:text-xl font-semibold"
            >
              A great platform to buy, sell, or even rent your properties without any commissions.
            </motion.p>

            <motion.div 
              variants={slideUp}
              className="flex gap-10 py-6"
            >
              {[
                { value: "50k+", label: "renters" },
                { value: "10k+", label: "properties" }
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.2 }}
                  className="border-l-2 border-secondary pl-4"
                >
                  <p className="text-3xl md:text-4xl font-bold text-secondary">{stat.value}</p>
                  <p className="text-sm font-bold text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              variants={slideUp}
              className="space-y-4 md:space-y-0"
            >
              <div className="flex gap-0 font-bold bg-white rounded-t-lg w-fit overflow-x-auto">
                {["Rent", "Buy", "Sell"].map((tab, index) => (
                  <motion.button
                    key={tab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`px-4 md:px-8 py-3 md:py-4 body-medium-bold text-sm md:text-base transition-all duration-500 ease-out whitespace-nowrap hover:scale-105 ${
                      activeTab === tab.toLowerCase()
                        ? "text-purple-600 border-b-4 border-purple-600 bg-white"
                        : "text-gray-900 border-b border-purple-100 bg-white hover:text-purple-500"
                    }`}
                  >
                    {tab}
                  </motion.button>
                ))}
              </div>

              <motion.div 
                variants={scaleIn}
                className="bg-white rounded-b-lg rounded-tr-lg shadow-lg p-4 md:p-8 w-full hover:shadow-xl transition-all duration-500"
              >
                <div className="md:hidden flex gap-3">
                  <input
                    type="text"
                    placeholder="Search location"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg body-small-regular focus:outline-none focus:border-purple-600 transition-all duration-300 hover:scale-105"
                  />
                  <button className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 hover:scale-110">
                    <Search size={20} />
                  </button>
                </div>

                <div className="hidden md:flex gap-4 md:gap-6 items-end w-full">
                  <motion.div 
                    variants={slideUp}
                    className="flex-1 min-w-0"
                  >
                    <label className="block body-small-medium text-gray-700 mb-2">Location</label>
                    <div className="body-large-bold font-bold text-gray-900 truncate flex items-center gap-2 hover:text-purple-600 transition-colors duration-300">
                      <MapPin size={16} />
                      Barcelona, Spain
                    </div>
                  </motion.div>

                  <motion.div 
                    variants={slideUp}
                    className="hidden md:block w-px h-12 bg-purple-100"
                  ></motion.div>

                  <motion.div 
                    variants={slideUp}
                    className="flex-1 min-w-0"
                  >
                    <label className="block body-small-medium text-gray-700 mb-2">When</label>
                    <div className="flex items-center gap-2 md:gap-3 group cursor-pointer">
                      <div className="body-large-bold font-bold text-gray-900 truncate group-hover:text-purple-600 transition-colors duration-300">
                        Select Move-in Date
                      </div>
                      <Calendar size={16} className="text-gray-500 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </motion.div>

                  <motion.div 
                    variants={slideUp}
                    className="hidden md:block w-px h-12 bg-purple-100"
                  ></motion.div>

                  <motion.button 
                    variants={scaleIn}
                    className="w-full md:w-auto px-6 md:px-8 py-3 bg-secondary text-white body-medium-bold rounded-lg hover:bg-secondary/90 transition-all duration-300 whitespace-nowrap hover:scale-105 hover:shadow-lg"
                  >
                    Browse Properties
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <div className="relative h-96 md:h-full rounded-2xl overflow-hidden">
            <div className="space-y-4">
              {/* Beverly Springfield Card */}
              <motion.div 
                variants={slideInRight}
                className="bg-white rounded-lg shadow-lg p-1 w-80 transition-all duration-1000 hover:shadow-2xl hover:scale-105"
              >
                <div className="relative h-50 bg-muted rounded mb-4 w-full overflow-hidden group">
                  <Image 
                    src="/24.png" 
                    alt="Beverly Springfield" 
                    fill 
                    className="object-cover rounded transition-transform duration-700 group-hover:scale-110" 
                  />
                </div>
                <p className="text-xl text-secondary font-semibold mb-2">$2,700 / month</p>
                <p className="text-2xl font-bold text-primary mb-2 hover:text-purple-600 transition-colors duration-300">Beverly Springfield</p>
                <p className="text-m text-muted-foreground font-semibold mb-1">2821 Lake Sevilla, Palm Harbor, TX</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-5">
                  {['4', '2', '6×7.5 m²'].map((item, index) => (
                    <span key={index} className="hover:text-secondary transition-colors duration-300">{item}</span>
                  ))}
                </div>
              </motion.div>

              {/* Tarpon Bay Card */}
              <motion.div 
                variants={slideInRight}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow-lg p-3 ml-auto w-fit transition-all duration-1000 hover:shadow-2xl hover:scale-105"
              >
                <div className="relative h-40 bg-muted rounded mb-2 w-48 overflow-hidden group">
                  <Image 
                    src="/22.png" 
                    alt="Tarpon Bay" 
                    fill 
                    className="object-cover rounded transition-transform duration-700 group-hover:scale-110" 
                  />
                </div>
                <p className="text-sm text-secondary font-semibold mb-1">$1,600 /month</p>
                <p className="text-base font-bold text-primary mb-1 hover:text-purple-600 transition-colors duration-300">Tarpon Bay</p>
                <p className="text-xs text-muted-foreground font-semibold mb-2">Palm Harbor, TX</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  {['4', '2', '6×8 m²'].map((item, index) => (
                    <span key={index} className="hover:text-secondary transition-colors duration-300">{item}</span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}