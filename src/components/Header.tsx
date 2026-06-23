"use client"

import { Radio } from "lucide-react"
import { motion } from "framer-motion"
import ThemeToggle from "./ThemeToggle"

export default function Header() {
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
      className="sticky top-0 z-30 border-b border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-black/70 backdrop-blur-lg"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <Radio className="h-7 w-7 text-orange-500" />
          </motion.div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Radio<span className="text-orange-500">Wave</span>
            </h1>
            <p className="-mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
              Listen Live
            </p>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </motion.header>
  )
}
