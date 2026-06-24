"use client"

import { useState, useEffect, useMemo } from "react"
import { stations, type Station } from "@/lib/stations"

type SearchMode = "all" | "filtered" | "empty"

export function useSearch(input: string, delay = 150) {
  const [debouncedQuery, setDebouncedQuery] = useState(input)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(input), delay)
    return () => clearTimeout(timer)
  }, [input, delay])

  const results: Station[] = useMemo(() => {
    const q = debouncedQuery.toLowerCase().trim()
    if (!q) return stations

    const scored = stations
      .map((s) => {
        const name = s.name.toLowerCase()
        const tagline = s.tagline.toLowerCase()
        const id = s.id.toLowerCase()

        let score = 0
        if (name === q) score += 10
        if (name.startsWith(q)) score += 6
        if (name.includes(q)) score += 4
        if (tagline.includes(q)) score += 2
        if (id.includes(q)) score += 1

        return { station: s, score }
      })
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((s) => s.station)

    return scored
  }, [debouncedQuery])

  const mode: SearchMode = !debouncedQuery.trim()
    ? "all"
    : results.length > 0
      ? "filtered"
      : "empty"

  return { results, query: debouncedQuery, mode }
}
