"use client"

import { useRef } from "react"
import { useWeatherData } from "@/hooks/use-weather"
import { useWeatherStore } from "@/store/weather-store"
import { formatTemp, formatHour, getWeatherIconUrl } from "@/lib/weather-utils"
import { ForecastSkeleton } from "@/components/ui/skeleton"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface HourlyForecastProps {
  className?: string
}

export function HourlyForecast({ className }: HourlyForecastProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const location = useWeatherStore((s) => s.location)
  const unit = useWeatherStore((s) => s.unit)

  const { data, isLoading, error } = useWeatherData(location)

  if (isLoading) return <ForecastSkeleton />

  if (error || !data) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Hourly Forecast</CardTitle>
        </CardHeader>
        <p className="text-sm text-foreground/60">Failed to load hourly data</p>
      </Card>
    )
  }

  const now = data.current.dt
  const hourly = data.hourly.slice(0, 24)

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary-light" />
          <CardTitle>Hourly Forecast</CardTitle>
        </div>
      </CardHeader>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 scrollbar-none"
        role="list"
        aria-label="Hourly weather forecast"
      >
        {hourly.map((hour, index) => {
          const isNow = index === 0 || hour.dt === now
          const weather = hour.weather[0]
          return (
            <motion.div
              key={hour.dt}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.02 }}
              className="flex flex-col items-center gap-2 min-w-[64px] flex-shrink-0"
              role="listitem"
            >
              <span className="text-xs font-medium text-foreground/60">
                {isNow ? "Now" : formatHour(hour.dt, data.timezone_offset)}
              </span>
              <img
                src={getWeatherIconUrl(weather.icon)}
                alt={weather.description}
                className="h-8 w-8 object-contain"
                loading="lazy"
              />
              <span className="text-sm font-semibold">
                {formatTemp(hour.temp, unit)}
              </span>
              {hour.pop > 0 && (
                <span className="text-[10px] text-primary-light">
                  {Math.round(hour.pop * 100)}%
                </span>
              )}
            </motion.div>
          )
        })}
      </div>
    </Card>
  )
}
