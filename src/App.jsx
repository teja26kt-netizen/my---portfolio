import React, { useState, useEffect } from 'react'

// --- Stable Sub-components ---

const TypewriterRole = () => {
  const roles = ['Full Stack Developer', 'Front End Developer', 'Back End Developer']
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  
  useEffect(() => {
    const currentFullText = roles[index]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentFullText.substring(0, text.length + 1))
        if (text === currentFullText) setIsDeleting(true)
      } else {
        setText(currentFullText.substring(0, text.length - 1))
        if (text === '') {
          setIsDeleting(false)
          setIndex((index + 1) % roles.length)
        }
      }
    }, isDeleting ? 50 : 150)
    
    return () => clearTimeout(timeout)
  }, [text, isDeleting, index])

  return <span className="text-gradient" style={{ fontWeight: 700 }}>{text}|</span>
}

const App = () => {
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div style={{ background: '#030303', color: '#fff', minHeight: '100vh', fontFamily: "'Outfit', sans-serif" }}>
      <div className="mesh-gradient-bg" />

      {/* Navbar */}
      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 1000,
        padding: scrolled ? '1rem 10%' : '2rem 10%',
        background: scrolled ? 'rgba(3, 3, 3, 0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        transition: 'all 0.4s ease'
      }}>
        <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>T<span className="text-gradient">K</span></div>
        <div style={{ display: 'flex', gap: '2.5rem' }}>
          {['About', 'Projects', 'Skills', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{ textDecoration: 'none', color: '#fff', opacity: 0.8, fontSize: '0.9rem' }}>{item}</a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section id="hero" style={{ height: '100vh', display: 'flex', alignItems: 'center', padding: '0 10%' }}>
        <div>
          <h5 style={{ letterSpacing: '4px', color: '#00f2ff', marginBottom: '1rem', fontWeight: 600 }}>WELCOME TO MY PORTFOLIO</h5>
          <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', fontWeight: 800, lineHeight: 1.1 }}>
            Hi, I'm <br />
            <span className="text-gradient">Teja Kuchallapati</span>
          </h1>
          <p style={{ fontSize: '1.5rem', color: '#a0a0a0', marginTop: '1.5rem' }}>
            Professional <TypewriterRole />
          </p>
          <div style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem' }}>
            <a href="#projects" className="glass-card" style={{ padding: '1rem 2.5rem', textDecoration: 'none', color: '#fff', fontWeight: 600 }}>View Projects</a>
            <a href="#contact" style={{ padding: '1rem 2.5rem', textDecoration: 'none', color: '#fff', fontWeight: 600 }}>Contact Me</a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '5rem', alignItems: 'center' }}>
        <div className="glass-card" style={{ height: '400px', overflow: 'hidden' }}>
          <div style={{ width: '100%', height: '100%', background: 'url("/assets/profile.png") center/cover no-repeat' }} />
        </div>
        <div>
          <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>About <span className="text-gradient">Me</span></h2>
          <p style={{ fontSize: '1.1rem', color: '#a0a0a0', lineHeight: 1.8 }}>
            I am a passionate Full Stack Web Developer. I specialize in building scalable, high-performance web applications using modern frameworks and APIs.
          </p>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '2rem' }}>
             <a href="https://github.com/teja26kt-netizen" target="_blank" style={{ color: '#fff', textDecoration: 'none' }}>GitHub</a>
             <a href="https://www.linkedin.com/in/teja-kuchallapati-806a29374/" target="_blank" style={{ color: '#fff', textDecoration: 'none' }}>LinkedIn</a>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '4rem' }}>Technical <span className="text-gradient">Skills</span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          {[
            { name: 'Frontend', text: 'React, Next.js, CSS3', color: '#00f2ff' },
            { name: 'Backend', text: 'Node.js, MongoDB', color: '#7000ff' },
            { name: 'Tools', text: 'Git, VS Code, Figma', color: '#ff00d0' }
          ].map(skill => (
            <div key={skill.name} className="glass-card" style={{ padding: '2rem', borderTop: `4px solid ${skill.color}` }}>
              <h3 style={{ marginBottom: '1rem' }}>{skill.name}</h3>
              <p style={{ color: '#a0a0a0' }}>{skill.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects">
        <h2 style={{ fontSize: '3rem', marginBottom: '4rem', textAlign: 'center' }}>Featured <span className="text-gradient">Projects</span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          {[1, 2].map(p => (
            <div key={p} className="glass-card" style={{ overflow: 'hidden' }}>
              <div style={{ height: '200px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', opacity: 0.1 }}>PRJ</div>
              <div style={{ padding: '2rem' }}>
                <h3>Project Title {p}</h3>
                <p style={{ color: '#a0a0a0', marginTop: '1rem' }}>A high-performance web application showcasing modern design.</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact">
        <div className="glass-card" style={{ padding: '4rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Get In <span className="text-gradient">Touch</span></h2>
          <p style={{ color: '#a0a0a0', marginBottom: '2rem' }}>Let's build something amazing together.</p>
          <div style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>teja26kt@gmail.com</div>
          <button style={{ 
            padding: '1rem 3rem', background: 'linear-gradient(135deg, #00f2ff, #7000ff)', 
            border: 'none', borderRadius: '10px', color: '#000', fontWeight: 800, cursor: 'pointer' 
          }}>Send Message</button>
        </div>
      </section>

      <footer style={{ padding: '4rem', textAlign: 'center', opacity: 0.5, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <p>© 2026 Teja Kuchallapati. Built with Passion & Stability.</p>
      </footer>
    </div>
  )
}

export default App
