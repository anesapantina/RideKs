const cities = [
  { name: "Prishtina", rides: "50K+" },
  { name: "Prizren", rides: "25K+" },
  { name: "Peja", rides: "15K+" },
  { name: "Gjakova", rides: "12K+" },
  { name: "Mitrovica", rides: "10K+" },
  { name: "Ferizaj", rides: "18K+" },
  { name: "Gjilan", rides: "14K+" },
  { name: "Vushtrri", rides: "8K+" }
]

export function CitiesSection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-balance">
            Available across Kosovo
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            RideKs connects you to rides in all major cities
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {cities.map((city, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border p-6 hover:border-primary hover:bg-primary/10 transition-all duration-300 cursor-pointer"
            >
              <h3 className="text-xl font-semibold">{city.name}</h3>
              <p className="text-sm text-muted-foreground group-hover:text-foreground/70 mt-1">
                {city.rides} rides/month
              </p>
              <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-primary/5 group-hover:bg-primary/20 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
