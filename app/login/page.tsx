"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState<"rider" | "driver">("rider")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Sign in with Supabase
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (authError) {
        setError(authError.message)
        setLoading(false)
        return
      }

      if (!authData.user) {
        setError("Login failed")
        setLoading(false)
        return
      }

      // Check user type in database
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("user_type")
        .eq("id", authData.user.id)
        .single()

      if (userError || !userData) {
        setError("User profile not found")
        setLoading(false)
        return
      }

      // Check if user type matches selected type
      if (userData.user_type !== userType) {
        setError(`This account is registered as a ${userData.user_type}, not a ${userType}`)
        setLoading(false)
        return
      }

      // Redirect based on user type
      if (userType === "rider") {
        router.push("/book")
      } else {
        router.push("/drive")
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error(err)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to home
          </Link>

          <Link href="/" className="flex items-center gap-2 mb-8">
            <Image
              src="/rideks-logo.png"
              alt="RideKs Logo"
              width={48}
              height={48}
              className="rounded-full"
            />
            <span className="text-2xl font-bold">RideKs</span>
          </Link>

          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="mt-2 text-muted-foreground">
            Log in to your account to continue
          </p>

          {/* User Type Toggle */}
          <div className="mt-8 flex gap-2 p-1 bg-secondary rounded-xl">
            <button
              type="button"
              onClick={() => setUserType("rider")}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                userType === "rider"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Rider
            </button>
            <button
              type="button"
              onClick={() => setUserType("driver")}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                userType === "driver"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Driver
            </button>
          </div>

          {error && (
            <div className="mt-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 rounded-xl"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 rounded-xl"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="rounded border-input accent-primary" disabled={loading} />
                Remember me
              </label>
              <Link href="/forgot-password" className="text-sm text-muted-foreground hover:text-primary">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90" size="lg" disabled={loading}>
              {loading ? "Logging in..." : `Log in as ${userType === "rider" ? "Rider" : "Driver"}`}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 bg-primary text-primary-foreground items-center justify-center p-12">
        <div className="max-w-lg text-center">
          <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary-foreground/10">
            <Image
              src="/rideks-logo.png"
              alt="RideKs"
              width={60}
              height={60}
              className="rounded-full"
            />
          </div>
          <h2 className="text-3xl font-bold mb-4">Go anywhere with RideKs</h2>
          <p className="opacity-80">
            Your journey across Kosovo starts here. Fast, reliable, and always there when you need us.
          </p>
          
          <div className="mt-12 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold">50K+</div>
              <div className="text-sm opacity-70">Daily rides</div>
            </div>
            <div>
              <div className="text-3xl font-bold">8</div>
              <div className="text-sm opacity-70">Cities</div>
            </div>
            <div>
              <div className="text-3xl font-bold">10K+</div>
              <div className="text-sm opacity-70">Drivers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
