import React, { Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ThemeSwitcher from './components/ThemeSwitcher';
import ParticleBackground from './components/ParticleBackground';
import CursorGlow from './components/CursorGlow';

// Lazy load below the fold components
const About = React.lazy(() => import('./components/About'));
const Skills = React.lazy(() => import('./components/Skills'));
const Work = React.lazy(() => import('./components/Work'));
const Journey = React.lazy(() => import('./components/Journey'));
const Blogs = React.lazy(() => import('./components/Blogs'));
const Contact = React.lazy(() => import('./components/Contact'));
const Footer = React.lazy(() => import('./components/Footer'));

const SectionLoader = () => (
  <div className="flex items-center justify-center py-20 min-h-[300px]">
    <div className="w-8 h-8 max-w-full max-h-full border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin aspect-square"></div>
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500 overflow-x-hidden selection:bg-[var(--color-accent)] selection:text-white relative">
      {/* 1. Custom Interactive Cursors */}
      <CursorGlow />

      {/* 2. Interactive Background canvas */}
      <ParticleBackground />

      {/* 3. Global Navbar */}
      <Navbar />
      
      {/* 4. Core Presentation Flow */}
      <main className="relative z-10 flex flex-col pb-20">
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

      {/* 5. Theme Settings Drawer */}
      <ThemeSwitcher />

      {/* 6. Footer section */}
      <Footer />
    </div>
  );
}
