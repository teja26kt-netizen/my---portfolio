import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, Scroll, Environment, Sparkles, Html, useScroll, Float } from '@react-three/drei'
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing'
import * as THREE from 'three'

// Local Components
import { CinematicCamera } from './CinematicCamera'
import { ViewportHUD } from './ViewportHUD'
import { AvatarEntity } from './AvatarEntity'
import { ParticleDissolve } from './ParticleDissolve'
import { SkillCompounds } from './SkillCompounds'
import { AudioManager } from './AudioManager'
import { HolographicArtifacts } from './HolographicArtifacts'

// Sections
import { WorkspaceCard } from '../sections/WorkspaceCard'

/**
 * SceneLogic: The 'Absolute High-Fidelity' Cinematic Stage.
 * Reconstructed 1:1 with a floating card room and a boy that physically morphs 
 * into technical 'Compounds' during the scroll journey.
 */
const SceneLogic = () => {
  const scroll = useScroll()
  const avatarGroup = useRef()

  useFrame((state) => {
    const offset = scroll.offset
    
    // 🎭 Absolute 1:1 Morph Logic:
    // Morph Factor 0-1 (Mechanical character expansion)
    const morph = THREE.MathUtils.smoothstep(offset, 0.05, 0.6)
    
    // Dissolve Factor (Particles appearing)
    const dissolve = THREE.MathUtils.smoothstep(offset, 0.1, 0.7)
    
    // Skill Emerge
    const evolve = THREE.MathUtils.smoothstep(offset, 0.5, 0.9)

    // Apply Background Shift (Warm -> Tech Cyan)
    state.scene.background = new THREE.Color().lerpColors(
      new THREE.Color('#f0ede5'), 
      new THREE.Color('#01050f'), 
      evolve
    )
  })

  return (
    <group>
       {/* 🏫 THE STAGE (Absolute Fidelity Workspace Card) */}
       <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.1}>
          <WorkspaceCard position={[0, 1.5, -6]} rotation={[0.1, -0.25, 0]} scale={1.8} />
       </Float>

       {/* 🕴️ THE MECHANICAL HERO (Multipart Morphing Boy) */}
       <AvatarEntity 
          position={[0, -2.5, 2.5]} 
          morphFactor={THREE.MathUtils.smoothstep(scroll.offset, 0, 0.6)} 
       />
       
       {/* ✨ Technical Dissolve System */}
       <ParticleDissolve 
          dissolve={THREE.MathUtils.smoothstep(scroll.offset, 0.1, 0.6)} 
          count={10000} 
       />

       {/* 🕸️ The Compounds (Absolute Skill Mesh) */}
       <SkillCompounds 
          opacity={THREE.MathUtils.smoothstep(scroll.offset, 0.6, 1.0)} 
          scale={THREE.MathUtils.lerp(0.1, 1.5, THREE.MathUtils.smoothstep(scroll.offset, 0.5, 0.9))}
          position={[0, 0, 0]}
       />

       {/* 🛸 Project Artifacts */}
       <HolographicArtifacts />
       
       {/* 🌍 Atmosphere */}
       <Sparkles count={500} scale={25} size={1} speed={0.5} color="#00f2ff" />
       
    </group>
  )
}

export const Experience = () => {
  return (
    <div className="canvas-container">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 15], fov: 35 }}>
        <color attach="background" args={['#f0ede5']} />
        
        {/* Cinematic Studio Lighting V2 (Absolute Fidelity) */}
        <ambientLight intensity={0.5} />
        <spotLight position={[15, 15, 15]} angle={0.3} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, 0, 10]} color="#00f2ff" intensity={0.5} />

        <Suspense fallback={<Html center>STABILIZING_UNIVERSE...</Html>}>
          <Environment preset="studio" />
          
          <ScrollControls pages={5} damping={0.1}>
            <CinematicCamera />
            
            <SceneLogic />

            <EffectComposer disableNormalPass>
              <Bloom luminanceThreshold={1.2} mipmapBlur intensity={0.5} radius={0.5} />
              <Noise opacity={0.02} />
            </EffectComposer>

            <Scroll html>
              <ViewportHUD />
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
      
      <AudioManager />
      
      {/* 🎞️ Cinematic Framing */}
      <div className="letterbox top" />
      <div className="letterbox bottom" />
      <div className="radial-glow" />
    </div>
  )
}
