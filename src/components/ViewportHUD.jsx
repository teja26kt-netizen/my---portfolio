import React from 'react'

/**
 * Overlay component handles the HTML/HUD layer.
 * Using a clean, modular structure for easy updates.
 */
export const ViewportHUD = () => {
  return (
    <div className="overlay-container">
      {/* 🚀 HUD Header - Fixed Navigation */}
      <nav style={{ 
        position: 'fixed', top: '2rem', left: '10%', right: '10%', 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        zIndex: 100
      }} className="hud-interactive">
        <div className="hud-text" style={{ fontSize: '1.2rem', fontWeight: 900 }}>
          Teja<span style={{ color: '#fff' }}>.sys</span>
        </div>
        <div style={{ display: 'flex', gap: '2.5rem' }}>
          {['Logic', 'Gear', 'Artifacts', 'Signal'].map(item => (
            <div key={item} className="hud-text" style={{ cursor: 'pointer', fontSize: '0.7rem' }}>
              {item}
            </div>
          ))}
        </div>
      </nav>

      {/* 📍 Section 1: Hero (Welcome) */}
      <section style={{ height: '100vh' }}>
        <div style={{ maxWidth: '700px' }}>
          <div className="hud-text pulse" style={{ marginBottom: '1.5rem' }}>
            {`> STATUS: ONLINE`}
          </div>
          <h1 style={{ 
            fontSize: 'max(4rem, 6vw)', 
            lineHeight: 0.9, 
            marginBottom: '2rem',
            fontFamily: 'var(--font-display)',
            fontWeight: 800
          }}>
            CRAFTING <br />
            <span className="text-gradient">DIGITAL</span> <br />
            FRONTIERS
          </h1>
          <p style={{ 
            color: 'var(--text-dim)', 
            fontSize: '1.1rem', 
            borderLeft: '2px solid var(--accent-cyan)', 
            paddingLeft: '2rem',
            maxWidth: '500px'
          }}>
            Architecting high-performance immersive experiences at the intersection of Art and Engineering.
          </p>
        </div>
      </section>

      {/* 📍 Section 2: Skills (Stack) */}
      <section style={{ height: '100vh', alignItems: 'flex-end' }}>
        <div style={{ width: '100%', textAlign: 'right' }}>
          <div className="hud-text" style={{ marginBottom: '1.5rem' }}>
            {`> MODULE: CORE_ENGINE`}
          </div>
          <h2 style={{ fontSize: 'max(3rem, 5vw)', marginBottom: '2.5rem', fontFamily: 'var(--font-display)' }}>
            PRECISION <br /> <span className="text-gradient">ENGINEERING</span>
          </h2>
          <div className="glass-panel neon-border" style={{ 
            display: 'inline-block', 
            textAlign: 'left', 
            padding: '2rem 3.5rem' 
          }}>
            <p className="hud-text" style={{ fontSize: '0.65rem', marginBottom: '0.8rem' }}>ACTIVE_LOAD:</p>
            <div style={{ display: 'flex', gap: '3rem', fontSize: '1.1rem', fontWeight: 600 }}>
              <span>React / Next.js</span>
              <span>Node / GraphQL</span>
              <span>Three.js / GLSL</span>
            </div>
          </div>
        </div>
      </section>

      {/* 📍 Section 3: Projects (Artifacts) */}
      <section style={{ height: '100vh' }}>
        <div className="hud-text" style={{ marginBottom: '1.5rem' }}>
          {`> MODULE: ARTIFACT_VAULT`}
        </div>
        <h2 style={{ fontSize: 'max(3rem, 5vw)', marginBottom: '2.5rem', fontFamily: 'var(--font-display)' }}>
          PROTOTYPE <br /><span className="text-gradient">MANIFEST</span>
        </h2>
        <div className="hud-text" style={{ fontSize: '0.8rem', opacity: 0.5 }}>
          [ SCROLL_TO_DISCOVER_INTERACTIVE_MODULES ]
        </div>
      </section>

      {/* 📍 Section 4: Contact (Signal) */}
      <section style={{ height: '100vh', alignItems: 'center' }}>
        <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem', width: '100%', maxWidth: '900px' }}>
          <div className="hud-text pulse" style={{ marginBottom: '2.5rem' }}>
            {`> ESTABLISH_COMM_LINK: AWAITING...`}
          </div>
          <h2 style={{ fontSize: 'max(3rem, 4vw)', marginBottom: '1.5rem', fontFamily: 'var(--font-display)' }}>
            EMIT <span className="text-gradient">SIGNAL</span>
          </h2>
          <p style={{ color: 'var(--text-dim)', marginBottom: '4rem', fontSize: '1.1rem' }}>
            Ready to integrate with high-impact teams and experimental projects world-wide.
          </p>
          <div style={{ 
            fontSize: 'clamp(1rem, 3vw, 2rem)', 
            fontWeight: 800, 
            marginBottom: '4rem', 
            fontFamily: 'var(--font-mono)',
            color: 'var(--accent-cyan)'
          }}>
            TEJA26KT@GMAIL.COM
          </div>
          <button className="neon-border hud-interactive" style={{ 
            background: 'transparent', color: '#fff', padding: '1.2rem 4rem', 
            borderRadius: '4px', cursor: 'pointer', fontWeight: 900,
            fontFamily: 'var(--font-mono)', fontSize: '0.9rem'
          }}>
            INITIATE_HANDSHAKE
          </button>
        </div>
      </section>

      {/* 🛸 HUD Footer - Performance Stats */}
      <footer style={{ 
        position: 'fixed', bottom: '2rem', left: '10%', right: '10%', 
        display: 'flex', justifyContent: 'space-between',
        zIndex: 100
      }}>
        <div className="hud-text">Kernel_Rev: 3.1.2</div>
        <div className="hud-text">Sync: 17.3850° N, 78.4867° E</div>
      </footer>
    </div>
  )
}
