"use client"

import { CloudSun, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh px-4 text-center">
      <CloudSun className="h-16 w-16 text-amber-500 mb-6 opacity-50" />
      <h1 className="text-2xl font-bold tracking-tight mb-2">Weather data unavailable</h1>
      <p className="text-sm text-foreground/60 mb-8 max-w-md">
        {error.message || "Unable to fetch weather data. Please check your connection and try again."}
      </p>
      <Button onClick={reset}>
        <RefreshCw className="h-4 w-4" />
        Try again
      </Button>
    </div>
  )
}
