import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'

export const CinematicCamera = () => {
  const scroll = useScroll()
  const vec = new THREE.Vector3()

  useFrame((state) => {
    const offset = scroll.offset
    
    // Define waypoints based on scroll offset (0 to 1)
    // Page 1: Hero [0, 0, 10]
    // Page 2: Skills [0, -15, 8]
    // Page 3: Projects [0, -30, 12]
    // Page 4: Contact [0, -45, 10]
    
    const yPos = -offset * 45
    const zPos = 8 + Math.sin(offset * Math.PI) * 5 // Slight zoom in/out effect

    state.camera.position.lerp(vec.set(0, yPos, zPos), 0.05)
    state.camera.lookAt(0, yPos, 0)
  })

  return null
}
