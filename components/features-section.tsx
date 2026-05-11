import { Car, Shield, Clock, CreditCard, MapPin, Users } from "lucide-react"

const features = [
  {
    icon: Car,
    title: "Reliable Rides",
    description: "Professional drivers across all major Kosovo cities, available 24/7."
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "All rides are tracked and drivers are verified for your safety."
  },
  {
    icon: Clock,
    title: "On-Time Pickup",
    description: "Schedule rides up to 90 days in advance with guaranteed pickup times."
  },
  {
    icon: CreditCard,
    title: "Easy Payments",
    description: "Pay with cash, card, or digital wallets - whatever works for you."
  },
  {
    icon: MapPin,
    title: "All of Kosovo",
    description: "From Prishtina to Prizren, Peja to Gjilan - we cover every city."
  },
  {
    icon: Users,
    title: "Ride Together",
    description: "Share rides with others going your way and save money."
  }
]

export function FeaturesSection() {
  return (
    <section className="py-24 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-balance">
            Why choose RideKs?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            The smartest way to get around Kosovo
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-background rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
