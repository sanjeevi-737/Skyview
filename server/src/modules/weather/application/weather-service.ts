import { OpenWeatherMapService } from "../infrastructure/owm-service"
import { CacheService } from "../infrastructure/cache-service"
import type { WeatherQuery, CurrentWeather, DailyForecast, AqiData, Location } from "@skyview/shared"

const owm = new OpenWeatherMapService()
const cache = new CacheService()

export class WeatherService {
  async getCurrent(query: WeatherQuery): Promise<CurrentWeather> {
    const cacheKey = `current:${query.lat}:${query.lon}:${query.units}`
    const cached = await cache.get<CurrentWeather>(cacheKey)
    if (cached) return cached

    const data = await owm.getCurrent(query)
    await cache.set(cacheKey, data, 300)
    return data
  }

  async getForecast(query: WeatherQuery): Promise<DailyForecast[]> {
    const cacheKey = `forecast:${query.lat}:${query.lon}:${query.units}`
    const cached = await cache.get<DailyForecast[]>(cacheKey)
    if (cached) return cached

    const data = await owm.getForecast(query)
    await cache.set(cacheKey, data, 600)
    return data
  }

  async getAirQuality(lat: number, lon: number): Promise<AqiData> {
    const cacheKey = `aqi:${lat}:${lon}`
    const cached = await cache.get<AqiData>(cacheKey)
    if (cached) return cached

    const data = await owm.getAirQuality(lat, lon)
    await cache.set(cacheKey, data, 600)
    return data
  }

  async searchLocations(query: string): Promise<Location[]> {
    const cacheKey = `geo:${query.toLowerCase()}`
    const cached = await cache.get<Location[]>(cacheKey)
    if (cached) return cached

    const data = await owm.searchLocations(query)
    await cache.set(cacheKey, data, 3600)
    return data
  }
}
