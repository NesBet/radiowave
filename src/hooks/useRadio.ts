"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import type { Station } from "@/lib/stations"

export function useRadio() {
  const [currentStation, setCurrentStation] = useState<Station | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [loadingStationId, setLoadingStationId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio()
    audioRef.current.preload = "none"
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
      }
    }
  }, [])

  const play = useCallback((station: Station) => {
    if (!audioRef.current) return

    setError(null)
    setLoadingStationId(station.id)

    if (audioRef.current.src) {
      audioRef.current.pause()
      audioRef.current.src = ""
    }

    audioRef.current.src = station.url
    audioRef.current.load()

    audioRef.current.oncanplay = () => {
      audioRef.current?.play().then(() => {
        setIsPlaying(true)
        setLoadingStationId(null)
        setCurrentStation(station)
      }).catch(() => {
        setError("Failed to play. Please try again.")
        setLoadingStationId(null)
      })
    }

    audioRef.current.onerror = () => {
      setError("Connection error. The station may be offline.")
      setLoadingStationId(null)
      setIsPlaying(false)
    }
  }, [])

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ""
    }
    setIsPlaying(false)
    setCurrentStation(null)
    setLoadingStationId(null)
    setError(null)
  }, [])

  const toggleStation = useCallback(
    (station: Station) => {
      if (currentStation?.id === station.id && isPlaying) {
        stop()
      } else {
        play(station)
      }
    },
    [currentStation, isPlaying, play, stop]
  )

  const isLoading = loadingStationId !== null

  return {
    currentStation,
    isPlaying,
    isLoading,
    loadingStationId,
    error,
    toggleStation,
    stop,
  }
}
