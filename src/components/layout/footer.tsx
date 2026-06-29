"use client"

import { CloudSun } from "lucide-react"

export function Footer() {
  return (
    <footer className="mt-auto py-6 text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-1.5 text-xs text-foreground/30">
          <CloudSun className="h-3 w-3" />
          <span>SkyView · Beautiful weather, every day.</span>
        </div>
      </div>
    </footer>
  )
}
