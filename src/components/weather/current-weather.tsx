"use client"

import { useWeatherData } from "@/hooks/use-weather"
import { useWeatherStore } from "@/store/weather-store"
import { formatTemp, formatUnixTime, getWeatherIconUrl } from "@/lib/weather-utils"
import { CurrentWeatherSkeleton } from "@/components/ui/skeleton"
import { CloudSun, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CurrentWeatherProps {
  className?: string
}

export function CurrentWeather({ className }: CurrentWeatherProps) {
  const location = useWeatherStore((s) => s.location)
  const unit = useWeatherStore((s) => s.unit)
  const activeCity = useWeatherStore((s) => s.activeCity)

  const { data, isLoading, error } = useWeatherData(location)

  if (isLoading) return <CurrentWeatherSkeleton />

  if (error || !data) {
    return (
      <div className={cn("glass-card rounded-2xl p-6 md:p-8 text-center", className)}>
        <CloudSun className="h-12 w-12 mx-auto mb-3 text-foreground/30" />
        <p className="text-sm text-foreground/60">Unable to load weather data</p>
      </div>
    )
  }

  const { current, timezone_offset } = data
  const weather = current.weather[0]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden", className)}
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-1.5 text-sm text-foreground/60 mb-1">
              <MapPin className="h-3.5 w-3.5" />
              <span>{activeCity}</span>
            </div>
            <p className="text-xs text-foreground/40">
              {formatUnixTime(current.dt, timezone_offset, "EEEE, MMM d · h:mm a")}
            </p>
          </div>
          <img
            src={getWeatherIconUrl(weather.icon)}
            alt={weather.description}
            className="h-16 w-16 object-contain -mr-2"
            loading="eager"
          />
        </div>

        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-6xl md:text-7xl font-light tracking-tight">
            {formatTemp(current.temp, unit)}
          </span>
        </div>

        <p className="text-base font-medium text-foreground/80 capitalize mb-4">
          {weather.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-foreground/60">
          <span>Feels like {formatTemp(current.feels_like, unit)}</span>
          <span className="w-1 h-1 rounded-full bg-foreground/20" />
          <span>Humidity {current.humidity}%</span>
          <span className="w-1 h-1 rounded-full bg-foreground/20" />
          <span>Wind {Math.round(current.wind_speed)} m/s</span>
        </div>
      </div>
    </motion.div>
  )
}
