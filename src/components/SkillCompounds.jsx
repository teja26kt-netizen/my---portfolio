import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Sphere, Float } from '@react-three/drei'
import * as THREE from 'three'

/**
 * SkillCompounds: A glowing, connected network of technical skills.
 * Represents the 'Target State' of the cinematic transformation.
 */
export const SkillCompounds = ({ opacity = 1, scale = 1 }) => {
  const groupRef = useRef()

  const skills = [
    { name: 'React', color: '#00f2ff' },
    { name: 'Next.js', color: '#ffffff' },
    { name: 'Three.js', color: '#ff8c00' },
    { name: 'Node', color: '#33ff00' },
    { name: 'GLSL', color: '#00f2ff' },
    { name: 'Framer', color: '#e10098' }
  ]

  // Generate random stable positions for the nodes
  const nodes = useMemo(() => {
    return skills.map((skill, i) => {
      const angle = (i / skills.length) * Math.PI * 2
      const radius = 5 + Math.random() * 2
      return {
        ...skill,
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          (Math.random() - 0.5) * 3
        ]
      }
    })
  }, [])

  // Create connecting lines (compounds)
  const lines = useMemo(() => {
    const pts = []
    nodes.forEach((node, i) => {
      // Connect to the next node and the center
      const nextNode = nodes[(i + 1) % nodes.length]
      pts.push(new THREE.Vector3(...node.position))
      pts.push(new THREE.Vector3(...nextNode.position))
      
      pts.push(new THREE.Vector3(...node.position))
      pts.push(new THREE.Vector3(0, 0, 0))
    })
    return new THREE.BufferGeometry().setFromPoints(pts)
  }, [nodes])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
      groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.05
    }
  })

  return (
    <group ref={groupRef} scale={scale} visible={opacity > 0.01}>
      {/* 🕸 The Neural Mesh (Lines) */}
      <lineSegments geometry={lines}>
        <lineBasicMaterial 
          color="#00f2ff" 
          transparent 
          opacity={0.1 * opacity} 
          blending={THREE.AdditiveBlending} 
        />
      </lineSegments>

      {/* 🔮 Skill Nodes */}
      {nodes.map((node, i) => (
        <group key={i} position={node.position}>
          <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <Sphere args={[0.25, 16, 16]}>
              <meshStandardMaterial 
                color={node.color} 
                emissive={node.color} 
                emissiveIntensity={2 * opacity} 
                transparent 
                opacity={opacity}
              />
            </Sphere>
            <Text
              position={[0, 0.6, 0]}
              fontSize={0.4}
              color="white"
              anchorX="center"
              anchorY="middle"
              transparent
              opacity={opacity}
            >
              {node.name}
            </Text>
          </Float>
        </group>
      ))}

      {/* 🌀 Central Core Module */}
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial 
          color="#ff8c00" 
          emissive="#ff8c00" 
          emissiveIntensity={1 * opacity} 
          transparent 
          opacity={0.2 * opacity}
          wireframe
        />
      </Sphere>
    </group>
  )
}
