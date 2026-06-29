"use client"

import { useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface TooltipProps {
  content: string
  children: ReactNode
  side?: "top" | "bottom"
}

export function Tooltip({ content, children, side = "top" }: TooltipProps) {
  const [show, setShow] = useState(false)

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      {children}
      {show && (
        <div
          role="tooltip"
          className={cn(
            "absolute z-50 px-2.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap",
            "bg-foreground/90 text-background backdrop-blur-md",
            "shadow-lg pointer-events-none transition-opacity duration-150",
            side === "top" && "bottom-full mb-2 left-1/2 -translate-x-1/2",
            side === "bottom" && "top-full mt-2 left-1/2 -translate-x-1/2",
          )}
        >
          {content}
        </div>
      )}
    </div>
  )
}
