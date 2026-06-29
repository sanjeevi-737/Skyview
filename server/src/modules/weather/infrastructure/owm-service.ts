import { config } from "@/config"
import { ApiError } from "@/utils/api-error"
import { logger } from "@/utils/logger"
import type { WeatherQuery, AqiData, Location, CurrentWeather, DailyForecast } from "@skyview/shared"

interface OneCallResponse {
  current: CurrentWeather
  daily: DailyForecast[]
  hourly: unknown[]
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
}

export class OpenWeatherMapService {
  private baseUrl = config.openweather.baseUrl
  private apiKey = config.openweather.apiKey

  async getCurrent(query: WeatherQuery): Promise<CurrentWeather> {
    const data = await this.fetchOneCall(query)
    return data.current
  }

  async getForecast(query: WeatherQuery): Promise<DailyForecast[]> {
    const data = await this.fetchOneCall(query)
    return data.daily
  }

  async getAirQuality(lat: number, lon: number): Promise<AqiData> {
    const url = new URL(`${this.baseUrl}/data/2.5/air_pollution`)
    url.searchParams.set("lat", lat.toString())
    url.searchParams.set("lon", lon.toString())
    url.searchParams.set("appid", this.apiKey)

    const response = await fetch(url.toString(), {
      headers: { Accept: "application/json" },
    })
    if (!response.ok) {
      throw ApiError.internal("Failed to fetch air quality data")
    }
    return response.json() as Promise<AqiData>
  }

  async searchLocations(query: string): Promise<Location[]> {
    const url = new URL(`${this.baseUrl}/geo/1.0/direct`)
    url.searchParams.set("q", query)
    url.searchParams.set("limit", "5")
    url.searchParams.set("appid", this.apiKey)

    const response = await fetch(url.toString(), {
      headers: { Accept: "application/json" },
    })
    if (!response.ok) {
      throw ApiError.internal("Failed to search locations")
    }
    return response.json() as Promise<Location[]>
  }

  private async fetchOneCall(query: WeatherQuery): Promise<OneCallResponse> {
    const url = new URL(`${this.baseUrl}/data/3.0/onecall`)
    url.searchParams.set("lat", query.lat.toString())
    url.searchParams.set("lon", query.lon.toString())
    url.searchParams.set("units", query.units)
    url.searchParams.set("appid", this.apiKey)

    const response = await fetch(url.toString(), {
      headers: { Accept: "application/json" },
    })

    if (!response.ok) {
      const body = await response.text().catch(() => "Unknown error")
      logger.error("OpenWeatherMap API error", { status: response.status, body })

      if (response.status === 401) throw ApiError.unauthorized("Invalid OpenWeatherMap API key")
      if (response.status === 404) throw ApiError.notFound("Weather data not found")
      if (response.status === 429) throw ApiError.tooMany("OpenWeatherMap rate limit exceeded")
      throw ApiError.internal(`Weather API error: ${response.status}`)
    }

    return response.json() as Promise<OneCallResponse>
  }
}
