import Link from "next/link"
import { ArrowRight, DollarSign, Calendar, Car } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DriverSection() {
  return (
    <section className="py-24 bg-accent text-accent-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-3 py-1 text-sm font-medium bg-accent-foreground/10 rounded-full mb-4">
              Drive with RideKs
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
              Earn money on your schedule
            </h2>
            <p className="mt-6 text-lg opacity-80">
              Join thousands of drivers across Kosovo who are already earning with RideKs. 
              Set your own hours, be your own boss.
            </p>

            <div className="mt-8 grid sm:grid-cols-3 gap-6">
              <div>
                <div className="w-10 h-10 rounded-lg bg-accent-foreground/10 flex items-center justify-center mb-3">
                  <DollarSign className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-1">Great Earnings</h3>
                <p className="text-sm opacity-70">Keep more of what you earn</p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-lg bg-accent-foreground/10 flex items-center justify-center mb-3">
                  <Calendar className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-1">Flexible Hours</h3>
                <p className="text-sm opacity-70">Drive when you want</p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-lg bg-accent-foreground/10 flex items-center justify-center mb-3">
                  <Car className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-1">Your Car</h3>
                <p className="text-sm opacity-70">Use your own vehicle</p>
              </div>
            </div>

            <div className="mt-10">
              <Link href="/signup?type=driver">
                <Button size="lg" className="rounded-full px-8 group bg-accent-foreground text-accent hover:bg-accent-foreground/90">
                  Start Driving
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-3xl bg-accent-foreground/10 flex items-center justify-center">
              <div className="text-center">
                <div className="text-7xl font-bold">€500+</div>
                <p className="mt-2 opacity-80">Average weekly earnings</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-background text-foreground rounded-2xl p-4 shadow-xl">
              <p className="text-sm font-medium">New driver bonus</p>
              <p className="text-2xl font-bold text-accent">€100</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
