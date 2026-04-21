import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

/**
 * CinematicCamera: Handles the smooth, path-based motion triggered by scroll.
 * Overhauled to zoom through the character's chest during the morph phase.
 */
export const CinematicCamera = () => {
  const scroll = useScroll()
  const cameraRef = useRef()

  useFrame((state) => {
    const offset = scroll.offset
    
    // 🎥 Absolute Fidelity Camera Path:
    // We zoom from wide (Z:18) to extremely close (Z:1) as the morph evolves.
    const zoomFactor = THREE.MathUtils.smoothstep(offset, 0, 1)
    const targetZ = THREE.MathUtils.lerp(18, 1, zoomFactor)
    const targetY = THREE.MathUtils.lerp(0, -1.5, zoomFactor)
    const targetX = Math.sin(offset * Math.PI) * 1.5 // Cinematic arc
    
    // Smooth Lerp (Damping)
    state.camera.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.08)
    
    // LookAt Shift: From Hero center to Skill center
    const lookAtPos = new THREE.Vector3(0, THREE.MathUtils.lerp(0, -2, offset), 0)
    state.camera.lookAt(lookAtPos)
  })

  return <PerspectiveCamera ref={cameraRef} makeDefault fov={35} far={1000} />
}
