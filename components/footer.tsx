import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/rideks-logo.png"
                alt="RideKs Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-xl font-bold">RideKs</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Your trusted ride-sharing service across Kosovo.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/drive" className="hover:text-foreground transition-colors">Become a Driver</Link></li>
              <li><Link href="/business" className="hover:text-foreground transition-colors">Business</Link></li>
              <li><Link href="/careers" className="hover:text-foreground transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold mb-4">Products</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/book" className="hover:text-foreground transition-colors">Book a Ride</Link></li>
              <li><Link href="/drive" className="hover:text-foreground transition-colors">Drive</Link></li>
              <li><Link href="/business" className="hover:text-foreground transition-colors">For Business</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/help" className="hover:text-foreground transition-colors">Help Center</Link></li>
              <li><Link href="/safety" className="hover:text-foreground transition-colors">Safety</Link></li>
              <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link></li>
              <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} RideKs. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-sm text-muted-foreground">Kosovo</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
