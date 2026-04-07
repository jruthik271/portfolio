import React, { Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ThemeSwitcher from './components/ThemeSwitcher'
import ParticleBackground from './components/ParticleBackground'

// Lazy load heavy components below the fold
const About = React.lazy(() => import('./components/About'))
const Skills = React.lazy(() => import('./components/Skills'))
const Work = React.lazy(() => import('./components/Work'))
const Journey = React.lazy(() => import('./components/Journey'))
const Blogs = React.lazy(() => import('./components/Blogs'))
const Contact = React.lazy(() => import('./components/Contact'))

// Fallback component for Suspense
const SectionLoader = () => (
  <div className="flex items-center justify-center py-20 min-h-[300px]">
    <div className="w-8 h-8 max-w-full max-h-full border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin aspect-square"></div>
  </div>
)

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <ParticleBackground />
      <Navbar />
      
      <main className="relative z-10 flex flex-col gap-10 lg:gap-20 pb-20">
        <Hero />
        <Suspense fallback={<SectionLoader />}>
          <About />
          <Skills />
          <Work />
          <Journey />
          <Blogs />
          <Contact />
        </Suspense>
      </main>

      <ThemeSwitcher />
    </div>
  )
}

export default App
