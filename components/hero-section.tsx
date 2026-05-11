"use client"

import { useState } from "react"
import { MapPin, ChevronRight, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const kosovoLocations = [
  "Prishtina",
  "Prizren",
  "Peja",
  "Gjakova",
  "Mitrovica",
  "Ferizaj",
  "Gjilan",
  "Vushtrri",
  "Podujeva",
  "Suhareka",
  "Rahovec",
  "Drenas",
  "Lipjan",
  "Malisheva",
  "Kamenica",
  "Viti",
  "Deçan",
  "Istog",
  "Klinë",
  "Skenderaj"
]

export function HeroSection() {
  const [pickup, setPickup] = useState("")
  const [destination, setDestination] = useState("")
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false)
  const [showDestSuggestions, setShowDestSuggestions] = useState(false)

  const filteredPickupLocations = kosovoLocations.filter(loc =>
    loc.toLowerCase().includes(pickup.toLowerCase())
  )

  const filteredDestLocations = kosovoLocations.filter(loc =>
    loc.toLowerCase().includes(destination.toLowerCase())
  )

  return (
    <section className="relative min-h-screen pt-16 overflow-hidden">
      {/* Modern Realistic Map Background */}
      <div className="absolute inset-0 z-0">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" fill="none" preserveAspectRatio="xMidYMid slice">
          <defs>
            {/* Realistic terrain gradient */}
            <linearGradient id="terrainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1a1a1a" />
              <stop offset="50%" stopColor="#2d2d2d" />
              <stop offset="100%" stopColor="#1f1f1f" />
            </linearGradient>
            
            {/* Subtle glow */}
            <radialGradient id="mapGlowWhite" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
            
            {/* Road pattern - more realistic */}
            <pattern id="roadPattern" width="200" height="200" patternUnits="userSpaceOnUse">
              <path d="M 0 100 L 200 100" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
              <path d="M 100 0 L 100 200" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
              <path d="M 0 50 L 200 50" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <path d="M 50 0 L 50 200" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            </pattern>
          </defs>
          
          {/* Terrain base */}
          <rect width="100%" height="100%" fill="url(#terrainGradient)" />
          <rect width="100%" height="100%" fill="url(#roadPattern)" />
          <rect width="100%" height="100%" fill="url(#mapGlowWhite)" />
          
          {/* More realistic road network */}
          {/* Main Highway 1 */}
          <path d="M 0 350 Q 300 330, 600 360 T 1200 340" stroke="rgba(255,255,255,0.25)" strokeWidth="6" fill="none" strokeLinecap="round" />
          
          {/* Main Highway 2 */}
          <path d="M 200 0 Q 220 200, 250 400 T 280 800" stroke="rgba(255,255,255,0.22)" strokeWidth="5" fill="none" strokeLinecap="round" />
          
          {/* Highway 3 */}
          <path d="M 800 0 Q 780 150, 750 350 T 720 800" stroke="rgba(255,255,255,0.18)" strokeWidth="4" fill="none" strokeLinecap="round" />
          
          {/* Secondary Road Network */}
          <path d="M 0 500 Q 400 480, 800 520 T 1200 500" stroke="rgba(255,255,255,0.15)" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 400 100 L 600 300 L 700 600" stroke="rgba(255,255,255,0.12)" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 100 200 L 500 250 L 1000 150" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" strokeLinecap="round" />
          
          {/* City centers - realistic representation */}
          <g>
            {/* Prishtina */}
            <circle cx="650" cy="280" r="12" fill="rgba(255,255,255,0.3)" />
            <circle cx="650" cy="280" r="8" fill="rgba(255,255,255,0.5)" />
            <circle cx="650" cy="280" r="4" fill="rgba(255,255,255,0.9)" />
            <text x="650" y="310" fontSize="12" fill="rgba(255,255,255,0.7)" textAnchor="middle" fontWeight="600">Prishtina</text>
            
            {/* Prizren */}
            <circle cx="520" cy="620" r="10" fill="rgba(255,255,255,0.25)" />
            <circle cx="520" cy="620" r="6" fill="rgba(255,255,255,0.4)" />
            <text x="520" y="650" fontSize="11" fill="rgba(255,255,255,0.6)" textAnchor="middle">Prizren</text>
            
            {/* Peja */}
            <circle cx="350" cy="420" r="9" fill="rgba(255,255,255,0.24)" />
            <circle cx="350" cy="420" r="5" fill="rgba(255,255,255,0.38)" />
            <text x="350" y="450" fontSize="11" fill="rgba(255,255,255,0.6)" textAnchor="middle">Peja</text>
            
            {/* Ferizaj */}
            <circle cx="850" cy="480" r="9" fill="rgba(255,255,255,0.24)" />
            <circle cx="850" cy="480" r="5" fill="rgba(255,255,255,0.38)" />
            <text x="850" y="510" fontSize="11" fill="rgba(255,255,255,0.6)" textAnchor="middle">Ferizaj</text>
            
            {/* Gjilan */}
            <circle cx="950" cy="380" r="8" fill="rgba(255,255,255,0.22)" />
            <circle cx="950" cy="380" r="4" fill="rgba(255,255,255,0.35)" />
            <text x="950" y="408" fontSize="10" fill="rgba(255,255,255,0.5)" textAnchor="middle">Gjilan</text>
            
            {/* Mitrovica */}
            <circle cx="480" cy="180" r="8" fill="rgba(255,255,255,0.22)" />
            <circle cx="480" cy="180" r="4" fill="rgba(255,255,255,0.35)" />
            <text x="480" y="208" fontSize="10" fill="rgba(255,255,255,0.5)" textAnchor="middle">Mitrovica</text>
          </g>
        </svg>
        
        {/* Left overlay for text readability */}
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-background via-background/95 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-32">
        <div className="max-w-xl">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-[1.1]">
            Go anywhere with{" "}
            <span className="text-primary">RideKs.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Choose your exact pickup time up to 90 days in advance. Available across all major cities in Kosovo.
          </p>

          {/* Location Inputs */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="flex items-center gap-3 bg-secondary/80 backdrop-blur-sm rounded-xl px-4 py-3.5 border border-border/50 hover:border-primary/50 transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Pickup location"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  onFocus={() => setShowPickupSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowPickupSuggestions(false), 200)}
                  className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                />
              </div>
              {showPickupSuggestions && pickup && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-2xl overflow-hidden z-20">
                  {filteredPickupLocations.slice(0, 5).map((loc) => (
                    <button
                      key={loc}
                      className="w-full px-4 py-3 text-left text-sm hover:bg-secondary flex items-center gap-3 transition-colors"
                      onClick={() => {
                        setPickup(loc)
                        setShowPickupSuggestions(false)
                      }}
                    >
                      <Navigation className="h-4 w-4 text-primary" />
                      {loc}, Kosovo
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative flex-1">
              <div className="flex items-center gap-3 bg-secondary/80 backdrop-blur-sm rounded-xl px-4 py-3.5 border border-border/50 hover:border-primary/50 transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
                <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  onFocus={() => setShowDestSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowDestSuggestions(false), 200)}
                  className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                />
              </div>
              {showDestSuggestions && destination && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-2xl overflow-hidden z-20">
                  {filteredDestLocations.slice(0, 5).map((loc) => (
                    <button
                      key={loc}
                      className="w-full px-4 py-3 text-left text-sm hover:bg-secondary flex items-center gap-3 transition-colors"
                      onClick={() => {
                        setDestination(loc)
                        setShowDestSuggestions(false)
                      }}
                    >
                      <Navigation className="h-4 w-4 text-primary" />
                      {loc}, Kosovo
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link href="/book">
              <Button size="lg" className="rounded-xl px-6 bg-primary text-primary-foreground hover:bg-primary/90 h-[50px]">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="mt-12 flex items-center gap-6 sm:gap-8 p-4 sm:p-5 bg-card/80 backdrop-blur-sm rounded-2xl border border-border/50 inline-flex">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Distance</p>
              <p className="text-xl font-bold mt-1">12.5 KM</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Est. Fare</p>
              <p className="text-xl font-bold mt-1 text-primary">€8.50</p>
            </div>
            <Link href="/book">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-6 ml-2">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
