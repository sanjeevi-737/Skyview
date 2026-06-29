import { CloudSun } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh gap-3">
      <CloudSun className="h-10 w-10 text-primary animate-pulse" />
      <p className="text-sm text-foreground/40">Loading SkyView...</p>
    </div>
  )
}
