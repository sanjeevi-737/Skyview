"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function EarthGlobe() {
  const meshRef = useRef<THREE.Mesh>(null)

  const texture = (() => {
    const canvas = document.createElement("canvas")
    canvas.width = 512
    canvas.height = 256
    const ctx = canvas.getContext("2d")!

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
    gradient.addColorStop(0, "#0284C7")
    gradient.addColorStop(0.3, "#0EA5E9")
    gradient.addColorStop(0.5, "#38BDF8")
    gradient.addColorStop(0.7, "#0EA5E9")
    gradient.addColorStop(1, "#0284C7")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const random = (() => {
      let s = 42
      return () => {
        s = (s * 16807 + 0) % 2147483647
        return (s - 1) / 2147483646
      }
    })()

    for (let i = 0; i < 80; i++) {
      const x = random() * canvas.width
      const y = random() * canvas.height
      const r = random() * 10 + 2
      ctx.fillStyle = `rgba(255, 255, 255, ${random() * 0.2 + 0.05})`
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()
    }

    return new THREE.CanvasTexture(canvas)
  })()

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05
    }
  })

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.8, 48, 48]} />
        <meshPhongMaterial
          map={texture}
          transparent
          opacity={0.7}
          emissive={new THREE.Color("#0284C7")}
          emissiveIntensity={0.08}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[1.95, 32, 32]} />
        <meshBasicMaterial
          color="#38BDF8"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 3, 5]} intensity={0.5} />
      <pointLight position={[-3, -1, 2]} intensity={0.3} color="#38BDF8" />
    </group>
  )
}
