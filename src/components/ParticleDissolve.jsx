import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * ParticleDissolve: A dense particle cloud that mimics the character silhouette.
 * Controls the 'Dissolve' effect based on scroll position.
 */
export const ParticleDissolve = ({ count = 3000, dissolve = 0 }) => {
  const mesh = useRef()

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      // Create a capsule-like distribution for the silhouette
      const isHead = Math.random() > 0.4
      let x, y, z
      
      if (isHead) {
        // Head sphere
        const phi = Math.acos(-1 + (2 * Math.random()))
        const theta = Math.random() * Math.PI * 2
        const r = Math.random() * 0.7
        x = r * Math.sin(phi) * Math.cos(theta)
        y = (r * Math.sin(phi) * Math.sin(theta)) + 0.8
        z = r * Math.cos(phi)
      } else {
        // Body cylinder
        const r = Math.random() * 0.6
        const theta = Math.random() * Math.PI * 2
        x = r * Math.cos(theta)
        y = (Math.random() - 0.5) * 1.5 - 0.5
        z = r * Math.sin(theta)
      }

      positions.set([x, y, z], i * 3)
      // Random drift velocities for dissolving
      velocities.set([
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      ], i * 3)
    }
    return { positions, velocities }
  }, [count])

  // Update particle positions based on dissolve factor
  useFrame((state) => {
    if (!mesh.current) return
    const attr = mesh.current.geometry.attributes.position
    
    for (let i = 0; i < count; i++) {
      const ix = i * 3
      const iy = i * 3 + 1
      const iz = i * 3 + 2

      // Calculate new position: Base Position + (Velocity * Dissolve Factor)
      attr.array[ix] = positions[ix] + (velocities[ix] * dissolve)
      attr.array[iy] = positions[iy] + (velocities[iy] * dissolve * 1.5) // Scatter more on Y
      attr.array[iz] = positions[iz] + (velocities[iz] * dissolve)
    }
    attr.needsUpdate = true
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00f2ff"
        transparent
        opacity={1 - (dissolve * 2)} // Fade out as it dissolves
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
