import React from 'react'
import { Float, Text, MeshDistortMaterial, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

/**
 * WorkspaceCard V2: Absolute High-Fidelity.
 * A professional-grade 3D vignette with realistic clutter and baked-style materials.
 * Matches the 1:1 'Mojo' workspace from the reel.
 */
export const WorkspaceCard = (props) => {
  const codeSnippet = `
import { Canvas } from '@react-three/fiber'
// ABSOLUTE HIGH-FIDELITY RECONSTRUCTION
export const Experience = () => {
  return (
    <Canvas>
       <MojoBoy />
       <DetailedRoom />
    </Canvas>
  )
}`

  return (
    <group {...props}>
      {/* 💳 The Floating Card Stage (Matte Material) */}
      <RoundedBox args={[14, 8, 0.4]} radius={0.4} smoothness={4}>
        <meshStandardMaterial color="#f0ede5" roughness={0.5} />
      </RoundedBox>

      {/* 🧱 Room Elements */}
      <group position={[0, -0.5, 0.3]}>
        
        {/* 🪑 The Desk (Professional Model) */}
        <group position={[0, -1, 1.5]}>
          {/* Top */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[10, 0.2, 4]} />
            <meshStandardMaterial color="#ffffff" metalness={0.1} />
          </mesh>
          {/* Leg Support */}
          <mesh position={[-4.5, -1.9, 0]}>
             <cylinderGeometry args={[0.1, 0.1, 4]} />
             <meshStandardMaterial color="#ddd" />
          </mesh>
          <mesh position={[4.5, -1.9, 0]}>
             <cylinderGeometry args={[0.1, 0.1, 4]} />
             <meshStandardMaterial color="#ddd" />
          </mesh>
        </group>

        {/* 🖥️ Dual Monitor Setup (Beveled) */}
        <group position={[-2, 0.8, -1]}>
          <RoundedBox args={[3, 2, 0.15]} radius={0.05}>
            <meshStandardMaterial color="#1a1a1a" />
          </RoundedBox>
          <mesh position={[0, 0, 0.08]}>
            <planeGeometry args={[2.8, 1.8]} />
            <meshBasicMaterial color="#020205" />
          </mesh>
        </group>

        <group position={[2, 0.8, -1]} rotation={[0, -0.2, 0]}>
          <RoundedBox args={[3, 2, 0.15]} radius={0.05}>
            <meshStandardMaterial color="#1a1a1a" />
          </RoundedBox>
          <mesh position={[0, 0, 0.08]}>
            <planeGeometry args={[2.8, 1.8]} />
            <meshBasicMaterial color="#020205" />
          </mesh>
        </group>

        {/* 💻 Laptop (Glow Focused) */}
        <group position={[0, -0.6, 2.5]} rotation={[-0.1, 0.2, 0]}>
          <mesh castShadow>
            <boxGeometry args={[2.5, 0.08, 1.5]} />
            <meshStandardMaterial color="#333" />
          </mesh>
          <group position={[0, 0, -0.75]} rotation={[-Math.PI / 2.8, 0, 0]}>
            <mesh castShadow>
              <boxGeometry args={[2.5, 1.5, 0.08]} />
              <meshStandardMaterial color="#222" />
            </mesh>
            <Text
              position={[0, 0, 0.05]}
              fontSize={0.08}
              color="#ff8c00"
              maxWidth={2.2}
              textAlign="left"
              anchorX="center"
              anchorY="middle"
            >
              {codeSnippet}
            </Text>
          </group>
        </group>

        {/* 🐧 The Penguin (Linux Mascot) */}
        <group position={[-1.2, -0.6, -0.5]}>
           <mesh castShadow>
              <sphereGeometry args={[0.25, 32, 32]} />
              <meshStandardMaterial color="#000" />
           </mesh>
           <mesh position={[0, -0.15, 0.1]}>
              <sphereGeometry args={[0.15, 32, 32]} />
              <meshStandardMaterial color="#fff" />
           </mesh>
           {/* Eyes & Beak */}
           <mesh position={[0.08, 0, 0.22]}>
              <sphereGeometry args={[0.03, 16, 16]} />
              <meshStandardMaterial color="#000" />
           </mesh>
           <mesh position={[-0.08, 0, 0.22]}>
              <sphereGeometry args={[0.03, 16, 16]} />
              <meshStandardMaterial color="#000" />
           </mesh>
           <mesh position={[0, -0.1, 0.25]}>
              <coneGeometry args={[0.05, 0.1]} rotation={[-Math.PI/2, 0, 0]} />
              <meshStandardMaterial color="#ffa500" />
           </mesh>
        </group>

        {/* 🌿 High-Clarity 3D Plants */}
        {[
          { pos: [-4.2, -0.6, 0.5], color: '#3f6212' },
          { pos: [4, -0.6, 2], color: '#4d7c0f' }
        ].map((plant, i) => (
          <group key={i} position={plant.pos}>
            <mesh castShadow>
              <cylinderGeometry args={[0.4, 0.3, 0.8]} />
              <meshStandardMaterial color="#d1d5db" />
            </mesh>
            <group position={[0, 0.8, 0]}>
               {[...Array(5)].map((_, j) => (
                 <mesh key={j} position={[0, j * 0.3, 0]} rotation={[0, j * 0.8, 0]}>
                   <sphereGeometry args={[0.4, 16, 16]} scale={[1, 1.5, 0.5]} />
                   <MeshDistortMaterial color={plant.color} speed={2} distort={0.2} radius={1} />
                 </mesh>
               ))}
            </group>
          </group>
        ))}

        {/* 🔌 Detail Clutter: Cables */}
        <group opacity={0.5}>
           <mesh position={[-1, -0.7, -0.8]} rotation={[0, 0.2, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 2.5]} rotation={[0, 0, Math.PI / 2]} />
              <meshStandardMaterial color="#111" />
           </mesh>
        </group>

      </group>
    </group>
  )
}
