"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function SunGlow() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const pulse = 0.6 + Math.sin(state.clock.elapsedTime * 0.3) * 0.15
      const mat = meshRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = pulse
    }
  })

  return (
    <group position={[-4, 3, -5]}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshBasicMaterial
          color="#FBBF24"
          transparent
          opacity={0.8}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[1.2, 16, 16]} />
        <meshBasicMaterial
          color="#F59E0B"
          transparent
          opacity={0.15}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[2, 16, 16]} />
        <meshBasicMaterial
          color="#F59E0B"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}
