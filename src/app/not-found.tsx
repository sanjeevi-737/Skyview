"use client"

import { CloudSun, Home } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh px-4 text-center">
      <CloudSun className="h-16 w-16 text-primary-light mb-6 opacity-50" />
      <h1 className="text-4xl font-bold tracking-tight mb-2">404</h1>
      <h2 className="text-xl font-medium mb-2">Page not found</h2>
      <p className="text-sm text-foreground/60 mb-8 max-w-md">
        The skies are clear, but this page does not exist.
      </p>
      <Link href="/">
        <Button variant="secondary">
          <Home className="h-4 w-4" />
          Back to home
        </Button>
      </Link>
    </div>
  )
}
