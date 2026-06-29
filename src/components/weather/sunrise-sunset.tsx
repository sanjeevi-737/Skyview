"use client"

import { useWeatherData } from "@/hooks/use-weather"
import { useWeatherStore } from "@/store/weather-store"
import { Card, CardHeader, CardTitle, CardContent, CardLabel } from "@/components/ui/card"
import { WeatherDetailSkeleton } from "@/components/ui/skeleton"
import { formatUnixTime } from "@/lib/weather-utils"
import { Sunrise, Sunset } from "lucide-react"
import { cn } from "@/lib/utils"

interface SunriseSunsetProps {
  className?: string
}

export function SunriseSunset({ className }: SunriseSunsetProps) {
  const location = useWeatherStore((s) => s.location)
  const { data, isLoading, error } = useWeatherData(location)

  if (isLoading) return <WeatherDetailSkeleton />
  if (error || !data) return <ErrorCard title="Sunrise & Sunset" />

  const { current, timezone_offset } = data
  const sunrise = formatUnixTime(current.sunrise, timezone_offset, "h:mm a")
  const sunset = formatUnixTime(current.sunset, timezone_offset, "h:mm a")

  const dayLength = (current.sunset - current.sunrise) / 3600
  const hours = Math.floor(dayLength)
  const minutes = Math.round((dayLength - hours) * 60)

  const now = current.dt
  const progress = (now - current.sunrise) / (current.sunset - current.sunrise)

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sunrise className="h-4 w-4 text-primary-light" />
          <CardTitle>Sunrise & Sunset</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative h-16 mb-3">
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div
              className="h-full w-full rounded-full"
              style={{
                background: `conic-gradient(from 0deg, #F59E0B ${progress * 50}%, #1E293B ${progress * 50}%, #1E293B 50%, #F59E0B 100%)`,
              }}
            />
          </div>
          <div className="absolute inset-0 rounded-full border border-glass-border" />
          <div
            className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-lg shadow-amber-400/50"
            style={{
              transform: `translate(-50%, -50%) rotate(${progress * 360}deg)`,
              transformOrigin: "center",
              marginTop: "-32px",
            }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="text-center">
            <Sunrise className="h-4 w-4 text-amber-400 mx-auto mb-0.5" />
            <span className="text-sm font-medium">{sunrise}</span>
            <CardLabel className="block text-[10px]">Sunrise</CardLabel>
          </div>

          <div className="text-center">
            <span className="text-xs font-medium text-foreground/60">{hours}h {minutes}m</span>
            <CardLabel className="block text-[10px]">Day Length</CardLabel>
          </div>

          <div className="text-center">
            <Sunset className="h-4 w-4 text-amber-500 mx-auto mb-0.5" />
            <span className="text-sm font-medium">{sunset}</span>
            <CardLabel className="block text-[10px]">Sunset</CardLabel>
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
