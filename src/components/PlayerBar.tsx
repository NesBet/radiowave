"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Radio, X, AlertCircle, Volume, Volume1, Volume2, VolumeX } from "lucide-react"
import type { Station } from "@/lib/stations"

interface Props {
  station: Station | null
  isPlaying: boolean
  isLoading: boolean
  error: string | null
  volume: number
  muted: boolean
  onVolumeChange: (value: number) => void
  onMuteToggle: () => void
  onStop: () => void
}

export default function PlayerBar({
  station,
  isPlaying,
  isLoading,
  error,
  volume,
  muted,
  onVolumeChange,
  onMuteToggle,
  onStop,
}: Props) {
  const VolumeIcon = muted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2

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
          <div className="flex h-20 items-center justify-between gap-3 px-5">
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
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-red-500 mr-2">
                <AlertCircle className="h-3.5 w-3.5" />
                {error}
              </div>
            )}

            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={onMuteToggle}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 transition-colors hover:bg-orange-100 hover:text-orange-500 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-orange-900/30 dark:hover:text-orange-400"
                aria-label={muted ? "Unmute" : "Mute"}
              >
                <VolumeIcon className="h-4 w-4" />
              </motion.button>

              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={muted ? 0 : volume}
                onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                className="h-1.5 w-20 cursor-pointer appearance-none rounded-full bg-zinc-200 accent-orange-500 dark:bg-zinc-700 md:w-24"
                aria-label="Volume"
              />

              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={onStop}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 transition-colors hover:bg-red-100 hover:text-red-500 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-red-900/30 dark:hover:text-red-400"
                aria-label="Stop playback"
              >
                <X className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
