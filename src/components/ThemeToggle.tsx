"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative flex h-9 w-9 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-800 transition-colors"
      aria-label="Toggle theme"
      suppressHydrationWarning
    >
      <Sun className="hidden h-5 w-5 text-amber-400 dark:block" />
      <Moon className="block h-5 w-5 text-zinc-700 dark:hidden" />
    </motion.button>
  )
}
