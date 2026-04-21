import React from 'react'
import { Image, Float, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const ProjectPanel = ({ position, rotation, image, title, description, color }) => {
  return (
    <group position={position} rotation={rotation}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Neon Frame */}
        <mesh>
          <planeGeometry args={[5.2, 3.2]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.2} />
        </mesh>

        {/* 🖼 Project Image */}
        <Image 
          url={image} 
          scale={[5, 3]} 
          toneMapped={false}
          transparent
          opacity={0.9}
        />

        {/* Text Info (Floating slightly in front) */}
        <group position={[0, -2, 0.5]}>
          <Text
            fontSize={0.4}
            fontFamily="var(--font-display)"
            color="white"
            anchorX="center"
          >
            {title}
          </Text>
          <Text
            position={[0, -0.4, 0]}
            fontSize={0.2}
            color="var(--text-dim)"
            maxWidth={4}
            textAlign="center"
          >
            {description}
          </Text>
        </group>

        {/* HUD Decoration Lines */}
        <mesh position={[0, 1.8, 0]}>
          <planeGeometry args={[5, 0.02]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
        </mesh>
        <mesh position={[0, -2.5, 0]}>
          <planeGeometry args={[2, 0.02]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
        </mesh>
      </Float>
    </group>
  )
}

export const ProjectPanels = ({ position = [0, 0, 0] }) => {
  const projects = [
    {
      title: "LEARNING TRACKER",
      description: "Full-stack educational platform with AI mentorship and data visualization.",
      image: "/assets/tracker.png",
      color: "#00f2ff",
      pos: [-4, 0, 0],
      rot: [0, 0.2, 0]
    },
    {
      title: "FRENZY ECOMMERCE",
      description: "High-performance headless commerce engine with real-time stock sync.",
      image: "/assets/frenzy.png",
      color: "#7000ff",
      pos: [4, -2, -2],
      rot: [0, -0.2, 0]
    }
  ]

  return (
    <group position={position}>
      {projects.map((project, i) => (
        <ProjectPanel key={i} {...project} position={project.pos} rotation={project.rot} />
      ))}
    </group>
  )
}
