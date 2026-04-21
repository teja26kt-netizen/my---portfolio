import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll, Environment, Float, Sparkles, Html } from '@react-three/drei'
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing'

// Local Components
import { CinematicCamera } from './CinematicCamera'
import { ViewportHUD } from './ViewportHUD'

// Sections
import { HeroSection } from '../sections/HeroSection'
import { SkillsOrbit } from '../sections/SkillsOrbit'
import { ProjectPanels } from '../sections/ProjectPanels'


export const Experience = () => {
  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 10], fov: 35 }}>
        <color attach="background" args={['#020205']} />
        <ambientLight intensity={1} />
        
        <Suspense fallback={
          <Html fullscreen>
            <div style={{
              width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
              background: '#020205', color: '#00f2ff', fontFamily: 'monospace', letterSpacing: '0.4em'
            }}>
              INITIALIZING_SYSTEM...
            </div>
          </Html>
        }>
          <Environment preset="city" />
          
          <ScrollControls pages={4} damping={0.1}>
            <CinematicCamera />
            
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
              <HeroSection />
            </Float>

            <SkillsOrbit position={[0, -15, 0]} />
            
            <ProjectPanels position={[0, -32, 0]} />

            <Sparkles count={300} scale={25} size={1.2} speed={0.4} color="#00f2ff" />
            
            <EffectComposer disableNormalPass>
              <Bloom luminanceThreshold={1} mipmapBlur intensity={1.2} radius={0.4} />
              <Noise opacity={0.05} />
            </EffectComposer>

            <Scroll html>
              <ViewportHUD />
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  )
}
