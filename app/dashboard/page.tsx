"use client"

import useSWR from "swr"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { CreateGameModal } from "@/components/create-game-modal"

type Game = {
  id: string
  sport: string
  venue: string
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

export default function DashboardPage() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { data: games, error, mutate } = useSWR<Game[]>('/api/games', fetcher)

  useEffect(() => {
    const logged = localStorage.getItem(AUTH_KEY)
    if (logged !== "true") router.replace("/auth")
  }, [router])

  function logout() {
    localStorage.removeItem(AUTH_KEY)
    router.replace("/auth")
  }

  return (
    <main>
      <Header />
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="mb-5 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Your Dashboard</h1>
            <button onClick={logout} className="rounded-md border border-border px-3 py-2 text-sm hover:bg-secondary">
              Log out
            </button>
          </div>

          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-4 text-red-700">
              Failed to load games. Please try again.
            </div>
          )}
          
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(games ?? []).map((g) => (
              <article key={g.id} className="card-turf p-5">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{g.sport}</h3>
                  <span className="rounded bg-[var(--accent)] px-2 py-1 text-xs text-[var(--accent-foreground)]">
                    {g.playersNeeded - g.players.length} needed
                  </span>
                </div>
                <p className="text-sm text-[var(--muted-foreground)]">{g.venue}</p>
                <p className="text-sm text-[var(--muted-foreground)]">
                  {g.date} • {g.time} • ${g.costPerPlayer}
                </p>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Age Group: {g.ageGroup}
                </p>
                {g.note && (
                  <p className="text-sm text-[var(--muted-foreground)] italic">
                    Note: {g.note}
                  </p>
                )}
                <div className="mt-4 flex items-center gap-2">
                  <button 
                    className="btn-cta px-3 py-2 text-sm"
                    onClick={() => {
                      // TODO: Implement join game functionality
                      console.log('Join game:', g.id)
                    }}
                  >
                    Join
                  </button>
                  <button className="rounded-md border border-border px-3 py-2 text-sm hover:bg-secondary">
                    Details
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Floating create button */}
      <button
        onClick={() => setOpen(true)}
        className="btn-cta fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full text-2xl"
        aria-label="Create game"
      >
        +
      </button>

      <CreateGameModal open={open} onClose={() => setOpen(false)} />
    </main>
  )
}
