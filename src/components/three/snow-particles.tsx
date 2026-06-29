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

export function SnowParticles() {
  const count = 300
  const meshRef = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const random = seededRandom(789)
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (random() - 0.5) * 20
      pos[i * 3 + 1] = random() * 10 - 2
      pos[i * 3 + 2] = (random() - 0.5) * 20 - 2
    }
    return pos
  }, [])

  const offsets = useMemo(() => {
    const random = seededRandom(101)
    const off = new Float32Array(count)
    for (let i = 0; i < count; i++) off[i] = random() * Math.PI * 2
    return off
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const pos = meshRef.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      pos[i * 3] += Math.sin(state.clock.elapsedTime * 0.5 + offsets[i]) * 0.002
      pos[i * 3 + 1] -= 0.015
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
        color="#FFFFFF"
        size={0.06}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}
