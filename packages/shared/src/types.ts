import { z } from "zod"

// ─── Zod schemas (single source of truth) ───

export const locationSchema = z.object({
  lat: z.number().min(-90).max(90),
  lon: z.number().min(-180).max(180),
  name: z.string().optional(),
})

export const weatherQuerySchema = z.object({
  lat: z.coerce.number().min(-90).max(90),
  lon: z.coerce.number().min(-180).max(180),
  units: z.enum(["metric", "imperial"]).optional().default("metric"),
})

export const registerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(128),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export const preferencesSchema = z.object({
  unit: z.enum(["metric", "imperial"]).optional(),
  theme: z.enum(["light", "dark", "system"]).optional(),
  notifications: z.boolean().optional(),
})

// ─── Inferred types ───

export type Location = z.infer<typeof locationSchema>
export type WeatherQuery = z.infer<typeof weatherQuerySchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type UserPreferences = z.infer<typeof preferencesSchema>

// ─── API response envelope ───

export interface ApiResponse<T = unknown> {
  success: boolean
  message: string
  data?: T
  errors?: unknown
  meta?: {
    page?: number
    limit?: number
    total?: number
    totalPages?: number
  }
}

// ─── JWT ───

export interface JwtPayload {
  userId: string
  email: string
}

// ─── Weather domain types ───

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
  pop: number
  weather: WeatherCondition[]
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
    day: number
    min: number
    max: number
    night: number
    eve: number
    morn: number
  }
  feels_like: {
    day: number
    night: number
    eve: number
    morn: number
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
  uvi: number
}

export interface WeatherData {
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
  current: CurrentWeather
  hourly: HourlyForecast[]
  daily: DailyForecast[]
  alerts?: WeatherAlert[]
}

export interface AqiData {
  main: { aqi: number }
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

export interface WeatherAlert {
  sender_name: string
  event: string
  start: number
  end: number
  description: string
  tags: string[]
}

export interface GeoLocation {
  name: string
  local_names?: Record<string, string>
  lat: number
  lon: number
  country: string
  state?: string
}

// ─── User domain types ───

export interface UserDto {
  id: string
  name: string
  email: string
  favorites: Array<{ lat: number; lon: number; name: string }>
  preferences: UserPreferences
  createdAt: string
}
