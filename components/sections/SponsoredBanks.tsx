"use client"

import { useEffect, useRef, useState } from "react"

const banks = [
  {
    id: 1,
    name: "State Bank of India",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/SBI-logo.svg/200px-SBI-logo.svg.png"
  },
  {
    id: 2,
    name: "HDFC Bank",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/200px-HDFC_Bank_Logo.svg.png"
  },
  {
    id: 3,
    name: "ICICI Bank",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/ICICI_Bank_Logo.svg/200px-ICICI_Bank_Logo.svg.png"
  },
  {
    id: 4,
    name: "Axis Bank",
    logo: "https://e7.pngegg.com/pngimages/510/187/png-clipart-axis-bank-logo-horizontal-bank-logos.png"
  },
  {
    id: 5,
    name: "Punjab National Bank",
    logo: "https://static.vecteezy.com/system/resources/previews/020/336/469/non_2x/punjab-national-bank-pnb-bank-logo-free-free-vector.jpg"
  },
  {
    id: 6,
    name: "Bank of Baroda",
    logo: "https://1000logos.net/wp-content/uploads/2021/06/Bank-of-Baroda-logo.jpg"
  },
  {
    id: 7,
    name: "Kotak Mahindra Bank",
    logo: "https://e7.pngegg.com/pngimages/333/464/png-clipart-kotak-mahindra-bank-logo-horizontal-bank-logos-thumbnail.png"
  },
  {
    id: 8,
    name: "IndusInd Bank",
    logo: "https://i.pinimg.com/736x/01/28/25/0128254f4655e5936c8726883f71a212.jpg"
  },
  {
    id: 9,
    name: "Yes Bank",
    logo: "https://1000logos.net/wp-content/uploads/2021/06/Bank-of-Baroda-logo.jpg"
  },
  {
    id: 10,
    name: "Canara Bank",
    logo: "https://e7.pngegg.com/pngimages/333/464/png-clipart-kotak-mahindra-bank-logo-horizontal-bank-logos-thumbnail.png"
  },
  
]

export default function SponsoredBanks() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  // Duplicate banks array for seamless loop
  const duplicatedBanks = [...banks, ...banks]

  return (
    <section ref={sectionRef} className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div 
          className="text-center mb-12 transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)'
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            Sponsored Banks
          </h2>
          <p className="text-muted-foreground">
            Trusted financial partners for your property journey
          </p>
        </div>

        {/* Auto-scrolling container */}
        <div 
          className="relative overflow-hidden transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transitionDelay: '300ms'
          }}
        >
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-purple-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-purple-50 to-transparent z-10"></div>

          {/* Scrolling track */}
          <div className="flex animate-scroll hover:pause-animation">
            {duplicatedBanks.map((bank, index) => (
              <div
                key={`${bank.id}-${index}`}
                className="flex-shrink-0 mx-8 transition-all duration-300 hover:scale-110"
              >
                <div className="w-32 h-24 md:w-40 md:h-28 flex items-center justify-center bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-4 border border-purple-100">
                  <img
                    src={bank.logo}
                    alt={bank.name}
                    className="max-w-full max-h-full object-contain transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-scroll {
            animation: scroll 30s linear infinite;
          }

          .pause-animation:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </section>
  )
}