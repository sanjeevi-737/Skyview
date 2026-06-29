"use client"

import { useWeatherData } from "@/hooks/use-weather"
import { useWeatherStore } from "@/store/weather-store"
import { Card, CardHeader, CardTitle, CardContent, CardValue, CardLabel } from "@/components/ui/card"
import { WeatherDetailSkeleton } from "@/components/ui/skeleton"
import { Gauge } from "lucide-react"
import { getPressureTrend } from "@/types/weather"
import { cn } from "@/lib/utils"

interface PressureCardProps {
  className?: string
}

export function PressureCard({ className }: PressureCardProps) {
  const location = useWeatherStore((s) => s.location)
  const { data, isLoading, error } = useWeatherData(location)

  if (isLoading) return <WeatherDetailSkeleton />
  if (error || !data) return <ErrorCard title="Pressure" />

  const { current } = data
  const trend = getPressureTrend(current.pressure, data.hourly[0]?.pressure)
  const trendIcon = trend === "rising" ? "↑" : trend === "falling" ? "↓" : "→"
  const trendLabel = trend === "rising" ? "Rising" : trend === "falling" ? "Falling" : "Stable"

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Gauge className="h-4 w-4 text-primary-light" />
          <CardTitle>Pressure</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardValue>{Math.round(current.pressure)} <span className="text-lg font-normal text-foreground/40">hPa</span></CardValue>
        <CardLabel className="mt-1">
          <span
            className={cn(
              "font-medium",
              trend === "rising" && "text-emerald-500",
              trend === "falling" && "text-amber-500",
              trend === "stable" && "text-foreground/50",
            )}
          >
            {trendIcon} {trendLabel}
          </span>
        </CardLabel>
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
