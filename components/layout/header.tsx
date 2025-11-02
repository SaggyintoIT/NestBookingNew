"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Menu, X } from "lucide-react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(false)

  const toggleDropdown = () => setOpenDropdown((prev) => !prev)

  return (
    <header className=" top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-34 h-8 flex items-center justify-center">
              <Image
                src="/Nest.png"
                alt="Logo"
                width={180}
                height={40}
                className="object-contain"
              />
            </div>
            
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            <Link
              href="/properties"
              className="text-gray-900 font-semibold hover:text-purple-600 transition"
            >
              Home Loan
            </Link>
            <Link
              href="#"
              className="text-gray-900 font-semibold hover:text-purple-600 transition"
            >
              Dashboard
            </Link>
            <Link
              href="#"
              className="text-gray-900 font-semibold hover:text-purple-600 transition"
            >
              Hire Broker
            </Link>
            <Link
              href="/properties"
              className="text-gray-900 font-semibold hover:text-purple-600 transition"
            >
              Wall
            </Link>
            <Link
              href="/properties"
              className="text-gray-900 font-semibold hover:text-purple-600 transition"
            >
              Claim Your Property
            </Link>
            <Link
              href="/form"
              className="text-gray-900 font-semibold hover:text-purple-600 transition"
            >
              List Your Property
            </Link>

            {/* Join As Dropdown */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className={`flex items-center gap-1 font-semibold transition cursor-pointer ${
                  openDropdown ? "text-purple-600" : "text-gray-900 hover:text-purple-600"
                }`}
              >
                <span>Join As</span>
                <ChevronDown
                  size={16}
                  className={`transform transition-transform ${
                    openDropdown ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {openDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fadeIn">
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <Link
                        href="/login"
                        className="block px-4 py-2 hover:bg-purple-50 hover:text-purple-600 transition"
                        onClick={() => setOpenDropdown(false)}
                      >
                        Property Owner / Buyer Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/login"
                        className="block px-4 py-2 hover:bg-purple-50 hover:text-purple-600 transition"
                        onClick={() => setOpenDropdown(false)}
                      >
                        Builder for CRM Platform Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/login"
                        className="block px-4 py-2 hover:bg-purple-50 hover:text-purple-600 transition"
                        onClick={() => setOpenDropdown(false)}
                      >
                        Channel Partner / Broker Login
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            {[
              "Home Loan",
              "Dashboard",
              "Hire Broker",
              "Wall",
              "Claim Your Property",
              "List Your Property",
            ].map((item, i) => (
              <Link
                key={i}
                href="#"
                className="block px-4 py-2 text-sm text-gray-800 hover:bg-purple-50 hover:text-purple-600 rounded transition"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            ))}

            {/* Mobile Dropdown */}
            <div className="border-t pt-2">
              <button
                onClick={toggleDropdown}
                className={`flex items-center gap-1 px-4 py-2 font-semibold w-full text-left transition ${
                  openDropdown ? "text-purple-600" : "text-gray-900 hover:text-purple-600"
                }`}
              >
                Join As
                <ChevronDown
                  size={16}
                  className={`ml-1 transform transition-transform ${
                    openDropdown ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {openDropdown && (
                <div className="mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <Link
                        href="/login"
                        className="block px-4 py-2 hover:bg-purple-50 hover:text-purple-600 transition"
                        onClick={() => {
                          setOpenDropdown(false)
                          setIsOpen(false)
                        }}
                      >
                        Property Owner / Buyer Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/login"
                        className="block px-4 py-2 hover:bg-purple-50 hover:text-purple-600 transition"
                        onClick={() => {
                          setOpenDropdown(false)
                          setIsOpen(false)
                        }}
                      >
                        Builder for CRM Platform Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/login"
                        className="block px-4 py-2 hover:bg-purple-50 hover:text-purple-600 transition"
                        onClick={() => {
                          setOpenDropdown(false)
                          setIsOpen(false)
                        }}
                      >
                        Channel Partner / Broker Login
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}