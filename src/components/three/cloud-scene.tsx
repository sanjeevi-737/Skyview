"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface CloudSceneProps {
  density?: number
}

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

export function CloudScene({ density = 0.5 }: CloudSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const random = useMemo(() => seededRandom(123), [])

  const clouds = useMemo(() => {
    const count = Math.floor(density * 60)
    const positions: number[][] = []
    for (let i = 0; i < count; i++) {
      const theta = random() * Math.PI * 2
      const phi = random() * Math.PI
      const radius = 3 + random() * 1.5
      positions.push([
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi) * 0.3 + 0.5,
        radius * Math.sin(phi) * Math.sin(theta),
      ])
    }
    return positions
  }, [density, random])

  const cloudSizes = useMemo(() => {
    return clouds.map(() => 0.15 + random() * 0.25)
  }, [clouds, random])

  const cloudOpacities = useMemo(() => {
    return clouds.map(() => 0.15 + random() * 0.2)
  }, [clouds, random])

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.008
    }
  })

  return (
    <group ref={groupRef}>
      {clouds.map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[cloudSizes[i], 6, 6]} />
          <meshBasicMaterial
            color="#FFFFFF"
            transparent
            opacity={cloudOpacities[i]}
          />
        </mesh>
      ))}
    </group>
  )
}
