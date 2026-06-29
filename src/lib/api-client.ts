import type { Coordinates, GeocodingResult } from "@/types/weather"

class WeatherAPIError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message)
    this.name = "WeatherAPIError"
  }
}

async function fetchAPI<T>(path: string, params: Record<string, string>): Promise<T> {
  const searchParams = new URLSearchParams(params)
  const url = `/api/weather/${path}?${searchParams.toString()}`

  const res = await fetch(url)

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new WeatherAPIError(
      errorData.error || `Weather API error: ${res.status}`,
      res.status,
    )
  }

  return res.json()
}

export function fetchCurrentWeather(coords: Coordinates) {
  return fetchAPI<Record<string, unknown>>("current", {
    lat: coords.lat.toString(),
    lon: coords.lon.toString(),
  })
}

export function fetchForecast(coords: Coordinates) {
  return fetchAPI<Record<string, unknown>>("forecast", {
    lat: coords.lat.toString(),
    lon: coords.lon.toString(),
  })
}

export function fetchAQI(coords: Coordinates) {
  return fetchAPI<Record<string, unknown>>("aqi", {
    lat: coords.lat.toString(),
    lon: coords.lon.toString(),
  })
}

export function fetchAlerts(coords: Coordinates) {
  return fetchAPI<Record<string, unknown>>("alerts", {
    lat: coords.lat.toString(),
    lon: coords.lon.toString(),
  })
}

export function searchLocations(query: string) {
  return fetchAPI<GeocodingResult[]>("search", { q: query })
}
