"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import StationCard from "@/components/StationCard";
import PlayerBar from "@/components/PlayerBar";
import { useRadio } from "@/hooks/useRadio";
import { stations } from "@/lib/stations";

export default function Home() {
  const {
    currentStation,
    isPlaying,
    isLoading,
    loadingStationId,
    error,
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
            className="mb-10 text-center"
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 100 }}
              className="text-3xl font-bold tracking-tight text-orange-600 dark:text-white sm:text-4xl"
            >
              Choose a Station{" "}
              {/*<span className="bg-linear-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
                Station
              </span>*/}
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

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stations.map((station) => (
              <StationCard
                key={station.id}
                station={station}
                isActive={currentStation?.id === station.id}
                isPlaying={isPlaying}
                loadingStationId={loadingStationId}
                onToggle={toggleStation}
              />
            ))}
          </div>
        </div>
      </main>

      <PlayerBar
        station={currentStation}
        isPlaying={isPlaying}
        isLoading={isLoading}
        error={error}
        onStop={stop}
      />
    </div>
  );
}
