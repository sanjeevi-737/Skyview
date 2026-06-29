import type { Coordinates } from "@/types/weather"

export const API_BASE_URL = "https://api.openweathermap.org"

export const DEFAULT_LOCATION: Coordinates = {
  lat: 10.7905,
  lon: 78.7047,
}

export const DEFAULT_CITY = "Tamilnadu, India"

export const BREAKPOINTS = {
  sm: 375,
  md: 768,
  lg: 1024,
  xl: 1440,
  "2xl": 1920,
} as const

export const REFETCH_INTERVAL = 10 * 60 * 1000
export const STALE_TIME = 5 * 60 * 1000

export const AQI_LEVELS = [
  { value: 1, label: "Good", color: "#00E400" },
  { value: 2, label: "Fair", color: "#FFFF00" },
  { value: 3, label: "Moderate", color: "#FF7E00" },
  { value: 4, label: "Poor", color: "#FF0000" },
  { value: 5, label: "Very Poor", color: "#8F3F97" },
] as const
