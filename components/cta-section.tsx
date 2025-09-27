"use client"

import Link from "next/link"

export function CTASection() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 text-center">
        <h2 className="mb-3 text-pretty text-3xl font-bold">Ready to hit the turf?</h2>
        <p className="mx-auto mb-6 max-w-2xl text-[var(--muted-foreground)]">
          Create your account and join a game in minutes. Your team is waiting.
        </p>
        <Link href="/auth" className="btn-cta px-6 py-3 text-base font-semibold">
          Get started
        </Link>
      </div>
    </section>
  )
}
