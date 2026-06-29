"use client"

import { useWeatherData } from "@/hooks/use-weather"
import { useWeatherStore } from "@/store/weather-store"
import { Card, CardHeader, CardTitle, CardContent, CardValue, CardLabel } from "@/components/ui/card"
import { WeatherDetailSkeleton } from "@/components/ui/skeleton"
import { Wind, Navigation } from "lucide-react"
import { getWindDirection } from "@/types/weather"
import { cn } from "@/lib/utils"

interface WindCardProps {
  className?: string
}

export function WindCard({ className }: WindCardProps) {
  const location = useWeatherStore((s) => s.location)
  const unit = useWeatherStore((s) => s.unit)
  const { data, isLoading, error } = useWeatherData(location)

  if (isLoading) return <WeatherDetailSkeleton />
  if (error || !data) return <ErrorCard title="Wind" />

  const { current } = data
  const speed = unit === "celsius" ? (current.wind_speed * 3.6).toFixed(1) : (current.wind_speed * 2.237).toFixed(1)
  const speedLabel = unit === "celsius" ? "km/h" : "mph"
  const direction = getWindDirection(current.wind_deg)

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Wind className="h-4 w-4 text-primary-light" />
          <CardTitle>Wind</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-start justify-between">
          <div>
            <CardValue>
              {speed}
              <span className="text-lg font-normal text-foreground/40 ml-0.5">{speedLabel}</span>
            </CardValue>
            <CardLabel className="mt-1">
              Gusts: {current.wind_gust ? `${unit === "celsius" ? (current.wind_gust * 3.6).toFixed(1) : (current.wind_gust * 2.237).toFixed(1)} ${speedLabel}` : "N/A"}
            </CardLabel>
          </div>
          <div className="flex flex-col items-center">
            <div
              className="h-14 w-14 rounded-full glass-card flex items-center justify-center transition-transform duration-500"
              style={{ transform: `rotate(${current.wind_deg}deg)` }}
            >
              <Navigation className="h-5 w-5 text-primary-light" />
            </div>
            <span className="text-xs font-medium mt-1 text-foreground/60">{direction}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ErrorCard({ title }: { title: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground/60">Unavailable</p>
      </CardContent>
    </Card>
  )
}
