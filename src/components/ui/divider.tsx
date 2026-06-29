import { cn } from "@/lib/utils"

interface DividerProps {
  className?: string
  orientation?: "horizontal" | "vertical"
}

export function Divider({ className, orientation = "horizontal" }: DividerProps) {
  return (
    <div
      className={cn(
        "bg-glass-border",
        orientation === "horizontal" ? "h-px w-full" : "w-px h-full",
        className,
      )}
      role="separator"
    />
  )
}
