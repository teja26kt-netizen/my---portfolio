import React, { useEffect, useState } from 'react'

/**
 * AudioManager: Handles the tech ambient soundscape.
 * Activates on first user interaction to satisfy browser policies.
 */
export const AudioManager = () => {
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    // Subtle technical ambient hum URL
    const audio = new Audio('https://www.soundjay.com/free-music/ambient-02.mp3')
    audio.loop = true
    audio.volume = 0.2

    const handleInteraction = () => {
      if (!isPlaying) {
        audio.play().catch(e => console.log('Audio autoplay blocked'))
        setIsPlaying(true)
      }
    }

    window.addEventListener('click', handleInteraction)
    return () => {
      window.removeEventListener('click', handleInteraction)
      audio.pause()
    }
  }, [isPlaying])

  return (
    <div style={{
      position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000,
      opacity: 0.5, fontSize: '0.6rem', color: '#fff', pointerEvents: 'none'
    }}>
      AUDIO: {isPlaying ? 'TRANSMITTING' : 'CLICK_TO_SYNC'}
    </div>
  )
}
