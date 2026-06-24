"use client"

import { motion, AnimatePresence } from "framer-motion"
import { WifiOff } from "lucide-react"
import { useOnlineStatus } from "@/hooks/useOnlineStatus"

export default function OfflineToast() {
  const isOnline = useOnlineStatus()

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed left-0 right-0 top-0 z-50 flex items-center justify-center gap-3 bg-red-500/90 px-4 py-3 text-sm font-medium text-white shadow-lg backdrop-blur-md"
          role="alert"
          aria-live="assertive"
        >
          <WifiOff className="h-5 w-5 shrink-0" />
          <span>No internet connection. Reconnecting...</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
