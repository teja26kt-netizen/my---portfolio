import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, Scroll, Environment, Sparkles, Html, useScroll } from '@react-three/drei'
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
 * TransitionManager: Handles the 'Boy -> Compounds' morph based on scroll.
 */
const TransitionManager = () => {
  const scroll = useScroll()
  const avatarGroup = useRef()
  const compoundGroup = useRef()
  const particleGroup = useRef()

  useFrame((state) => {
    const offset = scroll.offset
    
    // 🎭 Morph Phases:
    // Phase 1 (0.0 - 0.3): Character is solid, Room is visible.
    // Phase 2 (0.3 - 0.7): Character dissolves, Compounds emerge.
    // Phase 3 (0.7 - 1.0): Compounds fully active, Character gone.

    const dissolveFactor = THREE.MathUtils.smoothstep(offset, 0.2, 0.7)
    const compoundOpacity = THREE.MathUtils.smoothstep(offset, 0.4, 0.9)
    const compoundScale = THREE.MathUtils.lerp(0.5, 1.2, compoundOpacity)
    
    if (avatarGroup.current) {
      avatarGroup.current.visible = dissolveFactor < 0.9
      avatarGroup.current.children[0].opacity = 1 - (dissolveFactor * 2) 
    }
  })

  return (
    <group>
      {/* 🏫 Background Room (Workspace) */}
      <WorkspaceCard position={[0, 1.5, -6]} rotation={[0.2, -0.2, 0]} scale={2.5} />

      {/* 🕴️ Central Character & Dissolve Particles */}
      <group position={[0, -2, 0]}>
        <Scroll>
           <SceneLogic />
        </Scroll>
      </group>
    </group>
  )
}

/**
 * SceneLogic: Encapsulates the animated states.
 */
const SceneLogic = () => {
  const scroll = useScroll()
  const particleRef = useRef()
  const compoundRef = useRef()
  const avatarRef = useRef()

  useFrame(() => {
    const offset = scroll.offset
    
    // Character Fade/Dissolve
    const dissolve = THREE.MathUtils.smoothstep(offset, 0.2, 0.6)
    const compoundShow = THREE.MathUtils.smoothstep(offset, 0.5, 1.0)
    
    if (avatarRef.current) avatarRef.current.visible = dissolve < 0.5
  })

  return (
    <group>
       <group ref={avatarRef}>
          <AvatarEntity position={[0, 0, 0]} />
       </group>
       
       <ParticleDissolve 
          dissolve={THREE.MathUtils.smoothstep(scroll.offset, 0.2, 0.8)} 
          count={5000} 
       />

       <SkillCompounds 
          opacity={THREE.MathUtils.smoothstep(scroll.offset, 0.6, 1.0)} 
          scale={THREE.MathUtils.lerp(0.2, 1, THREE.MathUtils.smoothstep(scroll.offset, 0.4, 0.8))}
       />
       <HolographicArtifacts />
    </group>
  )
}

export const Experience = () => {
  return (
    <div className="canvas-container">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 15], fov: 35 }}>
        <color attach="background" args={['#f4f1ea']} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.25} penumbra={1} intensity={1.5} castShadow />

        <Suspense fallback={<Html center>BUILDING_EXPERIENCE...</Html>}>
          <Environment preset="studio" />
          
          <ScrollControls pages={4} damping={0.1}>
            <CinematicCamera />
            
            <WorkspaceCard position={[0, 1, -8]} rotation={[0.1, -0.3, 0]} scale={2.5} />
            
            <SceneLogic />

            <gridHelper args={[100, 50, '#ddd', '#eee']} position={[0, -5, 0]} />
            <Sparkles count={200} scale={30} size={1} speed={0.5} color="#00f2ff" />

            <EffectComposer disableNormalPass>
              <Bloom luminanceThreshold={1} mipmapBlur intensity={0.8} radius={0.4} />
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
