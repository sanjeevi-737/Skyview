"use client"

import { forwardRef, type ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "icon"
  size?: "sm" | "md" | "lg"
  loading?: boolean
}

const variants = {
  primary:
    "bg-primary text-white hover:bg-primary-dark active:bg-primary-dark focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  secondary:
    "glass-card text-foreground hover:bg-surface-hover active:bg-surface-hover focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  ghost:
    "text-foreground/70 hover:text-foreground hover:bg-white/10 active:bg-white/15 focus-visible:ring-2 focus-visible:ring-ring",
  icon: "text-foreground/70 hover:text-foreground hover:bg-white/10 active:bg-white/15 focus-visible:ring-2 focus-visible:ring-ring",
}

const sizes = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2.5",
}

const iconSizes = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, disabled, children, ...props }, ref) => {
    const isIcon = variant === "icon"
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl cursor-pointer select-none",
          "disabled:opacity-40 disabled:pointer-events-none",
          isIcon ? iconSizes[size] : sizes[size],
          variants[variant],
          className,
        )}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </button>
    )
  },
)

Button.displayName = "Button"
