import Header from "@/components/layout/header"
import Hero from "@/components/sections/hero"
import LocationSection from "@/components/sections/location-section"
import SponsoredSection from "@/components/sections/sponsored-section"
import Footer from "@/components/layout/footer"
import SponsoredBanks from "@/components/sections/SponsoredBanks"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <LocationSection />
      <SponsoredSection />
      <SponsoredBanks/>
      <Footer />
    </main>
  )
}
