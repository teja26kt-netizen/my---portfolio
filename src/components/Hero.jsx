import React, { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshTransmissionMaterial, Float, Stars, Sparkles, Text3D, Center } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { motion } from 'framer-motion'

function AdvancedCrystal() {
  const meshRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.1
    meshRef.current.rotation.y = time * 0.15
  })

  return (
    <Float speed={3} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 15]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          thickness={1}
          chromaticAberration={0.05}
          anisotropy={0.1}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.1}
          color="#7000ff"
        />
      </mesh>
      {/* Outer Glow Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.01, 16, 100]} />
        <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={2} />
      </mesh>
    </Float>
  )
}

function InteractiveGrid() {
  const pointsRef = useRef()
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    for (let i = 0; i < pointsRef.current.geometry.attributes.position.count; i++) {
        const x = pointsRef.current.geometry.attributes.position.getX(i)
        const y = pointsRef.current.geometry.attributes.position.getY(i)
        const dist = Math.sqrt(x * x + y * y)
        const offset = Math.sin(dist * 2 - time * 2) * 0.2
        pointsRef.current.geometry.attributes.position.setZ(i, offset)
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[20, 20, 50, 50]} />
      <pointsMaterial color="#00f2ff" size={0.02} transparent opacity={0.2} />
    </points>
  )
}

function GlowingText3D({ children, position, color, size, height }) {
  const meshRef = useRef()
  const fontUrl = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/helvetiker_bold.typeface.json"
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.material.emissiveIntensity = 0.5 + Math.sin(time * 2) * 0.3
  })

  return (
    <Center position={position}>
      <Text3D ref={meshRef} font={fontUrl} size={size} height={height} curveSegments={12}>
        {children}
        <meshStandardMaterial color="#ffffff" emissive={color} emissiveIntensity={0.5} />
      </Text3D>
    </Center>
  )
}

function FloatingName() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <GlowingText3D position={[-2, -0.5, 0]} color="#00f2ff" size={0.5} height={0.2}>
        TEJA
      </GlowingText3D>
      <GlowingText3D position={[-1, -1.5, 0]} color="#7000ff" size={0.4} height={0.15}>
        KUCHALLAPATI
      </GlowingText3D>
    </Float>
  )
}

const Hero = () => {
  return (
    <section id="hero" style={{ height: '100vh', width: '100%', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }} dpr={[1, 2]}>
          <color attach="background" args={['#030303']} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00f2ff" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7000ff" />
          
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1.5} />
          <Sparkles count={300} scale={15} size={2} speed={0.5} color="#00f2ff" />
          
          <Suspense fallback={null}>
            <FloatingName />
            <AdvancedCrystal />
            <InteractiveGrid />
          </Suspense>
          
          <EffectComposer>
            <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={1.5} />
            <Noise opacity={0.03} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
          
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>

      <div style={{ 
        position: 'absolute', 
        top: '40%', 
        left: '10%', 
        zIndex: 2,
        maxWidth: '800px',
        pointerEvents: 'none'
      }}>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-2px' }}
        >
          Welcome to my <span className="text-gradient">Portfolio</span>
        </motion.h1>
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.05 }
            }
          }}
          className="text-gradient" 
          style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1rem' }}
        >
          {"Full Stack Web Developer".split("").map((char, index) => (
            <motion.span 
              key={index}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.4 }}
           style={{ pointerEvents: 'auto' }}
        >
          <a href="#projects" className="glass-card" style={{ 
            padding: '1rem 2.5rem', 
            textDecoration: 'none', 
            color: 'white', 
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            display: 'inline-block',
            marginTop: '2rem'
          }}>
            Download CV
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
