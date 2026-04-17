import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const ProjectCard = ({ title, desc, img, tag }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['17.5deg', '-17.5deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-17.5deg', '17.5deg'])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: '1000px' }}
      transition={{ duration: 0.8 }}
      className="glass-card" 
    >
      <div style={{ transform: 'translateZ(75px)', transformStyle: 'preserve-3d' }}>
        <div style={{ height: '220px', position: 'relative', overflow: 'hidden', borderRadius: '15px' }}>
          <div style={{ 
            width: '100%', 
            height: '100%', 
            background: `url(${img})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            transform: 'scale(1.1)',
            transition: 'transform 0.5s ease'
          }} />
          <div style={{ 
            position: 'absolute', 
            top: '1rem', 
            left: '1rem', 
            background: 'var(--accent-cyan)', 
            color: 'black',
            padding: '0.4rem 1.2rem', 
            borderRadius: '50px', 
            fontSize: '0.75rem',
            fontWeight: 800,
            textTransform: 'uppercase'
          }}>
            {tag}
          </div>
        </div>
        <div style={{ padding: '2rem', transform: 'translateZ(50px)' }}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>{title}</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>{desc}</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
             <button className="text-gradient" style={{ border: 'none', background: 'none', fontWeight: 700, cursor: 'pointer' }}>Demo</button>
             <button style={{ border: 'none', background: 'none', color: 'white', fontWeight: 700, cursor: 'pointer' }}>Code</button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const Projects = () => {
  return (
    <section id="projects" style={{ padding: '8rem 10%' }}>
      <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Featured <span className="text-gradient">Projects</span></h2>
        <p style={{ color: 'var(--text-secondary)' }}>Innovative solutions built with modern technology</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>
        <ProjectCard 
          title="Frenzy Food" 
          desc="A food delivery and management application celebrating flavor in every bite. Celebrates sizzling street eats to gourmet delights." 
          img="/assets/frenzy.png" 
          tag="Full Stack"
        />
        <ProjectCard 
          title="Learning Tracker" 
          desc="Stop guessing, start building. Premium visual roadmaps designed by elite engineers to take you from zero to expert." 
          img="/assets/tracker.png" 
          tag="React / AI"
        />
      </div>
    </section>
  )
}

export default Projects
