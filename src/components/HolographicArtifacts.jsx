import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll, Image, Float, Text } from '@react-three/drei'
import * as THREE from 'three'

/**
 * HolographicArtifacts: Floating project panels that orbit the skill mesh.
 * Only appears at the final stage of the cinematic morph.
 */
export const HolographicArtifacts = () => {
  const scroll = useScroll()
  const groupRef = useRef()

  const projects = [
    { name: 'LEARNING_TRACKER', image: '/assets/tracker.png' },
    { name: 'CODE_FRENZY', image: '/assets/frenzy.png' }
  ]

  useFrame((state) => {
    const offset = scroll.offset
    if (!groupRef.current) return

    // Show only at the end (0.8 - 1.0)
    const visibility = THREE.MathUtils.smoothstep(offset, 0.7, 0.9)
    groupRef.current.visible = visibility > 0.01
    groupRef.current.scale.setScalar(visibility)
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
  })

  return (
    <group ref={groupRef}>
      {projects.map((project, i) => {
        const angle = (i / projects.length) * Math.PI * 2
        const radius = 8
        return (
          <group 
            key={i} 
            position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]} 
            rotation={[0, -angle + Math.PI / 2, 0]}
          >
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
              <Image 
                url={project.image} 
                scale={[4, 2.5]} 
                transparent 
                opacity={0.8}
                toneMapped={false}
              />
              <Text
                position={[0, -1.8, 0]}
                fontSize={0.3}
                color="white"
                anchorY="middle"
              >
                {project.name}
              </Text>
              
              {/* Holographic Frame */}
              <mesh>
                <boxGeometry args={[4.2, 2.7, 0.05]} />
                <meshBasicMaterial color="#00f2ff" wireframe transparent opacity={0.2} />
              </mesh>
            </Float>
          </group>
        )
      })}
    </group>
  )
}
