"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Radio, X, AlertCircle } from "lucide-react"
import type { Station } from "@/lib/stations"

interface Props {
  station: Station | null
  isPlaying: boolean
  isLoading: boolean
  error: string | null
  onStop: () => void
}

export default function PlayerBar({
  station,
  isPlaying,
  isLoading,
  error,
  onStop,
}: Props) {
  return (
    <AnimatePresence>
      {station && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-6xl rounded-2xl border border-orange-500/30 bg-white/90 shadow-lg shadow-orange-500/10 dark:border-orange-500/20 dark:bg-black/90 dark:shadow-orange-500/5 backdrop-blur-xl"
        >
          <div className="flex h-20 items-center justify-between px-5">
            <div className="flex items-center gap-4 min-w-0 flex-1">
              <motion.div
                animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                transition={
                  isPlaying
                    ? { repeat: Infinity, duration: 4, ease: "linear" }
                    : {}
                }
              >
                <Radio className="h-6 w-6 shrink-0 text-orange-500" />
              </motion.div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-zinc-900 dark:text-white">
                  {station.name}
                </p>
                <div className="flex items-center gap-2">
                  {isLoading ? (
                    <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
                      Connecting...
                    </span>
                  ) : isPlaying ? (
                    <span className="flex items-center gap-1.5 text-xs text-green-500">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                      Live
                    </span>
                  ) : null}
                </div>
              </div>
            </div>

            {error && (
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-red-500 mr-4">
                <AlertCircle className="h-3.5 w-3.5" />
                {error}
              </div>
            )}

            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={onStop}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 transition-colors hover:bg-red-100 hover:text-red-500 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-red-900/30 dark:hover:text-red-400"
              aria-label="Stop playback"
            >
              <X className="h-4 w-4" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
