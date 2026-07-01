"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import type { Station } from "@/lib/stations"
import { stations } from "@/lib/stations"

export function useRadio() {
  const [currentStation, setCurrentStation] = useState<Station | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [loadingStationId, setLoadingStationId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [volume, setVolume] = useState(0.75)
  const [muted, setMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const restoredRef = useRef(false)
  const loadedUrlRef = useRef<string | null>(null)

  useEffect(() => {
    const savedVolume = localStorage.getItem("radio-volume")
    if (savedVolume !== null) {
      setVolume(parseFloat(savedVolume))
    }
    const savedMuted = localStorage.getItem("radio-muted")
    if (savedMuted !== null) {
      setMuted(savedMuted === "true")
    }
    restoredRef.current = true
  }, [])

  useEffect(() => {
    const audio = new Audio()
    audio.preload = "none"
    audio.volume = volume
    audio.muted = muted
    audioRef.current = audio

    const savedId = localStorage.getItem("radio-station-id")
    if (savedId) {
      const savedStation = stations.find((s) => s.id === savedId)
      if (savedStation) {
        play(savedStation)
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
    if (restoredRef.current) {
      localStorage.setItem("radio-volume", String(volume))
    }
  }, [volume])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = muted
    }
    if (restoredRef.current) {
      localStorage.setItem("radio-muted", String(muted))
    }
  }, [muted])

  const handleVolumeChange = useCallback((value: number) => {
    setVolume(value)
    if (audioRef.current) {
      audioRef.current.volume = value
    }
    if (value > 0 && muted) {
      setMuted(false)
      if (audioRef.current) audioRef.current.muted = false
    }
  }, [muted])

  const toggleMuted = useCallback(() => {
    setMuted((prev) => {
      const next = !prev
      if (audioRef.current) audioRef.current.muted = next
      return next
    })
  }, [])

  const play = useCallback((station: Station) => {
    if (!audioRef.current) return
    const audio = audioRef.current

    setError(null)
    setLoadingStationId(station.id)

    if (loadedUrlRef.current === station.url) {
      audio.play().then(() => {
        setIsPlaying(true)
        setLoadingStationId(null)
        setCurrentStation(station)
        localStorage.setItem("radio-station-id", station.id)
      }).catch(() => {
        setLoadingStationId(null)
      })
      return
    }

    if (audio.src) {
      audio.pause()
      audio.src = ""
    }

    loadedUrlRef.current = station.url
    audio.src = station.url
    audio.load()

    audio.oncanplay = () => {
      audio.play().then(() => {
        setIsPlaying(true)
        setLoadingStationId(null)
        setCurrentStation(station)
        localStorage.setItem("radio-station-id", station.id)
      }).catch((err) => {
        setLoadingStationId(null)
        setCurrentStation(station)
        if (err?.name === "NotAllowedError") {
          localStorage.setItem("radio-station-id", station.id)
        } else {
          setError("Failed to play. Please try again.")
        }
      })
    }

    audio.onerror = () => {
      setError("Connection error. The station may be offline.")
      setLoadingStationId(null)
      setIsPlaying(false)
    }
  }, [])

  const stop = useCallback(() => {
    loadedUrlRef.current = null
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ""
    }
    setIsPlaying(false)
    setCurrentStation(null)
    setLoadingStationId(null)
    setError(null)
    localStorage.removeItem("radio-station-id")
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
    volume,
    muted,
    handleVolumeChange,
    toggleMuted,
    toggleStation,
    stop,
  }
}
