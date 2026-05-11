"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { 
  MapPin, 
  Navigation, 
  Car, 
  Sparkles, 
  Shield, 
  Clock,
  CreditCard,
  X,
  Check,
  AlertTriangle,
  ChevronRight,
  Users
} from "lucide-react"

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

const rideTypes = [
  {
    id: "standard",
    name: "Standard",
    description: "Affordable everyday rides",
    icon: Car,
    multiplier: 1,
    eta: "3-5 min",
    capacity: "1-4"
  },
  {
    id: "comfort",
    name: "Comfort",
    description: "Newer cars with extra legroom",
    icon: Sparkles,
    multiplier: 1.3,
    eta: "5-8 min",
    capacity: "1-4"
  },
  {
    id: "premium",
    name: "Premium",
    description: "Luxury vehicles for special occasions",
    icon: Shield,
    multiplier: 1.8,
    eta: "8-12 min",
    capacity: "1-4"
  },
  {
    id: "xl",
    name: "XL",
    description: "Larger vehicles for groups",
    icon: Users,
    multiplier: 1.5,
    eta: "6-10 min",
    capacity: "1-6"
  }
]

const distanceMap: Record<string, Record<string, number>> = {
  "Prishtina": { "Prizren": 85, "Peja": 84, "Gjakova": 92, "Mitrovica": 40, "Ferizaj": 38, "Gjilan": 47, "Podujeva": 25 },
  "Prizren": { "Prishtina": 85, "Peja": 68, "Gjakova": 23, "Ferizaj": 55, "Gjilan": 95 },
  "Peja": { "Prishtina": 84, "Prizren": 68, "Gjakova": 35, "Mitrovica": 52, "Deçan": 15, "Istog": 20 },
  "Gjakova": { "Prishtina": 92, "Prizren": 23, "Peja": 35, "Rahovec": 25 },
  "Ferizaj": { "Prishtina": 38, "Prizren": 55, "Gjilan": 30, "Lipjan": 15 },
  "Gjilan": { "Prishtina": 47, "Ferizaj": 30, "Kamenica": 22, "Viti": 18 },
}

function getDistance(from: string, to: string): number {
  if (from === to) return 0
  return distanceMap[from]?.[to] || distanceMap[to]?.[from] || Math.floor(Math.random() * 50 + 20)
}

function calculatePrice(distance: number, multiplier: number): number {
  const basePrice = 1.5
  const perKm = 0.35
  return Math.round((basePrice + distance * perKm) * multiplier * 100) / 100
}

