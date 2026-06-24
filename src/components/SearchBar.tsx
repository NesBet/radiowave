"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Search, X } from "lucide-react"

interface Props {
  value: string
  onChange: (value: string) => void
  resultCount: number
  mode: "all" | "filtered" | "empty"
}

export default function SearchBar({ value, onChange, resultCount, mode }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      className="relative mx-auto mb-8 max-w-md"
    >
      <div
        className={`flex items-center gap-2 rounded-full border bg-white px-4 py-2.5 shadow-sm transition-all duration-200 dark:bg-zinc-900 ${
          value
            ? "border-orange-300 ring-2 ring-orange-200/50 dark:border-orange-600 dark:ring-orange-800/40"
            : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
        }`}
      >
        <Search className="h-4 w-4 shrink-0 text-zinc-400" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search stations..."
          className="min-w-0 flex-1 bg-transparent text-sm text-zinc-900 placeholder-zinc-400 outline-none dark:text-zinc-100 dark:placeholder-zinc-500"
        />
        {value && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileTap={{ scale: 0.85 }}
            onClick={() => {
              onChange("")
              inputRef.current?.focus()
            }}
            className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-200 text-zinc-500 transition-colors hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-600"
            aria-label="Clear search"
          >
            <X className="h-3 w-3" />
          </motion.button>
        )}
      </div>
      {value && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 text-center text-xs text-zinc-400"
        >
          {mode === "empty"
            ? "No stations match your search"
            : `${resultCount} station${resultCount !== 1 ? "s" : ""} found`
          }
        </motion.p>
      )}
    </motion.div>
  )
}
