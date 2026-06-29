"use client"

import { useQuery } from "@tanstack/react-query"
import {
  fetchCurrentWeather,
  fetchForecast,
  fetchAQI,
  fetchAlerts,
  searchLocations,
} from "@/lib/api-client"
import type { Coordinates, WeatherData, AQIEntry, WeatherAlert } from "@/types/weather"
import { REFETCH_INTERVAL, STALE_TIME } from "@/lib/constants"

export function useCurrentWeather(coords: Coordinates | null) {
  return useQuery({
    queryKey: ["current-weather", coords?.lat, coords?.lon],
    queryFn: () => fetchCurrentWeather(coords!),
    enabled: !!coords,
    refetchInterval: REFETCH_INTERVAL,
    staleTime: STALE_TIME,
  })
}

export function useForecast(coords: Coordinates | null) {
  return useQuery({
    queryKey: ["forecast", coords?.lat, coords?.lon],
    queryFn: () => fetchForecast(coords!),
    enabled: !!coords,
    refetchInterval: REFETCH_INTERVAL,
    staleTime: STALE_TIME,
  })
}

export function useWeatherData(coords: Coordinates | null) {
  return useQuery({
    queryKey: ["weather-data", coords?.lat, coords?.lon],
    queryFn: async () => {
      const data = await fetchCurrentWeather(coords!)
      return data as unknown as WeatherData
    },
    enabled: !!coords,
    refetchInterval: REFETCH_INTERVAL,
    staleTime: STALE_TIME,
  })
}

export function useAQI(coords: Coordinates | null) {
  return useQuery({
    queryKey: ["aqi", coords?.lat, coords?.lon],
    queryFn: async () => {
      const data = await fetchAQI(coords!)
      return data as unknown as { list: AQIEntry[] }
    },
    enabled: !!coords,
    refetchInterval: REFETCH_INTERVAL,
    staleTime: STALE_TIME,
  })
}

export function useAlerts(coords: Coordinates | null) {
  return useQuery({
    queryKey: ["alerts", coords?.lat, coords?.lon],
    queryFn: async () => {
      const data = await fetchAlerts(coords!)
      return data as unknown as { alerts: WeatherAlert[] }
    },
    enabled: !!coords,
    refetchInterval: REFETCH_INTERVAL,
    staleTime: STALE_TIME,
  })
}

export function useLocationSearch(query: string) {
  return useQuery({
    queryKey: ["location-search", query],
    queryFn: () => searchLocations(query),
    enabled: query.length >= 2,
    staleTime: Infinity,
  })
}
