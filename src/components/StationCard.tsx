"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import { Play, Pause, Loader2 } from "lucide-react"
import type { Station } from "@/lib/stations"

interface Props {
  station: Station
  isActive: boolean
  isPlaying: boolean
  loadingStationId: string | null
  onToggle: (station: Station) => void
}

function StationCard({
  station,
  isActive,
  isPlaying,
  loadingStationId,
  onToggle,
}: Props) {
  const isThisLoading = loadingStationId === station.id

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className={`group relative overflow-hidden rounded-2xl border p-5 transition-colors duration-300 ${
        isActive
          ? "border-orange-400 bg-orange-50/60 dark:border-orange-500 dark:bg-orange-950/20"
          : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="relative shrink-0">
          <div
            className={`absolute inset-0 rounded-xl blur-lg transition-opacity duration-500 ${
              isActive ? "opacity-60" : "opacity-0"
            }`}
            style={{ backgroundColor: station.color }}
          />
          <motion.img
            whileHover={{ scale: 1.1 }}
            src={station.icon}
            alt={station.name}
            className="relative h-14 w-14 rounded-xl bg-zinc-100 object-cover dark:bg-zinc-800"
          />
          {isActive && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center"
            >
              <span className="absolute h-full w-full animate-ping rounded-full bg-orange-400 opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-orange-500" />
            </motion.span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-zinc-900 dark:text-white">
            {station.name}
          </h3>
          <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">
            {station.tagline}
          </p>
        </div>

        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => onToggle(station)}
          disabled={isThisLoading}
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
            isActive
              ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30 hover:bg-orange-600"
              : "bg-zinc-100 text-zinc-700 hover:bg-orange-100 hover:text-orange-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-orange-900/40 dark:hover:text-orange-400"
          }`}
        >
          {isThisLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : isActive && isPlaying ? (
            <Pause className="h-5 w-5 fill-current" />
          ) : (
            <Play className="h-5 w-5 fill-current pl-0.5" />
          )}
        </motion.button>
      </div>

      {isActive && isPlaying && (
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-orange-400 to-amber-300"
          style={{ animation: "progress 3s linear infinite" }}
        />
      )}
    </motion.div>
  )
}

export default memo(StationCard)
