"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, SearchX } from "lucide-react";
import Header from "@/components/Header";
import StationCard from "@/components/StationCard";
import PlayerBar from "@/components/PlayerBar";
import SearchBar from "@/components/SearchBar";
import { useRadio } from "@/hooks/useRadio";
import { useSearch } from "@/hooks/useSearch";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const { results, mode } = useSearch(searchQuery);

  const {
    currentStation,
    isPlaying,
    isLoading,
    loadingStationId,
    error,
    volume,
    muted,
    handleVolumeChange,
    toggleMuted,
    toggleStation,
    stop,
  } = useRadio();

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:px-6 sm:pt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 100 }}
              className="text-3xl font-bold tracking-tight text-orange-600 dark:text-white sm:text-4xl"
            >
              Choose a Station
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-2 text-zinc-500 dark:text-zinc-400"
            >
              Tap the play button to start streaming
            </motion.p>
          </motion.div>

          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            resultCount={results.length}
            mode={mode}
          />

          <AnimatePresence mode="wait">
            {mode === "empty" ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 150, damping: 12 }}
                  className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800"
                >
                  <SearchX className="h-7 w-7 text-zinc-400" />
                </motion.div>
                <h3 className="text-lg font-semibold text-zinc-700 dark:text-zinc-300">
                  No stations found
                </h3>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  Try a different search term
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {results.map((station) => (
                  <StationCard
                    key={station.id}
                    station={station}
                    isActive={currentStation?.id === station.id}
                    isPlaying={isPlaying}
                    loadingStationId={loadingStationId}
                    onToggle={toggleStation}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <PlayerBar
        station={currentStation}
        isPlaying={isPlaying}
        isLoading={isLoading}
        error={error}
        volume={volume}
        muted={muted}
        onVolumeChange={handleVolumeChange}
        onMuteToggle={toggleMuted}
        onStop={stop}
      />
    </div>
  );
}
