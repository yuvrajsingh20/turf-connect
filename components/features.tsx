"use client"

import type React from "react"

function Feature({
  title,
  text,
  icon,
}: {
  title: string
  text: string
  icon: React.ReactNode
}) {
  return (
    <div className="card-turf p-5">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[var(--secondary)] text-[var(--primary)]">
          {icon}
        </div>
        <h4 className="text-lg font-semibold">{title}</h4>
      </div>
      <p className="text-sm text-[var(--muted-foreground)]">{text}</p>
    </div>
  )
}

export function Features() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="mb-6 text-balance text-3xl font-bold">Why TurfConnect?</h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <Feature
            title="Smart matching"
            text="Filter by sport, skill level, and distance to find your perfect game."
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                <path fill="currentColor" d="m13.5 5l7 7l-7 7l-1.4-1.4l4.6-4.6H3v-2h13.7L12.1 6.4z" />
              </svg>
            }
          />
          <Feature
            title="Real-time spots"
            text="See open slots and claim your place before the roster fills up."
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                <path fill="currentColor" d="M12 6v6l4 2l-.75 1.23L11 13V6z" />
                <path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2" opacity=".3" />
              </svg>
            }
          />
          <Feature
            title="Easy splits"
            text="Transparent costs and quick payments keep the game moving."
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                <path fill="currentColor" d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
              </svg>
            }
          />
        </div>
      </div>
    </section>
  )
}
