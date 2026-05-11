"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Menu, X, Car, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, loading, signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/rideks-logo.png"
              alt="RideKs Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-xl font-bold tracking-tight">RideKs</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <Link href="/book">
              <Button variant="ghost" size="sm" className="gap-2 hover:text-foreground hover:bg-secondary">
                <Car className="h-4 w-4" />
                Book a Ride
              </Button>
            </Link>
            <Link href="/drive">
              <Button variant="ghost" size="sm">
                Become a Driver
              </Button>
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {loading ? (
              <div className="h-8 w-20 animate-pulse bg-muted rounded" />
            ) : user ? (
              <>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {user.email}
                </span>
                <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-1">
                  <LogOut className="h-4 w-4" />
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="rounded-full px-6 bg-primary text-primary-foreground hover:bg-primary/90">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <nav className="flex flex-col gap-2">
              <Link href="/book" className="flex items-center gap-2 text-sm font-medium py-3 px-2 rounded-lg hover:bg-secondary" onClick={() => setMobileMenuOpen(false)}>
                <Car className="h-4 w-4" />
                Book a Ride
              </Link>
              <Link href="/drive" className="text-sm font-medium py-3 px-2 rounded-lg hover:bg-secondary" onClick={() => setMobileMenuOpen(false)}>
                Become a Driver
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-border/50">
                {loading ? (
                  <div className="h-10 w-full animate-pulse bg-muted rounded" />
                ) : user ? (
                  <>
                    <span className="text-sm text-muted-foreground px-2 py-1 flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {user.email}
                    </span>
                    <Button variant="outline" className="w-full gap-1" onClick={() => { handleSignOut(); setMobileMenuOpen(false) }}>
                      <LogOut className="h-4 w-4" />
                      Log out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Log in
                      </Button>
                    </Link>
                    <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                        Sign up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