export default function BookPage() {
  const [pickup, setPickup] = useState("")
  const [destination, setDestination] = useState("")
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false)
  const [showDestSuggestions, setShowDestSuggestions] = useState(false)
  const [selectedRide, setSelectedRide] = useState("standard")
  const [step, setStep] = useState<"select" | "confirm" | "booked" | "cancelled">("select")
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("card")
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvc, setCardCvc] = useState("")

  const filteredPickupLocations = kosovoLocations.filter(loc =>
    loc.toLowerCase().includes(pickup.toLowerCase())
  )

  const filteredDestLocations = kosovoLocations.filter(loc =>
    loc.toLowerCase().includes(destination.toLowerCase())
  )

  const distance = pickup && destination ? getDistance(pickup, destination) : 0
  const selectedRideType = rideTypes.find(r => r.id === selectedRide)!
  const price = calculatePrice(distance, selectedRideType.multiplier)
  const cancellationFee = 2

  const handleBookRide = () => {
    if (pickup && destination) {
      setStep("confirm")
    }
  }

  const handleConfirmRide = () => {
    setStep("booked")
  }

  const handleCancelRide = () => {
    setShowCancelModal(true)
  }

  const confirmCancellation = () => {
    setShowCancelModal(false)
    setStep("cancelled")
  }

  const resetBooking = () => {
    setPickup("")
    setDestination("")
    setSelectedRide("standard")
    setStep("select")
    setPaymentMethod("card")
    setCardNumber("")
    setCardExpiry("")
    setCardCvc("")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Book a Ride</h1>
            <p className="mt-2 text-muted-foreground">Select your pickup and destination across Kosovo</p>
          </div>

          {step === "select" && (
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Left Column - Location & Ride Selection */}
              <div className="lg:col-span-3 space-y-6">
                {/* Location Inputs */}
                <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
                  <h2 className="font-semibold text-lg flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-accent" />
                    Route
                  </h2>
                  
                  {/* Pickup */}
                  <div className="relative">
                    <label className="text-sm text-muted-foreground mb-1.5 block">Pickup Location</label>
                    <div className="flex items-center gap-3 bg-secondary rounded-xl px-4 py-3 border border-border hover:border-accent/50 transition-all focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20">
                      <div className="w-3 h-3 rounded-full bg-accent" />
                      <input
                        type="text"
                        placeholder="Where from?"
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                        onFocus={() => setShowPickupSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowPickupSuggestions(false), 200)}
                        className="flex-1 bg-transparent outline-none"
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
                            <Navigation className="h-4 w-4 text-accent" />
                            {loc}, Kosovo
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Vertical line connector */}
                  <div className="flex items-center gap-3 pl-4">
                    <div className="w-0.5 h-6 bg-border ml-[5px]" />
                  </div>

                  {/* Destination */}
                  <div className="relative">
                    <label className="text-sm text-muted-foreground mb-1.5 block">Destination</label>
                    <div className="flex items-center gap-3 bg-secondary rounded-xl px-4 py-3 border border-border hover:border-accent/50 transition-all focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20">
                      <div className="w-3 h-3 rounded-full border-2 border-accent" />
                      <input
                        type="text"
                        placeholder="Where to?"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        onFocus={() => setShowDestSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowDestSuggestions(false), 200)}
                        className="flex-1 bg-transparent outline-none"
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
                            <Navigation className="h-4 w-4 text-accent" />
                            {loc}, Kosovo
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Ride Type Selection */}
                <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
                  <h2 className="font-semibold text-lg flex items-center gap-2">
                    <Car className="h-5 w-5 text-accent" />
                    Choose Your Ride
                  </h2>
                  
                  <div className="grid gap-3">
                    {rideTypes.map((ride) => {
                      const ridePrice = calculatePrice(distance, ride.multiplier)
                      const Icon = ride.icon
                      
                      return (
                        <button
                          key={ride.id}
                          onClick={() => setSelectedRide(ride.id)}
                          className={`flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                            selectedRide === ride.id
                              ? "border-accent bg-accent/10 ring-2 ring-accent/20"
                              : "border-border hover:border-accent/50 hover:bg-secondary/50"
                          }`}
                        >
                          <div className={`p-3 rounded-xl ${selectedRide === ride.id ? "bg-accent text-primary-foreground" : "bg-secondary"}`}>
                            <Icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{ride.name}</span>
                              <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                                {ride.capacity} passengers
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{ride.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">{distance > 0 ? `€${ridePrice.toFixed(2)}` : "—"}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {ride.eta}
                            </p>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
                  <h2 className="font-semibold text-lg flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-accent" />
                    Payment Method
                  </h2>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setPaymentMethod("card")}
                      className={`p-4 rounded-xl border transition-all text-left ${
                        paymentMethod === "card"
                          ? "border-accent bg-accent/10 ring-2 ring-accent/20"
                          : "border-border hover:border-accent/50"
                      }`}
                    >
                      <CreditCard className="h-5 w-5 mb-2" />
                      <p className="font-medium">Credit Card</p>
                      <p className="text-xs text-muted-foreground">Visa, Mastercard</p>
                    </button>
                    <button
                      onClick={() => setPaymentMethod("cash")}
                      className={`p-4 rounded-xl border transition-all text-left ${
                        paymentMethod === "cash"
                          ? "border-accent bg-accent/10 ring-2 ring-accent/20"
                          : "border-border hover:border-accent/50"
                      }`}
                    >
                      <span className="text-2xl mb-2 block">💶</span>
                      <p className="font-medium">Cash</p>
                      <p className="text-xs text-muted-foreground">Pay driver directly</p>
                    </button>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="space-y-3 pt-2">
                      <div>
                        <label className="text-sm text-muted-foreground mb-1.5 block">Card Number</label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim())}
                          className="w-full bg-secondary rounded-xl px-4 py-3 border border-border outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-sm text-muted-foreground mb-1.5 block">Expiry</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={(e) => {
                              let value = e.target.value.replace(/\D/g, "").slice(0, 4)
                              if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2)
                              setCardExpiry(value)
                            }}
                            className="w-full bg-secondary rounded-xl px-4 py-3 border border-border outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground mb-1.5 block">CVC</label>
                          <input
                            type="text"
                            placeholder="123"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, "").slice(0, 3))}
                            className="w-full bg-secondary rounded-xl px-4 py-3 border border-border outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Summary */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-2xl border border-border p-6 sticky top-24 space-y-6">
                  <h2 className="font-semibold text-lg">Trip Summary</h2>
                  
                  {pickup && destination ? (
                    <>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-3 h-3 rounded-full bg-accent mt-1.5" />
                          <div>
                            <p className="text-sm text-muted-foreground">From</p>
                            <p className="font-medium">{pickup}, Kosovo</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-3 h-3 rounded-full border-2 border-accent mt-1.5" />
                          <div>
                            <p className="text-sm text-muted-foreground">To</p>
                            <p className="font-medium">{destination}, Kosovo</p>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-border pt-4 space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Distance</span>
                          <span>{distance} km</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Ride Type</span>
                          <span>{selectedRideType.name}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">ETA</span>
                          <span>{selectedRideType.eta}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Payment</span>
                          <span className="capitalize">{paymentMethod}</span>
                        </div>
                      </div>

                      <div className="border-t border-border pt-4">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Total</span>
                          <span className="text-2xl font-bold text-accent">€{price.toFixed(2)}</span>
                        </div>
                      </div>

                      <Button 
                        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-12 rounded-xl text-base"
                        onClick={handleBookRide}
                      >
                        Book {selectedRideType.name} Ride
                        <ChevronRight className="h-5 w-5 ml-2" />
                      </Button>
                      
                      <p className="text-xs text-muted-foreground text-center">
                        Cancellation fee: €{cancellationFee} after booking
                      </p>
                    </>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <MapPin className="h-12 w-12 mx-auto mb-3 opacity-30" />
                      <p>Select pickup and destination to see your trip summary</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === "confirm" && (
            <div className="max-w-lg mx-auto">
              <div className="bg-card rounded-2xl border border-border p-8 space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Car className="h-8 w-8 text-accent" />
                  </div>
                  <h2 className="text-2xl font-bold">Confirm Your Ride</h2>
                  <p className="text-muted-foreground mt-2">Review your trip details before confirming</p>
                </div>

                <div className="bg-secondary rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-accent" />
                    <span>{pickup}, Kosovo</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full border-2 border-accent" />
                    <span>{destination}, Kosovo</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ride Type</span>
                    <span className="font-medium">{selectedRideType.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Distance</span>
                    <span className="font-medium">{distance} km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment</span>
                    <span className="font-medium capitalize">{paymentMethod}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-border">
                    <span className="font-semibold">Total</span>
                    <span className="text-xl font-bold text-accent">€{price.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1 h-12 rounded-xl"
                    onClick={() => setStep("select")}
                  >
                    Back
                  </Button>
                  <Button 
                    className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 h-12 rounded-xl"
                    onClick={handleConfirmRide}
                  >
                    Confirm Ride
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === "booked" && (
            <div className="max-w-lg mx-auto">
              <div className="bg-card rounded-2xl border border-border p-8 space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold">Ride Booked!</h2>
                  <p className="text-muted-foreground mt-2">Your driver is on the way</p>
                </div>

                <div className="bg-secondary rounded-xl p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-accent/20 rounded-full flex items-center justify-center">
                      <span className="text-2xl">👨</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">Arben K.</p>
                      <p className="text-sm text-muted-foreground">Toyota Corolla • Silver</p>
                      <p className="text-sm text-muted-foreground">KS 123-AB</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-accent">{selectedRideType.eta}</p>
                      <p className="text-xs text-muted-foreground">away</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-accent" />
                    <span className="text-sm">{pickup}, Kosovo</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full border-2 border-accent" />
                    <span className="text-sm">{destination}, Kosovo</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <span className="text-muted-foreground">Total Fare</span>
                  <span className="text-xl font-bold text-accent">€{price.toFixed(2)}</span>
                </div>

                <Button 
                  variant="destructive" 
                  className="w-full h-12 rounded-xl"
                  onClick={handleCancelRide}
                >
                  <X className="h-5 w-5 mr-2" />
                  Cancel Ride
                </Button>
                
                <p className="text-xs text-muted-foreground text-center">
                  Cancellation fee of €{cancellationFee} will be charged
                </p>
              </div>
            </div>
          )}

          {step === "cancelled" && (
            <div className="max-w-lg mx-auto">
              <div className="bg-card rounded-2xl border border-border p-8 space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <X className="h-8 w-8 text-destructive" />
                  </div>
                  <h2 className="text-2xl font-bold">Ride Cancelled</h2>
                  <p className="text-muted-foreground mt-2">Your ride has been cancelled</p>
                </div>

                <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <div>
                      <p className="font-medium text-destructive">Cancellation Fee Applied</p>
                      <p className="text-sm text-muted-foreground">A €{cancellationFee} fee has been charged to your payment method</p>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-12 rounded-xl"
                  onClick={resetBooking}
                >
                  Book Another Ride
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card rounded-2xl border border-border p-6 max-w-md w-full space-y-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="text-xl font-bold">Cancel Ride?</h3>
              <p className="text-muted-foreground mt-2">
                Are you sure you want to cancel? A cancellation fee of <span className="font-bold text-destructive">€{cancellationFee}</span> will be charged.
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowCancelModal(false)}
              >
                Keep Ride
              </Button>
              <Button 
                variant="destructive" 
                className="flex-1"
                onClick={confirmCancellation}
              >
                Yes, Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
