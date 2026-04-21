import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, MeshWobbleMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

export const HeroSection = (props) => {
  const group = useRef()

  useFrame((state) => {
    group.current.rotation.y = state.clock.getElapsedTime() * 0.2
    group.current.rotation.z = state.clock.getElapsedTime() * 0.1
  })

  return (
    <group ref={group} {...props}>
      {/* Central Core */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <MeshDistortMaterial
          color="#00f2ff"
          speed={2}
          distort={0.4}
          radius={1}
          emissive="#00f2ff"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Orbiting Rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3, 0.05, 16, 100]} />
        <meshStandardMaterial color="#7000ff" emissive="#7000ff" emissiveIntensity={2} />
      </mesh>
      
      <mesh rotation={[0, Math.PI / 4, 0]}>
        <torusGeometry args={[3.5, 0.02, 16, 100]} />
        <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={1} />
      </mesh>

      {/* Floating Particles/Nodes */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Float key={i} speed={2} rotationIntensity={2} floatIntensity={2}>
          <mesh position={[
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 8
          ]}>
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshStandardMaterial color={i % 2 === 0 ? "#00f2ff" : "#7000ff"} emissive={i % 2 === 0 ? "#00f2ff" : "#7000ff"} emissiveIntensity={2} />
          </mesh>
        </Float>
      ))}

      {/* Grid Floor for depth */}
      <gridHelper args={[20, 20, "#7000ff", "#101020"]} position={[0, -5, 0]} rotation={[0, 0, 0]} />
    </group>
  )
}
