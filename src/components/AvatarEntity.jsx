import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, RoundedBox, Float } from '@react-three/drei'
import * as THREE from 'three'

/**
 * AvatarEntity V2: Mechanical Morphing Character.
 * Built as a multipart assembly to allow for a physical "turning into compounds" transition.
 * Features joint-hubs (the spheres) that expand during the scroll morph.
 */
export const AvatarEntity = ({ morphFactor = 0, ...props }) => {
  const group = useRef()

  // Character Color Palette (1:1 Reel)
  const colors = {
    skin: '#fcc9b5',
    hair: '#4b3621',
    shirt: '#333333',
    pants: '#111111',
    shoes: '#ffffff',
    glow: '#00f2ff'
  }

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (group.current) {
       // Subtle breathing
       group.current.position.y = Math.sin(t * 1.5) * 0.05
    }
  })

  // Morph Logic Helper
  const getMorphPos = (basePos, factor, direction) => {
     return [
       basePos[0] + direction[0] * factor * 5,
       basePos[1] + direction[1] * factor * 5,
       basePos[2] + direction[2] * factor * 5
     ]
  }

  return (
    <group {...props} ref={group}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
        
        {/* 👱 HEAD ASSEMBLY */}
        <group position={getMorphPos([0, 0.85, 0], morphFactor, [0, 1, 0])}>
          <Sphere args={[0.65, 32, 32]} castShadow>
            <meshStandardMaterial color={colors.skin} roughness={0.6} transparent opacity={1 - morphFactor} />
          </Sphere>
          {/* Hair */}
          <mesh position={[0, 0.35, -0.1]}>
            <sphereGeometry args={[0.7, 32, 32, 0, Math.PI * 2, 0, Math.PI / 1.8]} />
            <meshStandardMaterial color={colors.hair} transparent opacity={1 - morphFactor} />
          </mesh>
          {/* Joint Hub (Compound) */}
          <Sphere args={[0.15, 16, 16]} position={[0, -0.6, 0]}>
             <meshStandardMaterial color={colors.glow} emissive={colors.glow} emissiveIntensity={2} />
          </Sphere>
        </group>

        {/* 🕴️ TORSO ASSEMBLY */}
        <group position={getMorphPos([0, -0.4, 0], morphFactor, [0, -0.5, -0.5])}>
          <mesh castShadow>
            <capsuleGeometry args={[0.55, 1, 32, 32]} />
            <meshStandardMaterial color={colors.shirt} roughness={0.7} transparent opacity={1 - morphFactor} />
          </mesh>
        </group>

        {/* 🦾 ARMS & SHOULDER HUBS */}
        {[[-0.75, 0.1, 0, [ -1, 0, 0]], [0.75, 0.1, 0, [1, 0, 0]]].map((arm, i) => (
          <group key={i} position={getMorphPos([arm[0], arm[1], arm[2]], morphFactor, arm[3])}>
            {/* Shoulder Compound */}
            <Sphere args={[0.2, 16, 16]}>
               <meshStandardMaterial color={colors.glow} emissive={colors.glow} emissiveIntensity={2 * morphFactor + 1} />
            </Sphere>
            {/* Arm Mesh */}
            <mesh rotation={[0, 0, i === 0 ? 0.2 : -0.2]} position={[0, -0.4, 0]} castShadow>
               <capsuleGeometry args={[0.15, 0.6, 16, 16]} />
               <meshStandardMaterial color={colors.shirt} transparent opacity={1 - morphFactor} />
            </mesh>
          </group>
        ))}

        {/* 🦵 LEGS & HIP HUBS */}
        {[[-0.3, -1.5, 0, [-0.5, -1, 0.5]], [0.3, -1.5, 0, [0.5, -1, 0.5]]].map((leg, i) => (
          <group key={i} position={getMorphPos([leg[0], leg[1], leg[2]], morphFactor, leg[3])}>
            {/* Hip Compound */}
            <Sphere args={[0.2, 16, 16]}>
               <meshStandardMaterial color={colors.glow} emissive={colors.glow} emissiveIntensity={2} />
            </Sphere>
            {/* Leg Mesh */}
            <mesh position={[0, -0.4, 0]} castShadow>
               <capsuleGeometry args={[0.18, 0.6, 16, 16]} />
               <meshStandardMaterial color={colors.pants} transparent opacity={1 - morphFactor} />
            </mesh>
            {/* 👟 Shoes (Glow Sole) */}
            <group position={[0, -0.8, 0.1]}>
              <RoundedBox args={[0.35, 0.25, 0.6]} radius={0.05}>
                <meshStandardMaterial color={colors.shoes} transparent opacity={1 - morphFactor} />
              </RoundedBox>
              <mesh position={[0, -0.15, 0]}>
                 <boxGeometry args={[0.38, 0.05, 0.62]} />
                 <meshBasicMaterial color={colors.glow} transparent opacity={1 - morphFactor} />
              </mesh>
            </group>
          </group>
        ))}

      </Float>
    </group>
  )
}
