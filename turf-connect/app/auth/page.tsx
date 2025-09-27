import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import User from "@/models/User"
import mongoose from "mongoose"

const AUTH_KEY = "turf-auth"

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.5 12.23c0-.74-.06-1.28-.18-1.84H12v3.34h5.95c-.12.83-.76 2.07-2.19 2.9l-.02.12l3.18 2.46l.22.02c2-.03 3.56-1.87 3.56-4.99"
      />
      <path
        fill="#34A853"
        d="M12 23c2.34 0 4.3-.77 5.73-2.08l-3.18-2.46c-.85.58-1.98.98-3.55.98c-2.71 0-5.01-1.77-5.84-4.22l-.12.01l-3.1 2.41l-.04.11C3.35 20.82 7.35 23 12 23"
      />
      <path
        fill="#FBBC05"
        d="M6.16 15.22a6.63 6.63 0 0 1 0-6.43l-.01-.13l-3.13-2.44l-.1.05a11.02 11.02 0 0 0 0 11.48"
      />
      <path
        fill="#EA4335"
        d="M12 5.21c1.62 0 3.05.56 4.18 1.64l3.05-2.98C16.28 1.61 14.34.9 12 .9C7.35.9 3.35 3.08 1.78 6.45l3.14 2.44C4.75 6.56 7.05 4.79 12 4.79"
      />
    </svg>
  )
}

export default function AuthPage() {
  const [tab, setTab] = useState<"login" | "register">("register")
  const router = useRouter()

  useEffect(() => {
    const logged = localStorage.getItem(AUTH_KEY)
    if (logged === "true") router.replace("/dashboard")
  }, [router])

  function handleAuthSuccess() {
    localStorage.setItem(AUTH_KEY, "true")
    router.replace("/dashboard")
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const email = e.currentTarget.email.value
    const password = e.currentTarget.password.value

    await mongoose.connect(process.env.MONGODB_URI || '')

    const newUser = new User({ email, password })
    await newUser.save()

    handleAuthSuccess()
  }

  return (
    <main>
      <Header />
      <section className="bg-background">
        <div className="mx-auto max-w-md px-4 py-10">
          <div className="card-turf p-6">
            <div className="mb-4 grid grid-cols-2 gap-2 rounded-md bg-secondary p-1">
              <button
                onClick={() => setTab("login")}
                className={`rounded-md px-3 py-2 text-sm ${tab === "login" ? "bg-background shadow-turf" : ""}`}
                aria-pressed={tab === "login"}
              >
                Log in
              </button>
              <button
                onClick={() => setTab("register")}
                className={`rounded-md px-3 py-2 text-sm ${tab === "register" ? "bg-background shadow-turf" : ""}`}
                aria-pressed={tab === "register"}
              >
                Register
              </button>
            </div>

            <form className="grid gap-4" onSubmit={onSubmit}>
              <label className="grid gap-1 text-sm">
                <span>Email</span>
                <input name="email" required type="email" className="rounded-md border border-border bg-background px-3 py-2" />
              </label>
              <label className="grid gap-1 text-sm">
                <span>Password</span>
                <input name="password" required type="password" className="rounded-md border border-border bg-background px-3 py-2" />
              </label>
              {tab === "register" && (
                <label className="grid gap-1 text-sm">
                  <span>Confirm Password</span>
                  <input required type="password" className="rounded-md border border-border bg-background px-3 py-2" />
                </label>
              )}
              <button type="submit" className="btn-cta mt-2 px-4 py-2 font-semibold">
                {tab === "login" ? "Log in" : "Create account"}
              </button>
            </form>

            <div className="my-4 text-center text-xs uppercase tracking-wide text-[var(--muted-foreground)]">or</div>

            <button
              onClick={handleAuthSuccess}
              className="flex w-full items-center justify-center gap-2 rounded-md border border-border px-4 py-2 text-sm hover:bg-secondary"
              aria-label="Continue with Google"
            >
              <GoogleIcon />
              Continue with Google
              <span className="sr-only">Google Sign In</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}