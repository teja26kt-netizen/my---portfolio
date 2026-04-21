import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll, Float, Sparkles, Environment } from '@react-three/drei'
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing'
import { CinematicCamera } from './CinematicCamera'
import { HeroSection } from '../sections/HeroSection'
import { SkillsOrbit } from '../sections/SkillsOrbit'
import { ProjectPanels } from '../sections/ProjectPanels'
import { Overlay } from './Overlay'

export const Experience = () => {
  return (
    <div className="canvas-container">
      <Canvas
        shadows
        camera={{ position: [0, 0, 10], fov: 35 }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#020205']} />
        
        {/* Lights */}
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} color="#7000ff" intensity={0.5} />
        <pointLight position={[5, 5, 5]} color="#00f2ff" intensity={0.8} />

        <Suspense fallback={null}>
          <Environment preset="city" />
          
          <ScrollControls pages={4} damping={0.1}>
            <CinematicCamera />
            
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
              <HeroSection />
            </Float>

            <SkillsOrbit position={[0, -15, 0]} />
            
            <ProjectPanels position={[0, -30, 0]} />

            {/* Atmosphere */}
            <Sparkles count={200} scale={20} size={1} speed={0.4} color="#00f2ff" />
            
            <EffectComposer>
              <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
              <Noise opacity={0.05} />
            </EffectComposer>

            <Scroll html>
              <Overlay />
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  )
}
