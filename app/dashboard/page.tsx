"use client"

import useSWR from "swr"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { CreateGameModal } from "@/components/create-game-modal"
import { STATE_CITIES } from "@/lib/types"

type Game = {
  id: string
  sport: string
  venue: string
  state: string
  city: string
  date: string
  time: string
  ageGroup: string
  playersNeeded: number
  costPerPlayer: number
  note?: string
  createdBy: string
  players: string[]
}

const AUTH_KEY = "turf-auth"

const fetcher = async (url: string): Promise<Game[]> => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch games')
  }
  const data = await response.json()
  return data.games || []
}

// Helper to get user info from JWT in localStorage
function getUserFromStorage() {
  if (typeof window === "undefined") return null
  try {
    const token = localStorage.getItem("turf-token")
    if (!token) return null
    const payload = JSON.parse(atob(token.split(".")[1]))
    return payload // { userId, email, name }
  } catch {
    return null
  }
}

export default function DashboardPage() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [selectedState, setSelectedState] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedTier, setSelectedTier] = useState("")
  
  // Build API URL with filters
  const buildApiUrl = () => {
    const params = new URLSearchParams()
    if (selectedState) params.append('state', selectedState)
    if (selectedCity) params.append('city', selectedCity)
    if (selectedTier) params.append('tier', selectedTier)
    
    const queryString = params.toString()
    return queryString ? `/api/games?${queryString}` : '/api/games'
  }
  
  const { data: games, error, mutate } = useSWR<Game[]>(buildApiUrl(), fetcher)

  useEffect(() => {
    const logged = localStorage.getItem(AUTH_KEY)
    if (logged !== "true") router.replace("/auth")
  }, [router])

  function logout() {
    localStorage.removeItem(AUTH_KEY)
    router.replace("/auth")
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-[var(--secondary)]/20">
      <Header />
      <section className="bg-transparent">
        <div className="mx-auto max-w-7xl px-4 py-8">
          {/* Welcome Header with Stats */}
          <div className="mb-8 fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
                  Your Dashboard
                </h1>
                <p className="text-lg text-[var(--muted-foreground)] mt-2">
                  Welcome back! Ready for your next game? 🎯
                </p>
              </div>
              
              {/* Quick Stats */}
              <div className="flex gap-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-border/50">
                  <div className="text-2xl font-bold text-[var(--primary)]">{games?.length || 0}</div>
                  <div className="text-sm text-[var(--muted-foreground)]">Available Games</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-border/50">
                  <div className="text-2xl font-bold text-[var(--accent)]">
                    {games?.filter(g => g.players.length >= g.playersNeeded).length || 0}
                  </div>
                  <div className="text-sm text-[var(--muted-foreground)]">Full Games</div>
                </div>
              </div>
            </div>

            {/* Filter Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-border/50 mb-6">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Filter Games by Location</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* State Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--foreground)]">State</label>
                  <select
                    value={selectedState}
                    onChange={(e) => {
                      setSelectedState(e.target.value)
                      setSelectedCity("") // Reset city when state changes
                    }}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-[var(--foreground)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all duration-200"
                  >
                    <option value="">All States</option>
                    {Object.keys(STATE_CITIES).map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                {/* City Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--foreground)]">City</label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    disabled={!selectedState}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-[var(--foreground)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all duration-200 disabled:opacity-50"
                  >
                    <option value="">All Cities</option>
                    {selectedState && (
                      <>
                        <optgroup label="Tier 1 Cities">
                          {STATE_CITIES[selectedState]?.tier1.map(city => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </optgroup>
                        <optgroup label="Tier 2 Cities">
                          {STATE_CITIES[selectedState]?.tier2.map(city => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </optgroup>
                        <optgroup label="Tier 3 Cities">
                          {STATE_CITIES[selectedState]?.tier3.map(city => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </optgroup>
                      </>
                    )}
                  </select>
                </div>

                {/* City Tier Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--foreground)]">City Tier</label>
                  <select
                    value={selectedTier}
                    onChange={(e) => setSelectedTier(e.target.value)}
                    disabled={!selectedState}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-[var(--foreground)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all duration-200 disabled:opacity-50"
                  >
                    <option value="">All Tiers</option>
                    <option value="tier1">Tier 1 Cities</option>
                    <option value="tier2">Tier 2 Cities</option>
                    <option value="tier3">Tier 3 Cities</option>
                  </select>
                </div>

                {/* Clear Filters */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--foreground)] opacity-0">Clear</label>
                  <button
                    onClick={() => {
                      setSelectedState("")
                      setSelectedCity("")
                      setSelectedTier("")
                    }}
                    className="w-full rounded-lg border border-[var(--primary)] bg-transparent px-3 py-2 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all duration-200 font-medium"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4 text-red-700 bounce-in">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Failed to load games. Please try again.
              </div>
            </div>
          )}
          
          {/* Games Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(games ?? []).map((g, index) => (
              <article 
                key={g.id} 
                className="card-turf p-6 group hover:scale-105 transition-all duration-300 slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Game Header */}
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                    {g.sport}
                  </h3>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                    g.playersNeeded - g.players.length === 0 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-[var(--accent)] text-[var(--accent-foreground)]'
                  }`}>
                    {g.playersNeeded - g.players.length === 0 ? 'Full' : `${g.playersNeeded - g.players.length} needed`}
                  </span>
                </div>

                {/* Game Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
                    <svg className="w-4 h-4 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="font-medium">{g.venue}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
                    <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="font-medium">{g.city}, {g.state}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
                    <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{g.date} • {g.time}</span>
                  </div>

                  <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
                    <svg className="w-4 h-4 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <span className="font-bold text-[var(--primary)]">${g.costPerPlayer}</span>
                    <span>per player</span>
                  </div>

                  <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
                    <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Age: {g.ageGroup}</span>
                  </div>

                  {g.note && (
                    <div className="p-3 bg-[var(--secondary)] rounded-lg">
                      <p className="text-sm text-[var(--muted-foreground)] italic">
                        💬 {g.note}
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <button 
                    className="btn-cta px-4 py-2 text-sm font-semibold flex-1 group/btn"
                    onClick={() => {
                      // TODO: Implement join game functionality
                      console.log('Join game:', g.id)
                    }}
                  >
                    <span className="group-hover/btn:scale-105 transition-transform">Join Game</span>
                  </button>
                  <button className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-[var(--secondary)] interactive-hover group">
                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Empty State */}
          {(!games || games.length === 0) && !error && (
            <div className="text-center py-16 fade-in">
              <div className="mx-auto w-24 h-24 bg-[var(--secondary)] rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-[var(--muted-foreground)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">No games available</h3>
              <p className="text-[var(--muted-foreground)] mb-6">Be the first to create a game and get the turf rolling!</p>
              <button
                onClick={() => setOpen(true)}
                className="btn-cta px-6 py-3 font-semibold"
              >
                Create Your First Game
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Floating create button with animation */}
      <button
        onClick={() => setOpen(true)}
        className="btn-cta fixed bottom-6 right-6 flex h-16 w-16 items-center justify-center rounded-full text-3xl shadow-2xl hover:scale-110 transition-all duration-300 pulse-glow group"
        aria-label="Create game"
      >
        <span className="group-hover:rotate-90 transition-transform duration-300">+</span>
      </button>

      <CreateGameModal open={open} onClose={() => setOpen(false)} />
    </main>
  )
}
