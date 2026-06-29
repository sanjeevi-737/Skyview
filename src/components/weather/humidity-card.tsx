"use client"

import { useWeatherData } from "@/hooks/use-weather"
import { useWeatherStore } from "@/store/weather-store"
import { Card, CardHeader, CardTitle, CardContent, CardValue, CardLabel } from "@/components/ui/card"
import { WeatherDetailSkeleton } from "@/components/ui/skeleton"
import { Droplets } from "lucide-react"
import { cn } from "@/lib/utils"

interface HumidityCardProps {
  className?: string
}

export function HumidityCard({ className }: HumidityCardProps) {
  const location = useWeatherStore((s) => s.location)
  const { data, isLoading, error } = useWeatherData(location)

  if (isLoading) return <WeatherDetailSkeleton />
  if (error || !data) return <ErrorCard title="Humidity" />

  const { current } = data
  const level = current.humidity <= 40 ? "Low" : current.humidity <= 70 ? "Moderate" : "High"
  const levelClass = current.humidity <= 40 ? "text-amber-500" : current.humidity <= 70 ? "text-emerald-500" : "text-primary-light"

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Droplets className="h-4 w-4 text-primary-light" />
          <CardTitle>Humidity</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardValue>{current.humidity}%</CardValue>
        <div className="mt-2 h-1.5 rounded-full bg-foreground/5 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${current.humidity}%`,
              backgroundColor: current.humidity > 70 ? "#38BDF8" : current.humidity > 40 ? "#10B981" : "#F59E0B",
            }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-xs">
          <CardLabel>
            Dew point: {Math.round(current.dew_point)}°
          </CardLabel>
          <span className={cn("font-medium", levelClass)}>{level}</span>
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
