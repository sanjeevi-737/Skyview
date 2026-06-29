"use client"

import type { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "glass" | "glass-strong" | "elevated"
  hover?: boolean
}

export function Card({
  className,
  variant = "glass",
  hover = false,
  children,
  ...props
}: CardProps) {
  const variants = {
    glass: "glass-card",
    "glass-strong": "glass-strong",
    elevated: "glass-card shadow-lg",
  }

  return (
    <div
      className={cn(
        "rounded-2xl p-5 transition-all duration-300",
        variants[variant],
        hover && "hover:scale-[1.02] hover:shadow-lg cursor-pointer",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center justify-between mb-4", className)} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-sm font-medium text-foreground/60 uppercase tracking-wider", className)} {...props}>
      {children}
    </h3>
  )
}

export function CardContent({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  )
}

export function CardIcon({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("text-primary-light", className)} {...props}>
      {children}
    </div>
  )
}

export function CardValue({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("text-3xl font-semibold tracking-tight", className)} {...props}>
      {children}
    </div>
  )
}

export function CardLabel({ className, children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn("text-sm text-foreground/60", className)} {...props}>
      {children}
    </span>
  )
}
