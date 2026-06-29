import { Router } from "express"
import { getCurrentWeather, getForecast, getAirQuality, searchLocation } from "./weather.controller"
import { validate } from "@/middleware/validate"
import { weatherQuerySchema } from "@skyview/shared"

export const weatherRouter = Router()

weatherRouter.get("/current", validate(weatherQuerySchema, "query"), getCurrentWeather)
weatherRouter.get("/forecast", validate(weatherQuerySchema, "query"), getForecast)
weatherRouter.get("/air-quality", validate(weatherQuerySchema, "query"), getAirQuality)
weatherRouter.get("/search", searchLocation)
