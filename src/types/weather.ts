export interface Coordinates {
  lat: number
  lon: number
}

export interface WeatherCondition {
  id: number
  main: string
  description: string
  icon: string
}

export interface CurrentWeather {
  dt: number
  sunrise: number
  sunset: number
  temp: number
  feels_like: number
  pressure: number
  humidity: number
  dew_point: number
  uvi: number
  clouds: number
  visibility: number
  wind_speed: number
  wind_deg: number
  wind_gust?: number
  weather: WeatherCondition[]
  rain?: { "1h": number }
  snow?: { "1h": number }
}

export interface MinutelyForecast {
  dt: number
  precipitation: number
}

export interface HourlyForecast {
  dt: number
  temp: number
  feels_like: number
  pressure: number
  humidity: number
  dew_point: number
  uvi: number
  clouds: number
  visibility: number
  wind_speed: number
  wind_deg: number
  wind_gust?: number
  weather: WeatherCondition[]
  pop: number
  rain?: { "1h": number }
  snow?: { "1h": number }
}

export interface DailyForecast {
  dt: number
  sunrise: number
  sunset: number
  moonrise: number
  moonset: number
  moon_phase: number
  summary: string
  temp: {
    morn: number
    day: number
    eve: number
    night: number
    min: number
    max: number
  }
  feels_like: {
    morn: number
    day: number
    eve: number
    night: number
  }
  pressure: number
  humidity: number
  dew_point: number
  wind_speed: number
  wind_deg: number
  wind_gust?: number
  weather: WeatherCondition[]
  clouds: number
  pop: number
  rain?: number
  snow?: number
  uvi: number
}

export interface WeatherAlert {
  sender_name: string
  event: string
  start: number
  end: number
  description: string
  tags: string[]
}

export interface AQIEntry {
  dt: number
  main: {
    aqi: 1 | 2 | 3 | 4 | 5
  }
  components: {
    co: number
    no: number
    no2: number
    o3: number
    so2: number
    pm2_5: number
    pm10: number
    nh3: number
  }
}

export interface WeatherData {
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
  current: CurrentWeather
  minutely?: MinutelyForecast[]
  hourly: HourlyForecast[]
  daily: DailyForecast[]
  alerts?: WeatherAlert[]
}

export interface GeocodingResult {
  name: string
  local_names?: Record<string, string>
  lat: number
  lon: number
  country: string
  state?: string
}

export type TemperatureUnit = "celsius" | "fahrenheit"
export type ThemeMode = "light" | "dark" | "system"

export interface WeatherStore {
  location: Coordinates
  unit: TemperatureUnit
  theme: ThemeMode
  activeCity: string
  searchQuery: string
  recentSearches: GeocodingResult[]
  setLocation: (location: Coordinates) => void
  setUnit: (unit: TemperatureUnit) => void
  setTheme: (theme: ThemeMode) => void
  setActiveCity: (name: string) => void
  setSearchQuery: (query: string) => void
  addRecentSearch: (result: GeocodingResult) => void
}

export function getAQILevel(aqi: number): { label: string; color: string } {
  switch (aqi) {
    case 1: return { label: "Good", color: "#00E400" }
    case 2: return { label: "Fair", color: "#FFFF00" }
    case 3: return { label: "Moderate", color: "#FF7E00" }
    case 4: return { label: "Poor", color: "#FF0000" }
    case 5: return { label: "Very Poor", color: "#8F3F97" }
    default: return { label: "Unknown", color: "#808080" }
  }
}

export function getUVLevel(uvi: number): { label: string; color: string } {
  if (uvi <= 2) return { label: "Low", color: "#00E400" }
  if (uvi <= 5) return { label: "Moderate", color: "#FFFF00" }
  if (uvi <= 7) return { label: "High", color: "#FF7E00" }
  if (uvi <= 10) return { label: "Very High", color: "#FF0000" }
  return { label: "Extreme", color: "#8F3F97" }
}

export function getWindDirection(deg: number): string {
  const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
  const index = Math.round(deg / 22.5) % 16
  return directions[index]
}

export function getVisibilityDescription(meters: number): string {
  if (meters >= 10000) return "Excellent"
  if (meters >= 5000) return "Good"
  if (meters >= 2000) return "Moderate"
  if (meters >= 1000) return "Poor"
  return "Very Poor"
}

export function getPressureTrend(current: number, previous?: number): "rising" | "falling" | "stable" {
  if (!previous) return "stable"
  const diff = current - previous
  if (diff > 2) return "rising"
  if (diff < -2) return "falling"
  return "stable"
}

export function getWeatherAnimationType(main: string): string {
  switch (main.toLowerCase()) {
    case "clear": return "sun"
    case "clouds": return "clouds"
    case "rain":
    case "drizzle": return "rain"
    case "snow": return "snow"
    case "thunderstorm": return "thunder"
    default: return "clouds"
  }
}
