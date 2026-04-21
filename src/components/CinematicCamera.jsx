import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'

/**
 * CinematicCamera handles the lerp-based transitions between 
 * different 3D focal points based on scroll progress.
 */
export const CinematicCamera = () => {
  const scroll = useScroll()
  const vec = new THREE.Vector3()
  const lookAtVec = new THREE.Vector3()

  useFrame((state) => {
    const offset = scroll.offset
    
    // Position Waypoints
    // Hero: [0, 0, 10]
    // Skills: [0, -15, 8]
    // Projects: [0, -32, 12]
    
    const yPos = -offset * 32
    // Smooth zoom effect: moves camera slightly in/out as you scroll
    const zPos = 10 - Math.sin(offset * Math.PI) * 2

    // Smoothly interpolate position
    state.camera.position.lerp(vec.set(0, yPos, zPos), 0.05)
    
    // Smoothly interpolate lookAt
    lookAtVec.set(0, yPos, 0)
    state.camera.lookAt(lookAtVec)
  })

  return null
}
