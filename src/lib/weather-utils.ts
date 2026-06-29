import { format, fromUnixTime, isToday, isTomorrow } from "date-fns"
import type { TemperatureUnit } from "@/types/weather"

export function formatTemp(temp: number, unit: TemperatureUnit): string {
  const value = unit === "celsius" ? temp : (temp * 9) / 5 + 32
  return `${Math.round(value)}°`
}

export function formatTempValue(temp: number, unit: TemperatureUnit): number {
  return unit === "celsius" ? Math.round(temp) : Math.round((temp * 9) / 5 + 32)
}

export function formatUnixTime(timestamp: number, timezoneOffset: number, pattern: string): string {
  const date = fromUnixTime(timestamp + timezoneOffset)
  return format(date, pattern)
}

export function formatHour(timestamp: number, timezoneOffset: number): string {
  const date = fromUnixTime(timestamp + timezoneOffset)
  return format(date, "ha")
}

export function formatDay(timestamp: number, timezoneOffset: number): string {
  const date = fromUnixTime(timestamp + timezoneOffset)
  if (isToday(date)) return "Today"
  if (isTomorrow(date)) return "Tomorrow"
  return format(date, "EEEE")
}

export function formatShortDay(timestamp: number, timezoneOffset: number): string {
  const date = fromUnixTime(timestamp + timezoneOffset)
  return format(date, "EEE")
}

export function formatDate(timestamp: number, timezoneOffset: number): string {
  const date = fromUnixTime(timestamp + timezoneOffset)
  return format(date, "MMM d")
}

export function getWeatherIconUrl(icon: string): string {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`
}

export function convertSpeed(speed: number, unit: TemperatureUnit): number {
  return unit === "celsius" ? Math.round(speed * 3.6) : Math.round(speed * 2.237)
}

export function speedUnit(unit: TemperatureUnit): string {
  return unit === "celsius" ? "km/h" : "mph"
}

export function convertVisibility(meters: number, unit: TemperatureUnit): string {
  if (unit === "celsius") {
    return meters >= 1000 ? `${(meters / 1000).toFixed(1)} km` : `${meters} m`
  }
  const miles = meters / 1609.34
  return `${miles.toFixed(1)} mi`
}

export function formatPressure(hpa: number): string {
  return `${Math.round(hpa)} hPa`
}

export function formatPercentage(value: number): string {
  return `${Math.round(value * 100)}%`
}
