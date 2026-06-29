"use client"

import { CloudSun, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body className="flex flex-col items-center justify-center min-h-dvh px-4 text-center bg-background text-foreground">
        <CloudSun className="h-16 w-16 text-amber-500 mb-6 opacity-50" />
        <h1 className="text-2xl font-bold tracking-tight mb-2">Something went wrong</h1>
        <p className="text-sm text-foreground/60 mb-8 max-w-md">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        <Button onClick={reset}>
          <RefreshCw className="h-4 w-4" />
          Try again
        </Button>
      </body>
    </html>
  )
}
