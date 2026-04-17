import React, { Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import About from './components/About'
import Contact from './components/Contact'

function App() {
  return (
    <main className="portfolio-container">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      
      <footer style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-secondary)', borderTop: '1px solid var(--glass-border)' }}>
        <p>© 2026 Teja Kuchallapati. Built with React, Three.js & Framer Motion</p>
      </footer>
    </main>
  )
}

export default App
