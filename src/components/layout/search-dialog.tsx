"use client"

import { useEffect, useRef, useState } from "react"
import { useWeatherStore } from "@/store/weather-store"
import { useLocationSearch } from "@/hooks/use-weather"
import { Input } from "@/components/ui/input"
import { MapPin, X, History, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { GeocodingResult } from "@/types/weather"

interface SearchDialogProps {
  onClose: () => void
}

export function SearchDialog({ onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const { setLocation, setActiveCity, addRecentSearch, recentSearches } = useWeatherStore()
  const { data: results, isLoading } = useLocationSearch(query)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  const handleSelect = (result: GeocodingResult) => {
    setLocation({ lat: result.lat, lon: result.lon })
    setActiveCity(`${result.name}${result.state ? `, ${result.state}` : ""}, ${result.country}`)
    addRecentSearch(result)
    onClose()
  }

  const displayResults = query.length >= 2 ? results : recentSearches
  const isRecent = query.length < 2

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-20 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
      />
      <motion.div
        ref={dialogRef}
        initial={{ opacity: 0, scale: 0.96, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -10 }}
        transition={{ duration: 0.2 }}
        className="relative z-10 w-full max-w-lg glass-strong rounded-2xl shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Search location"
      >
        <div className="p-4 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <Input
                ref={inputRef}
                icon
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search city..."
                aria-label="Search for a city"
              />
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors"
              aria-label="Close search"
            >
              <X className="h-4 w-4 text-foreground/60" />
            </button>
          </div>
        </div>

        <div className="max-h-80 overflow-y-auto px-2 pb-2">
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-5 w-5 animate-spin text-foreground/40" />
            </div>
          )}

          {!isLoading && query.length >= 2 && results?.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sm text-foreground/50">No locations found</p>
            </div>
          )}

          {!isLoading && displayResults?.map((result, index) => (
            <button
              key={`${result.lat}-${result.lon}-${index}`}
              onClick={() => handleSelect(result)}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/10 transition-colors text-left"
            >
              <MapPin className={cn(
                "h-4 w-4 flex-shrink-0",
                isRecent ? "text-foreground/30" : "text-primary-light",
              )} />
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">
                  {result.name}
                  {result.state && <span className="text-foreground/50">, {result.state}</span>}
                </p>
                <p className="text-xs text-foreground/50">{result.country}</p>
              </div>
            </button>
          ))}

          {isRecent && recentSearches.length === 0 && (
            <div className="flex flex-col items-center py-8 text-foreground/40">
              <History className="h-6 w-6 mb-2" />
              <p className="text-sm">Search for a city to get started</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
