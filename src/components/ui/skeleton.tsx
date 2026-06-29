import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
  variant?: "text" | "card" | "circle" | "chart"
}

export function Skeleton({ className, variant = "text" }: SkeletonProps) {
  const base = "bg-foreground/5 rounded-lg animate-pulse"

  const variants = {
    text: "h-4 w-full",
    card: "h-32 w-full rounded-2xl",
    circle: "h-10 w-10 rounded-full",
    chart: "h-24 w-full rounded-xl",
  }

  return <div className={cn(base, variants[variant], className)} />
}

export function WeatherCardSkeleton() {
  return (
    <div className="glass-card rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-4 w-4" variant="circle" />
      </div>
      <Skeleton className="h-8 w-24" />
      <Skeleton className="h-3 w-16" />
    </div>
  )
}

export function WeatherDetailSkeleton() {
  return (
    <div className="glass-card rounded-2xl p-5 space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-4 w-4" variant="circle" />
      </div>
      <Skeleton className="h-7 w-20" />
      <Skeleton className="h-3 w-24" />
    </div>
  )
}

export function CurrentWeatherSkeleton() {
  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-16 w-16" variant="circle" />
      </div>
      <Skeleton className="h-16 w-40" />
      <Skeleton className="h-4 w-48" />
    </div>
  )
}

export function ForecastSkeleton() {
  return (
    <div className="glass-card rounded-2xl p-5 space-y-4">
      <Skeleton className="h-3 w-24" />
      <div className="flex gap-3 overflow-hidden">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex-shrink-0 space-y-2 text-center">
            <Skeleton className="h-3 w-10 mx-auto" />
            <Skeleton className="h-8 w-8 mx-auto" variant="circle" />
            <Skeleton className="h-4 w-8 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  )
}
