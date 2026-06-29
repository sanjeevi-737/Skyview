"use client"

import { useWeatherData } from "@/hooks/use-weather"
import { useWeatherStore } from "@/store/weather-store"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { WeatherDetailSkeleton } from "@/components/ui/skeleton"
import { getUVLevel } from "@/types/weather"
import { Sun } from "lucide-react"
import { cn } from "@/lib/utils"

interface UVIndexCardProps {
  className?: string
}

export function UVIndexCard({ className }: UVIndexCardProps) {
  const location = useWeatherStore((s) => s.location)
  const { data, isLoading, error } = useWeatherData(location)

  if (isLoading) return <WeatherDetailSkeleton />
  if (error || !data) return <ErrorCard title="UV Index" />

  const { current } = data
  const uvInfo = getUVLevel(current.uvi)
  const maxUv = 11
  const percentage = Math.min((current.uvi / maxUv) * 100, 100)

  const progressColor =
    current.uvi <= 2 ? "#10B981" :
    current.uvi <= 5 ? "#F59E0B" :
    current.uvi <= 7 ? "#F97316" :
    current.uvi <= 10 ? "#EF4444" : "#8B5CF6"

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sun className="h-4 w-4 text-primary-light" />
          <CardTitle>UV Index</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-2">
          <span className="text-3xl font-semibold tracking-tight">{current.uvi.toFixed(1)}</span>
          <span
            className="px-2.5 py-0.5 rounded-full text-xs font-medium"
            style={{ backgroundColor: `${progressColor}15`, color: progressColor }}
          >
            {uvInfo.label}
          </span>
        </div>
        <div className="h-2 rounded-full bg-foreground/5 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${percentage}%`, backgroundColor: progressColor }}
          />
        </div>
        <div className="flex justify-between mt-1">
          {[0, 3, 6, 8, 11].map((val) => (
            <span key={val} className="text-[10px] text-foreground/30">{val}</span>
          ))}
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
