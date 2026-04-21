import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Float, Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

/**
 * SkillsOrbit: Interactive 3D skill ecosystem.
 * Rotating nodes representing different technical capabilities.
 */
export const SkillsOrbit = ({ position = [0, 0, 0] }) => {
  const groupRef = useRef()

  const skills = [
    { name: 'React', color: '#00f2ff' },
    { name: 'Next.js', color: '#ffffff' },
    { name: 'Three.js', color: '#7000ff' },
    { name: 'Node.js', color: '#33ff00' },
    { name: 'GraphQL', color: '#e10098' },
    { name: 'PostgreSQL', color: '#336791' },
    { name: 'WebGL', color: '#990000' },
    { name: 'Tailwind', color: '#38b2ac' }
  ]

  // Pre-calculate orbit positions
  const skillNodes = useMemo(() => {
    return skills.map((skill, i) => {
      const angle = (i / skills.length) * Math.PI * 2
      const radius = 6 + Math.random() * 2
      return {
        ...skill,
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          (Math.random() - 0.5) * 2
        ],
        speed: 0.2 + Math.random() * 0.5
      }
    })
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1
      groupRef.current.rotation.z = Math.sin(time * 0.2) * 0.1
    }
  })

  return (
    <group position={position}>
      {/* 🌌 Central Knowledge Core */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <MeshDistortMaterial color="#7000ff" speed={1.5} distort={0.3} emissive="#330066" />
      </mesh>

      <group ref={groupRef}>
        {skillNodes.map((skill, i) => (
          <Float key={i} speed={2} rotationIntensity={1} floatIntensity={1}>
            <group position={skill.position}>
              {/* Skill Node */}
              <Sphere args={[0.3, 16, 16]}>
                <meshStandardMaterial 
                  color={skill.color} 
                  emissive={skill.color} 
                  emissiveIntensity={2} 
                />
              </Sphere>

              {/* Skill Text */}
              <Text
                position={[0, 0.7, 0]}
                fontSize={0.4}
                color="white"
                font="/fonts/Inter-Bold.woff" // Fallback to system font if not provided
                anchorX="center"
                anchorY="middle"
              >
                {skill.name}
              </Text>

              {/* Connecting Line to Center */}
              <line>
                <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints([
                  new THREE.Vector3(0, 0, 0),
                  new THREE.Vector3(-skill.position[0], -skill.position[1], -skill.position[2])
                ])} />
                <lineBasicMaterial attach="material" color={skill.color} transparent opacity={0.2} />
              </line>
            </group>
          </Float>
        ))}
      </group>

      {/* 🕸 Grid Floor (Atmosphere) */}
      <gridHelper args={[50, 50, '#111', '#050510']} position={[0, -5, 0]} rotation={[0, 0, 0]} />
    </group>
  )
}
