import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Sphere } from '@react-three/drei'
import * as THREE from 'three'

/**
 * AvatarEntity: A stylized 3D character built from primitives.
 * Designed to mimic the high-end 'Mojo' style in the user's reel.
 */
export const AvatarEntity = (props) => {
  const charGroup = useRef()

  // Subtle breathing/floating animation
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (charGroup.current) {
      charGroup.current.position.y = Math.sin(t * 1.5) * 0.1
      charGroup.current.rotation.y = Math.sin(t * 0.5) * 0.1
    }
  })

  return (
    <group {...props}>
      {/* 🔵 Glowing Base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.4, 0]}>
        <ringGeometry args={[1.2, 1.5, 64]} />
        <meshBasicMaterial color="#00f2ff" transparent opacity={0.8} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.41, 0]}>
        <circleGeometry args={[1.5, 64]} />
        <meshBasicMaterial color="#00f2ff" transparent opacity={0.1} />
      </mesh>

      <group ref={charGroup}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          {/* 🕴️ Main Body */}
          <mesh castShadow position={[0, -0.5, 0]}>
            <capsuleGeometry args={[0.6, 1.2, 32, 32]} />
            <meshStandardMaterial color="#333" roughness={0.3} />
          </mesh>

          {/* 👱 Head */}
          <group position={[0, 0.8, 0]}>
            <Sphere args={[0.7, 64, 64]} castShadow>
              <meshStandardMaterial color="#fcc" roughness={0.5} />
            </Sphere>
            
            {/* 👀 Eyes */}
            <group position={[0, 0.1, 0.55]}>
              <mesh position={[-0.25, 0, 0]}>
                <sphereGeometry args={[0.12, 32, 32]} />
                <meshStandardMaterial color="#fff" />
                <mesh position={[0, 0, 0.08]}>
                  <sphereGeometry args={[0.06, 32, 32]} />
                  <meshStandardMaterial color="#000" />
                </mesh>
              </mesh>
              <mesh position={[0.25, 0, 0]}>
                <sphereGeometry args={[0.12, 32, 32]} />
                <meshStandardMaterial color="#fff" />
                <mesh position={[0, 0, 0.08]}>
                  <sphereGeometry args={[0.06, 32, 32]} />
                  <meshStandardMaterial color="#000" />
                </mesh>
              </mesh>
            </group>

            {/* 🎩 Hair/Hat Styled Element */}
            <mesh position={[0, 0.4, -0.1]}>
              <sphereGeometry args={[0.75, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
              <meshStandardMaterial color="#444" />
            </mesh>
          </group>

          {/* 🦾 Arms */}
          <group position={[-0.8, -0.2, 0]} rotation={[0, 0, 0.2]}>
            <mesh castShadow>
              <capsuleGeometry args={[0.15, 0.8, 16, 16]} />
              <meshStandardMaterial color="#333" />
            </mesh>
          </group>
          <group position={[0.8, -0.2, 0]} rotation={[0, 0, -0.2]}>
            <mesh castShadow>
              <capsuleGeometry args={[0.15, 0.8, 16, 16]} />
              <meshStandardMaterial color="#333" />
            </mesh>
          </group>

          {/* 🦵 Legs with Glowing Shoes */}
          <group position={[-0.35, -1.8, 0]}>
            <mesh castShadow>
              <capsuleGeometry args={[0.18, 0.8, 16, 16]} />
              <meshStandardMaterial color="#222" />
            </mesh>
            <mesh position={[0, -0.4, 0.1]}>
              <boxGeometry args={[0.4, 0.25, 0.6]} />
              <meshStandardMaterial color="#fff" />
              {/* Blue Glow on Shoes */}
              <mesh position={[0, -0.1, 0]}>
                <boxGeometry args={[0.42, 0.05, 0.62]} />
                <meshBasicMaterial color="#00f2ff" />
              </mesh>
            </mesh>
          </group>

          <group position={[0.35, -1.8, 0]}>
            <mesh castShadow>
              <capsuleGeometry args={[0.18, 0.8, 16, 16]} />
              <meshStandardMaterial color="#222" />
            </mesh>
            <mesh position={[0, -0.4, 0.1]}>
              <boxGeometry args={[0.4, 0.25, 0.6]} />
              <meshStandardMaterial color="#fff" />
              <mesh position={[0, -0.1, 0]}>
                <boxGeometry args={[0.42, 0.05, 0.62]} />
                <meshBasicMaterial color="#00f2ff" />
              </mesh>
            </mesh>
          </group>
        </Float>
      </group>
    </group>
  )
}
