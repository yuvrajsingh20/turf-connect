"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState, useRef } from "react"

// Helper to get user info from localStorage (JWT payload)
function getUserFromStorage() {
  if (typeof window === "undefined") return null
  try {
    const token = localStorage.getItem("turf-token")
    if (!token) return null
    // Decode JWT payload (base64)
    const payload = JSON.parse(atob(token.split(".")[1]))
    return payload // { userId, email, name }
  } catch {
    return null
  }
}

// User Profile Dropdown Component
function UserProfileDropdown({ user, turfCount, onLogout }: { user: any, turfCount: number, onLogout: () => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Fun motivational messages based on turf count
  const getMotivationalMessage = (count: number) => {
    if (count === 0) return "Ready for your first game? 🎯"
    if (count < 3) return "You're getting started! 🚀"
    if (count < 10) return "You're on fire! 🔥"
    if (count < 20) return "Turf legend in the making! ⭐"
    return "Absolute turf champion! 🏆"
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button - Clickable to open dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-all duration-200 group"
        aria-label="User profile menu"
      >
        {/* Animated Avatar with gradient */}
        <div className="relative">
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-200">
            {user.name?.[0]?.toUpperCase() || "U"}
          </div>
          {/* Online indicator */}
          <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
        </div>
        
        {/* User Info */}
        <div className="flex flex-col items-start text-left">
          <span className="font-semibold text-sm text-foreground group-hover:text-[var(--primary)] transition-colors">
            {user.name}
          </span>
          <span className="text-xs text-[var(--muted-foreground)] group-hover:text-[var(--accent)] transition-colors">
            {turfCount} games played
          </span>
        </div>

        {/* Dropdown Arrow */}
        <div className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-4 h-4 text-[var(--muted-foreground)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-border/50 overflow-hidden z-50 slide-up">
          {/* Header with user info */}
          <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-white/20 text-white font-bold text-xl">
                {user.name?.[0]?.toUpperCase() || "U"}
              </div>
              <div>
                <h3 className="font-bold text-lg">{user.name}</h3>
                <p className="text-white/80 text-sm">{user.email}</p>
              </div>
            </div>
            <p className="mt-2 text-white/90 text-sm italic">
              {getMotivationalMessage(turfCount)}
            </p>
          </div>

          {/* Stats Section */}
          <div className="p-4 border-b border-border/50">
            <h4 className="font-semibold text-sm text-[var(--muted-foreground)] mb-3">Your Stats</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-[var(--secondary)] rounded-lg">
                <div className="text-2xl font-bold text-[var(--primary)]">{turfCount}</div>
                <div className="text-xs text-[var(--muted-foreground)]">Games Attended</div>
              </div>
              <div className="text-center p-3 bg-[var(--secondary)] rounded-lg">
                <div className="text-2xl font-bold text-[var(--accent)]">{Math.floor(turfCount * 0.3)}</div>
                <div className="text-xs text-[var(--muted-foreground)]">Games Hosted</div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <Link 
              href="/dashboard" 
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--secondary)] transition-colors group"
              onClick={() => setIsOpen(false)}
            >
              <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] group-hover:bg-[var(--primary)]/20 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-sm">Dashboard</div>
                <div className="text-xs text-[var(--muted-foreground)]">View your games</div>
              </div>
            </Link>

            <Link 
              href="/profile" 
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--secondary)] transition-colors group"
              onClick={() => setIsOpen(false)}
            >
              <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] group-hover:bg-[var(--accent)]/20 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-sm">Profile</div>
                <div className="text-xs text-[var(--muted-foreground)]">Edit your profile</div>
              </div>
            </Link>

            <Link 
              href="/settings" 
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--secondary)] transition-colors group"
              onClick={() => setIsOpen(false)}
            >
              <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 group-hover:bg-gray-200 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-sm">Settings</div>
                <div className="text-xs text-[var(--muted-foreground)]">Preferences & privacy</div>
              </div>
            </Link>

            {/* Logout Button */}
            <button
              onClick={() => {
                setIsOpen(false)
                onLogout()
              }}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors group"
            >
              <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-red-50 text-red-600 group-hover:bg-red-100 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-sm">Log out</div>
                <div className="text-xs text-red-500">Sign out of your account</div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export function Header() {
  const pathname = usePathname()
  // Show auth buttons only on /auth page
  const isAuth = pathname?.startsWith("/auth")

  // State for user info and turf count
  const [user, setUser] = useState(null)
  const [turfCount, setTurfCount] = useState(0)

  // On mount, get user info and turf count
  useEffect(() => {
    const u = getUserFromStorage()
    setUser(u)
    // Count games played (joined or created)
    if (u) {
      fetch("/api/games")
        .then((res) => res.json())
        .then((data) => {
          // Count games where user is a player or creator
          const count = (data.games || []).filter(
            (g: any) => g.createdBy === u.userId || (g.players || []).includes(u.userId)
          ).length
          setTurfCount(count)
        })
        .catch(() => setTurfCount(0))
    }
  }, [pathname])

  // Logout handler
  function logout() {
    localStorage.removeItem("turf-auth")
    localStorage.removeItem("turf-token")
    window.location.href = "/auth"
  }

  return (
    <header className="w-full border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        {/* Brand with animation */}
        <Link href="/" className="flex items-center gap-2 group" aria-label="TurfConnect home">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] shadow-lg group-hover:scale-110 transition-transform duration-200 flex items-center justify-center">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <span className="font-bold text-xl tracking-tight group-hover:text-[var(--primary)] transition-colors">
            TurfConnect
          </span>
        </Link>

        {/* Actions or User Profile */}
        <div className="flex items-center gap-3">
          {/* If not logged in and not on /auth, show login/register */}
          {!user && !isAuth && (
            <>
              <Link 
                href="/auth" 
                className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-secondary interactive-hover font-medium"
              >
                Log in
              </Link>
              <Link 
                href="/auth" 
                className="btn-cta px-4 py-2 text-sm font-semibold bounce-in" 
                aria-label="Register to play"
              >
                Register
              </Link>
            </>
          )}
          {/* If on /auth, show back to site */}
          {isAuth && (
            <Link 
              href="/" 
              className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-secondary interactive-hover font-medium"
            >
              Back to site
            </Link>
          )}
          {/* If logged in, show user profile dropdown */}
          {user && !isAuth && (
            <UserProfileDropdown user={user} turfCount={turfCount} onLogout={logout} />
          )}
        </div>
      </nav>
    </header>
  )
}
