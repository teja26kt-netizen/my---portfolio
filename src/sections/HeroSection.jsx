import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float, Box } from '@react-three/drei'
import * as THREE from 'three'

/**
 * HeroSection: The "Cyber-Core" centerpiece.
 * Abstract 3D geometry representing the core of the portfolio.
 */
export const HeroSection = () => {
  const coreRef = useRef()
  const ring1Ref = useRef()
  const ring2Ref = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    // Core rotation
    if (coreRef.current) {
      coreRef.current.rotation.x = time * 0.2
      coreRef.current.rotation.y = time * 0.3
    }

    // Orbiting rings rotation
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = time * 0.5
      ring1Ref.current.rotation.x = time * 0.2
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -time * 0.3
      ring2Ref.current.rotation.y = time * 0.4
    }
  })

  return (
    <group>
      {/* 🔮 Central Core Entity */}
      <Float speed={5} rotationIntensity={2} floatIntensity={2}>
        <mesh ref={coreRef} castShadow>
          <icosahedronGeometry args={[2, 15]} />
          <MeshDistortMaterial 
            color="#00f2ff" 
            speed={2} 
            distort={0.4} 
            radius={1}
            emissive="#004455"
            emissiveIntensity={0.5}
            roughness={0}
            metalness={1}
          />
        </mesh>
      </Float>

      {/* 💫 Technical Orbit Rings */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[3.5, 0.02, 16, 100]} />
        <meshStandardMaterial color="#7000ff" emissive="#7000ff" emissiveIntensity={2} />
      </mesh>

      <mesh ref={ring2Ref} rotation={[-Math.PI / 4, Math.PI / 2, 0]}>
        <torusGeometry args={[4.2, 0.015, 16, 100]} />
        <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={2} />
      </mesh>

      {/* 💠 Data Bits (Small floating cubes) */}
      {[...Array(50)].map((_, i) => (
        <Float key={i} speed={Math.random() * 2} rotationIntensity={2} floatIntensity={2}>
          <Box 
            args={[0.05, 0.05, 0.05]} 
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10
            ]}
          >
            <meshStandardMaterial 
              color={i % 2 === 0 ? "#00f2ff" : "#7000ff"} 
              emissive={i % 2 === 0 ? "#00f2ff" : "#7000ff"} 
              emissiveIntensity={1}
            />
          </Box>
        </Float>
      ))}
    </group>
  )
}
