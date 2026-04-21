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
    
    // 🎥 Camera Path Logic:
    // 1. Initial State: Wide view of the Workspace & Boy.
    // 2. Morph Phase: Aggressive zoom into the Boy's chest (z-axis transition).
    // 3. Final State: Immersive view of the Skill Compounds.

    // Calculate Target Position
    // We move from Z:15 to Z:5 as we zoom 'through' the character
    const targetZ = THREE.MathUtils.lerp(15, 2, offset)
    const targetY = THREE.MathUtils.lerp(0, -1, offset)
    const targetX = Math.sin(offset * Math.PI) * 2 // Horizontal swing
    
    // Smooth Lerp (Damping)
    state.camera.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.1)
    
    // LookAt Logic
    // Constantly focus on the center but shift slightly down as we zoom
    const lookAtPos = new THREE.Vector3(0, THREE.MathUtils.lerp(0, -1, offset), 0)
    state.camera.lookAt(lookAtPos)
  })

  return <PerspectiveCamera ref={cameraRef} makeDefault fov={35} far={1000} />
}
