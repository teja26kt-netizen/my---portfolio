import React from 'react'

export const Overlay = () => {
  return (
    <div className="overlay-container">
      {/* HUD Header */}
      <nav style={{ 
        position: 'fixed', top: '2rem', left: '10%', right: '10%', 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center' 
      }}>
        <div className="hud-text" style={{ fontSize: '1.2rem', fontWeight: 800 }}>
          Teja<span style={{ color: '#fff' }}>.sys</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Logic', 'Gear', 'Artifacts', 'Signal'].map(item => (
            <div key={item} className="hud-text" style={{ cursor: 'pointer' }}>{item}</div>
          ))}
        </div>
      </nav>

      {/* Section 1: Hero */}
      <section style={{ height: '100vh', padding: '0 10%', display: 'flex', alignItems: 'flex-start' }}>
        <div style={{ maxWidth: '600px' }}>
          <div className="hud-text pulse" style={{ marginBottom: '1rem' }}>SYSTEM_STATUS: ONLINE</div>
          <h1 style={{ fontSize: '5rem', lineHeight: 0.9, marginBottom: '2rem' }}>
            CRAFTING <br />
            <span className="text-gradient">DIGITAL</span> <br />
            REALITIES
          </h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', borderLeft: '2px solid var(--accent-cyan)', paddingLeft: '1.5rem' }}>
            Full Stack Developer specializing in immersive 3D web experiences and scalable architectures.
          </p>
        </div>
      </section>

      {/* Section 2: Skills */}
      <section style={{ height: '100vh', padding: '0 10%', display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ width: '100%', textAlign: 'right' }}>
          <div className="hud-text" style={{ marginBottom: '1rem' }}>MODULE: TECH_STACK</div>
          <h2 style={{ fontSize: '4rem', marginBottom: '2rem' }}>ENGINEERING <br /> <span className="text-gradient">EXCELLENCE</span></h2>
          <div className="glass-panel neon-border" style={{ display: 'inline-block', textAlign: 'left', padding: '1.5rem 3rem' }}>
            <p className="hud-text" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>ACTIVE_MODULES:</p>
            <div style={{ display: 'flex', gap: '2rem', fontSize: '1.1rem', fontWeight: 600 }}>
              <span>React / Next.js</span>
              <span>Node / Express</span>
              <span>Three.js / WebGL</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Projects */}
      <section style={{ height: '100vh', padding: '0 10%' }}>
        <div className="hud-text" style={{ marginBottom: '1rem' }}>MODULE: ARTIFACTS</div>
        <h2 style={{ fontSize: '4rem', marginBottom: '2rem' }}>SELECTED <span className="text-gradient">WORKS</span></h2>
        {/* The 3D panels will be rendered behind this */}
      </section>

      {/* Section 4: Contact */}
      <section style={{ height: '100vh', padding: '0 10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="glass-panel" style={{ textAlign: 'center', maxWidth: '800px', width: '100%' }}>
          <div className="hud-text" style={{ marginBottom: '2rem' }}>COMM_ENCRYPTION: ENABLED</div>
          <h2 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>ESTABLISH <span className="text-gradient">SIGNAL</span></h2>
          <p style={{ color: 'var(--text-dim)', marginBottom: '3rem' }}>Ready to deploy next-generation digital solutions.</p>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '3rem', fontFamily: 'var(--font-mono)' }}>
            TEJA26KT@GMAIL.COM
          </div>
          <button className="neon-border" style={{ 
            background: 'transparent', color: '#fff', padding: '1rem 4rem', 
            borderRadius: '4px', cursor: 'pointer', fontWeight: 800 
          }}>INITIATE_CONTACT</button>
        </div>
      </section>

      {/* HUD Decor */}
      <div style={{ position: 'fixed', bottom: '2rem', left: '10%', right: '10%', display: 'flex', justifyContent: 'space-between' }}>
        <div className="hud-text">Uptime: 99.98%</div>
        <div className="hud-text">Location: 17.3850° N, 78.4867° E</div>
      </div>
    </div>
  )
}
