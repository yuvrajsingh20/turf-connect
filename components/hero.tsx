"use client"

import Link from "next/link"

export function Hero() {
  return (
    <section className="bg-background">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-6 px-4 py-12 md:grid-cols-2 md:py-16">
        {/* Copy */}
        <div className="space-y-5">
          <h1 className="text-pretty text-4xl font-extrabold leading-tight md:text-5xl">
            Find and Join <span className="text-[var(--primary)]">Pick‑Up Turf Games</span>
          </h1>
          <p className="max-w-prose text-lg leading-relaxed text-[var(--muted-foreground)]">
            Connect with local players, discover nearby matches, and build your team. Simple scheduling, instant joins,
            and smooth coordination.
          </p>
          <div className="flex items-center gap-3">
            <Link href="/auth" className="btn-cta px-5 py-3 text-base font-semibold">
              Register to Play
            </Link>
            <Link
              href="/dashboard"
              className="rounded-md border border-border px-5 py-3 text-base font-medium hover:bg-secondary"
            >
              View Dashboard
            </Link>
          </div>
          {/* Trust / quick notes */}
          <div className="flex items-center gap-4 text-sm text-[var(--muted-foreground)]">
            <span className="inline-flex items-center gap-2">
              <i className="h-2 w-2 rounded-full bg-[var(--accent)]" aria-hidden />
              Real players
            </span>
            <span className="inline-flex items-center gap-2">
              <i className="h-2 w-2 rounded-full bg-[var(--accent)]" aria-hidden />
              Local matches
            </span>
          </div>
        </div>

        {/* Decorative card with turf accent */}
        <div className="relative">
          <div className="card-turf relative overflow-hidden p-6">
            <div
              className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,_var(--accent)_0%,_transparent_60%)] opacity-10"
              aria-hidden
            />
            <h3 className="mb-2 text-xl font-semibold">Tonight on Turf</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center justify-between rounded-md bg-secondary p-3">
                <span>7v7 Soccer - Riverside</span>
                <span className="rounded bg-[var(--accent)] px-2 py-1 text-xs text-[var(--accent-foreground)]">
                  8/14
                </span>
              </li>
              <li className="flex items-center justify-between rounded-md bg-secondary p-3">
                <span>Flag Football - Midtown</span>
                <span className="rounded bg-[var(--accent)] px-2 py-1 text-xs text-[var(--accent-foreground)]">
                  7/10
                </span>
              </li>
              <li className="flex items-center justify-between rounded-md bg-secondary p-3">
                <span>Ultimate Frisbee - Greenway</span>
                <span className="rounded bg-[var(--accent)] px-2 py-1 text-xs text-[var(--accent-foreground)]">
                  9/12
                </span>
              </li>
            </ul>
            <div className="mt-5">
              <Link href="/auth" className="btn-cta inline-flex px-4 py-2 text-sm">
                Join a Game
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
