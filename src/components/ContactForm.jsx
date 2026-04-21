import React, { useState } from 'react'

/**
 * ContactForm: A minimalist 2D overlay form.
 * Matches the 'Avatar Showcase' design system with pill-shaped inputs and orange buttons.
 */
export const ContactForm = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('TRANSMITTING...')
    setTimeout(() => {
      setStatus('SIGNAL_SENT')
      setTimeout(() => {
        onClose()
        setStatus(null)
      }, 1500)
    }, 1500)
  }

  return (
    <div className={`contact-overlay ${isOpen ? 'active' : ''}`}>
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem' }}>
            INITIATE <span className="text-gradient">HANDSHAKE</span>
          </h2>
          <div 
            onClick={onClose} 
            style={{ cursor: 'pointer', fontSize: '1.5rem', opacity: 0.5 }}
          >
            ×
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="YOUR_IDENTIFIER" required />
          <input type="email" placeholder="SIGNAL_ADDRESS" required />
          <textarea rows="4" placeholder="MESSAGE_PAYLOAD" required />
          
          <button type="submit" className="pill-button" style={{ width: '100%' }}>
            {status || 'EMIT_SIGNAL'}
          </button>
        </form>
        
        <div style={{ marginTop: '2rem', fontSize: '0.7rem', color: 'var(--text-dim)', textAlign: 'center' }}>
          ENCRYPTION: AES-256-GCM | STATUS: STANDBY
        </div>
      </div>
    </div>
  )
}
