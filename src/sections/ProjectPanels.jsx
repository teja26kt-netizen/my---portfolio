import React from 'react'
import { Image, Float, Text } from '@react-three/drei'
import * as THREE from 'three'

const ProjectCard = ({ url, title, position, description }) => {
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={position}>
        {/* Frame */}
        <mesh position={[0, 0, -0.1]}>
          <planeGeometry args={[5.2, 3.2]} />
          <meshStandardMaterial color="#00f2ff" transparent opacity={0.1} />
        </mesh>
        
        {/* The Project Image */}
        <Image 
          url={url} 
          scale={[5, 3]} 
          toneMapped={false}
          transparent
          opacity={0.9}
        />

        {/* Info Overlay */}
        <Text
          position={[-2.5, -1.8, 0.1]}
          fontSize={0.3}
          color="#00f2ff"
          font="https://fonts.gstatic.com/s/jetbrainsmono/v18/t6nu21tuWSc-47bc86shxL_O_N_pG527.woff"
          anchorX="left"
        >
          {`[PROJECT_ID]: ${title.toUpperCase()}`}
        </Text>
        
        <Text
          position={[-2.5, -2.2, 0.1]}
          maxWidth={5}
          fontSize={0.15}
          color="white"
          font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZf9.woff"
          anchorX="left"
          opacity={0.7}
        >
          {description}
        </Text>

        {/* Glow effect */}
        <mesh position={[0, 0, -0.2]}>
          <planeGeometry args={[5.5, 3.5]} />
          <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={0.2} transparent opacity={0.1} />
        </mesh>
      </group>
    </Float>
  )
}

export const ProjectPanels = (props) => {
  const projects = [
    { 
      url: '/assets/tracker.png', 
      title: 'Global Tracker', 
      description: 'AI-powered goal tracking system with real-time analytics and predictive scheduling.',
      pos: [-4, 0, 0] 
    },
    { 
      url: '/assets/frenzy.png', 
      title: 'Crypto Frenzy', 
      description: 'Web3 dashboard for tracking high-volatility assets with custom alert protocols.',
      pos: [4, -4, 2] 
    },
  ]

  return (
    <group {...props}>
      {projects.map((project, i) => (
        <ProjectCard 
          key={project.title}
          url={project.url}
          title={project.title}
          description={project.description}
          position={project.pos}
        />
      ))}
      
      {/* Decorative environment for projects */}
      <gridHelper args={[30, 15, "#00f2ff", "#050510"]} position={[0, -5, 0]} />
    </group>
  )
}
