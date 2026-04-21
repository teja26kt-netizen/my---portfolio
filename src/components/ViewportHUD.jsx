import React, { useState } from 'react'
import { ContactForm } from './ContactForm'

/**
 * ViewportHUD: The "Pill" Navigation and HUD layer.
 * Overhauled to match the high-end Avatar Showcase aesthetic.
 */
export const ViewportHUD = () => {
  const [isContactOpen, setContactOpen] = useState(false)

  return (
    <div className="overlay-container">
      {/* 🚀 Overhauled Pill Navigation */}
      <nav style={{ 
        position: 'fixed', top: '2.5rem', left: '0', right: '0',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        zIndex: 100, pointerEvents: 'all'
      }}>
        <div className="pill-nav">
          <div className="nav-link active">ABOUT</div>
          <div className="nav-link">PROJECTS</div>
          <div className="nav-link">GITHUB</div>
        </div>
      </nav>

      {/* 🟠 Primary CTA (Orange Button) */}
      <div style={{
        position: 'fixed', top: '2.5rem', right: '5%',
        zIndex: 100
      }}>
        <button 
          className="pill-button"
          onClick={() => setContactOpen(true)}
        >
          GET IN TOUCH
        </button>
      </div>

      {/* 📍 Hero Text Overlay */}
      <section className="hero-text-layer" style={{ height: '100vh', justifyContent: 'flex-start', paddingTop: '18vh' }}>
        <div style={{ maxWidth: '800px', pointerEvents: 'all' }}>
          <h1 style={{ 
            fontSize: 'max(4.5rem, 7vw)', 
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            lineHeight: 0.85,
            marginBottom: '1rem',
            color: '#1a1a1a'
          }}>
            TEJA <br />
            <span className="text-gradient">KUCHALLAPATI</span>
          </h1>
          <p style={{ 
            color: 'var(--text-dim)', 
            fontSize: '1.2rem', 
            fontWeight: 400,
            letterSpacing: '0.1em',
            borderLeft: '4px solid var(--accent-orange)',
            paddingLeft: '1.5rem'
          }}>
            FULL-STACK ARCHITECT // 3D EXPERIENCE ENGINEER
          </p>
        </div>
      </section>

      {/* 🖱️ Floating Scroll Hint (From Reel) */}
      <div style={{
        position: 'fixed', bottom: '3rem', left: '50%', transform: 'translateX(-50%)',
        zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
        opacity: 0.6
      }}>
        <div style={{ 
          width: '24px', height: '36px', border: '2px solid var(--text-primary)', 
          borderRadius: '12px', position: 'relative' 
        }}>
          <div style={{ 
            width: '4px', height: '8px', background: 'var(--accent-orange)', 
            borderRadius: '2px', position: 'absolute', top: '6px', left: '8px',
            animation: 'scroll-anim 1.5s infinite ease-in-out'
          }} />
        </div>
        <div style={{ fontSize: '0.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>SCROLL</div>
      </div>

      {/* 🛸 Bottom Telemetry */}
      <footer style={{ 
        position: 'fixed', bottom: '2rem', left: '5%', right: '5%', 
        display: 'flex', justifyContent: 'space-between',
        zIndex: 100, color: 'var(--text-dim)', fontSize: '0.7rem', fontWeight: 600
      }}>
        <div>CORE_VERSION: 4.0.0</div>
        <div>DESIGN_AUTH: TEJA.STUDIO</div>
      </footer>

      {/* 📑 The Contact Modal */}
      <ContactForm 
        isOpen={isContactOpen} 
        onClose={() => setContactOpen(false)} 
      />
    </div>
  )
}
