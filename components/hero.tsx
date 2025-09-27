"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

export function Hero() {
  const [currentGame, setCurrentGame] = useState(0)
  
  // Sample games for the rotating display
  const games = [
    { sport: "7v7 Soccer", venue: "Riverside", players: "8/14", color: "from-blue-400 to-blue-600" },
    { sport: "Flag Football", venue: "Midtown", players: "7/10", color: "from-green-400 to-green-600" },
    { sport: "Ultimate Frisbee", venue: "Greenway", players: "9/12", color: "from-purple-400 to-purple-600" },
    { sport: "Basketball", venue: "Downtown", players: "6/8", color: "from-orange-400 to-orange-600" },
  ]

  // Rotate through games every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGame((prev) => (prev + 1) % games.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="bg-gradient-to-br from-background via-background to-[var(--secondary)]/30 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[var(--primary)]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[var(--accent)]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[var(--primary)]/5 to-[var(--accent)]/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 py-16 md:grid-cols-2 md:py-24 relative z-10">
        {/* Copy */}
        <div className="space-y-6 fade-in">
          <div className="space-y-4">
            <h1 className="text-pretty text-5xl font-extrabold leading-tight md:text-6xl lg:text-7xl">
              Find and Join{" "}
              <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent animate-pulse">
                Pick‑Up Turf Games
              </span>
            </h1>
            <p className="max-w-prose text-xl leading-relaxed text-[var(--muted-foreground)]">
              Connect with local players, discover nearby matches, and build your team. Simple scheduling, instant joins,
              and smooth coordination that makes every game unforgettable! 🎯
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link 
              href="/auth" 
              className="btn-cta px-8 py-4 text-lg font-bold bounce-in group relative overflow-hidden"
            >
              <span className="relative z-10">Register to Play</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Link>
            <Link
              href="/dashboard"
              className="rounded-xl border-2 border-[var(--primary)] px-8 py-4 text-lg font-semibold hover:bg-[var(--primary)] hover:text-white transition-all duration-300 interactive-hover group"
            >
              <span className="group-hover:scale-105 transition-transform">View Dashboard</span>
            </Link>
          </div>

          {/* Trust indicators with animations */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--muted-foreground)]">
            <span className="inline-flex items-center gap-2 group">
              <div className="h-3 w-3 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] animate-pulse group-hover:scale-125 transition-transform"></div>
              <span className="group-hover:text-[var(--primary)] transition-colors">Real players</span>
            </span>
            <span className="inline-flex items-center gap-2 group">
              <div className="h-3 w-3 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] animate-pulse group-hover:scale-125 transition-transform delay-100"></div>
              <span className="group-hover:text-[var(--accent)] transition-colors">Local matches</span>
            </span>
            <span className="inline-flex items-center gap-2 group">
              <div className="h-3 w-3 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] animate-pulse group-hover:scale-125 transition-transform delay-200"></div>
              <span className="group-hover:text-[var(--primary)] transition-colors">Instant joins</span>
            </span>
          </div>
        </div>

        {/* Interactive game showcase */}
        <div className="relative slide-up">
          <div className="card-turf relative overflow-hidden p-8 group">
            {/* Animated background gradient */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 via-[var(--accent)]/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"
              aria-hidden
            />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
                  Live Games
                </h3>
                <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                  <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Live now</span>
                </div>
              </div>

              {/* Rotating game display */}
              <div className="space-y-4">
                {games.map((game, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between rounded-xl p-4 transition-all duration-500 ${
                      index === currentGame 
                        ? `bg-gradient-to-r ${game.color} text-white shadow-lg scale-105` 
                        : 'bg-[var(--secondary)] hover:bg-[var(--secondary)]/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-3 w-3 rounded-full ${
                        index === currentGame ? 'bg-white' : 'bg-[var(--accent)]'
                      }`}></div>
                      <span className="font-semibold">{game.sport} - {game.venue}</span>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                      index === currentGame 
                        ? 'bg-white/20 text-white' 
                        : 'bg-[var(--accent)] text-[var(--accent-foreground)]'
                    }`}>
                      {game.players}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between">
                <Link 
                  href="/auth" 
                  className="btn-cta inline-flex items-center gap-2 px-6 py-3 text-sm font-bold group"
                >
                  <span>Join a Game</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                
                {/* Game counter dots */}
                <div className="flex gap-2">
                  {games.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentGame(index)}
                      className={`h-2 w-2 rounded-full transition-all duration-300 ${
                        index === currentGame 
                          ? 'bg-[var(--primary)] scale-125' 
                          : 'bg-[var(--muted-foreground)] hover:bg-[var(--accent)]'
                      }`}
                      aria-label={`View game ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating elements for extra visual appeal */}
          <div className="absolute -top-4 -right-4 h-8 w-8 bg-[var(--accent)] rounded-full opacity-60 animate-bounce"></div>
          <div className="absolute -bottom-4 -left-4 h-6 w-6 bg-[var(--primary)] rounded-full opacity-40 animate-bounce delay-500"></div>
        </div>
      </div>
    </section>
  )
}
