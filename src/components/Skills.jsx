import React from 'react'
import { motion } from 'framer-motion'
import { Code2, Palette, Database, PenTool, Layout, Layers } from 'lucide-react'

const SkillIcon = ({ icon: Icon, name, delay, color }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.5 }}
    whileInView={{ opacity: 1, scale: 1 }}
    whileHover={{ 
      scale: 1.05, 
      rotate: 2,
      boxShadow: `0 0 30px ${color}55`,
      backgroundColor: "rgba(255,255,255,0.08)"
    }}
    transition={{ 
      y: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      },
      opacity: { delay: delay, duration: 0.8 },
      scale: { type: "spring", stiffness: 400, damping: 10 }
    }}
    className="glass-card" 
    style={{ 
      padding: '2rem', 
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
      cursor: 'pointer'
    }}
  >
    <div style={{ padding: '1.5rem', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}>
      <Icon size={32} style={{ color: color }} />
    </div>
    <span style={{ fontWeight: 700, letterSpacing: '1px', fontSize: '0.9rem', color: 'white' }}>{name}</span>
  </motion.div>
)

const Skills = () => {
  const skills = [
    { name: 'HTML & CSS', icon: Layout, color: '#E34F26' },
    { name: 'JavaScript', icon: Code2, color: '#F7DF1E' },
    { name: 'React JS', icon: Layers, color: '#61DAFB' },
    { name: 'MongoDB', icon: Database, color: '#47A248' },
    { name: 'Canva', icon: Palette, color: '#00C4CC' },
    { name: 'Adobe', icon: PenTool, color: '#FF0000' }
  ]

  return (
    <section id="skills" style={{ padding: '8rem 10%', background: 'linear-gradient(var(--bg-primary), var(--bg-secondary))' }}>
      <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Technical <span className="text-gradient">Proficiency</span></h2>
        <p style={{ color: 'var(--text-secondary)' }}>Tools and technologies I use to bring ideas to life</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem' }}>
        {skills.map((skill, index) => (
          <SkillIcon key={index} name={skill.name} icon={skill.icon} delay={index * 0.1} color={skill.color} />
        ))}
      </div>
      
      <div style={{ marginTop: '6rem', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Certifications</h3>
        <div className="glass-card" style={{ display: 'inline-block', padding: '1.5rem 3rem' }}>
          <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>UI Design Completion Certificate</p>
          <p style={{ color: 'var(--accent-cyan)', marginTop: '0.5rem' }}>Professional Credential</p>
        </div>
      </div>
    </section>
  )
}

export default Skills
