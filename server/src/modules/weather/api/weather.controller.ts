import { type Request, type Response, type NextFunction } from "express"
import { WeatherService } from "../application/weather-service"
import { sendSuccess } from "@/utils/api-response"
import type { WeatherQuery } from "@skyview/shared"

const weatherService = new WeatherService()

export async function getCurrentWeather(req: Request, res: Response, next: NextFunction) {
  try {
    const query = req.query as unknown as WeatherQuery
    const data = await weatherService.getCurrent(query)
    sendSuccess(res, data, "Current weather retrieved")
  } catch (error) {
    next(error)
  }
}

export async function getForecast(req: Request, res: Response, next: NextFunction) {
  try {
    const query = req.query as unknown as WeatherQuery
    const data = await weatherService.getForecast(query)
    sendSuccess(res, data, "Forecast retrieved")
  } catch (error) {
    next(error)
  }
}

export async function getAirQuality(req: Request, res: Response, next: NextFunction) {
  try {
    const { lat, lon } = req.query as Record<string, string>
    const data = await weatherService.getAirQuality(parseFloat(lat), parseFloat(lon))
    sendSuccess(res, data, "Air quality data retrieved")
  } catch (error) {
    next(error)
  }
}

export async function searchLocation(req: Request, res: Response, next: NextFunction) {
  try {
    const { q } = req.query as Record<string, string>
    if (!q || q.length < 2) {
      res.status(400).json({ success: false, message: "Query must be at least 2 characters" })
      return
    }
    const data = await weatherService.searchLocations(q)
    sendSuccess(res, data, "Locations found")
  } catch (error) {
    next(error)
  }
}
