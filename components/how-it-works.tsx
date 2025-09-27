"use client"

import type React from "react"

function Step({
  title,
  text,
  icon,
}: {
  title: string
  text: string
  icon: React.ReactNode
}) {
  return (
    <div className="card-turf flex flex-col items-start gap-3 p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[var(--secondary)] text-[var(--primary)]">
        {icon}
      </div>
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="text-sm text-[var(--muted-foreground)]">{text}</p>
    </div>
  )
}

export function HowItWorks() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="mb-6 text-balance text-3xl font-bold">How it works</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Step
            title="Create your account"
            text="Register in seconds and set your preferred sports and locations."
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
                <path
                  fill="currentColor"
                  d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5m0 2c-5.33 0-8 2.667-8 4v2h16v-2c0-1.333-2.67-4-8-4"
                />
              </svg>
            }
          />
          <Step
            title="Find nearby games"
            text="Browse live games and see player counts, cost, and start times."
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
                <path
                  fill="currentColor"
                  d="M10.5 3A6.5 6.5 0 0 1 17 9.5a6.45 6.45 0 0 1-1.08 3.57l4.75 4.76l-1.42 1.41l-4.76-4.75A6.5 6.5 0 1 1 10.5 3m0 2a4.5 4.5 0 1 0 4.5 4.5A4.51 4.51 0 0 0 10.5 5"
                />
              </svg>
            }
          />
          <Step
            title="Join and play"
            text="Reserve your spot and meet your team on the turf."
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
                <path fill="currentColor" d="M12 2L2 7l10 5l10-5zm0 7.3L5.4 6.5L12 3.7l6.6 2.8zM2 17l10 5l10-5" />
              </svg>
            }
          />
        </div>
      </div>
    </section>
  )
}
