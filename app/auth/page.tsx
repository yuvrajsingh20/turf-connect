"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { STATE_CITIES } from "@/lib/types"

const AUTH_KEY = "turf-auth"

// Helper function to get cities for a state by tier
function getCitiesForState(state: string, tier: 'tier1' | 'tier2' | 'tier3'): string[] {
  const stateCities = STATE_CITIES[state]
  if (!stateCities) return []
  return stateCities[tier] || []
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.5 12.23c0-.74-.06-1.28-.18-1.84H12v3.34h5.95c-.12.83-.76 2.07-2.19 2.9l-.02.12l3.18 2.46l.22.02c2-.03 3.56-1.87 3.56-4.99"
      />
      <path
        fill="#34A853"
        d="M12 23c2.34 0 4.3-.77 5.73-2.08l-3.18-2.46c-.85.58-1.98.98-3.55.98c-2.71 0-5.01-1.77-5.84-4.22l-.12.01l-3.1 2.41l-.04.11C3.35 20.82 7.35 23 12 23"
      />
      <path
        fill="#FBBC05"
        d="M6.16 15.22a6.63 6.63 0 0 1 0-6.43l-.01-.13l-3.13-2.44l-.1.05a11.02 11.02 0 0 0 0 11.48"
      />
      <path
        fill="#EA4335"
        d="M12 5.21c1.62 0 3.05.56 4.18 1.64l3.05-2.98C16.28 1.61 14.34.9 12 .9C7.35.9 3.35 3.08 1.78 6.45l3.14 2.44C4.75 6.56 7.05 4.79 12 4.79"
      />
    </svg>
  )
}

