import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Send } from 'lucide-react'

const Contact = () => {
  return (
    <section id="contact" style={{ padding: '8rem 10%', background: 'linear-gradient(var(--bg-secondary), var(--bg-primary))' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
          Get In <span className="text-gradient">Touch</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          Have a project in mind? Let's build something amazing together.
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1.5fr', 
        gap: '4rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Contact Info */}
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
        >
          <div className="glass-card" style={{ padding: '3rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Contact Information</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ padding: '0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                  <Mail className="text-gradient" size={24} />
                </div>
                <span style={{ color: 'var(--text-secondary)' }}>teja26kt@gmail.com</span>
              </div>
            </div>

            <div style={{ marginTop: 'auto' }}>
              <h4 style={{ marginBottom: '1rem' }}>Follow Me</h4>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="https://github.com/teja26kt-netizen" target="_blank" className="glass-card" style={{ padding: '0.8rem', color: 'white' }}>
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/teja-kuchallapati-806a29374/" target="_blank" className="glass-card" style={{ padding: '0.8rem', color: 'white' }}>
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
        >
          <form className="glass-card" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Name</label>
                <input type="text" placeholder="John Doe" style={{ 
                  background: 'rgba(255,255,255,0.05)', 
                  border: '1px solid var(--glass-border)',
                  padding: '1rem',
                  borderRadius: '12px',
                  color: 'white',
                  outline: 'none'
                }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Email</label>
                <input type="email" placeholder="john@example.com" style={{ 
                  background: 'rgba(255,255,255,0.05)', 
                  border: '1px solid var(--glass-border)',
                  padding: '1rem',
                  borderRadius: '12px',
                  color: 'white',
                  outline: 'none'
                }} />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Message</label>
              <textarea rows="5" placeholder="Your message here..." style={{ 
                background: 'rgba(255,255,255,0.05)', 
                border: '1px solid var(--glass-border)',
                padding: '1rem',
                borderRadius: '12px',
                color: 'white',
                outline: 'none',
                resize: 'none'
              }}></textarea>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                marginTop: '1rem',
                padding: '1.2rem',
                background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
                border: 'none',
                borderRadius: '12px',
                color: 'black',
                fontWeight: 800,
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.8rem'
              }}
            >
              Send Message <Send size={18} />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
