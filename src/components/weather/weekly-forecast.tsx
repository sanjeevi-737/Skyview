"use client"

import { useWeatherData } from "@/hooks/use-weather"
import { useWeatherStore } from "@/store/weather-store"
import { formatTemp, formatShortDay, formatDate, getWeatherIconUrl } from "@/lib/weather-utils"
import { ForecastSkeleton } from "@/components/ui/skeleton"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface WeeklyForecastProps {
  className?: string
}

export function WeeklyForecast({ className }: WeeklyForecastProps) {
  const location = useWeatherStore((s) => s.location)
  const unit = useWeatherStore((s) => s.unit)

  const { data, isLoading, error } = useWeatherData(location)

  if (isLoading) return <ForecastSkeleton />

  if (error || !data) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>7-Day Forecast</CardTitle>
        </CardHeader>
        <p className="text-sm text-foreground/60">Failed to load forecast</p>
      </Card>
    )
  }

  const daily = data.daily.slice(0, 7)

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-primary-light" />
          <CardTitle>7-Day Forecast</CardTitle>
        </div>
      </CardHeader>
      <div className="space-y-1">
        {daily.map((day, index) => {
          const weather = day.weather[0]
          return (
            <motion.div
              key={day.dt}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "flex items-center gap-3 px-1 py-2.5 rounded-xl transition-colors",
                index < daily.length - 1 && "",
              )}
            >
              <span className="w-20 text-sm font-medium">
                {index === 0 ? "Today" : formatShortDay(day.dt, data.timezone_offset)}
              </span>
              <span className="w-8 text-[10px] text-foreground/40">
                {formatDate(day.dt, data.timezone_offset)}
              </span>
              <img
                src={getWeatherIconUrl(weather.icon)}
                alt={weather.description}
                className="h-7 w-7 object-contain"
                loading="lazy"
              />
              <span className="flex-1 text-xs text-foreground/60 truncate capitalize">
                {weather.description}
              </span>
              {day.pop > 0 && (
                <span className="text-xs text-primary-light w-8 text-right">
                  {Math.round(day.pop * 100)}%
                </span>
              )}
              <div className="flex items-center gap-2 min-w-[72px] justify-end">
                <span className="text-sm font-semibold text-foreground">
                  {formatTemp(day.temp.max, unit)}
                </span>
                <span className="text-sm text-foreground/40">
                  {formatTemp(day.temp.min, unit)}
                </span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </Card>
  )
}