export default function AuthPage() {
  const [tab, setTab] = useState<"login" | "register">("register")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [contactNumber, setContactNumber] = useState("")
  const [ageGroup, setAgeGroup] = useState("")
  const [state, setState] = useState("")
  const [city, setCity] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    // If already logged in, go to dashboard
    const logged = localStorage.getItem(AUTH_KEY)
    if (logged === "true") router.replace("/dashboard")
  }, [router])

  // Save JWT token to localStorage after login
  const handleAuthSuccess = (token: string) => {
    localStorage.setItem(AUTH_KEY, "true")
    localStorage.setItem("turf-token", token)
    // Optionally, decode and store user info (for quick access)
    try {
      const payload = JSON.parse(atob(token.split(".")[1]))
      localStorage.setItem("turf-user", JSON.stringify(payload))
    } catch {}
    router.replace("/dashboard")
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (tab === "register" && password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    // Clear previous errors
    setError("")

    try {
      const requestBody = tab === "login" 
        ? { email, password } 
        : { name, email, password, contactNumber, ageGroup, state, city }
      const response = await fetch(`/api/auth/${tab === "login" ? "login" : "register"}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      const data = await response.json()
      if (response.ok) {
        // For login, data.token; for register, need to login after register
        if (tab === "login" && data.token) {
          handleAuthSuccess(data.token)
        } else if (tab === "register") {
          // After register, auto-login
          const loginRes = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          })
          const loginData = await loginRes.json()
          if (loginRes.ok && loginData.token) {
            handleAuthSuccess(loginData.token)
          } else {
            setError(loginData.error || "Registration succeeded but login failed")
          }
        }
      } else {
        setError(data.error || data.message || "Authentication failed")
      }
    } catch (err) {
      setError("An unexpected error occurred")
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-[var(--secondary)]/30 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[var(--primary)]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[var(--accent)]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[var(--primary)]/5 to-[var(--accent)]/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <Header />
      <section className="bg-transparent relative z-10">
        <div className="mx-auto max-w-md px-4 py-16">
          <div className="card-turf p-8 relative overflow-hidden group">
            {/* Animated background gradient */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 via-[var(--accent)]/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"
              aria-hidden
            />
            
            <div className="relative z-10">
              {/* Welcome Header */}
              <div className="text-center mb-8 fade-in">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent mb-2">
                  Welcome to TurfConnect
                </h1>
                <p className="text-[var(--muted-foreground)]">
                  Join the community and start playing today! 🎯
                </p>
              </div>

              {/* Tab Switcher */}
              <div className="mb-6 grid grid-cols-2 gap-2 rounded-xl bg-[var(--secondary)] p-1">
                <button
                  onClick={() => {
                    setTab("login")
                    setError("")
                  }}
                  className={`rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                    tab === "login" 
                      ? "bg-white shadow-lg text-[var(--primary)] scale-105" 
                      : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                  }`}
                  aria-pressed={tab === "login"}
                >
                  Log in
                </button>
                <button
                  onClick={() => {
                    setTab("register")
                    setError("")
                  }}
                  className={`rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                    tab === "register" 
                      ? "bg-white shadow-lg text-[var(--primary)] scale-105" 
                      : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                  }`}
                  aria-pressed={tab === "register"}
                >
                  Register
                </button>
              </div>

              <form className="grid gap-6" onSubmit={handleRegister}>
                {error && (
                  <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-red-700 bounce-in">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {error}
                    </div>
                  </div>
                )}

                {tab === "register" && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[var(--foreground)]">Full Name</label>
                      <input
                        required
                        type="text"
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all duration-200"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[var(--foreground)]">Contact Number</label>
                      <input
                        required
                        type="tel"
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all duration-200"
                        placeholder="Enter your 10-digit mobile number"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        maxLength={10}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[var(--foreground)]">Age Group</label>
                      <select
                        required
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-[var(--foreground)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all duration-200"
                        value={ageGroup}
                        onChange={(e) => setAgeGroup(e.target.value)}
                      >
                        <option value="">Select your age group</option>
                        <option value="18-25">18-25 years</option>
                        <option value="25-35">25-35 years</option>
                        <option value="35-45">35-45 years</option>
                        <option value="45+">45+ years</option>
                        <option value="All Ages">All Ages</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-[var(--foreground)]">State</label>
                        <select
                          required
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-[var(--foreground)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all duration-200"
                          value={state}
                          onChange={(e) => {
                            setState(e.target.value)
                            setCity("") // Reset city when state changes
                          }}
                        >
                          <option value="">Select your state</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="Rajasthan">Rajasthan</option>
                          <option value="West Bengal">West Bengal</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="Punjab">Punjab</option>
                          <option value="Haryana">Haryana</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-[var(--foreground)]">City</label>
                        <select
                          required
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-[var(--foreground)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all duration-200"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          disabled={!state}
                        >
                          <option value="">Select your city</option>
                          {state && (
                            <>
                              <optgroup label="Tier 1 Cities">
                                {getCitiesForState(state, 'tier1').map(cityName => (
                                  <option key={cityName} value={cityName}>{cityName}</option>
                                ))}
                              </optgroup>
                              <optgroup label="Tier 2 Cities">
                                {getCitiesForState(state, 'tier2').map(cityName => (
                                  <option key={cityName} value={cityName}>{cityName}</option>
                                ))}
                              </optgroup>
                              <optgroup label="Tier 3 Cities">
                                {getCitiesForState(state, 'tier3').map(cityName => (
                                  <option key={cityName} value={cityName}>{cityName}</option>
                                ))}
                              </optgroup>
                            </>
                          )}
                        </select>
                      </div>
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[var(--foreground)]">Email Address</label>
                  <input
                    required
                    type="email"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all duration-200"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[var(--foreground)]">Password</label>
                  <input
                    required
                    type="password"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all duration-200"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {tab === "register" && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[var(--foreground)]">Confirm Password</label>
                    <input
                      required
                      type="password"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all duration-200"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                )}

                <button 
                  type="submit" 
                  className="btn-cta mt-4 px-6 py-4 text-base font-bold w-full group relative overflow-hidden"
                >
                  <span className="relative z-10">
                    {tab === "login" ? "Log in" : "Create account"}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </button>
              </form>

              <div className="my-6 flex items-center gap-4">
                <div className="flex-1 h-px bg-[var(--border)]"></div>
                <span className="text-sm text-[var(--muted-foreground)] font-medium">or</span>
                <div className="flex-1 h-px bg-[var(--border)]"></div>
              </div>

              <button
                onClick={() => handleAuthSuccess("demo-token")}
                className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-[var(--border)] px-6 py-4 text-sm font-semibold hover:bg-[var(--secondary)] hover:border-[var(--primary)] transition-all duration-300 interactive-hover group"
                aria-label="Continue with Google"
              >
                <GoogleIcon />
                <span className="group-hover:scale-105 transition-transform">Continue with Google</span>
                <span className="sr-only">Google Sign In</span>
              </button>

              {/* Fun footer message */}
              <div className="mt-8 text-center">
                <p className="text-sm text-[var(--muted-foreground)]">
                  {tab === "login" 
                    ? "Welcome back! Ready to play? 🚀" 
                    : "Join thousands of players already on the turf! ⚽"
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
