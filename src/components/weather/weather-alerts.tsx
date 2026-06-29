"use client"

import { useState } from "react"
import { useAlerts } from "@/hooks/use-weather"
import { useWeatherStore } from "@/store/weather-store"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, ChevronDown, ChevronUp, ShieldAlert } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface WeatherAlertsProps {
  className?: string
}

export function WeatherAlerts({ className }: WeatherAlertsProps) {
  const location = useWeatherStore((s) => s.location)
  const { data, isLoading, error } = useAlerts(location)

  if (isLoading) return null
  if (error) return null
  if (!data?.alerts || data.alerts.length === 0) return null

  return (
    <Card className={cn("border-amber-500/20", className)}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 text-amber-500" />
          <CardTitle className="text-amber-500">Weather Alerts</CardTitle>
        </div>
        <span className="text-xs text-amber-500 font-medium">{data.alerts.length} active</span>
      </CardHeader>
      <div className="space-y-2">
        {data.alerts.map((alert, index) => (
          <AlertItem key={index} alert={alert} />
        ))}
      </div>
    </Card>
  )
}

function AlertItem({ alert }: { alert: { sender_name: string; event: string; start: number; end: number; description: string; tags: string[] } }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="border border-amber-500/10 rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-amber-500/5 transition-colors"
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0" />
          <div>
            <span className="text-sm font-medium">{alert.event}</span>
            <p className="text-[11px] text-foreground/50">{alert.sender_name}</p>
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-foreground/40 flex-shrink-0" />
        ) : (
          <ChevronDown className="h-4 w-4 text-foreground/40 flex-shrink-0" />
        )}
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-3 pt-1 space-y-2">
              {alert.tags.length > 0 && (
                <div className="flex gap-1.5 flex-wrap">
                  {alert.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[10px] rounded-full bg-amber-500/10 text-amber-500 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <p className="text-xs text-foreground/70 leading-relaxed line-clamp-6">
                {alert.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
