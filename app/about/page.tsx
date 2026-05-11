import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const stats = [
  { value: "2021", label: "Founded" },
  { value: "50K+", label: "Daily Rides" },
  { value: "10K+", label: "Drivers" },
  { value: "8", label: "Cities" }
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance leading-[1.1]">
              Moving Kosovo forward, one ride at a time
            </h1>
            <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
              RideKs was born from a simple idea: make transportation in Kosovo 
              accessible, affordable, and reliable for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-accent">{stat.value}</div>
                <div className="mt-2 text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold">Our Story</h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  RideKs started in 2021 when a group of friends in Prishtina noticed 
                  a problem: getting around Kosovo was either expensive, unreliable, 
                  or both. Traditional taxi services were inconsistent, and there was 
                  no modern alternative.
                </p>
                <p>
                  We set out to change that. Starting with just 50 drivers in Prishtina, 
                  we&apos;ve grown to cover all major cities in Kosovo, completing over 
                  10 million rides and counting.
                </p>
                <p>
                  Today, RideKs is more than just a ride-sharing app. We&apos;re a community 
                  of drivers and riders working together to make transportation better 
                  for everyone in Kosovo.
                </p>
              </div>
              
              <div className="mt-8 flex gap-4">
                <Link href="/book">
                  <Button className="rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
                    Book a Ride
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/drive">
                  <Button variant="outline" className="rounded-xl">
                    Become a Driver
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-card border border-border flex items-center justify-center">
                <Image
                  src="/rideks-logo.png"
                  alt="RideKs Logo"
                  width={200}
                  height={200}
                  className="rounded-full"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground rounded-2xl p-4 shadow-xl">
                <p className="text-sm font-medium">Trusted by</p>
                <p className="text-2xl font-bold">100K+ riders</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
