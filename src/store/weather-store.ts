"use client"

import { create } from "zustand"
import type { Coordinates, GeocodingResult, TemperatureUnit, ThemeMode, WeatherStore } from "@/types/weather"
import { DEFAULT_CITY, DEFAULT_LOCATION } from "@/lib/constants"

function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") return "system"
  const stored = localStorage.getItem("skyview-theme") as ThemeMode | null
  if (stored && ["light", "dark", "system"].includes(stored)) return stored
  return "system"
}

function getInitialUnit(): TemperatureUnit {
  if (typeof window === "undefined") return "celsius"
  const stored = localStorage.getItem("skyview-unit") as TemperatureUnit | null
  if (stored && ["celsius", "fahrenheit"].includes(stored)) return stored
  return "celsius"
}

function getInitialRecentSearches(): GeocodingResult[] {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem("skyview-recent")
    if (stored) return JSON.parse(stored) as GeocodingResult[]
  } catch {}
  return []
}

export const useWeatherStore = create<WeatherStore>((set) => ({
  location: DEFAULT_LOCATION,
  unit: getInitialUnit(),
  theme: getInitialTheme(),
  activeCity: DEFAULT_CITY,
  searchQuery: "",
  recentSearches: getInitialRecentSearches(),

  setLocation: (location: Coordinates) => set({ location }),

  setUnit: (unit: TemperatureUnit) => {
    localStorage.setItem("skyview-unit", unit)
    set({ unit })
  },

  setTheme: (theme: ThemeMode) => {
    localStorage.setItem("skyview-theme", theme)
    set({ theme })
  },

  setActiveCity: (name: string) => set({ activeCity: name }),

  setSearchQuery: (query: string) => set({ searchQuery: query }),

  addRecentSearch: (result: GeocodingResult) =>
    set((state) => {
      const filtered = state.recentSearches.filter((s) => s.name !== result.name || s.country !== result.country)
      const updated = [result, ...filtered].slice(0, 5)
      localStorage.setItem("skyview-recent", JSON.stringify(updated))
      return { recentSearches: updated }
    }),
}))
