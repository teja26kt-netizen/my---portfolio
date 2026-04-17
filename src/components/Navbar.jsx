import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        padding: scrolled ? '1rem 10%' : '2rem 10%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(3, 3, 3, 0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--glass-border)' : 'none'
      }}
    >
      <div style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-1px' }}>
        T<span className="text-gradient">K</span>
      </div>

      <div style={{ display: 'flex', gap: '2.5rem' }}>
        {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            style={{
              textDecoration: 'none',
              color: 'var(--text-secondary)',
              fontSize: '0.9rem',
              fontWeight: 500,
              transition: 'color 0.3s ease'
            }}
            onMouseOver={(e) => (e.target.style.color = 'white')}
            onMouseOut={(e) => (e.target.style.color = 'var(--text-secondary)')}
          >
            {item}
          </a>
        ))}
      </div>
    </motion.nav>
  )
}

export default Navbar
