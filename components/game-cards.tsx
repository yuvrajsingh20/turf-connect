"use client"

import Link from "next/link"

type Game = {
  id: string
  sport: string
  location: string
  date: string
  time: string
  cost: string
  playersNeeded: number
}

const sampleGames: Game[] = [
  {
    id: "1",
    sport: "Soccer 7v7",
    location: "Riverside Turf",
    date: "Fri, Sep 27",
    time: "7:30 PM",
    cost: "$8",
    playersNeeded: 4,
  },
  {
    id: "2",
    sport: "Flag Football",
    location: "Midtown Field",
    date: "Sat, Sep 28",
    time: "10:00 AM",
    cost: "$5",
    playersNeeded: 3,
  },
  {
    id: "3",
    sport: "Ultimate",
    location: "Greenway Park",
    date: "Sun, Sep 29",
    time: "5:00 PM",
    cost: "Free",
    playersNeeded: 6,
  },
]

export function GameCards() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="mb-6 text-balance text-3xl font-bold">Upcoming games</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sampleGames.map((g) => (
            <article key={g.id} className="card-turf p-5">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-lg font-semibold">{g.sport}</h3>
                <span className="rounded bg-[var(--accent)] px-2 py-1 text-xs text-[var(--accent-foreground)]">
                  {g.playersNeeded} needed
                </span>
              </div>
              <p className="text-sm text-[var(--muted-foreground)]">{g.location}</p>
              <p className="text-sm text-[var(--muted-foreground)]">
                {g.date} • {g.time} • {g.cost}
              </p>
              <div className="mt-4">
                <Link href="/auth" className="btn-cta inline-flex px-4 py-2 text-sm">
                  Join game
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
