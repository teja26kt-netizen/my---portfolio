import React, { useMemo } from 'react'
import { Float, Text, MeshWobbleMaterial } from '@react-three/drei'
import * as THREE from 'three'

/**
 * WorkspaceCard: An isometric office vignette.
 * Features a cream card base, stylized desk, and high-clarity details.
 */
export const WorkspaceCard = (props) => {
  // Realistic React Code for the Laptop
  const codeSnippet = `
import { Canvas } from '@react-three/fiber'

export const Experience = () => {
  return (
    <Canvas>
      <Avatar />
      <Workspace />
    </Canvas>
  )
}`

  return (
    <group {...props}>
      {/* 💳 The Floating Beige Card */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={[12, 0.5, 8]} />
        <meshStandardMaterial color="#f4f1ea" roughness={0.1} />
      </mesh>

      {/* 🖥️ Stylized Desk Setup */}
      <group position={[0, 0.3, 0]}>
        {/* Table Top */}
        <mesh position={[0, 0.2, 0]} castShadow>
          <boxGeometry args={[8, 0.1, 4]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>

        {/* Monitors (Twin Setup) */}
        <group position={[-1.5, 0.8, -1.2]}>
          <mesh castShadow>
            <boxGeometry args={[2.5, 1.5, 0.1]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
          <mesh position={[0, 0, 0.06]}>
            <planeGeometry args={[2.3, 1.3]} />
            <meshBasicMaterial color="#050a1f" />
          </mesh>
        </group>

        <group position={[1.5, 0.8, -1.2]} rotation={[0, -0.2, 0]}>
          <mesh castShadow>
            <boxGeometry args={[2.5, 1.5, 0.1]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
          <mesh position={[0, 0, 0.06]}>
            <planeGeometry args={[2.3, 1.3]} />
            <meshBasicMaterial color="#0b1a3d" />
          </mesh>
        </group>

        {/* 💻 Laptop with "HD" Code */}
        <group position={[0, 0.3, 0.5]} rotation={[0, 0.3, 0]}>
          <mesh castShadow>
            <boxGeometry args={[1.8, 0.05, 1.2]} />
            <meshStandardMaterial color="#333" />
          </mesh>
          <group position={[0, 0, -0.6]} rotation={[-Math.PI / 4, 0, 0]}>
            <mesh castShadow>
              <boxGeometry args={[1.8, 1.2, 0.05]} />
              <meshStandardMaterial color="#222" />
            </mesh>
            {/* Screen Content */}
            <mesh position={[0, 0, 0.03]}>
              <planeGeometry args={[1.7, 1.1]} />
              <meshBasicMaterial color="#111" />
            </mesh>
            <Text
              position={[0, 0, 0.04]}
              fontSize={0.06}
              color="#00f2ff"
              maxWidth={1.5}
              textAlign="left"
              anchorX="center"
              anchorY="middle"
              anchorY="middle"
            >
              {codeSnippet}
            </Text>
          </group>
        </group>

        {/* 🌿 HD Stylized Plants */}
        {[
          { pos: [-3.5, 0.2, -1.5], color: '#4d7c0f' },
          { pos: [3.2, 0.2, 1.2], color: '#65a30d' }
        ].map((plant, i) => (
          <group key={i} position={plant.pos}>
            <mesh castShadow>
              <cylinderGeometry args={[0.3, 0.2, 0.5]} />
              <meshStandardMaterial color="#e5e7eb" />
            </mesh>
            <group position={[0, 0.3, 0]}>
              {[...Array(5)].map((_, j) => (
                <mesh key={j} rotation={[Math.random(), Math.random(), Math.random()]} position={[0, 0.1 * j, 0]}>
                  <sphereGeometry args={[0.2, 16, 16]} />
                  <MeshWobbleMaterial color={plant.color} speed={1} factor={0.2} />
                </mesh>
              ))}
            </group>
          </group>
        ))}
      </group>

      {/* 🏷️ Card Accents */}
      <mesh position={[-5, 0.26, 3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.8, 0.8]} />
        <meshBasicMaterial color="#ff8c00" transparent opacity={0.2} />
      </mesh>
    </group>
  )
}
