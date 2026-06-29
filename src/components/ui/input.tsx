"use client"

import { forwardRef, type InputHTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { Search } from "lucide-react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40 pointer-events-none" />
        )}
        <input
          ref={ref}
          className={cn(
            "w-full h-11 rounded-xl border border-glass-border bg-white/10 backdrop-blur-md",
            "px-4 text-sm text-foreground placeholder:text-foreground/30",
            "transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary/50",
            "disabled:opacity-40 disabled:cursor-not-allowed",
            icon && "pl-10",
            className,
          )}
          {...props}
        />
      </div>
    )
  },
)

Input.displayName = "Input"
