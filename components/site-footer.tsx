"use client"

import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-[var(--muted-foreground)] md:flex-row">
        <span>© {new Date().getFullYear()} TurfConnect</span>
        <nav className="flex items-center gap-4">
          <Link href="/#" className="hover:text-foreground">
            About
          </Link>
          <Link href="/#" className="hover:text-foreground">
            Contact
          </Link>
          <Link href="/#" className="hover:text-foreground">
            Terms
          </Link>
          <Link href="/#" className="hover:text-foreground">
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  )
}
