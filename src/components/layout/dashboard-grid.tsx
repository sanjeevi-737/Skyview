"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface DashboardGridProps {
  children: ReactNode
  className?: string
}

export function DashboardGrid({ children, className }: DashboardGridProps) {
  return (
    <div
      className={cn(
        "grid gap-4 md:gap-5",
        "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
    >
      {children}
    </div>
  )
}
