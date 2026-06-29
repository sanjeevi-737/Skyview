"use client"

import { Suspense, lazy, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { useReducedMotion } from "@/hooks/use-media-query"
import { useWeatherData } from "@/hooks/use-weather"
import { useWeatherStore } from "@/store/weather-store"
import { getWeatherAnimationType } from "@/types/weather"
import { Environment } from "@react-three/drei"
import { cn } from "@/lib/utils"

const EarthGlobe = lazy(() => import("@/components/three/earth-globe").then((m) => ({ default: m.EarthGlobe })))
const CloudScene = lazy(() => import("@/components/three/cloud-scene").then((m) => ({ default: m.CloudScene })))
const RainParticles = lazy(() => import("@/components/three/rain-particles").then((m) => ({ default: m.RainParticles })))
const SnowParticles = lazy(() => import("@/components/three/snow-particles").then((m) => ({ default: m.SnowParticles })))
const SunGlow = lazy(() => import("@/components/three/sun-glow").then((m) => ({ default: m.SunGlow })))

interface WeatherSceneProps {
  className?: string
}

function SceneContent() {
  const location = useWeatherStore((s) => s.location)
  const { data } = useWeatherData(location)
  const reducedMotion = useReducedMotion()

  if (!data) return <EarthGlobe />

  const condition = data.current.weather[0].main
  const animationType = getWeatherAnimationType(condition)

  if (reducedMotion) return <EarthGlobe />

  switch (animationType) {
    case "sun":
      return (
        <>
          <SunGlow />
          <EarthGlobe />
        </>
      )
    case "clouds":
      return (
        <>
          <CloudScene />
          <EarthGlobe />
        </>
      )
    case "rain":
    case "thunder":
      return (
        <>
          <RainParticles />
          <CloudScene density={0.8} />
          <EarthGlobe />
        </>
      )
    case "snow":
      return (
        <>
          <SnowParticles />
          <CloudScene density={0.6} />
          <EarthGlobe />
        </>
      )
    default:
      return <EarthGlobe />
  }
}

export function WeatherScene3D({ className }: WeatherSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className={cn("fixed inset-0 z-0 pointer-events-none", className)}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <SceneContent />
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  )
}
