"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function Header() {
  const pathname = usePathname()
  const isAuth = pathname?.startsWith("/auth")

  return (
    <header className="w-full border-b border-border bg-background">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2" aria-label="TurfConnect home">
          <div className="h-7 w-7 rounded-md bg-[var(--primary)] shadow-turf" aria-hidden />
          <span className="font-bold text-lg tracking-tight">TurfConnect</span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {!isAuth && (
            <>
              <Link href="/auth" className="rounded-md border border-border px-3 py-2 text-sm hover:bg-secondary">
                Log in
              </Link>
              <Link href="/auth" className="btn-cta px-3 py-2 text-sm" aria-label="Register to play">
                Register
              </Link>
            </>
          )}
          {isAuth && (
            <Link href="/" className="rounded-md border border-border px-3 py-2 text-sm hover:bg-secondary">
              Back to site
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}
