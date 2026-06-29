import type { WeatherQuery, CurrentWeather, DailyForecast, AqiData, Location, JwtPayload, UserDto } from "./types"
import type { DomainEvent, EventHandler } from "./events"

// ─── Event Bus ───

export interface IEventBus {
  publish(event: DomainEvent): void
  subscribe(name: string, handler: EventHandler): () => void
}

// ─── Auth ───

export interface IAuthService {
  register(input: { name: string; email: string; password: string }): Promise<{ user: UserDto; accessToken: string; refreshToken: string }>
  login(input: { email: string; password: string }): Promise<{ user: UserDto; accessToken: string; refreshToken: string }>
  refreshToken(refreshToken: string): Promise<{ accessToken: string }>
  verifyToken(token: string): JwtPayload
}

// ─── User Repository ───

export interface IUserRepository {
  findById(id: string): Promise<unknown | null>
  findByEmail(email: string): Promise<unknown | null>
  create(data: { name: string; email: string; password: string }): Promise<unknown>
  updatePreferences(id: string, preferences: Record<string, unknown>): Promise<unknown | null>
  addFavorite(id: string, location: Location): Promise<unknown>
  removeFavorite(id: string, lat: number, lon: number): Promise<unknown>
  addSearchHistory(id: string, entry: { query: string; lat: number; lon: number }): Promise<unknown>
  getSearchHistory(id: string): Promise<unknown[]>
}

// ─── Weather Service ───

export interface IWeatherService {
  getCurrent(query: WeatherQuery): Promise<CurrentWeather>
  getForecast(query: WeatherQuery): Promise<DailyForecast[]>
  getAirQuality(lat: number, lon: number): Promise<AqiData>
  searchLocations(query: string): Promise<Location[]>
}

// ─── Cache ───

export interface ICacheService {
  get<T>(key: string): Promise<T | null>
  set<T>(key: string, value: T, ttlSeconds: number): Promise<void>
  delete(key: string): Promise<void>
}
