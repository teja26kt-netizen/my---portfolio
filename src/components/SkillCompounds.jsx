import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Sphere, Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

/**
 * SkillCompounds V2: The 'Absolute High-Fidelity' Skill Network.
 * Reconstructed as a dense, high-impact 'Cyber Core' that blooms into existence 
 * during the cinematic character morph.
 */
export const SkillCompounds = ({ opacity = 1, scale = 1 }) => {
  const groupRef = useRef()

  const skills = [
    { name: 'REACT', color: '#00f2ff', pos: [2, 2, 0] },
    { name: 'THREE.JS', color: '#ff8c00', pos: [-2, 2, 0] },
    { name: 'NEXT.JS', color: '#ffffff', pos: [0, -3, 0] },
    { name: 'GLSL', color: '#00f2ff', pos: [3, -1, 0] },
    { name: 'NODE', color: '#33ff00', pos: [-3, -1, 0] },
    { name: 'FRAMER', color: '#e10098', pos: [0, 3, 0] }
  ]

  // Dense Bond Geometry
  const lines = useMemo(() => {
    const pts = []
    skills.forEach((skill, i) => {
      // Connect every node to its neighbors and the center
      const nextSkill = skills[(i + 1) % skills.length]
      pts.push(new THREE.Vector3(0, 0, 0))
      pts.push(new THREE.Vector3(...skill.pos))
      pts.push(new THREE.Vector3(...skill.pos))
      pts.push(new THREE.Vector3(...nextSkill.pos))
    })
    return new THREE.BufferGeometry().setFromPoints(pts)
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
      groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1
    }
  })

  return (
    <group ref={groupRef} scale={scale} visible={opacity > 0.01}>
      {/* 🌀 The Core (Luminous Module) */}
      <mesh>
        <octahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial 
          color="#00f2ff" 
          emissive="#00f2ff" 
          emissiveIntensity={2 * opacity} 
          transparent 
          opacity={0.4 * opacity} 
          wireframe 
        />
      </mesh>
      
      <Sphere args={[0.5, 32, 32]}>
         <MeshDistortMaterial color="#00f2ff" speed={5} distort={0.5} radius={1} />
      </Sphere>

      {/* 🕸️ The Technical Bonds */}
      <lineSegments geometry={lines}>
        <lineBasicMaterial 
          color="#00f2ff" 
          transparent 
          opacity={0.2 * opacity} 
          blending={THREE.AdditiveBlending} 
        />
      </lineSegments>

      {/* 🔮 Primary Compounds (Skill Spheres) */}
      {skills.map((skill, i) => (
        <group key={i} position={skill.pos}>
          <Float speed={3} rotationIntensity={1} floatIntensity={1}>
            <Sphere args={[0.4, 32, 32]}>
               <meshStandardMaterial 
                 color={skill.color} 
                 emissive={skill.color} 
                 emissiveIntensity={1.5 * opacity}
                 transparent 
                 opacity={0.8 * opacity}
               />
            </Sphere>
            <Text
              position={[0, 0.8, 0]}
              fontSize={0.4}
              color="white"
              fontWeight={900}
              transparent
              opacity={opacity}
            >
              {skill.name}
            </Text>
            {/* Inner Detail */}
            <mesh>
               <boxGeometry args={[0.2, 0.2, 0.2]} />
               <meshBasicMaterial color="white" wireframe transparent opacity={0.2 * opacity} />
            </mesh>
          </Float>
        </group>
      ))}
    </group>
  )
}
