"use client"

import { useWeatherData } from "@/hooks/use-weather"
import { useWeatherStore } from "@/store/weather-store"
import { Card, CardHeader, CardTitle, CardContent, CardValue, CardLabel } from "@/components/ui/card"
import { WeatherDetailSkeleton } from "@/components/ui/skeleton"
import { getVisibilityDescription } from "@/types/weather"
import { convertVisibility } from "@/lib/weather-utils"
import { Eye } from "lucide-react"
import { cn } from "@/lib/utils"

interface VisibilityCardProps {
  className?: string
}

export function VisibilityCard({ className }: VisibilityCardProps) {
  const location = useWeatherStore((s) => s.location)
  const unit = useWeatherStore((s) => s.unit)
  const { data, isLoading, error } = useWeatherData(location)

  if (isLoading) return <WeatherDetailSkeleton />
  if (error || !data) return <ErrorCard title="Visibility" />

  const { current } = data
  const description = getVisibilityDescription(current.visibility)
  const visibilityText = convertVisibility(current.visibility, unit)
  const percentage = Math.min((current.visibility / 10000) * 100, 100)

  const levelColor =
    current.visibility >= 10000 ? "text-emerald-500" :
    current.visibility >= 5000 ? "text-primary-light" :
    current.visibility >= 2000 ? "text-amber-500" : "text-red-500"

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4 text-primary-light" />
          <CardTitle>Visibility</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardValue>{visibilityText}</CardValue>
        <div className="mt-2 h-1.5 rounded-full bg-foreground/5 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${percentage}%`,
              backgroundColor: current.visibility >= 5000 ? "#10B981" : current.visibility >= 2000 ? "#F59E0B" : "#EF4444",
            }}
          />
        </div>
        <CardLabel className={cn("mt-1 font-medium", levelColor)}>
          {description}
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
