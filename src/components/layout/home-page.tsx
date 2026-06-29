"use client"

import dynamic from "next/dynamic"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CurrentWeather } from "@/components/weather/current-weather"
import { HourlyForecast } from "@/components/weather/hourly-forecast"
import { WeeklyForecast } from "@/components/weather/weekly-forecast"
import { AirQuality } from "@/components/weather/air-quality"
import { HumidityCard } from "@/components/weather/humidity-card"
import { WindCard } from "@/components/weather/wind-card"
import { PressureCard } from "@/components/weather/pressure-card"
import { UVIndexCard } from "@/components/weather/uvi-card"
import { SunriseSunset } from "@/components/weather/sunrise-sunset"
import { VisibilityCard } from "@/components/weather/visibility-card"
import { WeatherAlerts } from "@/components/weather/weather-alerts"
import { DashboardGrid } from "@/components/layout/dashboard-grid"
import { Container } from "@/components/ui/container"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { useGeolocation } from "@/hooks/use-geolocation"
import { useWeatherStore } from "@/store/weather-store"
import { useEffect } from "react"

const WeatherScene3D = dynamic(
  () => import("@/components/three/weather-scene").then((m) => ({ default: m.WeatherScene3D })),
  { ssr: false },
)

export function HomePage() {
  const setLocation = useWeatherStore((s) => s.setLocation)
  const { latitude, longitude, request: requestGeo } = useGeolocation()

  useEffect(() => {
    requestGeo()
  }, [requestGeo])

  useEffect(() => {
    if (latitude && longitude) {
      setLocation({ lat: latitude, lon: longitude })
    }
  }, [latitude, longitude, setLocation])

  return (
    <div className="relative z-10">
      <WeatherScene3D />
      <Header />
      <main className="flex-1">
        <Container size="xl" className="py-6 md:py-8 space-y-5">
          <ErrorBoundary>
            <CurrentWeather />
          </ErrorBoundary>

          <ErrorBoundary>
            <HourlyForecast />
          </ErrorBoundary>

          <ErrorBoundary>
            <WeatherAlerts />
          </ErrorBoundary>

          <div className="grid gap-4 md:gap-5 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">
            <div className="col-span-1 lg:col-span-2 xl:col-span-2">
              <ErrorBoundary>
                <WeeklyForecast />
              </ErrorBoundary>
            </div>
            <div className="col-span-1">
              <ErrorBoundary>
                <AirQuality />
              </ErrorBoundary>
            </div>
            <div className="col-span-1">
              <ErrorBoundary>
                <UVIndexCard />
              </ErrorBoundary>
            </div>
          </div>

          <DashboardGrid>
            <ErrorBoundary>
              <HumidityCard />
            </ErrorBoundary>
            <ErrorBoundary>
              <WindCard />
            </ErrorBoundary>
            <ErrorBoundary>
              <PressureCard />
            </ErrorBoundary>
            <ErrorBoundary>
              <SunriseSunset />
            </ErrorBoundary>
            <ErrorBoundary>
              <VisibilityCard />
            </ErrorBoundary>
          </DashboardGrid>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
