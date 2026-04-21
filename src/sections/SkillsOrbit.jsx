import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

const SkillNode = ({ name, position, color }) => {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh position={position}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
        <Text
          position={[0, 1, 0]}
          fontSize={0.4}
          color="white"
          font="https://fonts.gstatic.com/s/outfit/v11/QGYsz_MVcBeNP4NJtEtq.woff"
          anchorX="center"
          anchorY="middle"
        >
          {name}
        </Text>
      </mesh>
    </Float>
  )
}

export const SkillsOrbit = (props) => {
  const group = useRef()
  const skills = [
    { name: 'React', color: '#61dafb' },
    { name: 'Node.js', color: '#68a063' },
    { name: 'Three.js', color: '#ffffff' },
    { name: 'Next.js', color: '#ffffff' },
    { name: 'MongoDB', color: '#47a248' },
    { name: 'Tailwind', color: '#38b2ac' },
  ]

  useFrame((state) => {
    group.current.rotation.y = state.clock.getElapsedTime() * 0.1
  })

  return (
    <group ref={group} {...props}>
      {/* Central "Server" shape */}
      <mesh>
        <boxGeometry args={[2, 3, 2]} />
        <MeshDistortMaterial color="#101015" speed={5} distort={0.2} radius={1} />
        <gridHelper args={[4, 4, "#00f2ff", "#7000ff"]} rotation={[Math.PI / 2, 0, 0]} />
      </mesh>

      {/* Orbiting Skills */}
      {skills.map((skill, i) => {
        const angle = (i / skills.length) * Math.PI * 2
        const radius = 6
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        return (
          <SkillNode 
            key={skill.name} 
            name={skill.name} 
            position={[x, 0, z]} 
            color={skill.color} 
          />
        )
      })}

      {/* Wiring/Lines */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[5.8, 6, 64]} />
        <meshStandardMaterial color="#00f2ff" transparent opacity={0.2} />
      </mesh>
    </group>
  )
}
