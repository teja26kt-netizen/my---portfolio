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
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 10], fov: 35 }}
        onCreated={({ gl }) => {
          gl.toneMappingExposure = 1.2
        }}
      >
        <color attach="background" args={['#020205']} />
        
        {/* Cinematic Lighting System */}
        <ambientLight intensity={0.2} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-10, -10, -10]} color="#7000ff" intensity={1} />
        <pointLight position={[5, 5, 5]} color="#00f2ff" intensity={1.2} />

        <Suspense fallback={
          <Html fullscreen>
            <div style={{
              width: '100vw', 
              height: '100vh', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              background: '#020205', 
              color: '#00f2ff', 
              fontFamily: 'var(--font-mono)', 
              letterSpacing: '0.4em',
              fontSize: '0.8rem'
            }}>
              INITIALIZING_SYSTEM...
            </div>
          </Html>
        }>
          <Environment preset="city" />
          
          <ScrollControls pages={4} damping={0.1}>
            {/* Movement Logic */}
            <CinematicCamera />
            
            {/* World Content */}
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
              <HeroSection />
            </Float>

            <SkillsOrbit position={[0, -15, 0]} />
            
            <ProjectPanels position={[0, -32, 0]} />

            {/* Atmospheric Polish */}
            <Sparkles count={300} scale={25} size={1.2} speed={0.4} color="#00f2ff" />
            
            {/* Temporarily disabled effects for stability check */}
            {/* <EffectComposer disableNormalPass>
              <Bloom luminanceThreshold={1} mipmapBlur intensity={1.2} radius={0.4} />
              <Noise opacity={0.05} />
            </EffectComposer> */}

            {/* HUD / Navigation Layer */}
            <Scroll html>
              <ViewportHUD />
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  )
}
