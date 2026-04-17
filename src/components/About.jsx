import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Typewriter = () => {
  const [index, setIndex] = useState(0)
  const roles = ['Full Stack Developer', 'Front End Developer', 'Back End Developer']
  
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={roles[index]}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
        className="text-gradient"
        style={{ fontWeight: 700 }}
      >
        {roles[index]}
      </motion.span>
    </AnimatePresence>
  )
}

const About = () => {
  return (
    <section id="about" style={{ padding: '8rem 10%', display: 'grid', gridTemplateColumns: '1.2fr 1.5fr', gap: '5rem', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="glass-card" 
          style={{ height: '400px', overflow: 'hidden', position: 'relative' }}
        >
          <div style={{ 
            width: '100%', 
            height: '100%', 
            background: 'url("/assets/profile.png")', 
            backgroundSize: 'cover',
            backgroundPosition: 'center top'
          }} />
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           style={{ textAlign: 'center' }}
        >
          <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Teja Kuchallapati</h3>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
            I am a <Typewriter />
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ fontSize: '3rem', marginBottom: '2rem' }}
        >
          About <span className="text-gradient">Me</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}
        >
          I am a passionate and detail-oriented Full Stack Web Developer with a strong foundation in both frontend and backend technologies. 
          I specialize in building scalable, high-performance web applications using modern frameworks and APIs, with a focus on clean 
          architecture and efficient code practices.
        </motion.p>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}
        >
          I enjoy transforming ideas into intuitive, user-centric digital experiences that are both functional and visually engaging. 
          With a continuous drive to learn and adapt, I actively explore new technologies and approaches to deliver impactful and 
          future-ready solutions.
        </motion.p>
        
        <div style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem' }}>
           <a href="https://www.linkedin.com/in/teja-kuchallapati-806a29374/" target="_blank" className="text-gradient" style={{ textDecoration: 'none', fontWeight: 600 }}>LinkedIn</a>
           <a href="https://github.com/teja26kt-netizen" target="_blank" className="text-gradient" style={{ textDecoration: 'none', fontWeight: 600 }}>GitHub</a>
        </div>
      </motion.div>
    </section>
  )
}

export default About
