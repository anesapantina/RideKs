import Link from "next/link"
import Image from "next/image"
import { ArrowRight, DollarSign, Calendar, Shield, Car, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const benefits = [
  {
    icon: DollarSign,
    title: "Competitive Earnings",
    description: "Keep 85% of every fare. No hidden fees, no surprises."
  },
  {
    icon: Calendar,
    title: "Flexible Schedule",
    description: "Work when you want. Set your own hours and be your own boss."
  },
  {
    icon: Shield,
    title: "Insurance Coverage",
    description: "Drive with confidence with our comprehensive insurance policy."
  },
  {
    icon: Car,
    title: "Use Your Car",
    description: "Any car 2015 or newer qualifies. Sedans, SUVs, or vans welcome."
  },
  {
    icon: Clock,
    title: "Weekly Payouts",
    description: "Get paid every week directly to your bank account."
  },
  {
    icon: Star,
    title: "Bonuses & Rewards",
    description: "Earn extra with surge pricing, tips, and driver incentives."
  }
]

const steps = [
  {
    step: "01",
    title: "Sign Up",
    description: "Create your driver account in minutes. Just need your ID and driver's license."
  },
  {
    step: "02",
    title: "Get Verified",
    description: "We'll verify your documents and do a quick background check."
  },
  {
    step: "03",
    title: "Start Driving",
    description: "Once approved, go online and start accepting ride requests."
  }
]

const requirements = [
  "Valid Kosovo driver's license",
  "At least 21 years old",
  "Vehicle 2015 or newer",
  "Valid vehicle registration",
  "Insurance documentation",
  "Smartphone with data plan"
]

export default function DrivePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-20 bg-accent text-accent-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 text-sm font-medium bg-accent-foreground/10 rounded-full mb-4">
                Drive with RideKs
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance leading-[1.1]">
                Turn your car into a money-making machine
              </h1>
              <p className="mt-6 text-xl opacity-80">
                Join Kosovo&apos;s fastest-growing ride-sharing platform. 
                Flexible hours, great earnings, and a supportive community.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/signup?type=driver">
                  <Button size="lg" className="w-full sm:w-auto rounded-full px-8 group bg-accent-foreground text-accent hover:bg-accent-foreground/90">
                    Apply to Drive
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
              <div className="mt-12 flex items-center gap-8">
                <div>
                  <div className="text-4xl font-bold">€500+</div>
                  <div className="text-sm opacity-70">Avg. weekly earnings</div>
                </div>
                <div className="w-px h-12 bg-accent-foreground/20" />
                <div>
                  <div className="text-4xl font-bold">10K+</div>
                  <div className="text-sm opacity-70">Active drivers</div>
                </div>
                <div className="w-px h-12 bg-accent-foreground/20" />
                <div>
                  <div className="text-4xl font-bold">85%</div>
                  <div className="text-sm opacity-70">You keep</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-accent-foreground/10 flex items-center justify-center">
                <Image
                  src="/rideks-logo.png"
                  alt="RideKs Driver"
                  width={200}
                  height={200}
                  className="rounded-full"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-background text-foreground rounded-2xl p-4 shadow-xl">
                <p className="text-sm font-medium">New driver bonus</p>
                <p className="text-3xl font-bold text-accent">€100</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">Why drive with RideKs?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We take care of our drivers so you can focus on what matters
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="p-6 rounded-2xl border border-border bg-card hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 transition-all">
                <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">Get started in 3 easy steps</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From sign-up to your first ride in no time
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((item, index) => (
              <div key={index} className="relative">
                <div className="text-8xl font-bold text-accent/10 absolute -top-8 left-0">
                  {item.step}
                </div>
                <div className="relative pt-12">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold">Requirements to drive</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Make sure you meet these basic requirements before applying
              </p>
              <ul className="mt-8 space-y-4">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold">
                      ✓
                    </div>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-accent text-accent-foreground rounded-3xl p-8 lg:p-12">
              <h3 className="text-2xl font-bold mb-4">Ready to start?</h3>
              <p className="opacity-80 mb-8">
                Join thousands of drivers already earning with RideKs across Kosovo.
              </p>
              <Link href="/signup?type=driver">
                <Button size="lg" className="w-full rounded-full bg-accent-foreground text-accent hover:bg-accent-foreground/90">
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
