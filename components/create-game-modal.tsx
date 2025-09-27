"use client"

import type React from "react"

import { useState } from "react"
import { mutate } from "swr"

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

export function CreateGameModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [form, setForm] = useState({
    sport: "Soccer 7v7",
    venue: "",
    date: "",
    time: "",
    ageGroup: "18-30",
    costPerPlayer: 0,
    note: "",
    playersNeeded: 10,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // Get user ID from localStorage (in a real app, this would come from JWT)
      const userId = "demo-user-id" // This should be replaced with actual user ID from auth

      const response = await fetch('/api/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sport: form.sport.trim(),
          venue: form.venue.trim(),
          date: form.date,
          time: form.time,
          ageGroup: form.ageGroup,
          costPerPlayer: Number(form.costPerPlayer) || 0,
          note: form.note.trim() || undefined,
          playersNeeded: Number(form.playersNeeded) || 0,
          createdBy: userId,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create game')
      }

      // Refresh the games list
      mutate('/api/games')
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create game')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Create game"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
      onClick={onClose}
    >
      <div className="card-turf w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold">Create Game</h3>
          <button
            onClick={onClose}
            className="rounded-md border border-border px-2 py-1 text-sm hover:bg-secondary"
            aria-label="Close create game modal"
          >
            Close
          </button>
        </div>

        <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-red-700 text-sm">
              {error}
            </div>
          )}

          <label className="grid gap-1 text-sm">
            <span>Sport</span>
            <select
              className="rounded-md border border-border bg-background px-3 py-2"
              value={form.sport}
              onChange={(e) => update("sport", e.target.value)}
            >
              <option>Soccer 7v7</option>
              <option>Flag Football</option>
              <option>Ultimate Frisbee</option>
              <option>Field Hockey</option>
              <option>Cricket</option>
              <option>Basketball</option>
            </select>
          </label>

          <label className="grid gap-1 text-sm">
            <span>Venue</span>
            <input
              type="text"
              required
              className="rounded-md border border-border bg-background px-3 py-2"
              placeholder="Greenway Park Turf"
              value={form.venue}
              onChange={(e) => update("venue", e.target.value)}
            />
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="grid gap-1 text-sm">
              <span>Date</span>
              <input
                type="date"
                required
                className="rounded-md border border-border bg-background px-3 py-2"
                value={form.date}
                onChange={(e) => update("date", e.target.value)}
              />
            </label>
            <label className="grid gap-1 text-sm">
              <span>Time</span>
              <input
                type="time"
                required
                className="rounded-md border border-border bg-background px-3 py-2"
                value={form.time}
                onChange={(e) => update("time", e.target.value)}
              />
            </label>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="grid gap-1 text-sm">
              <span>Age Group</span>
              <select
                className="rounded-md border border-border bg-background px-3 py-2"
                value={form.ageGroup}
                onChange={(e) => update("ageGroup", e.target.value)}
              >
                <option>18-25</option>
                <option>18-30</option>
                <option>25-35</option>
                <option>30-40</option>
                <option>All Ages</option>
              </select>
            </label>
            <label className="grid gap-1 text-sm">
              <span>Cost Per Player ($)</span>
              <input
                type="number"
                min={0}
                step={0.01}
                className="rounded-md border border-border bg-background px-3 py-2"
                value={form.costPerPlayer}
                onChange={(e) => update("costPerPlayer", e.target.valueAsNumber)}
              />
            </label>
          </div>

          <label className="grid gap-1 text-sm">
            <span>Players Needed</span>
            <input
              type="number"
              min={1}
              max={50}
              className="rounded-md border border-border bg-background px-3 py-2"
              value={form.playersNeeded}
              onChange={(e) => update("playersNeeded", e.target.valueAsNumber)}
            />
          </label>

          <label className="grid gap-1 text-sm">
            <span>Note (Optional)</span>
            <textarea
              className="rounded-md border border-border bg-background px-3 py-2"
              placeholder="Any additional information..."
              value={form.note}
              onChange={(e) => update("note", e.target.value)}
              rows={3}
            />
          </label>

          <div className="mt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-border px-4 py-2 text-sm hover:bg-secondary"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-cta px-4 py-2 text-sm font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create game"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
