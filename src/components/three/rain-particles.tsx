"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

export function RainParticles() {
  const count = 500
  const meshRef = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const random = seededRandom(456)
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (random() - 0.5) * 20
      pos[i * 3 + 1] = random() * 10 - 2
      pos[i * 3 + 2] = (random() - 0.5) * 20 - 2
    }
    return pos
  }, [])

  const speeds = useMemo(() => {
    const random = seededRandom(456)
    const spd = new Float32Array(count)
    for (let i = 0; i < count; i++) spd[i] = 0.04 + random() * 0.08
    return spd
  }, [])

  useFrame(() => {
    if (!meshRef.current) return
    const pos = meshRef.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] -= speeds[i]
      if (pos[i * 3 + 1] < -4) {
        pos[i * 3] = (Math.random() - 0.5) * 20
        pos[i * 3 + 1] = 6
        pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 2
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        color="#88CCFF"
        size={0.04}
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  )
}
