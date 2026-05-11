"use client"

import { useState, Suspense } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowLeft, Car, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabase"

function SignupForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultType = searchParams.get("type") === "driver" ? "driver" : "rider"
  
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState<"rider" | "driver">(defaultType)
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    // Driver specific
    carMake: "",
    carModel: "",
    carYear: "",
    licensePlate: "",
    city: ""
  })

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (step === 1) {
      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match")
        return
      }
      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters")
        return
      }
      setStep(2)
      return
    }

    // Step 2 - Create account
    setLoading(true)
    try {
      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      })

      if (authError || !authData.user) {
        setError(authError?.message || "Signup failed")
        setLoading(false)
        return
      }

      // Create user record
      const { error: userError } = await supabase
        .from("users")
        .insert([{
          id: authData.user.id,
          email: formData.email,
          full_name: `${formData.firstName} ${formData.lastName}`,
          phone_number: formData.phone,
          user_type: userType,
        }])

      if (userError) {
        setError(userError.message)
        setLoading(false)
        return
      }

      // Create rider or driver profile
      if (userType === "rider") {
        const { error: riderError } = await supabase
          .from("riders")
          .insert([{
            id: authData.user.id,
          }])
        if (riderError) {
          setError(riderError.message)
          setLoading(false)
          return
        }
      } else {
        // Driver
        const { error: driverError } = await supabase
          .from("drivers")
          .insert([{
            id: authData.user.id,
            license_number: "PENDING", // Placeholder
            vehicle_plate: formData.licensePlate,
            vehicle_model: `${formData.carMake} ${formData.carModel}`,
            vehicle_year: parseInt(formData.carYear),
          }])
        if (driverError) {
          setError(driverError.message)
          setLoading(false)
          return
        }
      }

      // Success - redirect to login
      router.push(`/login?registered=true`)
    } catch (err) {
      setError("An unexpected error occurred")
      console.error(err)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24 py-12">
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

          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="mt-2 text-muted-foreground">
            {userType === "rider" 
              ? "Start riding with RideKs today" 
              : "Join our driver community and start earning"}
          </p>

          {/* User Type Toggle */}
          <div className="mt-8 flex gap-2 p-1 bg-secondary rounded-xl">
            <button
              type="button"
              onClick={() => { setUserType("rider"); setStep(1) }}
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
              onClick={() => { setUserType("driver"); setStep(1) }}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                userType === "driver"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Driver
            </button>
          </div>

          {/* Progress indicator for driver signup */}
          {userType === "driver" && (
            <div className="mt-6 flex items-center gap-2">
              <div className={`flex-1 h-1 rounded-full ${step >= 1 ? "bg-primary" : "bg-secondary"}`} />
              <div className={`flex-1 h-1 rounded-full ${step >= 2 ? "bg-primary" : "bg-secondary"}`} />
            </div>
          )}

          {error && (
            <div className="mt-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {step === 1 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="firstName"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={(e) => updateField("firstName", e.target.value)}
                        className="pl-10 rounded-xl"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input
                      id="lastName"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={(e) => updateField("lastName", e.target.value)}
                      className="rounded-xl"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="pl-10 rounded-xl"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+383 44 xxx xxx"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
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
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) => updateField("password", e.target.value)}
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

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => updateField("confirmPassword", e.target.value)}
                      className="pl-10 rounded-xl"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>
              </>
            )}

            {step === 2 && userType === "driver" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <select
                      id="city"
                      value={formData.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      className="w-full h-10 pl-10 pr-4 rounded-xl border border-input bg-background text-sm"
                      required
                      disabled={loading}
                    >
                      <option value="">Select your city</option>
                      <option value="prishtina">Prishtina</option>
                      <option value="prizren">Prizren</option>
                      <option value="peja">Peja</option>
                      <option value="gjakova">Gjakova</option>
                      <option value="mitrovica">Mitrovica</option>
                      <option value="ferizaj">Ferizaj</option>
                      <option value="gjilan">Gjilan</option>
                      <option value="vushtrri">Vushtrri</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="carMake">Car make</Label>
                    <div className="relative">
                      <Car className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="carMake"
                        placeholder="e.g. Toyota"
                        value={formData.carMake}
                        onChange={(e) => updateField("carMake", e.target.value)}
                        className="pl-10 rounded-xl"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="carModel">Car model</Label>
                    <Input
                      id="carModel"
                      placeholder="e.g. Corolla"
                      value={formData.carModel}
                      onChange={(e) => updateField("carModel", e.target.value)}
                      className="rounded-xl"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="carYear">Year</Label>
                    <Input
                      id="carYear"
                      placeholder="e.g. 2020"
                      value={formData.carYear}
                      onChange={(e) => updateField("carYear", e.target.value)}
                      className="rounded-xl"
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="licensePlate">License plate</Label>
                    <Input
                      id="licensePlate"
                      placeholder="e.g. 01-XXX-XX"
                      value={formData.licensePlate}
                      onChange={(e) => updateField("licensePlate", e.target.value)}
                      className="rounded-xl"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="flex gap-3">
              {step === 2 && (
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1 rounded-xl"
                  onClick={() => setStep(1)}
                  disabled={loading}
                >
                  Back
                </Button>
              )}
              <Button type="submit" className="flex-1 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90" size="lg" disabled={loading}>
                {loading ? "Creating account..." : (userType === "rider" 
                  ? "Create account" 
                  : step === 1 
                    ? "Continue" 
                    : "Create driver account")}
              </Button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Log in
            </Link>
          </p>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            By signing up, you agree to our{" "}
            <Link href="/terms" className="underline">Terms</Link> and{" "}
            <Link href="/privacy" className="underline">Privacy Policy</Link>
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
          {userType === "rider" ? (
            <>
              <h2 className="text-3xl font-bold mb-4">Your ride is waiting</h2>
              <p className="opacity-80">
                Get to your destination quickly and safely with RideKs. 
                Available in all major cities across Kosovo.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-4">Start earning today</h2>
              <p className="opacity-80">
                Join thousands of drivers making great income with flexible hours. 
                Be your own boss with RideKs.
              </p>
              <div className="mt-8 inline-block bg-background text-foreground rounded-xl px-6 py-4">
                <p className="text-sm font-medium">New driver bonus</p>
                <p className="text-3xl font-bold text-primary">€100</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <SignupForm />
    </Suspense>
  )
}
