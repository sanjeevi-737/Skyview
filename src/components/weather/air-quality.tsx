"use client"

import { useAQI } from "@/hooks/use-weather"
import { useWeatherStore } from "@/store/weather-store"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { WeatherCardSkeleton } from "@/components/ui/skeleton"
import { getAQILevel } from "@/types/weather"
import { Activity } from "lucide-react"
import { cn } from "@/lib/utils"

interface AirQualityProps {
  className?: string
}

export function AirQuality({ className }: AirQualityProps) {
  const location = useWeatherStore((s) => s.location)
  const { data, isLoading, error } = useAQI(location)

  if (isLoading) return <WeatherCardSkeleton />

  if (error || !data) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Air Quality</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground/60">Unavailable</p>
        </CardContent>
      </Card>
    )
  }

  const entry = data.list[0]
  const aqiInfo = getAQILevel(entry.main.aqi)
  const components = entry.components

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-primary-light" />
          <CardTitle>Air Quality</CardTitle>
        </div>
        <div
          className="px-2.5 py-0.5 rounded-full text-[11px] font-medium"
          style={{ backgroundColor: `${aqiInfo.color}15`, color: aqiInfo.color }}
        >
          {aqiInfo.label}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2.5">
          <PollutantRow label="PM2.5" value={`${components.pm2_5.toFixed(1)}`} unit="µg/m³" max={35} />
          <PollutantRow label="PM10" value={`${components.pm10.toFixed(1)}`} unit="µg/m³" max={50} />
          <PollutantRow label="O₃" value={`${components.o3.toFixed(1)}`} unit="µg/m³" max={100} />
          <PollutantRow label="NO₂" value={`${components.no2.toFixed(1)}`} unit="µg/m³" max={40} />
        </div>
      </CardContent>
    </Card>
  )
}

function PollutantRow({ label, value, unit, max }: { label: string; value: string; unit: string; max: number }) {
  const numValue = parseFloat(value)
  const percentage = Math.min((numValue / max) * 100, 100)
  const level = numValue > max ? "text-red-500" : numValue > max * 0.5 ? "text-amber-500" : "text-emerald-500"

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-foreground/60 w-12">{label}</span>
      <div className="flex-1 h-1.5 rounded-full bg-foreground/5 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            backgroundColor: numValue > max ? "#EF4444" : numValue > max * 0.5 ? "#F59E0B" : "#10B981",
          }}
        />
      </div>
      <span className={cn("text-xs font-medium tabular-nums w-20 text-right", level)}>
        {value} {unit}
      </span>
    </div>
  )
}
