"use client"

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  size?: "sm" | "md" | "lg"
  children: ReactNode
}

const sizes = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, label, size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        aria-label={label}
        className={cn(
          "inline-flex items-center justify-center rounded-xl transition-all duration-200",
          "text-foreground/60 hover:text-foreground hover:bg-white/10",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "cursor-pointer select-none",
          sizes[size],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    )
  },
)

IconButton.displayName = "IconButton"
